export function newlineToBr(str: string): string {
  return str.replace(/\n/g, '<br>');
}
