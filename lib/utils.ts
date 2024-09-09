export function formatAmount(x: number | undefined): string {
  // make sure the decimals are indicated with a coma
  if (!x) return '0,00';
  const [integer, decimal] = x.toString().split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimal ? `${formattedInteger},${decimal}` : `${formattedInteger},00`;
}
