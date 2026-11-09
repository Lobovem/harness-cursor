// Mirrors verbatica .gemini/policies/agent-rules.toml (global user scope).
// stdin: { "command": "..." } -> stdout: { "permission": "allow"|"ask", ... }

import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = typeof input.command === 'string' ? input.command.trim() : '';

const ask = [
  {
    re: /glab\s+mr\s+(create|merge|approve|note)\b/i,
    user_message:
      'Команда меняет GitLab (glab mr create/merge/approve/note). Подтверди выполнение.',
    agent_message: 'Hook: mutating glab — needs user approval (global policy).',
  },
  {
    re: /\bgit\s+(add|commit|push)\b/i,
    user_message:
      'Команда меняет git (add/commit/push). Подтверди выполнение.',
    agent_message: 'Hook: mutating git — needs user approval (global policy).',
  },
];

for (const rule of ask) {
  if (rule.re.test(command)) {
    process.stdout.write(
      JSON.stringify({
        permission: 'ask',
        user_message: rule.user_message,
        agent_message: rule.agent_message,
      }),
    );
    process.exit(0);
  }
}

process.stdout.write(JSON.stringify({ permission: 'allow' }));
process.exit(0);
