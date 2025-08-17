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

  const generateChequeBarcode = (
    chequeNo: string,
    bankCode: string,
    branchCode: string,
    accountNo: string,
  ) => {
    const chequeNoWithPrefix = `00${chequeNo}`;
    const accountNoWithSuffix = `${accountNo}01`;
    const barcodeData = `${chequeNoWithPrefix}${bankCode}${branchCode}${accountNoWithSuffix}`;
    return barcodeData;
  };

  const downloadBarcode = (barcodeValue: string, type: BarcodeType) => {
    const barcode = document.getElementById(
      'barcode-preview',
    ) as HTMLCanvasElement;

    if (barcode) {
      const dataUrl = barcode.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${type}-${barcodeValue.replaceAll('\x0d', '')}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return { generateBillerBarcode, generateChequeBarcode, downloadBarcode };
}

export type BarcodeType = 'BILLER' | 'CHEQUE';
