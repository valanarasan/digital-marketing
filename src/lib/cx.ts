/** Minimal class joiner. Falsy values are dropped so callers can inline conditions. */
export type ClassValue = string | number | false | null | undefined;

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
