import { useEffect } from 'react';
import { useAllInvoicesContext } from '../pages/AllInvoicesPage';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const FilterComponent = () => {
  const { t } = useTranslation();
  const { filter, setSearchParams } = useAllInvoicesContext();

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });
  }, [filter]);

  const filterBtnText = (filter: string) => {
    switch (filter) {
      case 'all':
        return t('filterBtns.all');

      case 'paid':
        return t('filterBtns.paid');

      case 'pending':
        return t('filterBtns.pending');

      case 'draft':
        return t('filterBtns.draft');

      default:
        return t('filterBtns.all');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='bg-transparent dark:text-white dark:hover:text-black  text-black font-bold hover:text-white  '>
          {' '}
          <ChevronDown className='h-5 w-5 mr-3 text-purpleBtnBG' />
          <span>{filterBtnText(filter)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>{t('status.text')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={(e) =>
            setSearchParams((prev) => {
              prev.set('filter', e);
              return prev;
            })
          }
        >
          <DropdownMenuRadioItem value='all'>
            {t('filterBtns.all')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='pending'>
            {t('filterBtns.pending')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='paid'>
            {t('filterBtns.paid')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='draft'>
            {t('filterBtns.draft')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default FilterComponent;
