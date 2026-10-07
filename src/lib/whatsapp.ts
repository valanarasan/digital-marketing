/**
 * Builds a wa.me link. The number is reduced to digits (wa.me rejects "+", spaces
 * and dashes) and an optional opening message is URL-encoded.
 */
export function whatsappLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
