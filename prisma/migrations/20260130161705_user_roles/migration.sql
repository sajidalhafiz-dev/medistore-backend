/*
  Warnings:

  - The values [ADMIN,SELLER,CUSTOMER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'seller', 'customer');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'customer';
