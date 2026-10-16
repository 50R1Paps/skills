"""Print the conversation of an agent session transcript (JSONL) as readable text.

Keeps user and assistant text; drops thinking, tool calls, tool results and
runtime events, which make up most of the file. Works with the common JSONL
layouts: a message under "message" or "payload", or at the top level, with a
"role" and a "content" that is a string or a list of text parts.

Examples:
  python transcript.py SESSION.jsonl --user-only
  python transcript.py SESSION.jsonl --grep "ticket 12" --grep deploy
  python transcript.py SESSION.jsonl --from 400 --to 700

Each turn starts with its JSONL line number, so a region found with --grep
can be reread in full with --from/--to.
"""

import argparse
import json
import sys

ROLES = ("user", "assistant")
TEXT_PARTS = ("text", "input_text", "output_text")


def message_of(entry):
    for candidate in (entry.get("message"), entry.get("payload"), entry):
        if isinstance(candidate, dict) and candidate.get("role") in ROLES:
            return candidate
    return None


def text_of(content):
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return ""
    return "\n".join(
        part.get("text", "")
        for part in content
        if isinstance(part, dict) and part.get("type") in TEXT_PARTS
    )


def turns(path, first, last):
    with open(path, encoding="utf-8") as fh:
        for number, line in enumerate(fh, 1):
            if number < first or (last and number > last):
                continue
            try:
                entry = json.loads(line)
            except json.JSONDecodeError:
                continue
            if not isinstance(entry, dict):
                continue
            message = message_of(entry)
            if message is None:
                continue
            text = text_of(message.get("content")).strip()
            if text:
                timestamp = str(entry.get("timestamp") or message.get("timestamp") or "")
                yield number, timestamp[:16], message["role"], text


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("path", help="session transcript, JSONL")
    parser.add_argument("--grep", action="append", default=[], help="case-insensitive substring; repeat for OR")
    parser.add_argument("--context", type=int, default=1, help="turns shown around each match (default 1)")
    parser.add_argument("--from", dest="first", type=int, default=1, help="first JSONL line to read")
    parser.add_argument("--to", dest="last", type=int, default=0, help="last JSONL line to read")
    parser.add_argument("--user-only", action="store_true", help="show only the user's messages")
    parser.add_argument("--max-chars", type=int, default=3000, help="truncate each turn (default 3000)")
    args = parser.parse_args()

    rows = [
        row
        for row in turns(args.path, args.first, args.last)
        if not args.user_only or row[2] == "user"
    ]
    keep = range(len(rows))
    if args.grep:
        words = [word.lower() for word in args.grep]
        hits = [i for i, row in enumerate(rows) if any(w in row[3].lower() for w in words)]
        keep = sorted({
            j
            for i in hits
            for j in range(max(0, i - args.context), min(len(rows), i + args.context + 1))
        })

    out = sys.stdout
    previous = None
    for i in keep:
        if previous is not None and i != previous + 1:
            out.write("...\n")
        number, timestamp, role, text = rows[i]
        if len(text) > args.max_chars:
            text = text[: args.max_chars] + " [...]"
        out.write(f"[{number} {timestamp} {role}]\n{text}\n\n")
        previous = i


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
