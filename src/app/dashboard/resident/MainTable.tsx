"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Penduduk {
    nik: string;
    nama: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    alamat?: string;
    agama: string;
    nomorTelepon?: string;
    pendidikanTerakhir?: string;
    statusVerifikasi: string;
}

const fetchPenduduk = async (): Promise<Penduduk[]> => {
    const response = await axiosInstance.get('/penduduk');
    return response.data;
};

const MainTable = () => {
    const { data, error, isLoading } = useQuery<Penduduk[], Error>({
        queryKey: ['penduduk'],
        queryFn: fetchPenduduk,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Table>
            <TableCaption>Daftar semua penduduk yang terdaftar.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>NIK</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Tempat Lahir</TableHead>
                    <TableHead className="text-right">Tanggal Lahir</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.length > 0 ? (
                    data.map((penduduk) => (
                        <TableRow key={penduduk.nik}>
                            <TableCell className="font-medium">{penduduk.nik}</TableCell>
                            <TableCell>{penduduk.nama}</TableCell>
                            <TableCell>{penduduk.tempatLahir}</TableCell>
                            <TableCell className="text-right">
                                {new Date(penduduk.tanggalLahir).toLocaleDateString('id-ID')}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            Tidak ada data.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default MainTable;
