"use client";

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import MainTable from './MainTable';
import { ActionAdd, ActionPagination, ActionSearch } from './MainAction';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axiosInstance from '@/lib/axios';

// Inisialisasi Query Client
const queryClient = new QueryClient();

const fetchPenduduk = async () => {
    const response = await axiosInstance.get('/penduduk');
    return response.data;
};

const PageContent = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['penduduk'],
        queryFn: fetchPenduduk,
    });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription className="flex w-full justify-between">
                        <ActionAdd />
                        <ActionSearch />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MainTable data={data} isLoading={isLoading} error={error} />
                </CardContent>
                <CardFooter>
                    <ActionPagination />
                </CardFooter>
            </Card>
        </div>
    );
};

const Page = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PageContent />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default Page;
