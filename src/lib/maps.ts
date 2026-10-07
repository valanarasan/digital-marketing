import type { OfficeLocation } from '@/types/content';

/**
 * Keyless Google Maps embed, dropped on the exact coordinates rather than a
 * geocoded address, so the pin lands on the door.
 */
export function mapEmbedUrl({ latitude, longitude }: OfficeLocation, zoom = 16): string {
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&hl=en&output=embed`;
}
