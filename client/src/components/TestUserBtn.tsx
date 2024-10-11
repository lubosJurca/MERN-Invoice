import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../api-clients';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

import SyncLoader from 'react-spinners/SyncLoader';

const TestUserBtn = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.loginUser,
    onSuccess: async () => {
      toast.success(t('toast.testUserToast'));
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      navigate('/invoices');
    },
    onError: async (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate({ email: 'test@test.com', password: 'secret123' });
  };

  return (
    <Button
      className='dark:hover:text-black disabled:bg-purpleBtnBG disabled:text-white  min-w-60 sm:min-w-40'
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        <SyncLoader size={3} color='#ffffff' />
      ) : (
        t('buttons.testUser')
      )}
      {/* {t('buttons.testUser')} */}
    </Button>
  );
};
export default TestUserBtn;
