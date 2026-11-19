#!/usr/bin/env bash
# Classifies a pull request from its diff alone: no file of the pull request is run.
#
# Input (environment): BASE and HEAD commits; PRIVATE_TERMS, comma-separated terms
# that must not appear in this public repository.
# Output: exit 1 when the pull request is invalid (reasons on stderr); otherwise
# `delicate=true|false` in $GITHUB_OUTPUT and, when delicate, the reasons as a
# Markdown list in $REASONS_FILE. The terms themselves are never printed.
set -euo pipefail
: "${BASE:?}" "${HEAD:?}"
output=${GITHUB_OUTPUT:-/dev/stdout}
reasons_file=${REASONS_FILE:-reasons.md}
reasons=$(mktemp)
errors=$(mktemp)

reason() { printf -- '- %s\n' "$1" >>"$reasons"; }
error() { printf -- '- %s\n' "$1" >>"$errors"; }

# Frontmatter of a file at a commit: the lines between the opening and closing `---`.
frontmatter() {
  git show "$1:$2" 2>/dev/null | tr -d '\r' |
    awk 'NR == 1 { if ($0 != "---") exit; next } $0 == "---" { exit } { print }'
}

# Captured first, so that a failing `git diff` stops the script under `set -e`.
changes=$(git diff --name-status -M "$BASE...$HEAD")
diff=$(git diff -U0 "$BASE...$HEAD")
summary=$(git diff --summary "$BASE...$HEAD")

while IFS=$'\t' read -r status path renamed; do
  target=${renamed:-$path}

  for p in "$path" ${renamed:+"$renamed"}; do
    case "$p" in
      .github/*) reason "\`$p\`: automation (\`.github/\`)" ;;
    esac
    case "$p" in
      scripts/* | */scripts/* | *.py | *.sh | *.js | *.mjs | *.cjs | *.ts | *.ps1)
        reason "\`$p\`: executable code" ;;
    esac
  done

  case "$target" in
    SKILL.md | */SKILL.md)
      case "$status" in
        A | D | R* | C*) reason "\`$target\`: skill added, removed or renamed" ;;
        M) [ "$(frontmatter "$BASE" "$target")" = "$(frontmatter "$HEAD" "$target")" ] ||
          reason "\`$target\`: frontmatter changed" ;;
      esac
      ;;
  esac

  [ "$status" = D ] && continue
  case "$target" in
    */SKILL.md)
      fm=$(frontmatter "$HEAD" "$target")
      dir=${target%/SKILL.md}
      dir=${dir##*/}
      grep -qx "name: $dir" <<<"$fm" || error "\`$target\`: frontmatter needs \`name: $dir\`"
      grep -q '^description: .' <<<"$fm" || error "\`$target\`: frontmatter needs a description"
      ;;
    *.json)
      git show "$HEAD:$target" | jq empty 2>/dev/null || error "\`$target\`: invalid JSON" ;;
  esac
done <<<"$changes"

if grep 'mode .*100755' >/dev/null <<<"$summary"; then
  reason "a file became executable"
fi

if [ -z "${PRIVATE_TERMS:-}" ]; then
  reason "the private-term check is not configured (secret \`PRIVATE_TERMS\`)"
else
  # One regex for all terms, with word boundaries on word-character edges, so that
  # a short term does not match inside a longer word.
  pattern=$(tr ',' '\n' <<<"$PRIVATE_TERMS" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$' |
    while IFS= read -r term; do
      escaped="\\Q$term\\E"
      [[ $term =~ ^[[:alnum:]_] ]] && escaped="\\b$escaped"
      [[ $term =~ [[:alnum:]_]$ ]] && escaped="$escaped\\b"
      printf '%s|' "$escaped"
    done)
  pattern=${pattern%|}
  # Added lines as "<file>\t<line>"; a match in either part counts.
  awk '/^\+\+\+ / { file = substr($0, 7); next } /^\+/ { print file "\t" substr($0, 2) }' <<<"$diff" |
    { grep -i -P -- "$pattern" || true; } | cut -f1 | sort -u |
    while IFS= read -r file; do reason "\`$file\`: contains a private term"; done
fi

if [ -s "$errors" ]; then
  cat "$errors" >&2
  exit 1
fi
if [ -s "$reasons" ]; then
  sort -u "$reasons" >"$reasons_file"
  echo "delicate=true" >>"$output"
else
  echo "delicate=false" >>"$output"
fi
