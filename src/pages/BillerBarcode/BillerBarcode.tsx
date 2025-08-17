import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useBarcodeBiller } from '../../hooks/useBarcodeBiller';
import BarcodePreview from '../../components/BarcodePreview';
import BillerBarcodeFormFields from './BillerBarcodeFormFields';

const BillerBarcode = () => {
  const { barcodeValue, generateBarcode } = useBarcodeBiller();

  const formContext = useForm({
    mode: 'onTouched',
  });

  const submitForm = (formValues: any) => {
    const { taxId, ref1, ref2, amount } = formValues;
    const taxIdWithSuffix = `${taxId}00`;
    const amountWithoutDecimal =
      amount !== '' ? Number(amount).toFixed(2).replace('.', '') : '';

    const barcodeData = `|${taxIdWithSuffix}\x0d${ref1}\x0d${ref2}\x0d${amountWithoutDecimal}`;
    generateBarcode(barcodeData);
  };

  return (
    <div className='px-4'>
      <FormProvider {...formContext}>
        <form noValidate onSubmit={formContext.handleSubmit(submitForm)}>
          <h1>Barcode Generator</h1>
          <BillerBarcodeFormFields />
          <Button type='submit' className={'mt-4'}>
            Generate Barcode
          </Button>
          {barcodeValue && <BarcodePreview value={barcodeValue} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default BillerBarcode;
