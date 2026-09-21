export function formatPriceLabel(amount, buyRent) {
  const n = Number(amount) || 0;
  if (buyRent === 'rent') {
    return '₹' + n.toLocaleString('en-IN') + '/mo';
  }
  if (n >= 10000000) {
    const cr = n / 10000000;
    return '₹' + (Number.isInteger(cr) ? cr : cr.toFixed(2)) + ' Cr';
  }
  if (n >= 100000) {
    const l = n / 100000;
    return '₹' + (Number.isInteger(l) ? l : l.toFixed(2)) + ' L';
  }
  return '₹' + n.toLocaleString('en-IN');
}
