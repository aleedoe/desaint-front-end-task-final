"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from '@/components/ui/button'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import axiosInstance from '@/lib/axios';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

import { Terminal } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Label } from '@/components/ui/label';


const formAddSchema = z.object({
    nik: z
        .string()
        .regex(/^\d{16}$/, { message: "NIK harus terdiri dari 16 digit angka." }),
    nama: z.string().nonempty({ message: "Nama tidak boleh kosong." }),
    tempatLahir: z.string().nonempty({ message: "Tempat Lahir tidak boleh kosong." }),
    tanggalLahir: z.string().nonempty({ message: "Tanggal Lahir tidak boleh kosong." })
        .refine((val) => !isNaN(Date.parse(val)), { message: "Tanggal Lahir harus berupa tanggal yang valid." }),
    jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
        message: "Jenis kelamin harus dipilih.",
    }),
    agama: z.string().nonempty({ message: "Agama tidak boleh kosong." }),
    alamat: z.string().optional(),
    statusPekerjaan: z.string().optional(),
    statusPernikahan: z.string().optional(),
    nomorTelepon: z.string().regex(/^\d+$/, { message: "Nomor Telepon harus berupa angka." }),
    pendidikanTerakhir: z.string().optional(),
    catatanPetugas: z.string().optional(),
});

type FormAddSchemaType = z.infer<typeof formAddSchema>;

export const ActionAdd = () => {

    const form = useForm<FormAddSchemaType>({
        resolver: zodResolver(formAddSchema),
        defaultValues: {
            nik: "",
            nama: "",
            tempatLahir: "",
            tanggalLahir: "",
            jenisKelamin: "Laki-laki",
            agama: "",
            alamat: "",
            statusPekerjaan: "",
            statusPernikahan: "",
            nomorTelepon: "",
            pendidikanTerakhir: "",
            catatanPetugas: "",
        },
    });


    // 3. Perbarui Fungsi handleSubmitForm
    const handleSubmitForm = async (data: FormAddSchemaType) => {
        try {
            const res = await axiosInstance.post('/api/penduduk', data);
            console.log('res add: ', res.data);

            if (res.status === 201) {
                // Reset form values setelah berhasil
                form.reset({
                    nik: "",
                    nama: "",
                    tempatLahir: "",
                    tanggalLahir: "",
                    jenisKelamin: "Laki-laki",
                    agama: "",
                    alamat: "",
                    statusPekerjaan: "",
                    statusPernikahan: "",
                    nomorTelepon: "",
                    pendidikanTerakhir: "",
                    catatanPetugas: "",
                });
                // Tambahkan notifikasi sukses jika diperlukan
            } else {
                // Tangani kasus selain 201 jika diperlukan
                console.error('Gagal menambahkan penduduk:', res.data);
            }
        } catch (error) {
            console.error('Create penduduk failed', error);
            // Tambahkan notifikasi error jika diperlukan
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah Perpindahan</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <Alert >
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Penduduk ditemukan!</AlertTitle>
                        <AlertDescription>
                            Penduduk dengan Nama <b>Joshep</b>.
                        </AlertDescription>
                    </Alert>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
                        <div className='grid grid-cols-1 gap-6'>
                            <Label htmlFor="email">NIK</Label>
                            <div className="flex w-full items-center space-x-2">
                                <Input type="email" placeholder="Cari NIK" />
                                <Button type="submit">Cari</Button>
                            </div>
                            <FormField
                                control={form.control}
                                name="alamat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alamat Tujuan</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Masukkan alamat tujuan" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alamat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alasan Pindah</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Masukkan alasan pindah" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full hidden">
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button
                        type='button'
                        onClick={form.handleSubmit(handleSubmitForm)} // Handle form submit when "Save" is clicked
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



export const ActionSearch = () => {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Cari Penduduk" />
            <Button type="submit">Cari</Button>
        </div>
    )
}




export const ActionPagination = () => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
