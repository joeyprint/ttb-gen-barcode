import Barcode from 'react-barcode';

export default function BarcodePreview({ value }: { value: string }) {
    return <Barcode value={value} />;
}