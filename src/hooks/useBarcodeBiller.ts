import { useState } from "react";

export function useBarcodeBiller() {
  const [barcodeValue, setBarcodeBillerValue] = useState("");

  const generateBarcode = (input: string) => {
    if (!input.trim()) return;
    setBarcodeBillerValue(input.trim());
  };

  return { barcodeValue, generateBarcode };
}
