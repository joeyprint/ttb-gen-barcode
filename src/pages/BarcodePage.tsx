import { useBarcodeBiller } from '../hooks/useBarcodeBiller';
import BarcodePreview from '../components/BarcodePreview';

export default function BarcodePage() {
    const { barcodeValue, generateBarcode } = useBarcodeBiller();

    return (
        <div className="barcode-page">
            <h1>Barcode Generator</h1>
            <input
                type="text"
                placeholder="Enter text or number"
                onChange={(e) => generateBarcode(e.target.value)}
            />
            {barcodeValue && <BarcodePreview value={barcodeValue} />}
        </div>
    );
}