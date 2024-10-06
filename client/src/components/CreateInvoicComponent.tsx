import { Plus } from 'lucide-react';
import { Button } from './ui/button';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

import CreateInvoiceForm from '../forms/create-invoice-form';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const CreateInvoiceComponent = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isSmallDevice } = useAppContext();

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className=' dark:text-white rounded-full flex items-center justify-between gap-2 font-bold pl-[6px] pr-[15px] '>
          <div className='bg-white rounded-full w-8 h-8 grid place-content-center '>
            <Plus className=' text-purpleBtnBG w-4' />
          </div>

          <span>
            {isSmallDevice
              ? t('buttons.newInvoiceBtnShort')
              : t('buttons.newInvoiceBtn')}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby='New Invoice form'
        side='left'
        className=' sm:max-w-[616px] bg-formBackground w-full  overflow-y-scroll'
      >
        <SheetHeader className='text-left'>
          <SheetTitle className='font-bold text-2xl mb-5'>
            {t('form.title')}
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>
              New Invoice form to create new invoice
            </VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <CreateInvoiceForm closeForm={closeForm} />
      </SheetContent>
    </Sheet>
  );
};
export default CreateInvoiceComponent;
