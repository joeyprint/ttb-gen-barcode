import FormSelection from '@/components/Bases/Forms/FormSelection';
import FormTextField from '@/components/Bases/Forms/FormTextField';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export enum BillCategory {
  Biller = 'biller',
  CreditCard = 'creditCard',
}

const billerOptions = [
  { label: 'Biller', value: BillCategory.Biller },
  { label: 'Credit Card Biller', value: BillCategory.CreditCard },
];

const ttbTaxId = import.meta.env.VITE_TTB_TAX_ID;

const BillerBarcodeFormFields = () => {
  const { getValues, setValue, watch, clearErrors } = useFormContext();

  const billCategory = watch('billCategory');

  const handleSelectBill = () => {
    const selectedbill = getValues('billCategory');
    const bill = selectedbill?.value ?? '';
    if (bill === 'biller') {
      setValue('taxId', '');
      setValue('suffixTaxId', '00');
    } else if (bill === 'creditCard') {
      setValue('taxId', ttbTaxId, { shouldDirty: true, shouldValidate: true });
      setValue('suffixTaxId', '02', { shouldDirty: true });
    }
  };

  const getRef1InputLabel = (billCategory: BillCategory) => {
    switch (billCategory) {
      case BillCategory.CreditCard:
        return {
          label: 'หมายเลขบัตรเครดิต',
          placeholder: 'กรุณากรอกหมายเลขบัตรเครดิต',
        };
      case BillCategory.Biller:
      default:
        return { label: 'Ref 1', placeholder: 'กรุณากรอกเลขอ้างอิง 1' };
    }
  };

  useEffect(() => {
    if (billCategory) {
      clearErrors();
      handleSelectBill();
    }
  }, [billCategory]);

  const ref1InputLabel = getRef1InputLabel(
    billCategory?.value ?? BillCategory.Biller,
  );

  return (
    <div className='flex flex-col flex-wrap md:flex-row gap-4 w-full'>
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormSelection
          name={'billCategory'}
          label={'ประเภทของบิล'}
          options={billerOptions}
          placeholder={'กรุณาเลือกประเภทของบิล'}
          defaultValue={billerOptions[0]}
        />
      </div>
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormTextField
          name={'taxId'}
          label={'เลขประจําตัวผู้เสียภาษี'}
          placeholder='กรุณากรอกเลขประจําตัวผู้เสียภาษี'
          disabled={billCategory?.value === 'creditCard'}
        />
      </div>
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormTextField
          name={'suffixTaxId'}
          required
          label={'suffix เลขประจําตัวผู้เสียภาษี'}
          placeholder='กรุณากรอก suffix เลขประจําตัวผู้เสียภาษี'
          disabled={billCategory?.value === 'creditCard'}
        />
      </div>
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormTextField
          name={'ref1'}
          label={ref1InputLabel.label}
          placeholder={ref1InputLabel.placeholder}
        />
      </div>
      {billCategory?.value === 'biller' && (
        <div className='flex-1 shrink-0 md:basis-[200px]'>
          <FormTextField
            name={'ref2'}
            label={'Ref 2'}
            placeholder='กรุณากรอกเลขอ้างอิง 2'
          />
        </div>
      )}
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormTextField
          name={'amount'}
          type='number'
          label={'Amount'}
          placeholder='กรุณากรอกจํานวนเงิน'
        />
      </div>
    </div>
  );
};

export default BillerBarcodeFormFields;
