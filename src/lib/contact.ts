export const CONTACT_EMAIL = "contact@360cloudtech.com";
export const CONTACT_PHONE = "+91 96433 20521";
export const CONTACT_PHONE_TEL = "tel:+919643320521";
const WHATSAPP_NUMBER = "919643320521";

/** wa.me link that opens a chat with our number and `text` prefilled. */
export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const CONTACT_WHATSAPP_URL =
  "https://wa.me/919643320521?text=Hi%20360GrowthCloudTech%2C%20I%27d%20like%20to%20discuss%20a%20project.";
