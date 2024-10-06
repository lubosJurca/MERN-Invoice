import { useState } from 'react';
import { Button } from './ui/button';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import EditInvoiceForm from '../forms/edit-invoice-form';
import { useTranslation } from 'react-i18next';

const EditInvoiceBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='secondary'
          className='rounded-full p-6 font-bold text-formLabel hover:bg-muted-foreground hover:text-white'
        >
          {t('detailPage.buttons.edit')}
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby='New Invoice form'
        side='left'
        className=' sm:max-w-[616px] w-full  overflow-y-scroll'
      >
        <SheetHeader className='text-left'>
          <SheetTitle className='font-bold text-2xl mb-5'>
            {t('form.editInvoiceTitle')}
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Edit Invoice Form</VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <EditInvoiceForm closeForm={closeForm} />
      </SheetContent>
    </Sheet>
  );
};
export default EditInvoiceBtn;
