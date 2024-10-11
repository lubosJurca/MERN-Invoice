import { Card, CardContent } from './ui/card';
import { InvoiceType } from '../utils/types';
import StatusComponent from './StatusComponent';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

type PhoneInvoiceCardProps = {
  data: InvoiceType;
};

const PhoneInvoiceCard = ({ data }: PhoneInvoiceCardProps) => {
  const {
    _id,
    clientName,
    description,
    total,
    status,
    paymentTerms,
    createdAt,
  } = data;

  const calculateDueDate = (paymentTerms: number) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + paymentTerms);
    return format(date, 'PPP');
  };

  const dueDate = calculateDueDate(paymentTerms);

  return (
    <Link to={`/invoices/${_id}`}>
      <Card className='sm:hidden   py-4  border-none hover:scale-105  cursor-pointer transition active:scale-95'>
        <CardContent className='flex flex-col gap-6 h-full justify-between  pb-0'>
          <div className='flex justify-between text-[#858BB2] text-[13px]  font-medium'>
            <h4 className='text-formLabel  font-bold text-sm'>{description}</h4>
            <p>{clientName}</p>
          </div>
          <div className='flex justify-between  items-center  '>
            <div className='flex flex-col gap-2'>
              <p className='text-[#858BB2] text-[13px] font-medium'>
                Due {dueDate}
              </p>
              <p className='font-bold text-h2Text  text-[15px] '>£ {total}</p>
            </div>
            <StatusComponent status={status} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PhoneInvoiceCard;
