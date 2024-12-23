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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"

import { Button } from '@/components/ui/button'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import axiosInstance from '@/lib/axios';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

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

    // const [date, setDate] = React.useState<Date>()

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
                <Button>Tambah Penduduk</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name="nik"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>NIK</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Masukkan NIK" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nama"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan nama lengkap" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tempatLahir"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tempat Lahir</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan Tempat Lahir" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tanggalLahir"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Lahir</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(new Date(field.value), "PPP") : "Pilih tanggal lahir"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jenisKelamin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jenis Kelamin</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Pilihan</SelectLabel>
                                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="agama"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Agama</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Agama" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Pilihan</SelectLabel>
                                                            <SelectItem value="islam">Islam</SelectItem>
                                                            <SelectItem value="kristen">Kristen</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="pendidikanTerakhir"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pendidikan</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan pendidikan terakhir"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="statusPekerjaan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status Pekerjaan</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Status Pekerjaan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Pilihan</SelectLabel>
                                                            <SelectItem value="petani">Petani</SelectItem>
                                                            <SelectItem value="nganggur">Nganggur</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="statusPernikahan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status Pernikahan</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Status Pernikahan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Pilihan</SelectLabel>
                                                            <SelectItem value="S">Sudah</SelectItem>
                                                            <SelectItem value="B">Belum</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nomorTelepon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nomor Telepon</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Masukkan Nomor Telepon" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="alamat"
                                    render={({ field }) => (
                                        <FormItem className='col-span-2'>
                                            <FormLabel>Alamat</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Masukkan alamat" {...field} />
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
                </DialogHeader>
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
