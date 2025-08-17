export function useBarcodeBiller() {
  const generateBarcode = (
    taxId: string,
    ref1?: string,
    ref2?: string,
    amount?: string,
  ) => {
    const taxIdWithSuffix = `${taxId}00`;
    const amountWithoutDecimal =
      amount !== '' ? Number(amount).toFixed(2).replace('.', '') : '';

    const barcodeData = `|${taxIdWithSuffix}\x0d${ref1}\x0d${ref2}\x0d${amountWithoutDecimal}`;
    return barcodeData;
  };

  return { generateBarcode };
}
