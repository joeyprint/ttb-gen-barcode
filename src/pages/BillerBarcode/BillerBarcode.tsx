import { useBarcodeBiller } from '../../hooks/useBarcodeBiller';
import BarcodePreview from '../../components/BarcodePreview';
import { Input } from '@/components/ui/input';

const BillerBarcode = () => {
  const { barcodeValue, generateBarcode } = useBarcodeBiller();

  return (
    <div className='barcode-page'>
      <h1>Barcode Generator</h1>
      <Input
        type='text'
        placeholder='Enter text or number'
        onChange={(e) => generateBarcode(e.target.value)}
      />
      {barcodeValue && <BarcodePreview value={barcodeValue} />}
    </div>
  );
};

export default BillerBarcode;
