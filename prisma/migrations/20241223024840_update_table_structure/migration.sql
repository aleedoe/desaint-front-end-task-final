/*
  Warnings:

  - The primary key for the `Penduduk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Penduduk` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Penduduk" (
    "nik" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Penduduk" ("agama", "alamat", "catatanPetugas", "jenisKelamin", "nama", "nik", "nomorTelepon", "pendidikanTerakhir", "statusPekerjaan", "statusPernikahan", "statusVerifikasi", "tanggalLahir", "tanggalRegistrasi", "tempatLahir") SELECT "agama", "alamat", "catatanPetugas", "jenisKelamin", "nama", "nik", "nomorTelepon", "pendidikanTerakhir", "statusPekerjaan", "statusPernikahan", "statusVerifikasi", "tanggalLahir", "tanggalRegistrasi", "tempatLahir" FROM "Penduduk";
DROP TABLE "Penduduk";
ALTER TABLE "new_Penduduk" RENAME TO "Penduduk";
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
