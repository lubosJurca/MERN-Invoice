import { zodResolver } from '@hookform/resolvers/zod';
import * as apiClient from '../../api-clients';
import { useForm } from 'react-hook-form';
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
import { RegisterFormTypes } from '../../utils/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerUserFormSchema } from '../../utils/schemas';
import { useTranslation } from 'react-i18next';
import SyncLoader from 'react-spinners/SyncLoader';

const RegisterUserForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<RegisterFormTypes>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: apiClient.registerUser,
    onSuccess: async () => {
      toast.success(t('toast.registerUserToast'));
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      form.reset();
      navigate('/invoices');
    },
    onError: async (error) => {
      console.log(error);
      if (error.message === 'User already exists!') {
        toast.error(t('toast.userAlreadyExistsToast'));
      } else {
        toast.error(error.message);
      }
    },
  });

  function onSubmit(values: RegisterFormTypes) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-01 font-semibold'>
                {t('registerUserForm.username')}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-01 font-semibold'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='benedict@example.com'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email?.message &&
                  t('validation.email_required')}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-01 font-semibold'>
                {t('registerUserForm.password')}
              </FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-01 font-semibold'>
                {t('registerUserForm.confirmPassword')}
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
          {mutation.isPending ? (
            <SyncLoader size={3} color='#ffffff' />
          ) : (
            t('registerUserForm.registerBtn')
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterUserForm;
