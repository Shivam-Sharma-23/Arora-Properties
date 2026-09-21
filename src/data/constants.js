export const WHATSAPP_NUMBER = '919667417207';

export function waLink(text) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
}
