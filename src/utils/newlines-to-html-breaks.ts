export function newlinesToHtmlBreaks(str: string): string {
  return str.replace(/\n/g, '<br>');
}
