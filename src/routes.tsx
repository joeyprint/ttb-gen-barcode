import { createBrowserRouter } from 'react-router';
import BillerBarcode from './pages/BillerBarcode';
import ChequeBarcode from './pages/ChequeBarcode';
import Homepage from './pages/Homepage/Homepage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: () => <Homepage />,
  },
  {
    path: '/biller-barcode',
    Component: () => <BillerBarcode />,
  },
  {
    path: '/cheque-barcode',
    Component: () => <ChequeBarcode />,
  },
]);
