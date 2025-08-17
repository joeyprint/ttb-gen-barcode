import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useGenerateBarcode } from '@/hooks/useGenerateBarcode';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import BarcodePreview from '@/components/BarcodePreview';
import ChequeBarcodeFormFields from './ChequeBarcodeFormFields';

const ChequeBarcode = () => {
  const navigate = useNavigate();
  const [barcodeValue, setBarcodeBillerValue] = useState('');
  const { generateChequeBarcode, downloadBarcode } = useGenerateBarcode();

  const formContext = useForm({
    mode: 'onTouched',
    defaultValues: { bankCode: '011' },
  });

  const submitForm = (formValues: any) => {
    const { chequeNo, bankCode, branchCode, accountNo } = formValues;

    const barcodeData = generateChequeBarcode(
      chequeNo,
      bankCode,
      branchCode,
      accountNo,
    );
    setBarcodeBillerValue(barcodeData);
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className='p-4'>
      <Button variant={'outline'} onClick={goToHomePage}>
        Back to Home
      </Button>
      <div className='flex justify-center mt-4'>
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
              <Button
                type='submit'
                disabled={!formContext.formState.isValid}
                className={'mt-4'}
              >
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
