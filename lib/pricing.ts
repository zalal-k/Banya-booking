export const ADULT_SOM_PER_HOUR = 150;
export const KID_SOM_PER_HOUR = 80;
export const SOLO_SOM_PER_HOUR = 200;

export function bookingTotalSom(adults: number, kids: number) {
  const adultCount = Math.max(0, Math.round(adults));
  const kidCount = Math.max(0, Math.round(kids));
  const guests = adultCount + kidCount;
  if (guests < 1) return 0;
  if (guests === 1 && adultCount === 1) {
    return SOLO_SOM_PER_HOUR;
  }
  return adultCount * ADULT_SOM_PER_HOUR + kidCount * KID_SOM_PER_HOUR;
}

export function formatSom(amount: number) {
  return `${amount} сом`;
}
