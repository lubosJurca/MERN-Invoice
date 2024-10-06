import { useInvoiceDetailContext } from '../pages/InvoiceDetailPage';
import { formattedAmount } from '../utils/helpers';

const ItemsDetailCard = () => {
  const { data } = useInvoiceDetailContext();

  return (
    <>
      {data.items.map((item) => (
        <div key={item._id} className='flex justify-between items-center'>
          <div>
            <h4 className='text-h2Text font-bold text-[15px]'>{item.name}</h4>
            <h5 className='text-formLabel text-sm font-bold'>
              {item.quantity} x {formattedAmount.format(item.price)}
            </h5>
          </div>
          <h4 className='font-bold'>
            {formattedAmount.format(item.quantity * item.price)}
          </h4>
        </div>
      ))}
    </>
  );
};
export default ItemsDetailCard;
