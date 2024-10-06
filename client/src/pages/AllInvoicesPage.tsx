// Components
import ActionsContainer from '../components/ActionsContainer';
import Loading from '../components/Loading';
import { DataTable } from '../components/invoices-table/data-table';
import { columns } from '../components/invoices-table/columns';
import SmallDeviceTable from '../components/SmallDeviceTable';
import NoInvoiceComponent from '../components/NoInvoiceContainer';
import Pagination from '../components/Pagination';

import * as apiClient from '../api-clients';
import { InvoiceType } from '../utils/types';
import { createContext, useContext } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

type AllInvoicesContextType = {
  data: InvoiceType[];
  filter: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalInvoices: number;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

const AllInvoicesContext = createContext<AllInvoicesContextType | undefined>(
  undefined
);

const AllInvoices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const currentPage = Number(searchParams.get('page'));
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invoices', filter, currentPage],
    queryFn: () => apiClient.getInvoicesByUser(filter, currentPage),
    placeholderData: keepPreviousData,
  });
  const { isSmallDevice } = useAppContext();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p>
        There was an error while getting the data, please try againg later...
      </p>
    );
  }

  return (
    <AllInvoicesContext.Provider
      value={{
        data: data?.data || [],
        filter,
        currentPage,
        totalPages: data?.totalPages || 0,
        hasNextPage: data?.hasNextPage || false,
        hasPreviousPage: data?.hasPreviousPage || false,
        totalInvoices: data?.totalInvoices || 0,
        setSearchParams,
      }}
    >
      <motion.div
        key={data?._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ActionsContainer />
        {data && data.data.length === 0 ? (
          <NoInvoiceComponent />
        ) : isSmallDevice ? (
          <SmallDeviceTable />
        ) : (
          <DataTable data={data.data} columns={columns} />
        )}

        {data.totalPages > 1 && <Pagination />}
      </motion.div>
    </AllInvoicesContext.Provider>
  );
};

export const useAllInvoicesContext = () => {
  const context = useContext(AllInvoicesContext);
  return context as AllInvoicesContextType;
};

export default AllInvoices;
