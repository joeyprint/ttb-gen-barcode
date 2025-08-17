import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className='px-4 w-screen h-screen flex flex-col justify-center items-center gap-4 text-center'>
      <h1 className='text-2xl font-semibold'>
        Welcome to Generate Barcode Service
      </h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigate('/biller-barcode')}>
          Biller Barcode
        </Button>
        <Button onClick={() => navigate('/cheque-barcode')}>
          Cheque Barcode
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
