export function useBarcodeCheque() {
  const generateBarcode = (
    prefix: string,
    chequeNumber: string,
    branchCode: string,
    accountNumber: string,
    bankCode: string,
    suffix: string,
  ) => {
    const barcodeData = `${prefix}${chequeNumber}${bankCode}${branchCode}${accountNumber}${suffix}`;
    return barcodeData;
  };

  const downloadBarcode = () => {
    const barcode = document.getElementById(
      'barcode-preview',
    ) as HTMLCanvasElement;

    if (barcode) {
      const dataUrl = barcode.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'cheque-barcode.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return { generateBarcode, downloadBarcode };
}
