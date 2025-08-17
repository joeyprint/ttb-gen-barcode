import Barcode from 'react-barcode';

export default function BarcodePreview({ value }: { value?: string }) {
  if (!value)
    return (
      <div className='flex justify-center items-center min-h-[300px] md:min-h-[500px] w-full bg-neutral-100 px-4 md:px-6'>
        <p>No data to preview barcode</p>
      </div>
    );

  return (
    <div className='flex justify-center items-center min-h-[300px] md:min-h-[500px] w-full bg-neutral-100 px-4 md:px-6'>
      <Barcode
        id='barcode-preview'
        width={2}
        value={value}
        renderer={'canvas'}
        background='white'
        className={'w-full md:w-auto max-w-full'}
      />
    </div>
  );
}
