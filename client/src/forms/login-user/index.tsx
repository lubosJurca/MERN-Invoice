import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from '../../utils/schemas';
import { LoginUserTypes } from '../../utils/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../../api-clients';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<LoginUserTypes>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: apiClient.loginUser,
    onSuccess: async () => {
      toast.success(t('toast.loginUserToast'));
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      form.reset();
      navigate('/invoices');
    },
    onError: async (error) => {
      console.log(error);
      if (error.message === 'Invalid credentials') {
        toast.error(t('toast.loginErrorToast'));
      } else {
        toast.error(error.message);
      }
    },
  });

  function onSubmit(values: LoginUserTypes) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-01 font-semibold'>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='benedict@gmail.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-01 font-semibold'>
                {t('loginUserForm.password')}
              </FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={mutation.isPending}
          className='bg-01 hover:bg-02 text-white flex w-full'
          type='submit'
        >
          {t('loginUserForm.loginBtn')}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
