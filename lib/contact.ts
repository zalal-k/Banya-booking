export const CONTACT_PHONE = "+996703161586";
export const CONTACT_PHONE_DISPLAY = "+996 703 161 586";
export const MBANK_NAME = "РАХАТ Ж.";
export const MBANK_NUMBER = "703 161 586";
export const MBANK_QR_SRC = "/images/mbank-qr.png";
export const WHATSAPP_LINK = "https://wa.me/996703161586";

export function telHref() {
  return `tel:${CONTACT_PHONE}`;
}

export function whatsappHref(message?: string) {
  if (!message) return WHATSAPP_LINK;
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}
