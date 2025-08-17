import { createBrowserRouter } from 'react-router';
import BillerBarcode from './pages/BillerBarcode';
import ChequeBarcode from './pages/ChequeBarcode';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: () => <BillerBarcode />,
  },
  {
    path: '/cheque-barcode',
    Component: () => <ChequeBarcode />,
  },
]);
