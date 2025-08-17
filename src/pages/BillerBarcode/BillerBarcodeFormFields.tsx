import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const BillerBarcodeFormFields = () => {
  const { register } = useFormContext();

  return (
    <div className='flex'>
      <div className='flex-1'>
        <Input
          {...register('taxId', {
            required: true,
            minLength: {
              value: 13,
              message: 'กรุณากรอกเลขประจําตัวผู้เสียภาษีให้ครบ',
            },
            maxLength: {
              value: 13,
              message: 'กรุณากรอกเลขประจําตัวผู้เสียภาษี 13 หลัก',
            },
          })}
          placeholder='Enter tax ID'
          required
        />
      </div>
      <div className='flex-1'>
        <Input {...register('ref1')} placeholder='Enter text or number' />
      </div>
      <div className='flex-1'>
        <Input {...register('ref2')} placeholder='Enter text or number' />
      </div>
      <div className='flex-1'>
        <Input {...register('amount')} placeholder='Enter text or number' />
      </div>
    </div>
  );
};

export default BillerBarcodeFormFields;
