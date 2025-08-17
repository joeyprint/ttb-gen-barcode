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
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณากรอกรหัสธนาคารให้ถูกต้อง',
            },
            minLength: {
              value: 3,
              message: 'กรุณาระบุรหัสธนาคาร 3 หลัก',
            },
            maxLength: {
              value: 3,
              message: 'กรุณาระบุรหัสธนาคาร 3 หลัก',
            },
          })}
          placeholder='กรุณากรอกรหัสธนาคาร'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'รหัสสาขา'}
          {...register('branchCode', {
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณากรอกรหัสสาขาให้ถูกต้อง',
            },
            minLength: {
              value: 4,
              message: 'กรุณาระบุรหัสสาขา 4 หลัก',
            },
            maxLength: {
              value: 4,
              message: 'กรุณาระบุรหัสสาขา 4 หลัก',
            },
          })}
          placeholder='กรุณากรอกรหัสสาขา'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'เลขที่บัญชี'}
          {...register('accountNo', {
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: 'กรุณากรอกเลขที่บัญชีให้ถูกต้อง',
            },
            minLength: {
              value: 10,
              message: 'กรุณาระบุเลขที่บัญชี 10 หลัก',
            },
            maxLength: {
              value: 10,
              message: 'กรุณาระบุเลขที่บัญชี 10 หลัก',
            },
          })}
          placeholder='กรุณากรอกเลขที่บัญชี'
        />
      </div>
    </div>
  );
};

export default ChequeBarcodeFormFields;

import FormTextField from '@/components/Bases/Forms/FormTextField';
import { useFormContext } from 'react-hook-form';

const ChequeBarcodeFormFields = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='flex-1'>
        <FormTextField
          label={'รหัสสองตัวแรก'}
          {...register('prefix', {
            pattern: {
              value: /^\d+$/,
              message: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
            },
            maxLength: {
              value: 2,
              message: 'ไม่สามารถกรอกเกิน 2 หลัก',
            },
          })}
          placeholder='รหัสสองตัวแรกเช่น 79 (ไม่บังคับ)'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'หมายเลขเช็ค'}
          {...register('chequeNumber', {
            required: true,
            pattern: {
              value: /^\d+$/,
              message: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
            },
            minLength: {
              value: 8,
              message: 'กรุณากรอกหมายเลขเช็คให้ครบ',
            },
            maxLength: {
              value: 8,
              message: 'ไม่สามารถกรอกเกิน 8 หลัก',
            },
          })}
          placeholder='กรุณากรอกหมายเลขเช็ค'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'รหัสสาขา'}
          {...register('branchCode', {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: 'กรุณากรอกรหัสสาขาให้ถูกต้อง',
            },
            minLength: {
              value: 4,
              message: 'กรุณากรอกรหัสสาขาให้ครบ',
            },
            maxLength: {
              value: 4,
              message: 'ไม่สามารถกรอกเกิน 4 หลัก',
            },
          })}
          placeholder='กรุณากรอกรหัสสาขา'
        />
      </div>
      <div className='flex-1'>
        <FormTextField
          label={'รหัสบัญชี'}
          {...register('accountNumber', {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: 'กรุณากรอกรหัสบัญชีให้ถูกต้อง',
            },
            minLength: {
              value: 10,
              message: 'กรุณากรอกรหัสบัญชีให้ครบ',
            },
            maxLength: {
              value: 10,
              message: 'ไม่สามารถกรอกเกิน 10 หลัก',
            },
          })}
          placeholder='กรุณากรอกรหัสบัญชี'
        />
      </div>
    </div>
  );
};

export default ChequeBarcodeFormFields;
