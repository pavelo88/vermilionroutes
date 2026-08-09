export type LocalizedString = any;

export function getLocalizedText(text: LocalizedString | undefined | null, locale: string): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  
  // Try to find the exact locale (e.g. 'es')
  if (text[locale]) return text[locale];
  
  // Fallbacks
  if (text['en']) return text['en'];
  
  // First available key if no English
  const keys = Object.keys(text);
  if (keys.length > 0) return text[keys[0]];
  
  return '';
}
