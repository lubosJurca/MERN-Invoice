import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../api-clients';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

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
    <Button className='dark:hover:text-black' onClick={handleClick}>
      {t('buttons.testUser')}
    </Button>
  );
};
export default TestUserBtn;
