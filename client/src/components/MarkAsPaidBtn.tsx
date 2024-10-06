import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import * as apiClient from '../api-clients';
import { toast } from 'react-toastify';
import { useInvoiceDetailContext } from '../pages/InvoiceDetailPage';
import { useTranslation } from 'react-i18next';

const MarkAsPaidBtn = ({ isSmallDevice }: { isSmallDevice: boolean }) => {
  const { t } = useTranslation();
  const {
    data: { _id: id },
  } = useInvoiceDetailContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiClient.markAsPaid,
    onSuccess: async () => {
      toast.success(t('toast.markAsPaidToast'));
      await queryClient.invalidateQueries({ queryKey: ['invoices'] });
      await queryClient.refetchQueries({
        queryKey: ['invoice', id],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(t('toast.invoiceErrorToast'));
    },
  });
  return (
    <Button
      className='rounded-full bg-purpleBtnBG font-bold flex-1 p-6 hover:bg-muted-foreground hover:text-white '
      onClick={() => mutation.mutate(id as string)}
    >
      {isSmallDevice
        ? t('detailPage.buttons.markAsPaidShort')
        : t('detailPage.buttons.markAsPaid')}
    </Button>
  );
};
export default MarkAsPaidBtn;
