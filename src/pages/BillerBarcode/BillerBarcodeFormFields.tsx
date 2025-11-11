import FormSelection from '@/components/Bases/Forms/FormSelection';
import FormTextField from '@/components/Bases/Forms/FormTextField';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { type BillerBarcodeFormValues } from './BillerBarcode';

export enum BillCategory {
  Biller = 'biller',
  CreditCard = 'creditCard',
  AutoLoan = 'autoLoan',
  FleetCard = 'fleetCard',
  HomeLoan = 'homeLoan'
}

const billerOptions = [
  { label: 'Biller', value: BillCategory.Biller },
  { label: 'Credit Card Biller', value: BillCategory.CreditCard },
  { label: 'Auto Loan Biller', value: BillCategory.AutoLoan },
  { label: 'Fleet Card Biller', value: BillCategory.FleetCard },
  { label: 'Home Loan Biller', value: BillCategory.HomeLoan },
];

const ttbTaxId = import.meta.env.VITE_TTB_TAX_ID;

const BillerBarcodeFormFields = () => {
  const { getValues, setValue, watch } =
    useFormContext<BillerBarcodeFormValues>();

  const billCategory = watch('billCategory');

  const handleSelectBill = () => {
    const selectedbill = getValues('billCategory');
    const bill = selectedbill?.value ?? '';
    if (bill === BillCategory.Biller) {
      setValue('taxId', '', { shouldDirty: true });
      setValue('suffixTaxId', '00');
      setValue('ref1', '');
      setValue('ref2', '');
      setValue('amount', '');
    } else if (bill === BillCategory.CreditCard) {
      setValue('taxId', ttbTaxId, { shouldDirty: true });
      setValue('suffixTaxId', '02');
      setValue('ref1', '');
      setValue('ref2', '');
      setValue('amount', '');
    } else if (bill === BillCategory.AutoLoan) {
      setValue('taxId', ttbTaxId, { shouldDirty: true });
      setValue('suffixTaxId', '00');
      setValue('ref1', '');
      setValue('ref2', '');
      setValue('amount', '');
    } else if (bill === BillCategory.FleetCard) {
      setValue('taxId', '0107537000017', { shouldDirty: true });
      setValue('suffixTaxId', '05');
      setValue('ref1', '');
      setValue('ref2', '695004');
      setValue('amount', '');
    }
    else if (bill === BillCategory.HomeLoan) {
      setValue('taxId', '0107537000017', { shouldDirty: true });
      setValue('suffixTaxId', '03');
      setValue('ref1', '');
      setValue('ref2', '');
      setValue('amount', '');
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
      handleSelectBill();
    }
  }, [billCategory]);

  const ref1InputLabel = getRef1InputLabel(
    billCategory?.value ?? BillCategory.Biller,
  );

  const isShowRef2 = useMemo(() => {
    return billCategory?.value !== BillCategory.CreditCard;
  }, [billCategory]);

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
          disabled={billCategory?.value !== BillCategory.Biller &&
            billCategory?.value !== BillCategory.FleetCard &&
            billCategory?.value !== BillCategory.HomeLoan}
          required
        />
      </div>
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormTextField
          name={'suffixTaxId'}
          label={'suffix เลขประจําตัวผู้เสียภาษี'}
          placeholder='กรุณากรอก suffix เลขประจําตัวผู้เสียภาษี'
          disabled={billCategory?.value !== BillCategory.Biller &&
            billCategory?.value !== BillCategory.FleetCard &&
            billCategory?.value !== BillCategory.HomeLoan}
          required
        />
      </div>
      <div className='flex-1 shrink-0 md:basis-[200px]'>
        <FormTextField
          name={'ref1'}
          label={ref1InputLabel.label}
          placeholder={ref1InputLabel.placeholder}
        />
      </div>
      {isShowRef2 && (
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
