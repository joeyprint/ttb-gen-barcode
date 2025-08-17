import { useBarcodeBiller } from '../../hooks/useBarcodeBiller';
import BarcodePreview from '../../components/BarcodePreview';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import BillerBarcodeFormFields from './BillerBarcodeFormFields';

const BillerBarcode = () => {
  const { barcodeValue, generateBarcode } = useBarcodeBiller();

  const formContext = useForm({
    mode: 'onTouched',
  });

  const submitForm = (formValues: any) => {
    console.log('formValues', formValues);
  };

  return (
    <FormProvider {...formContext}>
      <form noValidate onSubmit={formContext.handleSubmit(submitForm)}>
        <div className='barcode-page'>
          <h1>Barcode Generator</h1>
          <BillerBarcodeFormFields />
          <Input
            type='text'
            placeholder='Enter text or number'
            onChange={(e) => generateBarcode(e.target.value)}
          />
          {barcodeValue && <BarcodePreview value={barcodeValue} />}
        </div>
      </form>
    </FormProvider>
  );
};

export default BillerBarcode;
