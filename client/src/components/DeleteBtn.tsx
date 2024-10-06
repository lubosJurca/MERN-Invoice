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
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this invoice? This action cannot be
            undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className='rounded-full dark:text-white bg-deleteBtnBG '
              onClick={() => mutation.mutate(id as string)}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteBtn;
