import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

import { useEffect } from 'react';
import { useAllInvoicesContext } from '../pages/AllInvoicesPage';
import { useTranslation } from 'react-i18next';

const FilterComponent = () => {
  const { t } = useTranslation();
  const { filter, setSearchParams } = useAllInvoicesContext();

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });
  }, [filter]);

  return (
    <Select
      value={filter}
      onValueChange={(e) =>
        setSearchParams((prev) => {
          prev.set('filter', e);
          return prev;
        })
      }
    >
      <SelectTrigger className='bg-transparent'>
        <SelectValue placeholder='Filter' />
      </SelectTrigger>
      <SelectContent className='z-30'>
        <SelectItem value='all'>{t('filterBtns.all')}</SelectItem>
        <SelectItem value='pending'>{t('filterBtns.pending')}</SelectItem>
        <SelectItem value='paid'>{t('filterBtns.paid')}</SelectItem>
        <SelectItem value='draft'>{t('filterBtns.draft')}</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default FilterComponent;
