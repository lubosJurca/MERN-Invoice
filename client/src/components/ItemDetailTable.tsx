import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { useInvoiceDetailContext } from '../pages/InvoiceDetailPage';
import { formattedAmount } from '../utils/helpers';

const ItemDetailTable = () => {
  const { t } = useTranslation();
  const { data } = useInvoiceDetailContext();

  return (
    <Table>
      <TableCaption>{t('detailPage.itemTable.caption')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=' flex-3 w-3/4'>
            {t('detailPage.itemTable.name')}
          </TableHead>
          <TableHead className='text-right  w-12'>
            {t('detailPage.itemTable.quantity')}
          </TableHead>
          <TableHead className='text-center  w-1/12'>
            {t('detailPage.itemTable.price')}
          </TableHead>
          <TableHead className='text-right  w-1/6'>
            {t('detailPage.itemTable.total')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.items.map((item) => (
          <TableRow key={item._id}>
            <TableCell className='font-bold'>{item.name}</TableCell>
            <TableCell className='text-center text-pText'>
              {item.quantity}
            </TableCell>
            <TableCell className='text-center text-pText'>
              {formattedAmount.format(item.price)}
            </TableCell>
            <TableCell className='text-right font-bold'>
              {formattedAmount.format(item.price * item.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ItemDetailTable;
