-- CreateTable
CREATE TABLE "Penduduk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nik" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" DATETIME NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "alamat" TEXT,
    "statusPekerjaan" TEXT,
    "statusPernikahan" TEXT,
    "agama" TEXT NOT NULL,
    "nomorTelepon" TEXT,
    "pendidikanTerakhir" TEXT,
    "tanggalRegistrasi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusVerifikasi" TEXT NOT NULL DEFAULT 'Pending',
    "catatanPetugas" TEXT
);

-- CreateTable
CREATE TABLE "PerpindahanPenduduk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nik" TEXT NOT NULL,
    "alamatTujuan" TEXT NOT NULL,
    "alasanPindah" TEXT NOT NULL,
    "tanggalPermohonan" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPermohonan" TEXT NOT NULL DEFAULT 'Pending',
    "catatanPetugas" TEXT,
    CONSTRAINT "PerpindahanPenduduk_nik_fkey" FOREIGN KEY ("nik") REFERENCES "Penduduk" ("nik") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");
