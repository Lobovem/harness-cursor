# harness-cursor

Git = **single source of truth** for Cursor Agent foundation (Win + Mac).

`~/.cursor` machine-local junk stays local (`projects/`, `plugins/`, `skills-cursor/`, …).  
Foundation slots are **linked** into `~/.cursor` from this repo.

## Layout

| Repo path                  | Linked as                             |
| -------------------------- | ------------------------------------- |
| `agents/`                  | `~/.cursor/agents`                    |
| `skills/`                  | `~/.cursor/skills`                    |
| `commands/`                | `~/.cursor/commands`                  |
| `hooks/`                   | `~/.cursor/hooks`                     |
| `policies/`                | `~/.cursor/policies`                  |
| `rules/`                   | `~/.cursor/rules`                     |
| `home/`                    | `~/.cursor/home` (+ root files below) |
| `home/hooks.json`          | `~/.cursor/hooks.json`                |
| `home/permissions.json`    | `~/.cursor/permissions.json`          |
| `home/mcp.json`            | `~/.cursor/mcp.json`                  |
| `home/AGENTS.md`           | `~/.cursor/AGENTS.md`                 |
| `home/USER-RULES-PASTE.md` | `~/.cursor/USER-RULES-PASTE.md`       |

`AGENTS.md` / `USER-RULES-PASTE.md` also hardlinked at repo root for convenience.

## Windows (this machine)

**Dirs — already junctioned** to `D:\Work\harness-cursor\…`.

**Root files** (`hooks.json`, `permissions.json`, `mcp.json`, …): Windows needs **Developer Mode** (or Admin) for file symlinks across `C:` → `D:`. Until then they may be plain copies.

Enable once: **Settings → System → For developers → Developer Mode = On**, reload Cursor Agent chat, ask to finish file symlinks.

Manual dir junctions (if redoing):

```bat
mklink /J "%USERPROFILE%\.cursor\agents" "D:\Work\harness-cursor\agents"
mklink /J "%USERPROFILE%\.cursor\skills" "D:\Work\harness-cursor\skills"
mklink /J "%USERPROFILE%\.cursor\commands" "D:\Work\harness-cursor\commands"
mklink /J "%USERPROFILE%\.cursor\hooks" "D:\Work\harness-cursor\hooks"
mklink /J "%USERPROFILE%\.cursor\policies" "D:\Work\harness-cursor\policies"
mklink /J "%USERPROFILE%\.cursor\rules" "D:\Work\harness-cursor\rules"
mklink /J "%USERPROFILE%\.cursor\home" "D:\Work\harness-cursor\home"
```

File symlinks (after Developer Mode):

```bat
mklink "%USERPROFILE%\.cursor\hooks.json" "D:\Work\harness-cursor\home\hooks.json"
mklink "%USERPROFILE%\.cursor\permissions.json" "D:\Work\harness-cursor\home\permissions.json"
mklink "%USERPROFILE%\.cursor\mcp.json" "D:\Work\harness-cursor\home\mcp.json"
mklink "%USERPROFILE%\.cursor\AGENTS.md" "D:\Work\harness-cursor\home\AGENTS.md"
mklink "%USERPROFILE%\.cursor\USER-RULES-PASTE.md" "D:\Work\harness-cursor\home\USER-RULES-PASTE.md"
```

Remove the real folder/file first if it already exists (not a link).

## Mac

Clone this repo, then:

```bash
REPO="$HOME/Work/harness-cursor"   # your clone path
C="$HOME/.cursor"

for d in agents skills commands hooks policies rules home; do
  rm -rf "$C/$d"
  ln -s "$REPO/$d" "$C/$d"
done

for f in hooks.json permissions.json mcp.json AGENTS.md USER-RULES-PASTE.md; do
  rm -f "$C/$f"
  ln -s "$REPO/home/$f" "$C/$f"
done
```

## Sync model

1. Edit in the git repo (or via the links — same bytes for junctioned dirs).
2. `git commit` / `git push` on Win.
3. `git pull` on Mac (links already point at the clone).

User Rules still need a one-time paste from `USER-RULES-PASTE.md` into **Customize → Rules → User Rules**.

## Docs

- [Subagents](https://cursor.com/docs/context/subagents)
- [Skills](https://cursor.com/docs/context/skills)
- [Rules](https://cursor.com/docs/context/rules)
- [Hooks](https://cursor.com/docs/agent/hooks)
