import { ColumnDef } from '@tanstack/react-table';
import { InvoiceType } from '../../utils/types';
import { Link } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';
import StatusComponent from '../StatusComponent';
import {
  AmountComponent,
  DueDateComponent,
  formattedAmount,
  HeaderComponent,
  NameComponent,
} from '../../utils/helpers';

export const columns: ColumnDef<InvoiceType>[] = [
  {
    accessorKey: 'createdAt',
    header: HeaderComponent,
    cell: ({ row }) => {
      return (
        <span className='text-formLabel'>
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: DueDateComponent,
    cell: ({ row }) => {
      return (
        <span className='text-formLabel'>
          {new Date(row.original.dueDate).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: NameComponent,
    cell: ({ row }) => {
      return (
        <span className='font-bold text-formLabel '>
          {row.original.description}
        </span>
      );
    },
  },
  {
    accessorKey: 'total',
    header: AmountComponent,
    cell: ({ row }) => {
      return (
        <span className='font-bold'>
          {formattedAmount.format(row.original.total)}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <p className='text-center'>Status</p>,
    cell: ({ row }) => {
      return <StatusComponent status={row.original.status} />;
    },
  },
  {
    accessorKey: '_id',
    header: () => <p className='text-center'>Detail</p>,
    cell: ({ row }) => {
      return (
        <Link
          to={`/invoices/${row.original._id}`}
          className='flex justify-center'
        >
          <ChevronsRight />
        </Link>
      );
    },
  },
];
