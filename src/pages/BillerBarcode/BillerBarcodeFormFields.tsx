import FormTextField from '@/components/Bases/Forms/FormTextField';
import { useFormContext } from 'react-hook-form';

const BillerBarcodeFormFields = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='flex-1'>
        <FormTextField
          label={'เลขประจําตัวผู้เสียภาษี'}
          {...register('taxId', {
            required: true,
            pattern: {
              value: /^\d+$/,
              message: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
            },
            minLength: {
              value: 13,
              message: 'กรุณากรอกเลขประจําตัวผู้เสียภาษีให้ครบ',
            },
            maxLength: {
              value: 13,
              message: 'กรุณากรอกเลขประจําตัวผู้เสียภาษี 13 หลัก',
            },
          })}
          placeholder='กรุณากรอกเลขประจําตัวผู้เสียภาษี'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'Ref 1'}
          {...register('ref1', {
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: 'กรุณากรอก Reference 1 ให้ถูกต้อง',
            },
          })}
          placeholder='กรุณากรอกเลขอ้างอิง 1'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'Ref 2'}
          {...register('ref2', {
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: 'กรุณากรอก Reference 2 ให้ถูกต้อง',
            },
          })}
          placeholder='กรุณากรอกเลขอ้างอิง 2'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          type='number'
          label={'Amount'}
          {...register('amount')}
          placeholder='กรุณากรอกจํานวนเงิน'
        />
      </div>
    </div>
  );
};

export default BillerBarcodeFormFields;
