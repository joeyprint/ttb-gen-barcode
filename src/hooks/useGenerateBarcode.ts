export function useGenerateBarcode() {
  const generateBillerBarcode = (
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

  const downloadBarcode = () => {
    const barcode = document.getElementById(
      'barcode-preview',
    ) as HTMLCanvasElement;

    if (barcode) {
      const dataUrl = barcode.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'biller-barcode.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return { generateBillerBarcode, downloadBarcode };
}
