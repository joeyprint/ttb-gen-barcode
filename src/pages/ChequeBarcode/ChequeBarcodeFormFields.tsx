import FormTextField from '@/components/Bases/Forms/FormTextField';
import { useFormContext } from 'react-hook-form';

const ChequeBarcodeFormFields = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='flex-1'>
        <FormTextField
          label={'เลขที่เช็ค'}
          {...register('chequeNo', {
            required: true,
            minLength: {
              value: 8,
              message: 'กรุณาระบุเลขที่เช็คให้อย่างน้อย 8 หลัก',
            },
            maxLength: {
              value: 10,
              message: 'กรุณาระบุเลขที่เช็คไม่เกิน 10 หลัก',
            },
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณาระบุเป็นตัวเลขเท่านั้น',
            },
          })}
          placeholder='กรุณากรอกเลขที่เช็ค'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'รหัสธนาคาร'}
          {...register('bankCode', {
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณากรอกรหัสธนาคารให้ถูกต้อง',
            },
            minLength: 3,
            maxLength: 3,
          })}
          placeholder='กรุณากรอกรหัสธนาคาร'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'รหัสสาขา'}
          {...register('branchCode', {
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณากรอกรหัสสาขาให้ถูกต้อง',
            },
            minLength: 4,
            maxLength: 4,
          })}
          placeholder='กรุณากรอกรหัสสาขา'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'เลขที่บัญชี'}
          {...register('accountNo', {
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณากรอกเลขที่บัญชีให้ถูกต้อง',
            },
            minLength: 10,
            maxLength: 10,
          })}
          placeholder='กรุณากรอกเลขที่บัญชี'
        />
      </div>
    </div>
  );
};

export default ChequeBarcodeFormFields;
