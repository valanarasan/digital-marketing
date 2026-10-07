import type { Lever, LeverId, Problem } from '@/types/content';

/** Looks up a lever by id. Content is static, so a miss is a programming error. */
export function findLever(levers: readonly Lever[], id: LeverId): Lever {
  const lever = levers.find((candidate) => candidate.id === id);
  if (!lever) throw new Error(`Unknown growth lever: ${id}`);
  return lever;
}

/** The lever that answers a given problem, or null when the id is unknown or empty. */
export function leverForProblem(
  problems: readonly Problem[],
  levers: readonly Lever[],
  problemId: string | null,
): Lever | null {
  const problem = problems.find((candidate) => candidate.id === problemId);
  return problem ? findLever(levers, problem.lever) : null;
}
