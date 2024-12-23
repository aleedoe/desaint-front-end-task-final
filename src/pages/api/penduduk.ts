import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            // Create a new Penduduk
            const {
                nik,
                nama,
                tempatLahir,
                tanggalLahir,
                jenisKelamin,
                alamat,
                statusPekerjaan,
                statusPernikahan,
                agama,
                nomorTelepon,
                pendidikanTerakhir,
                statusVerifikasi,
                catatanPetugas,
            } = req.body;

            if (!nik || !nama || !tempatLahir || !tanggalLahir || !jenisKelamin || !agama) {
                return res.status(400).json({ error: 'Required fields are missing.' });
            }

            const penduduk = await prisma.penduduk.create({
                data: {
                    nik,
                    nama,
                    tempatLahir,
                    tanggalLahir: new Date(tanggalLahir),
                    jenisKelamin,
                    alamat,
                    statusPekerjaan,
                    statusPernikahan,
                    agama,
                    nomorTelepon,
                    pendidikanTerakhir,
                    statusVerifikasi: statusVerifikasi || 'Pending',
                    catatanPetugas,
                },
            });

            return res.status(201).json(penduduk);
        } else if (req.method === 'GET') {
            const { nik } = req.query;

            if (nik) {
                // Get Penduduk by NIK
                const penduduk = await prisma.penduduk.findUnique({
                    where: { nik: nik as string },
                    include: { perpindahan: true },
                });

                if (!penduduk) {
                    return res.status(404).json({ error: 'Penduduk not found.' });
                }

                return res.status(200).json(penduduk);
            }

            // Fetch all Penduduk
            const pendudukList = await prisma.penduduk.findMany({
                include: { perpindahan: true },
            });
            return res.status(200).json(pendudukList);
        } else if (req.method === 'PUT') {
            const { nik } = req.body;

            if (!nik) {
                return res.status(400).json({ error: 'NIK is required for updating.' });
            }

            const updatedPenduduk = await prisma.penduduk.update({
                where: { nik },
                data: req.body,
            });

            return res.status(200).json(updatedPenduduk);
        } else if (req.method === 'DELETE') {
            const { nik } = req.query;

            if (!nik) {
                return res.status(400).json({ error: 'NIK is required for deletion.' });
            }

            await prisma.penduduk.delete({
                where: { nik: nik as string },
            });

            return res.status(200).json({ message: 'Penduduk deleted successfully.' });
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Error in Penduduk API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}