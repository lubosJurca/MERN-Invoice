import CreateInvoicComponent from './CreateInvoicComponent';
import FilterComponent from './FilterComponent';
import InvoiceDisplay from './InvoiceDisplay';

const ActionsContainer = () => {
  return (
    <div className='flex justify-between mb-8'>
      <div>
        <h1 className='text-h1Text font-bold text-2xl'>Invoices</h1>
        <InvoiceDisplay />
      </div>
      <div className='flex'>
        <FilterComponent />
        <CreateInvoicComponent />
      </div>
    </div>
  );
};
export default ActionsContainer;
