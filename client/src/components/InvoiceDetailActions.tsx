import { useAppContext } from '../context/AppContext';
import { useInvoiceDetailContext } from '../pages/InvoiceDetailPage';
import DeleteBtn from './DeleteBtn';
import EditInvoiceBtn from './EditInvoiceBtn';
import MarkAsPaidBtn from './MarkAsPaidBtn';

const InvoiceDetailActions = () => {
  const { data } = useInvoiceDetailContext();
  const { isSmallDevice } = useAppContext();
  return (
    <div
      className={`${
        isSmallDevice ? 'w-full grid grid-cols-3' : 'flex'
      }  border-none space-x-2 rounded-xl`}
    >
      <EditInvoiceBtn />
      <DeleteBtn />
      {data.status !== 'paid' && (
        <MarkAsPaidBtn isSmallDevice={isSmallDevice} />
      )}
    </div>
  );
};
export default InvoiceDetailActions;
