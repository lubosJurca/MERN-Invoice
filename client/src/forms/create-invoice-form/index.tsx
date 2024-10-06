// shadncnUI
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { Label } from '../../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Calendar } from '../../components/ui/calendar';

// react
import { useForm } from 'react-hook-form';
import { ChangeEvent, FormEvent, useState } from 'react';

// utils
import { createInvoiceFormSchema } from '../../utils/schemas';
import { cn } from '../../lib/utils';
import { Item } from '../../utils/types';

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// icons
import { CalendarIcon, TrashIcon } from 'lucide-react';

// date
import { format } from 'date-fns';

// toast
import { toast } from 'react-toastify';
// tanstack query
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../../api-clients';
import { SheetClose } from '../../components/ui/sheet';
import { formattedAmount } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

type FormProps = {
  closeForm: () => void;
};

const CreateInvoiceForm = ({ closeForm }: FormProps) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>({
    name: '',
    price: 1,
    quantity: 1,
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createInvoiceFormSchema>>({
    resolver: zodResolver(createInvoiceFormSchema),
    defaultValues: {
      description: '',
      paymentTerms: 1,
      clientName: '',
      clientEmail: '',
      status: 'pending',
      senderAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
      clientAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleAddItem = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems([...items, item]);
    setItem({ name: '', price: 1, quantity: 1 });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // calculate total
  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const mutation = useMutation({
    mutationFn: apiClient.createInvoice,
    onSuccess: async () => {
      toast.success(t('toast.createInvoiceToastSuccess'));
      form.reset();
      setItems([]);
      setItem({ name: '', price: 1, quantity: 1 });
      await queryClient.invalidateQueries({ queryKey: ['invoices'] });
      closeForm();
    },
    onError: async (error) => {
      console.log(error);
      toast.error(t('toast.invoiceErrorToast'));
    },
  });

  const onSubmit = async (data: z.infer<typeof createInvoiceFormSchema>) => {
    const { paymentTerms, createdAt } = data;
    const dueDate = new Date(createdAt);
    dueDate.setDate(dueDate.getDate() + paymentTerms);

    const values = { ...data, items, total, dueDate };
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 font-bold '
      >
        {/* Bill From  */}
        <div>
          <h3 className='text-01 font-bold mb-5'>{t('form.billFrom.title')}</h3>
          <div className='flex flex-col flex-wrap gap-5'>
            <div>
              <FormField
                control={form.control}
                name='senderAddress.street'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-x-2'>
                      <FormLabel className='text-formLabel text-xs'>
                        {t('form.billFrom.streetAddress')}
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-x-6 flex-wrap'>
              <FormField
                control={form.control}
                name='senderAddress.city'
                render={({ field }) => (
                  <FormItem className='min-w-[152px] flex-1'>
                    <div className='flex items-center gap-x-2'>
                      <FormLabel className='text-formLabel text-xs'>
                        {t('form.billFrom.city')}
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='senderAddress.postCode'
                render={({ field }) => (
                  <FormItem className='min-w-[152px] flex-1'>
                    <div className='flex items-center gap-x-2'>
                      <FormLabel className='text-formLabel text-xs'>
                        {t('form.billFrom.postCode')}
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='senderAddress.country'
                render={({ field }) => (
                  <FormItem className='min-w-[152px] flex-1'>
                    <div className='flex items-center gap-x-2'>
                      <FormLabel className='text-formLabel text-xs'>
                        {t('form.billFrom.country')}
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className='flex flex-col gap-5'>
          <h3 className='text-01 font-bold mb-5'>{t('form.billTo.title')}</h3>
          <div className='flex flex-col flex-wrap gap-5'>
            <FormField
              control={form.control}
              name='clientName'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.billTo.name')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='clientEmail'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      Email
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='clientAddress.street'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.billTo.streetAddress')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-2 flex-wrap'>
            <FormField
              control={form.control}
              name='clientAddress.city'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.billTo.city')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='clientAddress.postCode'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.billTo.postCode')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='clientAddress.country'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.billTo.country')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Invoice info */}
        <div className='flex flex-col gap-6'>
          <div className='flex gap-6 flex-wrap justify-between'>
            <FormField
              control={form.control}
              name='createdAt'
              render={({ field }) => (
                <FormItem className='flex flex-col  flex-1'>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.invoiceDate')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>{t('form.pickADate')}</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      Status
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='border'>
                        <SelectValue
                          className=''
                          placeholder={t('form.selectStatus')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=''>
                      <SelectItem value='paid'>{t('status.paid')}</SelectItem>
                      <SelectItem value='pending'>
                        {t('status.pending')}
                      </SelectItem>
                      <SelectItem value='draft'>{t('status.draft')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='paymentTerms'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-2'>
                    <FormLabel className='text-formLabel text-xs'>
                      {t('form.paymentTerms')}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger className='border'>
                        <SelectValue placeholder={t('form.selectTerms')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1'>
                        {t('form.paymentTermsDays.oneDay')}
                      </SelectItem>
                      <SelectItem value='7'>
                        {t('form.paymentTermsDays.sevenDays')}
                      </SelectItem>
                      <SelectItem value='30'>
                        {t('form.paymentTermsDays.thirtyDays')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center gap-x-2'>
                  <FormLabel className='text-formLabel text-xs'>
                    {t('form.description')}
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Add items */}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-wrap gap-2'>
            <div className=' w-full'>
              <Label className='text-formLabel text-xs'>
                {t('form.itemTable.name')}
              </Label>
              <Input
                type='text'
                name='name'
                required={items.length === 0}
                placeholder={t('form.itemTable.placeholder')}
                value={item.name}
                onChange={handleInputChange}
                maxLength={20}
              />
            </div>

            <div className='flex-auto'>
              <Label className='text-formLabel text-xs'>
                {t('form.itemTable.price')}
              </Label>
              <Input
                type='number'
                name='price'
                min={1}
                value={item.price}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex-auto'>
              <Label className='text-formLabel text-xs'>
                {t('form.itemTable.quantity')}
              </Label>
              <Input
                type='number'
                name='quantity'
                min={1}
                value={item.quantity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button
            type='button'
            className='text-formLabel'
            variant={'secondary'}
            onClick={handleAddItem}
          >
            + {t('form.itemTable.addItemBtn')}...
          </Button>
        </div>

        {/* items */}

        <Table className='bg-muted rounded'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px] text-center'>
                {t('form.itemTable.name')}
              </TableHead>
              <TableHead className='text-center'>
                {t('form.itemTable.price')}
              </TableHead>
              <TableHead className='text-center'>
                {t('form.itemTable.quantity')}
              </TableHead>
              <TableHead className='text-center'>
                {t('form.itemTable.total')}
              </TableHead>
              <TableHead className='text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={index}
                className='bg-muted text-center hover:bg-07/5'
              >
                <TableCell className='flex-1 '>{item.name}</TableCell>
                <TableCell>{formattedAmount.format(item.price)} </TableCell>
                <TableCell>{item.quantity}x</TableCell>
                <TableCell>
                  {formattedAmount.format(item.price * item.quantity)}
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant={'outline'}
                    className='h-4 w-4 p-0 bg-transparent border-none'
                    onClick={() => handleRemoveItem(index)}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {items.length > 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center font-semibold underline'
                >
                  <p>
                    {t('form.itemTable.totalPrice')}:{' '}
                    {formattedAmount.format(total)}
                  </p>
                </TableCell>
              </TableRow>
            )}
            {items.length === 0 && (
              <TableRow className='text-center text-06'>
                <TableCell colSpan={5}>
                  {t('form.itemTable.noItemsAdded')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Button
          type='submit'
          disabled={items.length === 0}
          className='rounded-full w-full'
        >
          {items.length === 0
            ? t('form.itemTable.noItems')
            : t('form.itemTable.submitBtn')}
        </Button>

        <SheetClose asChild>
          <Button variant='outline' className='w-full rounded-full'>
            {t('form.itemTable.cancelBtn')}
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
};
export default CreateInvoiceForm;
