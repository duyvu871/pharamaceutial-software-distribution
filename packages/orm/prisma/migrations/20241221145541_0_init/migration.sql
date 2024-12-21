-- CreateEnum
CREATE TYPE "enum_branches_branch_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "enum_branchs_branch_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "enum_consumers_gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "enum_memberships_employee_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "enum_users_permission" AS ENUM ('Store.All', 'Report.All', 'Supplier.All', 'Medicine.All', 'Pharmacist.All', 'Promotion.All', 'Customer.All', 'User.Read', 'User.Update', 'User.Create');

-- CreateTable
CREATE TABLE "branches" (
    "branch_id" UUID NOT NULL,
    "branch_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "branch_status" "enum_branches_branch_status" NOT NULL,
    "owner_id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "branches_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "consumers" (
    "id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "revenue" BIGINT DEFAULT 0,
    "debit" BIGINT DEFAULT 0,
    "consumer_name" VARCHAR(255) NOT NULL,
    "gender" "enum_consumers_gender",
    "consumer_email" VARCHAR(255),
    "phone_number" VARCHAR(255) NOT NULL,
    "tax_code" VARCHAR(255),
    "company_name" VARCHAR(255),
    "date_of_birth" TIMESTAMPTZ(6),
    "facebook" VARCHAR(255),
    "address" VARCHAR(255),
    "notes" VARCHAR(255),
    "province_city" VARCHAR(255),
    "district" VARCHAR(255),
    "ward" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "consumers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "deleted_by" UUID,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "hire_date" TIMESTAMPTZ(6) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone_number" VARCHAR(255),
    "avatar" VARCHAR(255),
    "notes" VARCHAR(255),
    "employee_status" "enum_memberships_employee_status" NOT NULL,
    "branch_id" UUID NOT NULL,
    "reset_token" VARCHAR(255),
    "permission" VARCHAR(255)[],
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_groups" (
    "product_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT '2024-12-10 16:55:24.726+07'::timestamp with time zone,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT '2024-12-10 16:55:24.727+07'::timestamp with time zone,

    CONSTRAINT "product_groups_pkey" PRIMARY KEY ("product_id","group_id")
);

-- CreateTable
CREATE TABLE "product_unit_labels" (
    "product_id" UUID NOT NULL,
    "product_unit" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL
);

-- CreateTable
CREATE TABLE "product_units" (
    "id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" INTEGER NOT NULL,
    "no" VARCHAR(255) NOT NULL,
    "is_base" INTEGER NOT NULL,
    "latest_parcel_no" VARCHAR(255),
    "latest_parcel_exp_date" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "product_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    "product_type" VARCHAR(255) NOT NULL,
    "medicine_id" VARCHAR(255),
    "barcode" VARCHAR(255),
    "product_no" VARCHAR(255) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "shortcut" VARCHAR(255),
    "original_price" DOUBLE PRECISION NOT NULL,
    "sell_price" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION,
    "quantity_of_stock" INTEGER NOT NULL,
    "group_id" UUID,
    "using_id" INTEGER NOT NULL,
    "base_unit" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "min_quantity" INTEGER NOT NULL,
    "max_quantity" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "note" VARCHAR(255),
    "manufacturer" VARCHAR(255),
    "made_in" VARCHAR(255),
    "deleted_at" TIMESTAMPTZ(6),
    "deleted_by" UUID,
    "avg_original_price" DOUBLE PRECISION NOT NULL,
    "default_image" VARCHAR(255),
    "productUnit" UUID NOT NULL,
    "quantity" JSON NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "store_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "email" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "description" VARCHAR(255),
    "deleted_at" TIMESTAMPTZ(6),
    "deleted_by" UUID,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinics" (
    "id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    "clinic_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "email" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "description" VARCHAR(255),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    "doctor_name" VARCHAR(255) NOT NULL,
    "specialization" VARCHAR(255),
    "phone" VARCHAR(255),
    "email" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "taxCode" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "wards" TEXT NOT NULL,
    "note" TEXT,
    "storeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "age" INTEGER,
    "phone_number" VARCHAR(255),
    "address" VARCHAR(255),
    "avatar" VARCHAR(255),
    "notes" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login" TIMESTAMPTZ(6),
    "reset_token" VARCHAR(255),
    "permission" VARCHAR(255)[] DEFAULT ARRAY['Store.All', 'Report.All', 'Supplier.All', 'Medicine.All', 'Membership.All', 'Promotion.All', 'Customer.All', 'User.Read', 'User.Update', 'User.Create']::VARCHAR(255)[],
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "branches_branch_name_idx" ON "branches"("branch_name");

-- CreateIndex
CREATE INDEX "branches_owner_id_idx" ON "branches"("owner_id");

-- CreateIndex
CREATE INDEX "consumers_branch_id_idx" ON "consumers"("branch_id");

-- CreateIndex
CREATE INDEX "consumers_consumer_name_idx" ON "consumers"("consumer_name");

-- CreateIndex
CREATE INDEX "consumers_consumer_email_idx" ON "consumers"("consumer_email");

-- CreateIndex
CREATE INDEX "consumers_phone_number_idx" ON "consumers"("phone_number");

-- CreateIndex
CREATE INDEX "groups_store_id_idx" ON "groups"("store_id");

-- CreateIndex
CREATE INDEX "groups_group_name_idx" ON "groups"("group_name");

-- CreateIndex
CREATE INDEX "memberships_branch_id_idx" ON "memberships"("branch_id");

-- CreateIndex
CREATE INDEX "memberships_username_idx" ON "memberships"("username");

-- CreateIndex
CREATE INDEX "memberships_email_idx" ON "memberships"("email");

-- CreateIndex
CREATE INDEX "memberships_phone_number_idx" ON "memberships"("phone_number");

-- CreateIndex
CREATE INDEX "product_groups_group_id_idx" ON "product_groups"("group_id");

-- CreateIndex
CREATE INDEX "product_units_store_id_idx" ON "product_units"("store_id");

-- CreateIndex
CREATE INDEX "product_units_name_idx" ON "product_units"("name");

-- CreateIndex
CREATE INDEX "products_store_id_idx" ON "products"("store_id");

-- CreateIndex
CREATE INDEX "products_group_id_idx" ON "products"("group_id");

-- CreateIndex
CREATE INDEX "products_product_name_idx" ON "products"("product_name");

-- CreateIndex
CREATE INDEX "products_barcode_idx" ON "products"("barcode");

-- CreateIndex
CREATE INDEX "products_product_no_idx" ON "products"("product_no");

-- CreateIndex
CREATE INDEX "products_medicine_id_idx" ON "products"("medicine_id");

-- CreateIndex
CREATE INDEX "stores_branch_id_idx" ON "stores"("branch_id");

-- CreateIndex
CREATE INDEX "stores_store_name_idx" ON "stores"("store_name");

-- CreateIndex
CREATE INDEX "clinics_store_id_idx" ON "clinics"("store_id");

-- CreateIndex
CREATE INDEX "doctors_store_id_idx" ON "doctors"("store_id");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_number_idx" ON "users"("phone_number");

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consumers" ADD CONSTRAINT "consumers_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("branch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("branch_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_groups" ADD CONSTRAINT "product_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_groups" ADD CONSTRAINT "product_groups_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_unit_labels" ADD CONSTRAINT "product_unit_labels_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_unit_labels" ADD CONSTRAINT "product_unit_labels_product_unit_fkey" FOREIGN KEY ("product_unit") REFERENCES "product_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_units" ADD CONSTRAINT "product_units_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES "product_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("branch_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
