"use client"

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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Inisialisasi Query Client
const queryClient = new QueryClient();

const Page = () => {
    return (
        <QueryClientProvider client={queryClient}>
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
                        <MainTable />
                    </CardContent>
                    <CardFooter>
                        <ActionPagination />
                    </CardFooter>
                </Card>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default Page;
