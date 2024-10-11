import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import * as apiClient from '../api-clients';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useInvoiceDetailContext } from '../pages/InvoiceDetailPage';
import { useTranslation } from 'react-i18next';

const DeleteBtn = () => {
  const { t } = useTranslation();
  const {
    data: { _id: id },
  } = useInvoiceDetailContext();
  const query = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.deleteInvoice,
    onSuccess: async () => {
      toast.success(t('toast.deleteInvoiceToast'));
      await query.invalidateQueries({ queryKey: ['invoices'] });
      navigate('/invoices');
    },
    onError: () => {
      toast.error(t('toast.invoiceErrorToast'));
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          className='rounded-full flex-1 font-bold p-6 hover:bg-muted-foreground hover:text-white'
        >
          {t('detailPage.buttons.delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteModal.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('deleteModal.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('deleteModal.cancel')}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className='rounded-full dark:text-white bg-deleteBtnBG '
              onClick={() => mutation.mutate(id as string)}
            >
              {t('deleteModal.delete')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteBtn;
