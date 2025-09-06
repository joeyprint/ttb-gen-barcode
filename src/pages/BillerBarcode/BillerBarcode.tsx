import { billerBarcodeSchema } from './Validation/BillerBarcode.validation';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useGenerateBarcode } from '@/hooks/useGenerateBarcode';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import BarcodePreview from '@/components/BarcodePreview';
import BillerBarcodeFormFields, {
  BillCategory,
} from './BillerBarcodeFormFields';

type BillerBarcodeFormValues = {
  billCategory: { label: string; value: BillCategory };
  taxId: string;
  suffixTaxId: string;
  ref1?: string;
  ref2?: string;
  amount?: string;
};

const defaultBillBarcodeValue = {
  billCategory: { label: 'Biller', value: BillCategory.Biller },
  taxId: '',
  suffixTaxId: '00',
  ref1: '',
  ref2: '',
  amount: '',
};

const BillerBarcode = () => {
  const navigate = useNavigate();
  const [barcodeValue, setBarcodeBillerValue] = useState('');
  const { generateBillerBarcode, downloadBarcode } = useGenerateBarcode();

  const formContext = useForm<BillerBarcodeFormValues>({
    mode: 'onTouched',
    defaultValues: defaultBillBarcodeValue,
    resolver: zodResolver(billerBarcodeSchema),
  });

  const submitForm = (formValues: any) => {
    const { taxId, suffixTaxId, ref1, ref2, amount } = formValues;
    const barcodeData = generateBillerBarcode(
      taxId,
      suffixTaxId,
      ref1,
      ref2,
      amount,
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
        <h1 className='text-2xl font-semibold'>Generator Biller Barcode</h1>
      </div>
      <FormProvider {...formContext}>
        <form
          noValidate
          onSubmit={formContext.handleSubmit(submitForm)}
          className='mt-4'
        >
          <BarcodePreview value={barcodeValue} />
          <div className={'flex flex-col md:items-center mt-4'}>
            <BillerBarcodeFormFields />
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

export default BillerBarcode;
