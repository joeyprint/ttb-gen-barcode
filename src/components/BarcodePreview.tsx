import Barcode from 'react-barcode';

export default function BarcodePreview({ value }: { value: string }) {
  return (
    <div className='flex justify-center items-center min-h-[300px] md:min-h-[500px] w-full bg-white px-4 md:px-6'>
      <Barcode value={value} />
    </div>
  );
}
