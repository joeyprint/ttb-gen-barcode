import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import BarcodePreview from '@/components/BarcodePreview';
import ChequeBarcodeFormFields from './ChequeBarcodeFormFields';
import { useBarcodeCheque } from '@/hooks/useBarcodeCheque';

const ChequeBarcode = () => {
  const [barcodeValue, setBarcodeChequeValue] = useState('');
  const { generateBarcode, downloadBarcode } = useBarcodeCheque();

  const formContext = useForm({
    mode: 'onTouched',
    defaultValues: {
      prefix: '00',
      bankCode: '011',
      suffix: '01',
    }
  });

  const submitForm = (formValues: any) => {
    const { prefix, chequeNumber, branchCode, accountNumber, bankCode, suffix } = formValues;
    const barcodeData = generateBarcode(prefix, chequeNumber, branchCode, accountNumber, bankCode, suffix);
    if (barcodeData.length < 28) {
      alert('ข้อมูลไม่ครบถ้วน Cheque Barcode ต้องมีความยาวอย่างน้อย 28 ตัวอักษร');
      return;
    }
    setBarcodeChequeValue(barcodeData);
  };

  return (
    <div className='px-4'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-semibold'>Generator Cheque Barcode</h1>
      </div>
      <FormProvider {...formContext}>
        <form
          noValidate
          onSubmit={formContext.handleSubmit(submitForm)}
          className='mt-4'
        >
          <BarcodePreview value={barcodeValue} />
          <div className={'flex flex-col md:items-center mt-4'}>
            <ChequeBarcodeFormFields />
            <div className='flex gap-4'>
              <Button type='submit' className={'mt-4'}>
                Generate Barcode
              </Button>
              <Button
                type='button'
                variant={'outline'}
                disabled={barcodeValue === ''}
                className={'mt-4'}
                onClick={downloadBarcode}
              >
                Download Barcode
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChequeBarcode;
