--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10
-- Dumped by pg_dump version 15.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: LoaiChungTu; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LoaiChungTu" AS ENUM (
    'Thu',
    'Chi'
);


ALTER TYPE public."LoaiChungTu" OWNER TO postgres;

--
-- Name: LoaiThuChi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LoaiThuChi" AS ENUM (
    'Thu',
    'Chi'
);


ALTER TYPE public."LoaiThuChi" OWNER TO postgres;

--
-- Name: UserType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserType" AS ENUM (
    'user',
    'membership'
);


ALTER TYPE public."UserType" OWNER TO postgres;

--
-- Name: admin_permission; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.admin_permission AS ENUM (
    'Store.All',
    'Report.All',
    'Supplier.All',
    'Medicine.All',
    'Membership.All',
    'Promotion.All',
    'Customer.All',
    'User.Read',
    'User.Update',
    'User.Create'
);


ALTER TYPE public.admin_permission OWNER TO postgres;

--
-- Name: admin_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.admin_type AS ENUM (
    'super_admin',
    'admin'
);


ALTER TYPE public.admin_type OWNER TO postgres;

--
-- Name: all_permission; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.all_permission AS ENUM (
    'Store.All',
    'Report.All',
    'Supplier.All',
    'Medicine.All',
    'Membership.All',
    'Promotion.All',
    'Customer.All',
    'User.Read',
    'User.Update',
    'User.Create'
);


ALTER TYPE public.all_permission OWNER TO postgres;

--
-- Name: enum_branches_branch_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_branches_branch_status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.enum_branches_branch_status OWNER TO postgres;

--
-- Name: enum_branchs_branch_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_branchs_branch_status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.enum_branchs_branch_status OWNER TO postgres;

--
-- Name: enum_consumers_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_consumers_gender AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE public.enum_consumers_gender OWNER TO postgres;

--
-- Name: enum_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_gender AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE public.enum_gender OWNER TO postgres;

--
-- Name: enum_memberships_employee_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_memberships_employee_status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.enum_memberships_employee_status OWNER TO postgres;

--
-- Name: enum_users_permission; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_permission AS ENUM (
    'Store.All',
    'Report.All',
    'Supplier.All',
    'Medicine.All',
    'Pharmacist.All',
    'Promotion.All',
    'Customer.All',
    'User.Read',
    'User.Update',
    'User.Create'
);


ALTER TYPE public.enum_users_permission OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: admin_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_permissions (
    admin_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.admin_permissions OWNER TO postgres;

--
-- Name: admin_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_plans (
    id uuid NOT NULL,
    plan_name character varying(255) NOT NULL,
    plan_type character varying(255) NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.admin_plans OWNER TO postgres;

--
-- Name: admin_subsciption; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_subsciption (
    id uuid NOT NULL,
    admin_id uuid NOT NULL,
    plan_id uuid NOT NULL,
    start_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    status character varying(50) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    auto_renew boolean DEFAULT true NOT NULL,
    payment_method character varying(255),
    trial_ends_at timestamp(6) with time zone,
    payment_status character varying(50) DEFAULT 'unpaid'::character varying
);


ALTER TABLE public.admin_subsciption OWNER TO postgres;

--
-- Name: admin_to_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_to_user (
    id uuid NOT NULL,
    "adminId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.admin_to_user OWNER TO postgres;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    gender public.enum_gender NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255),
    phone_number character varying(255),
    postal_code character varying(255),
    address character varying(255),
    avatar character varying(255),
    notes character varying(255),
    bio character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    last_login timestamp(6) with time zone,
    reset_token character varying(255),
    permission character varying(255)[] DEFAULT ARRAY['Store.All'::character varying(255), 'Report.All'::character varying(255), 'Supplier.All'::character varying(255), 'Medicine.All'::character varying(255), 'Membership.All'::character varying(255), 'Promotion.All'::character varying(255), 'Customer.All'::character varying(255), 'User.All'::character varying(255)],
    "roleId" uuid,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) with time zone,
    dob timestamp(6) with time zone
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    path character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) DEFAULT ''::character varying,
    url character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    meta_data json DEFAULT '{}'::json NOT NULL,
    "from" character varying(255) DEFAULT ''::character varying,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.assets OWNER TO postgres;

--
-- Name: branch_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branch_details (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    so_dang_ky text DEFAULT ''::text,
    ten_nha_thuoc text DEFAULT ''::text,
    loai_hinh text DEFAULT ''::text,
    tinh text DEFAULT ''::text,
    huyen text DEFAULT ''::text,
    dia_chi text DEFAULT ''::text,
    nguoi_dai_dien text DEFAULT ''::text,
    nguoi_chiu_trach_nhiem text DEFAULT ''::text,
    nguoi_chiu_trach_nhiem_chuyen_mon text DEFAULT ''::text,
    so_chung_chi_hanh_nghe text DEFAULT ''::text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.branch_details OWNER TO postgres;

--
-- Name: branch_integration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branch_integration (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    type character varying(255) NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) with time zone,
    deleted_by uuid,
    integration_account text DEFAULT ''::text,
    integration_id text DEFAULT ''::text,
    integration_password text DEFAULT ''::text
);


ALTER TABLE public.branch_integration OWNER TO postgres;

--
-- Name: branch_payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branch_payment (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    type character varying(255) NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    payment_bank text NOT NULL,
    payment_account_number text NOT NULL,
    payment_account_owner text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) with time zone,
    deleted_by uuid
);


ALTER TABLE public.branch_payment OWNER TO postgres;

--
-- Name: branch_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branch_plans (
    id uuid NOT NULL,
    plan_name character varying(255) NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    plan_type character varying(255) NOT NULL
);


ALTER TABLE public.branch_plans OWNER TO postgres;

--
-- Name: branches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branches (
    branch_id uuid NOT NULL,
    branch_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    branch_status public.enum_branches_branch_status NOT NULL,
    owner_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) with time zone,
    enabled_points boolean DEFAULT true NOT NULL
);


ALTER TABLE public.branches OWNER TO postgres;

--
-- Name: clinics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clinics (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    clinic_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255),
    email character varying(255),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description character varying(255),
    deleted_at timestamp(6) with time zone
);


ALTER TABLE public.clinics OWNER TO postgres;

--
-- Name: consumers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumers (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    revenue bigint DEFAULT 0,
    debit bigint DEFAULT 0,
    consumer_name character varying(255) NOT NULL,
    gender public.enum_consumers_gender,
    consumer_email character varying(255) DEFAULT NULL::character varying,
    phone_number character varying(255) NOT NULL,
    tax_code character varying(255) DEFAULT NULL::character varying,
    company_name character varying(255) DEFAULT NULL::character varying,
    date_of_birth timestamp with time zone,
    facebook character varying(255) DEFAULT NULL::character varying,
    address character varying(255) DEFAULT NULL::character varying,
    notes character varying(255) DEFAULT NULL::character varying,
    province_city character varying(255) DEFAULT NULL::character varying,
    district character varying(255) DEFAULT NULL::character varying,
    ward character varying(255) DEFAULT NULL::character varying,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    consumer_id character varying(255) NOT NULL
);


ALTER TABLE public.consumers OWNER TO postgres;

--
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    id uuid NOT NULL,
    doctor_id text NOT NULL,
    branch_id uuid NOT NULL,
    specialization character varying(255),
    email character varying(255),
    status integer DEFAULT 1 NOT NULL,
    chuyen_khoa character varying(255) NOT NULL,
    dia_chi character varying(255) NOT NULL,
    sdt character varying(255) NOT NULL,
    ghi_chu character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    loai_so_quy integer DEFAULT 0 NOT NULL,
    noi_cong_tac character varying(255) NOT NULL,
    ten_bac_si character varying(255) NOT NULL,
    ten_slug character varying(255) NOT NULL,
    trinh_do character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) with time zone,
    "storesId" uuid
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- Name: financial_ledger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financial_ledger (
    id uuid NOT NULL,
    "soQuyID" text NOT NULL,
    "maPhieu" text NOT NULL,
    loai_chung_tu integer NOT NULL,
    loai_thu_chi integer NOT NULL,
    ten_loai_thu_chi text NOT NULL,
    loai_nguoi_nop_nhan integer NOT NULL,
    nguoi_nop_nhan_id integer NOT NULL,
    ten_nguoi_nop_nhan text NOT NULL,
    ngay_thu_chi timestamp(3) without time zone NOT NULL,
    ghi_chu_he_thong text,
    ton_quy_truoc double precision NOT NULL,
    gia_tri double precision NOT NULL,
    ton_quy_sau double precision NOT NULL,
    trang_thai text NOT NULL,
    branch_id uuid NOT NULL,
    ghi_chu text,
    phuong_thuc_thanh_toan_id integer NOT NULL,
    phieu_lien_quan integer,
    tong_tien_phieu_lien_quan double precision,
    ma_phieu_lien_quan text,
    ten_loai_chung_tu text,
    ten_loai_nguoi_nop_nhan text,
    ten_nha_thuoc text,
    user_id text NOT NULL,
    user_type text NOT NULL,
    phuong_thuc_thanh_toan integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ten_nguoi_tao text,
    loai integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.financial_ledger OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    group_name character varying(255) NOT NULL,
    description character varying(255),
    status integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    deleted_by uuid
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: import_invoice_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.import_invoice_product (
    id uuid NOT NULL,
    import_invoice uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL,
    total double precision NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    active_ingredient character varying(255),
    barcode character varying(255),
    content character varying(255),
    expired_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    import_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ingredients character varying(255),
    larger_unit character varying(255) DEFAULT 'Vỉ'::character varying NOT NULL,
    larger_unit_value integer DEFAULT 1 NOT NULL,
    lot_no character varying(255),
    manufacturer character varying(255),
    note character varying(255),
    packaging character varying(255),
    register_no character varying(255),
    smaller_unit character varying(255) DEFAULT 'Vỉ'::character varying NOT NULL,
    smaller_unit_value integer DEFAULT 1 NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    type character varying(255) DEFAULT 'thuoc'::character varying NOT NULL,
    usage character varying(255)
);


ALTER TABLE public.import_invoice_product OWNER TO postgres;

--
-- Name: import_invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.import_invoices (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    provider_id uuid,
    invoice_no character varying(255) NOT NULL,
    name text NOT NULL,
    total_amount double precision NOT NULL,
    amount_due double precision NOT NULL,
    amount_paid double precision NOT NULL,
    debit double precision NOT NULL,
    notes text,
    vat double precision NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    lot_no character varying(255)
);


ALTER TABLE public.import_invoices OWNER TO postgres;

--
-- Name: invoice_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoice_items (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    "productName" text NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL,
    total double precision NOT NULL,
    unit text NOT NULL,
    note text,
    "productId" uuid
);


ALTER TABLE public.invoice_items OWNER TO postgres;

--
-- Name: invoice_prescriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoice_prescriptions (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    prescription_id text NOT NULL,
    ma_don_thuoc text NOT NULL,
    ngay_ke timestamp(3) without time zone NOT NULL,
    bac_si_id uuid NOT NULL,
    co_so_kham text NOT NULL,
    chuan_doan text,
    benh_nhan text NOT NULL,
    ngay_sinh timestamp(3) without time zone,
    nam_sinh integer,
    tuoi integer,
    thang_tuoi integer,
    can_nang double precision,
    dia_chi text,
    nguoi_giam_ho text,
    cmnd text,
    dien_thoai text,
    the_bhyt text,
    gioi_tinh integer NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.invoice_prescriptions OWNER TO postgres;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    id uuid NOT NULL,
    invoice_id character varying(255),
    "branchId" uuid NOT NULL,
    "saleDate" date NOT NULL,
    "saleTime" text NOT NULL,
    "customerName" text,
    "customerId" uuid,
    "priceList" text,
    "isPrescriptionSale" boolean,
    vat double precision DEFAULT 0 NOT NULL,
    "totalPrice" double precision NOT NULL,
    discount double precision DEFAULT 0 NOT NULL,
    "amountDue" double precision NOT NULL,
    "amountPaid" double precision DEFAULT 0 NOT NULL,
    debit double precision DEFAULT 0 NOT NULL,
    notes text,
    "autoPrintInvoice" boolean,
    "printBatchNumber" boolean,
    "userType" public."UserType",
    "userId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- Name: membership_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membership_permissions (
    membership_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.membership_permissions OWNER TO postgres;

--
-- Name: memberships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.memberships (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    hire_date timestamp with time zone NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255),
    phone_number character varying(255),
    avatar character varying(255),
    notes character varying(255),
    employee_status public.enum_memberships_employee_status NOT NULL,
    branch_id uuid NOT NULL,
    reset_token character varying(255),
    permission character varying(255)[] DEFAULT ARRAY['Store.All'::character varying(255), 'Report.All'::character varying(255), 'Supplier.All'::character varying(255), 'Medicine.All'::character varying(255), 'Membership.All'::character varying(255), 'Promotion.All'::character varying(255), 'Customer.All'::character varying(255)] NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    address text,
    age integer,
    last_login timestamp(6) with time zone
);


ALTER TABLE public.memberships OWNER TO postgres;

--
-- Name: other_charges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.other_charges (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    name text NOT NULL,
    value double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public.other_charges OWNER TO postgres;

--
-- Name: payment_histories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_histories (
    id uuid NOT NULL,
    subscription_id uuid NOT NULL,
    admin_subscription_id uuid,
    payment_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount double precision NOT NULL,
    payment_method character varying(255),
    status character varying(50) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.payment_histories OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: point_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.point_transactions (
    id uuid NOT NULL,
    "pointId" uuid NOT NULL,
    type character varying(255) NOT NULL,
    amount integer NOT NULL,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.point_transactions OWNER TO postgres;

--
-- Name: points; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.points (
    id uuid NOT NULL,
    "totalPoints" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "consumerId" uuid NOT NULL,
    "storeId" uuid
);


ALTER TABLE public.points OWNER TO postgres;

--
-- Name: product_assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    asset_id uuid,
    product_id uuid,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.product_assets OWNER TO postgres;

--
-- Name: product_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_groups (
    product_id uuid NOT NULL,
    group_id uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-12-10 09:55:24.726+00'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-12-10 09:55:24.727+00'::timestamp with time zone NOT NULL
);


ALTER TABLE public.product_groups OWNER TO postgres;

--
-- Name: product_unit_labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_unit_labels (
    product_id uuid NOT NULL,
    product_unit uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.product_unit_labels OWNER TO postgres;

--
-- Name: product_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_units (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    value integer NOT NULL,
    no character varying(255) NOT NULL,
    is_base integer NOT NULL,
    latest_parcel_no character varying(255),
    latest_parcel_exp_date character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.product_units OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    product_type character varying(255) NOT NULL,
    medicine_id character varying(255),
    barcode character varying(255),
    product_no character varying(255) NOT NULL,
    product_name character varying(255) NOT NULL,
    shortcut character varying(255),
    original_price double precision NOT NULL,
    sell_price double precision NOT NULL,
    weight double precision,
    quantity_of_stock integer NOT NULL,
    group_id uuid,
    using_id integer NOT NULL,
    base_unit character varying(255) NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    min_quantity integer NOT NULL,
    max_quantity integer NOT NULL,
    description character varying(255),
    note character varying(255),
    manufacturer character varying(255),
    made_in character varying(255),
    deleted_at timestamp with time zone,
    deleted_by uuid,
    avg_original_price double precision NOT NULL,
    default_image character varying(255),
    "productUnit" uuid NOT NULL,
    quantity json NOT NULL,
    store_group_id uuid,
    register_no character varying(255),
    lot_no character varying(255),
    product_id text NOT NULL,
    expire_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    import_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    active_ingredient character varying(255),
    content character varying(255),
    ingredient character varying(255),
    packing character varying(255),
    usage character varying(255)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: providers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.providers (
    "companyName" text NOT NULL,
    "phoneNumber" text NOT NULL,
    email text,
    "taxCode" text,
    address text,
    city text NOT NULL,
    district text NOT NULL,
    wards text NOT NULL,
    note text,
    "storeId" uuid NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE public.providers OWNER TO postgres;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    role_name character varying(255) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    permission character varying(255)[]
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: store_assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store_assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.store_assets OWNER TO postgres;

--
-- Name: store_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store_group (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    group_name character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description character varying(255),
    deleted_at timestamp(6) with time zone,
    deleted_by uuid,
    group_slug character varying(255) DEFAULT NULL::character varying NOT NULL
);


ALTER TABLE public.store_group OWNER TO postgres;

--
-- Name: store_reward_point; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store_reward_point (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    convert_to character varying(255) DEFAULT 'VND'::character varying NOT NULL,
    convert_rate integer DEFAULT 100000 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description character varying(255),
    deleted_at timestamp(6) with time zone,
    deleted_by uuid,
    point_value integer DEFAULT 5000 NOT NULL
);


ALTER TABLE public.store_reward_point OWNER TO postgres;

--
-- Name: stores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stores (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    store_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255),
    email character varying(255),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description character varying(255),
    deleted_at timestamp(6) with time zone,
    deleted_by uuid
);


ALTER TABLE public.stores OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    plan_id uuid NOT NULL,
    start_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    status character varying(50) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    plan_type character varying(255) NOT NULL,
    auto_renew boolean DEFAULT true NOT NULL,
    payment_method character varying(255),
    payment_status character varying(50) DEFAULT 'unpaid'::character varying
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_permissions (
    user_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.user_permissions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255),
    age integer,
    phone_number character varying(255),
    address character varying(255),
    avatar character varying(255),
    notes character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    last_login timestamp(6) with time zone,
    reset_token character varying(255),
    permission character varying(255)[] DEFAULT ARRAY['Store.All'::character varying(255), 'Report.All'::character varying(255), 'Supplier.All'::character varying(255), 'Medicine.All'::character varying(255), 'Membership.All'::character varying(255), 'Promotion.All'::character varying(255), 'Customer.All'::character varying(255), 'User.Read'::character varying(255), 'User.Update'::character varying(255), 'User.Create'::character varying(255)],
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) with time zone,
    first_name character varying(255),
    last_name character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
035443a0-7478-4cc3-ae9e-55f82d1e1168	d31e5ec4992d2225edd511c1e30bf1d4cc7711ad9fd13a9e98758f666944744c	2024-12-28 18:10:14.464659+00	20241221145541_0_init	\N	\N	2024-12-28 18:10:14.342014+00	1
8b580207-5b23-4e55-8b5d-80bf79c3b01f	f733da258c81bbadf36fbb74d1c864c364a7b2af945e4e4a003a6b76c85e800b	2024-12-28 18:10:14.47409+00	20241221150711_1_init	\N	\N	2024-12-28 18:10:14.466036+00	1
66027312-d22a-4272-b1d4-46978f5d253c	4ec6a7b147d25a019790c34d720cabdab4754a3ef4d36df6e74b1370da1c1cd9	2024-12-28 18:10:14.522849+00	20241228175311_2_init	\N	\N	2024-12-28 18:10:14.475748+00	1
12e0e856-68e6-478f-a2b2-464ad4828280	1e7961a7ed7e1328c8dbe3cbaaa7549c65148147ade091d6e77852c192a5c2c8	\N	20241229012323_add_consumer_id_to_invoice	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20241229012323_add_consumer_id_to_invoice\n\nDatabase error code: 42P07\n\nDatabase error:\nERROR: relation "branch_details" already exists\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42P07), message: "relation \\"branch_details\\" already exists", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("heap.c"), line: Some(1201), routine: Some("heap_create_with_catalog") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20241229012323_add_consumer_id_to_invoice"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20241229012323_add_consumer_id_to_invoice"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:226	\N	2024-12-29 02:57:26.335384+00	0
\.


--
-- Data for Name: admin_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_permissions (admin_id, permission_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: admin_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_plans (id, plan_name, plan_type, price, duration, description, "createdAt", "updatedAt") FROM stdin;
0055d8de-df5d-452c-9d45-4194800cfba9	Gói 30 ngày	30_day	100000	30	\N	2025-01-22 18:57:43.049139+00	2025-01-22 18:57:43.049139+00
f0ff430b-9d6f-4e55-8b93-825ee77b57d5	Gói 1 năm	1_year	1000000	365	\N	2025-01-22 19:05:15.508525+00	2025-01-22 19:05:15.508525+00
a0244f5e-fe14-407d-bf75-9ac441a73b66	Admin hệ thống	admin_system	0	36500	\N	2025-01-22 19:07:04.449857+00	2025-01-22 19:07:04.449857+00
\.


--
-- Data for Name: admin_subsciption; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_subsciption (id, admin_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt", auto_renew, payment_method, trial_ends_at, payment_status) FROM stdin;
52e2c818-0349-45ed-97e5-8de5b7fba5ca	6b1e5bf7-e673-4ed7-b667-b30fe3c53ab3	a0244f5e-fe14-407d-bf75-9ac441a73b66	2025-01-22 19:19:36.541194+00	2124-12-30 02:19:36.541	active	2025-01-22 19:19:36.541194+00	2025-01-22 19:19:36.541194+00	t	\N	\N	unpaid
224e2cf5-ee66-4154-bd18-6001154ef024	64e7d584-7904-46fd-bfa7-99f3c8c31268	f0ff430b-9d6f-4e55-8b93-825ee77b57d5	2025-01-26 20:57:42.198+00	2026-01-26 20:57:42.198	ACTIVE	2025-01-26 20:57:42.202+00	2025-01-26 20:57:42.202+00	t	cash	\N	unpaid
\.


--
-- Data for Name: admin_to_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_to_user (id, "adminId", "userId", "createdAt", "updatedAt") FROM stdin;
57b4cb50-0193-4752-b44e-0d9e653fc7fa	6b1e5bf7-e673-4ed7-b667-b30fe3c53ab3	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-01 14:17:53.471+00	2025-01-01 14:17:53.471+00
798f1e1c-0488-4f1c-a3ea-be2c699b3c4a	6b1e5bf7-e673-4ed7-b667-b30fe3c53ab3	9b621b5e-5ad5-409a-b64e-1c22b3c52380	2025-01-25 08:39:31.093+00	2025-01-25 08:39:31.093+00
049ab730-218b-4108-88b3-b7b37636147f	72b73d94-7eae-434a-ade0-8aea643a922e	bfd7183a-8fb7-4417-b1b3-70423b0e0a34	2025-01-26 20:05:43.103+00	2025-01-26 20:05:43.103+00
a4cea7ea-e133-4f0d-977f-c8a9b4fbe35d	6b1e5bf7-e673-4ed7-b667-b30fe3c53ab3	9cc4563e-f510-4e78-ab30-d47f8aa080d4	2025-01-26 20:58:28.96+00	2025-01-26 20:58:28.96+00
004baa5a-c96e-4691-9d13-62db82d36979	64e7d584-7904-46fd-bfa7-99f3c8c31268	1bce4112-b3ff-409c-9f5f-2f74d113af8a	2025-01-26 21:00:23.741+00	2025-01-26 21:00:23.741+00
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, last_name, first_name, gender, password, email, phone_number, postal_code, address, avatar, notes, bio, is_active, last_login, reset_token, permission, "roleId", "createdAt", "updatedAt", dob) FROM stdin;
6b1e5bf7-e673-4ed7-b667-b30fe3c53ab3	admin	Kiên	Nguyễn	male	$2a$10$x35awSUgZ4PnViQWFtzwj.e97kiP7QeLGOHH/bIBQhXMa0IwXkiau	era8@gmail.com	111-222-3333	99999	Ha Noi, Viet Nam	\N			t	2025-01-01 14:17:53.444+00	\N	{Brand.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,User.All,Admin.All}	\N	2025-01-01 14:17:53.444+00	2025-01-01 14:17:53.444+00	\N
d67558a3-4146-4da7-8007-2676877d894e	admin_2	thanh van	lee	other	$2b$10$438XIf5BzQtcgOjJSAI6meSGlI3/OuzWA0AJHUSdRtVbfDDoMP3l2	\N	\N	\N	\N	\N	\N	\N	t	\N	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.All}	\N	2025-01-26 13:29:16.500531+00	2025-01-26 13:29:16.500531+00	\N
72b73d94-7eae-434a-ade0-8aea643a922e	admin_3	lê	thanh	other	$2b$10$U39gEBEq6QnU8PbpLyOiXuSaC3eq2dsuirqGb22hcpeCKEqdsvviC	\N	\N	\N	\N	\N	\N	\N	t	\N	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.All}	\N	2025-01-26 19:09:12.989+00	2025-01-26 19:09:12.989+00	\N
64e7d584-7904-46fd-bfa7-99f3c8c31268	admin_4	thanh vy	Nguyễn	other	$2b$10$zTMn9jxfvAxuosXv91SOhu0wyMoUcQSZceq0z4q.StfFEgJkWG1ji	\N	\N	\N	\N	\N	\N	\N	t	\N	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.All}	\N	2025-01-26 20:57:27.787+00	2025-01-26 20:57:27.787+00	\N
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets (id, store_id, path, name, description, url, type, meta_data, "from", "createdAt", "updatedAt") FROM stdin;
d82ef21e-2ec9-4adb-a150-19e961b67adf	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/d9ef4c21-1911-4dde-a69a-b507a5e6ef2d.png	Untitled.png		undefined	image/png	{"mime":"image/png","size":143489,"originalName":"Untitled.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-04 11:32:46.991+00	2025-01-04 11:32:46.991+00
e37bab02-0572-4854-b266-fb09329ef3d9	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/8f581bfd-4978-499c-9526-b62c34f1fddc.png	Untitled.png		http://localhost:8080/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/8f581bfd-4978-499c-9526-b62c34f1fddc.png	image/png	{"mime":"image/png","size":143489,"originalName":"Untitled.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-04 11:48:15.401+00	2025-01-04 11:48:15.401+00
b2130651-34c4-4100-af43-0f56a6421369	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/35e1b30b-cfa5-4ac6-8d31-13b249038027.png	Untitled.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/35e1b30b-cfa5-4ac6-8d31-13b249038027.png	image/png	{"mime":"image/png","size":143489,"originalName":"Untitled.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-04 11:52:49.063+00	2025-01-04 11:52:49.063+00
3af87690-05a2-44e3-8e7b-24e5e6819344	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/a1dbbb20-a2b2-4368-adae-5905097abb41.png	pharmacy-store.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/a1dbbb20-a2b2-4368-adae-5905097abb41.png	image/png	{"mime":"image/png","size":2056379,"originalName":"pharmacy-store.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-04 14:58:40.023+00	2025-01-04 14:58:40.023+00
50c01b76-cb18-41e6-8a28-7c81a75c3e1c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/956e833e-3b06-4d98-adcd-d1cf2336f736.png	nqueens_adjusted_flowchart.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/956e833e-3b06-4d98-adcd-d1cf2336f736.png	image/png	{"mime":"image/png","size":117292,"originalName":"nqueens_adjusted_flowchart.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-05 02:37:32.592+00	2025-01-05 02:37:32.592+00
c9931b1d-91c1-492e-bcb6-21db5904b4fe	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/9edefa23-9abf-468e-8825-d6e649825b1d.png	Untitled.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/9edefa23-9abf-468e-8825-d6e649825b1d.png	image/png	{"mime":"image/png","size":143489,"originalName":"Untitled.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-05 10:59:13.376+00	2025-01-05 10:59:13.376+00
0cbeec20-4c7a-4b3b-ae71-7909d75d06fc	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/80d4a2c0-9721-4918-87b4-9bd56bf696fc.jpeg	fbe38fda-e284-4a39-a0ef-e388cde79dad.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/80d4a2c0-9721-4918-87b4-9bd56bf696fc.jpeg	image/jpeg	{"mime":"image/jpeg","size":144123,"originalName":"fbe38fda-e284-4a39-a0ef-e388cde79dad.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-06 18:24:43.388+00	2025-01-06 18:24:43.388+00
2af1a93d-0403-4ac0-9701-82d225a3578e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/d0800134-2b5c-45c9-91f7-4aca29d666ff.jpeg	9040de12-5ca7-467a-9aa2-39cdcec80955.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/d0800134-2b5c-45c9-91f7-4aca29d666ff.jpeg	image/jpeg	{"mime":"image/jpeg","size":76470,"originalName":"9040de12-5ca7-467a-9aa2-39cdcec80955.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-06 18:26:00.558+00	2025-01-06 18:26:00.558+00
b969c1b2-3f7c-4b8d-ada2-f6f839ea3c43	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/723ebd1d-3c8d-4bed-bbaf-b20f80683551.png	Untitled.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/723ebd1d-3c8d-4bed-bbaf-b20f80683551.png	image/png	{"mime":"image/png","size":143489,"originalName":"Untitled.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-07 03:51:21.808+00	2025-01-07 03:51:21.808+00
eec25dbc-8b2c-4c55-8bae-eb17db98176a	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/fd1fae79-2123-4ba7-a7e4-5449610866fe.jpeg	fbe38fda-e284-4a39-a0ef-e388cde79dad.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/fd1fae79-2123-4ba7-a7e4-5449610866fe.jpeg	image/jpeg	{"mime":"image/jpeg","size":144123,"originalName":"fbe38fda-e284-4a39-a0ef-e388cde79dad.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-07 03:53:20.926+00	2025-01-07 03:53:20.926+00
5244a297-d856-4a80-b188-56e841f234d8	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/874f4f2a-13df-4684-9bc8-b1a5973b8e7b.jpeg	ef1e3d73-fa71-4de0-9c21-3c4f2fb309b1.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/874f4f2a-13df-4684-9bc8-b1a5973b8e7b.jpeg	image/jpeg	{"mime":"image/jpeg","size":221303,"originalName":"ef1e3d73-fa71-4de0-9c21-3c4f2fb309b1.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-07 10:25:54.093+00	2025-01-07 10:25:54.093+00
fdfdb772-bf83-4f31-a641-59d594eec381	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/39b956de-2b55-4de0-bf9c-1f7c14701514.png	voice-wave.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/39b956de-2b55-4de0-bf9c-1f7c14701514.png	image/png	{"mime":"image/png","size":217794,"originalName":"voice-wave.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-07 10:25:58.147+00	2025-01-07 10:25:58.147+00
cf660beb-b3ed-4743-bd5f-b77ba08b8400	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/b151e19a-c7e1-4979-b16e-5b9310111033.png	nqueens_adjusted_flowchart (3).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/b151e19a-c7e1-4979-b16e-5b9310111033.png	image/png	{"mime":"image/png","size":44880,"originalName":"nqueens_adjusted_flowchart (3).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-08 17:22:58.036+00	2025-01-08 17:22:58.036+00
13076023-db1e-412e-b5f4-918c68479e42	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/e159c8df-d703-485c-b76f-ee5512c5cd2a.jpeg	4edc028f-1417-4575-a50f-1f3e3b2f9991.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/e159c8df-d703-485c-b76f-ee5512c5cd2a.jpeg	image/jpeg	{"mime":"image/jpeg","size":174535,"originalName":"4edc028f-1417-4575-a50f-1f3e3b2f9991.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-08 17:23:02.118+00	2025-01-08 17:23:02.118+00
7dde4470-efd1-4bfb-b6ef-3edf8e1d57e6	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/bacc8684-c6f5-4527-a6af-1e6bdf4f6685.png	nqueens_adjusted_flowchart (2).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/bacc8684-c6f5-4527-a6af-1e6bdf4f6685.png	image/png	{"mime":"image/png","size":117292,"originalName":"nqueens_adjusted_flowchart (2).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 03:38:01.133+00	2025-01-09 03:38:01.134+00
6a55104d-660e-48b6-bd41-1ceab858a48e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/645af0a1-fd17-4c53-9eac-47306923dbc8.jpeg	qr.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/645af0a1-fd17-4c53-9eac-47306923dbc8.jpeg	image/jpeg	{"mime":"image/jpeg","size":62323,"originalName":"qr.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 03:38:04.988+00	2025-01-09 03:38:04.988+00
27b17906-c6a4-4f39-9e9c-c95147d293dd	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/cc5e1194-cdea-4745-8fb1-ab36f911b9f4.png	nqueens_adjusted_flowchart (2).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/cc5e1194-cdea-4745-8fb1-ab36f911b9f4.png	image/png	{"mime":"image/png","size":117292,"originalName":"nqueens_adjusted_flowchart (2).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 04:03:45.08+00	2025-01-09 04:03:45.08+00
d7a7befa-086b-4b42-969f-7df83e0820b2	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/9485610d-922a-49b9-8fba-7fd60431286d.png	Untitled.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/9485610d-922a-49b9-8fba-7fd60431286d.png	image/png	{"mime":"image/png","size":143489,"originalName":"Untitled.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 04:03:49.152+00	2025-01-09 04:03:49.152+00
07e3be15-8bbf-4b17-8a86-eed5105ca774	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/e416a543-3127-4368-acfc-93e6c1ae188e.jpeg	qr.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/e416a543-3127-4368-acfc-93e6c1ae188e.jpeg	image/jpeg	{"mime":"image/jpeg","size":62323,"originalName":"qr.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 04:24:33.833+00	2025-01-09 04:24:33.833+00
6be4aa4b-851f-4213-bb86-23e898b16b90	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/acdf1935-5373-477c-a51a-d28ea9e0bfb8.png	nqueens_adjusted_flowchart (3).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/acdf1935-5373-477c-a51a-d28ea9e0bfb8.png	image/png	{"mime":"image/png","size":44880,"originalName":"nqueens_adjusted_flowchart (3).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 04:24:38.68+00	2025-01-09 04:24:38.68+00
fbc4a013-5646-4b72-bcf4-ec78d4149649	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/912b2724-f5de-4695-9b31-b9600ae83a9c.png	img_prev_ui.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/912b2724-f5de-4695-9b31-b9600ae83a9c.png	image/png	{"mime":"image/png","size":14350,"originalName":"img_prev_ui.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 04:47:58.429+00	2025-01-09 04:47:58.429+00
7dfdd538-fad0-4137-9380-4218ffce3f64	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/0e833f6d-5b08-4e46-aea2-86b3186b59a2.jpeg	images.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/0e833f6d-5b08-4e46-aea2-86b3186b59a2.jpeg	image/jpeg	{"mime":"image/jpeg","size":47426,"originalName":"images.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 04:48:24.73+00	2025-01-09 04:48:24.73+00
e515b2cf-2da9-4965-b631-1b5f01d2eb80	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/e629938e-e123-4ef9-b552-a0648a888288.png	nqueens_adjusted_flowchart.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/e629938e-e123-4ef9-b552-a0648a888288.png	image/png	{"mime":"image/png","size":117292,"originalName":"nqueens_adjusted_flowchart.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 16:41:00.772+00	2025-01-09 16:41:00.773+00
663511cf-0108-4b60-bb95-13b6cd82b639	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/4cdfb983-bf60-4379-95a1-e0999450a5ba.png	nqueens_adjusted_flowchart (3).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/4cdfb983-bf60-4379-95a1-e0999450a5ba.png	image/png	{"mime":"image/png","size":44880,"originalName":"nqueens_adjusted_flowchart (3).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 16:41:03.891+00	2025-01-09 16:41:03.891+00
214dadbf-35fb-4ad4-abde-6121e0f496cd	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/ca3c348d-86c7-45be-896d-cdeb5a87a91a.jpeg	qr.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/ca3c348d-86c7-45be-896d-cdeb5a87a91a.jpeg	image/jpeg	{"mime":"image/jpeg","size":62323,"originalName":"qr.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 17:48:11.045+00	2025-01-09 17:48:11.045+00
97e75ccc-5215-40ef-9dd7-20cfd5a23315	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/581124a7-2a27-4db9-8c92-b1ad3f02fa6f.png	nqueens_adjusted_flowchart (3).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/581124a7-2a27-4db9-8c92-b1ad3f02fa6f.png	image/png	{"mime":"image/png","size":44880,"originalName":"nqueens_adjusted_flowchart (3).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-09 20:19:15.93+00	2025-01-09 20:19:15.93+00
5661de8f-c225-471e-8360-70973df7ff08	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/b3ac6e96-a985-4719-a76a-f1b02f7788b2.png	nqueens_adjusted_flowchart (1).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/b3ac6e96-a985-4719-a76a-f1b02f7788b2.png	image/png	{"mime":"image/png","size":117292,"originalName":"nqueens_adjusted_flowchart (1).png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-10 07:00:48.124+00	2025-01-10 07:00:48.124+00
182e2f88-7bec-4c7e-be59-605e23f5a424	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/35883fb7-b9a6-4b9f-ab5b-8dc4d227df2a.jpeg	91e28e44-95cf-4444-b7b3-9c703dbcf9f1.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/35883fb7-b9a6-4b9f-ab5b-8dc4d227df2a.jpeg	image/jpeg	{"mime":"image/jpeg","size":69258,"originalName":"91e28e44-95cf-4444-b7b3-9c703dbcf9f1.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-10 07:00:51.809+00	2025-01-10 07:00:51.809+00
95a6412d-8905-4508-a1e0-cc8df04f7c5b	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/78f35dfa-a665-4e85-9498-4e0cc65a8ec6.png	ImportInvoiceTask_Diagram.png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/78f35dfa-a665-4e85-9498-4e0cc65a8ec6.png	image/png	{"mime":"image/png","size":21553,"originalName":"ImportInvoiceTask_Diagram.png","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-10 08:58:49.184+00	2025-01-10 08:58:49.184+00
bbf1cfd4-f814-4aa6-9c7c-727cda919af3	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/6a4ed3eb-9714-4c97-aa0b-03892c47cc3f.jpeg	C Programming For Beginners - Master the C Language.jpeg		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/6a4ed3eb-9714-4c97-aa0b-03892c47cc3f.jpeg	image/jpeg	{"mime":"image/jpeg","size":144323,"originalName":"C Programming For Beginners - Master the C Language.jpeg","encoding":"7bit","destination":"storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-10 08:58:54.193+00	2025-01-10 08:58:54.193+00
a5136e72-3890-44a9-b6ab-d9cf2191b888	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/85a663ae-3faa-4a97-b211-b049fc05e9a9.png	import_invoice_process (1).png		http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/85a663ae-3faa-4a97-b211-b049fc05e9a9.png	image/png	{"mime":"image/png","size":169274,"originalName":"import_invoice_process (1).png","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-12 06:13:59.552+00	2025-01-12 06:13:59.552+00
b066ec48-2642-4233-b1c9-e2b289ed60be	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/f3950ee3-7f6f-4ff1-9836-76948f8c77a4.png	nqueens_adjusted_flowchart (3).png		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/f3950ee3-7f6f-4ff1-9836-76948f8c77a4.png	image/png	{"mime":"image/png","size":44880,"originalName":"nqueens_adjusted_flowchart (3).png","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-12 06:26:30.839+00	2025-01-12 06:26:30.839+00
a7de947c-349e-4d96-9b74-1ce8cecd2cc2	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/8cf3f0ae-a8f4-401b-8a9b-2ee47ca038b1.png	import_invoice_process (1).png		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/8cf3f0ae-a8f4-401b-8a9b-2ee47ca038b1.png	image/png	{"mime":"image/png","size":169274,"originalName":"import_invoice_process (1).png","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-12 06:27:49.101+00	2025-01-12 06:27:49.101+00
41573f6a-e507-4d29-9425-346bfe8d0b23	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/7251ff0a-1a69-4710-85f4-b2d7e4628910.jpg	Ho_Chi_Minh_1946.jpg		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/7251ff0a-1a69-4710-85f4-b2d7e4628910.jpg	image/jpeg	{"mime":"image/jpeg","size":17535,"originalName":"Ho_Chi_Minh_1946.jpg","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e_USER	2025-01-13 16:52:23.56+00	2025-01-13 16:52:23.56+00
7174f6d3-5713-412d-8a8e-afa3d65f69f2	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/81c69a49-5902-4007-bf27-ae97c8809e28.jpeg	qr.jpeg		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/81c69a49-5902-4007-bf27-ae97c8809e28.jpeg	image/jpeg	{"mime":"image/jpeg","size":62323,"originalName":"qr.jpeg","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074_MEMBERSHIP	2025-01-14 08:53:15.199+00	2025-01-14 08:53:15.199+00
8423d601-69d5-4025-8096-4721768db9fd	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/de8c24a4-3a4e-4a30-8c71-d3379625cd00.jpeg	qr.jpeg		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/de8c24a4-3a4e-4a30-8c71-d3379625cd00.jpeg	image/jpeg	{"mime":"image/jpeg","size":62323,"originalName":"qr.jpeg","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074_MEMBERSHIP	2025-01-14 08:54:21.62+00	2025-01-14 08:54:21.62+00
00147038-698a-4917-ae0a-33d167d36ad8	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/af0dfcab-ca39-422a-92d8-59c6f8ab4505.jpeg	qr.jpeg		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/af0dfcab-ca39-422a-92d8-59c6f8ab4505.jpeg	image/jpeg	{"mime":"image/jpeg","size":62323,"originalName":"qr.jpeg","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074_MEMBERSHIP	2025-01-24 17:30:56.364+00	2025-01-24 17:30:56.364+00
bd2d151e-8232-4b9d-ad47-4c68d88bbf9c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/ff48b3f5-3178-42b9-a026-519582179ba1.png	nqueens_adjusted_flowchart (3).png		http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/ff48b3f5-3178-42b9-a026-519582179ba1.png	image/png	{"mime":"image/png","size":44880,"originalName":"nqueens_adjusted_flowchart (3).png","encoding":"7bit","destination":"storage/image/branch/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e"}	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074_MEMBERSHIP	2025-01-24 17:37:24.677+00	2025-01-24 17:37:24.677+00
\.


--
-- Data for Name: branch_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branch_details (id, branch_id, so_dang_ky, ten_nha_thuoc, loai_hinh, tinh, huyen, dia_chi, nguoi_dai_dien, nguoi_chiu_trach_nhiem, nguoi_chiu_trach_nhiem_chuyen_mon, so_chung_chi_hanh_nghe, "createdAt", "updatedAt") FROM stdin;
f62f90a6-6b74-4ede-a1a2-9ff6d9a07809	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	sadadasdads	asdasdadadad	Bán lẻ	Thành phố Hải Phòng	Hồng Bàng	asdasdasdasd	asdasdasdasd	asdasdasdasd	asdasdasdasd	asdasdasdasd	2025-01-14 10:17:04.382	2025-01-18 02:30:37.058
a532d3ae-62ea-4140-b70e-a70c9831e091	744d5c4b-5a58-4771-a0fe-29d627ed2a65			bán lẻ								2025-01-25 22:57:25.632	2025-01-25 22:57:25.632
d8715b38-3e0e-43ed-b8e4-b26650ba19e0	50b1b432-e12a-4536-9c24-650b6a140923			bán lẻ								2025-01-25 22:58:11.582	2025-01-25 22:58:11.582
a705dbab-56f8-4e05-8e78-eaa8473df58f	6527b039-3fa7-4dd8-af9c-50cdefd5634e											2025-01-26 20:21:42.654	2025-01-26 20:21:42.654
dcf43c18-c7aa-4518-ad85-cee0bfb20883	5bdb318b-1e0f-4c2b-8f75-fead6da742f7											2025-01-26 21:01:22.166	2025-01-26 21:01:22.166
fdce6b2a-624c-446a-a228-0003081f2dbc	792c9de2-decd-4ded-a616-c5ad995a48f2											2025-01-26 21:03:06.787	2025-01-26 21:03:06.787
\.


--
-- Data for Name: branch_integration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branch_integration (id, branch_id, type, status, "createdAt", "updatedAt", deleted_at, deleted_by, integration_account, integration_id, integration_password) FROM stdin;
f00a6360-ccba-4790-b09d-a6ff8971d15e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	branch	1	2025-01-10 11:20:21.589+00	2025-01-10 11:20:21.589+00	\N	\N	adminsample	qwasdasd	asdadadad
ce5f8b14-e41f-4f84-8a43-fc18c851e413	744d5c4b-5a58-4771-a0fe-29d627ed2a65	branch	1	2025-01-25 22:57:25.627+00	2025-01-25 22:57:25.627+00	\N	\N			
1d184b98-5d7f-4b50-8b06-ae798b1ccdfa	50b1b432-e12a-4536-9c24-650b6a140923	branch	1	2025-01-25 22:58:11.575+00	2025-01-25 22:58:11.575+00	\N	\N			
59872475-9290-4f35-b793-fd6c974cbf8f	6527b039-3fa7-4dd8-af9c-50cdefd5634e	branch	1	2025-01-26 20:21:42.62+00	2025-01-26 20:21:42.62+00	\N	\N			
6b2104ee-e30f-4ece-8f54-b4706263f35b	5bdb318b-1e0f-4c2b-8f75-fead6da742f7	branch	1	2025-01-26 21:01:22.15+00	2025-01-26 21:01:22.15+00	\N	\N			
f93e5211-b24e-4a66-abb5-9a090f30af04	792c9de2-decd-4ded-a616-c5ad995a48f2	branch	1	2025-01-26 21:03:06.778+00	2025-01-26 21:03:06.778+00	\N	\N			
\.


--
-- Data for Name: branch_payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branch_payment (id, branch_id, type, status, payment_bank, payment_account_number, payment_account_owner, "createdAt", "updatedAt", deleted_at, deleted_by) FROM stdin;
cc6ad64e-9c2b-49ee-b484-cf03e17a2430	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	branch	1	mb	0201102021122	admin01	2025-01-10 11:21:23.003+00	2025-01-10 11:21:23.003+00	\N	\N
\.


--
-- Data for Name: branch_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branch_plans (id, plan_name, price, duration, description, "createdAt", "updatedAt", plan_type) FROM stdin;
3df449fa-78f8-4e26-abbc-60c3dbaa958d	1 năm	1000000	365	\N	2025-01-23 20:55:34.414452+00	2025-01-23 20:55:34.414452+00	1_year
52e2c818-0349-45ed-97e5-8de5b7fba5ca	30 ngày	100000	30	\N	2025-01-23 20:53:54.61171+00	2025-01-23 20:53:54.61171+00	30_day
\.


--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt", enabled_points) FROM stdin;
f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Secondary Branch test 2	456 Secondary St	987-654-3210	active	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-07 09:40:24.594+00	2024-12-07 09:40:24.594+00	t
e417a506-4154-425b-a834-34da2c7678f3	Secondary Branch test 2	so 9 ngo 46	0869794205	active	9b621b5e-5ad5-409a-b64e-1c22b3c52380	2025-01-25 09:00:40.802+00	2025-01-25 09:00:40.802+00	t
744d5c4b-5a58-4771-a0fe-29d627ed2a65	chi nhánh 2	so 9 ngo 46	0869794205	active	9b621b5e-5ad5-409a-b64e-1c22b3c52380	2025-01-25 20:16:43.226+00	2025-01-25 22:57:25.611+00	t
50b1b432-e12a-4536-9c24-650b6a140923	Main Branch	123 Main St	123-456-7890	inactive	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-07 09:40:24.594+00	2025-01-25 22:58:11.554+00	t
6527b039-3fa7-4dd8-af9c-50cdefd5634e	ádasdasd	ádasdasd	0869794205	active	bfd7183a-8fb7-4417-b1b3-70423b0e0a34	2025-01-26 20:21:42.419+00	2025-01-26 20:21:42.419+00	t
5bdb318b-1e0f-4c2b-8f75-fead6da742f7	chi nhánh hà đông 1	số 6 ngõ 49 phường hà đông	0869794205	active	1bce4112-b3ff-409c-9f5f-2f74d113af8a	2025-01-26 21:01:22.113+00	2025-01-26 21:01:22.113+00	t
792c9de2-decd-4ded-a616-c5ad995a48f2	chi nhánh hà đông 2	số 19 đường 18m	0869794205	active	1bce4112-b3ff-409c-9f5f-2f74d113af8a	2025-01-26 21:03:06.754+00	2025-01-26 21:03:06.754+00	t
\.


--
-- Data for Name: clinics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clinics (id, store_id, clinic_name, address, phone, email, created_at, updated_at, status, description, deleted_at) FROM stdin;
\.


--
-- Data for Name: consumers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt", consumer_id) FROM stdin;
9f639a69-7ff5-4169-af15-005ca4cb026c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Phương Quyên Dương	male	Andreane.Dare22@yahoo.com	020 4459 2218	uyRgf2lRNg	Murazik, Abshire and Roob	1952-10-10 16:43:57.268+00	https://actual-substitution.info/	5420 Robel Estates	Taceo consequuntur audentia cuppedia eligendi.	Galveston	Grampian	Jamil View	2024-12-23 23:54:17.687+00	2025-01-02 14:28:09.755+00	KH000001
8d4333a6-6ce0-4796-9ff9-448f2cdc17a1	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	John Doe	male	john.doe@example.com	0901234567	\N	\N	1990-01-01 00:00:00+00	\N	123 Main St	Preferred customer	Hanoi	Hoan Kiem	Phuc Tan	2024-12-07 09:40:24.599+00	2024-12-07 09:40:24.599+00	KH000006
90253c15-9f72-4f79-865a-61e618169f6b	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Jane Doe	female	jane.doe@example.com	0912345678	\N	\N	1995-05-05 00:00:00+00	\N	456 Another St	Frequent buyer	HCMC	District 1	Ben Nghe	2024-12-07 09:40:24.599+00	2024-12-07 09:40:24.599+00	KH000007
d0703842-53d8-4fc3-81e6-bb4e96d579e4	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Nam Thanh Đoàn	\N	Trenton.Gislason-Emmerich@yahoo.com	0248 4869 9522	7UTfRG6V4h	Wiza Inc	1974-08-06 10:51:16.002+00	https://sardonic-guacamole.com	7650 Waters Wall	Nulla quam saepe.	South Bend	Dumfries and Galloway	Allan Manors	2024-11-22 05:30:22.248+00	2025-01-03 03:40:43.988+00	KH000008
6a9ce761-cae1-4000-a02b-c472df96b84d	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Hải Duyên Nguyễn	male	Lori.Turcotte@hotmail.com	026 4201 6203	1wDSaxbFdx	Larson Inc	1976-06-12 14:17:08.839+00	https://magnificent-transom.biz/	87749 Jerad Trail	Coadunatio eligendi delectatio quia acer.	Sarasota	County Down	Fausto Burgs	2024-10-16 20:06:13.57+00	2025-01-02 20:29:42.945+00	KH000009
5ef538f5-73de-42a7-8fb8-9640eb0cb60e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Sơn Hải Hoàng	\N	Lavern_Veum-Luettgen@hotmail.com	025 8078 6561	3uwPOya7fc	Strosin, Harvey and Nicolas	2002-12-27 17:38:29.855+00	https://neglected-horde.name	72609 Church Avenue	Tabesco aequitas crastinus vulgaris sed urbs clam comprehendo depereo.	West Helene	Lancashire	N Pearl Street	2024-10-04 03:59:38.038+00	2025-01-02 11:45:54.781+00	KH000010
2386da57-fad9-4c04-adb1-211fbe2478fb	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Đình Luận Lê	female	Forest.Ullrich77@hotmail.com	024 2916 9868	bPJBwKHfFc	Bailey - White	1957-08-13 09:17:43.088+00	https://hopeful-armoire.org/	3341 Minnie Estate	Voluptatibus confido cohaero urbanus.	West Sethborough	Tyne and Wear	Jeanette Roads	2024-09-25 23:21:04.653+00	2025-01-03 06:50:11.907+00	KH000011
1e584fae-11e2-4c2f-98c9-6954ad8fd96e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Hồng Anh Trương	male	Ruben.Legros85@gmail.com	0267 0534 5844	Su4RDcgRPU	Price LLC	1994-08-01 06:12:50.946+00	https://classic-blossom.biz	488 Market Square	Architecto concedo vitiosus umbra iusto.	New Zachary	Cumbria	Satterfield Walk	2024-09-08 04:09:37.896+00	2025-01-02 18:08:34.614+00	KH000012
e241a0bb-ce11-4bbe-b535-0b440afb1d4c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Hồng Lâm Tăng	male	Karolann_Kuhic1@hotmail.com	0206 2838 5447	ervu3UjBKU	Conn - Howell	1954-11-15 03:20:30.226+00	https://pessimistic-turret.com	13053 Fritsch Terrace	Aequus auctor aggredior curso clibanus praesentium terebro quas.	North Bethesda	Gwynedd County	Kingfisher Close	2024-08-09 09:04:32.295+00	2025-01-02 22:33:07.035+00	KH000013
d4c0f077-60be-424d-8152-644121cc0511	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Quốc Vũ Nguyễn	female	Bonnie_Mosciski@hotmail.com	0250 8116 4795	ppQKrycSAd	Waelchi - Medhurst	1977-04-30 20:41:49.376+00	https://educated-ad.biz	64145 Highfield Road	Vulariter benigne demoror auxilium cunctatio pax arceo versus.	West Lenna	Leicestershire	Jast Rapids	2024-08-03 20:18:58.466+00	2025-01-03 05:50:32.794+00	KH000014
a3120a05-e035-4a59-8068-9d21170370ce	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Hữu Long Trần	male	Madyson62@hotmail.com	0281 8287 5799	nJYbz8I8Zf	Hilll - Stracke	1960-03-18 23:43:10.763+00	https://pricey-begonia.info/	36874 Marsh Lane	Tui defungo argumentum crinis expedita.	East Tyshawncester	Gwent	Marsh Lane	2024-07-17 16:34:19.981+00	2025-01-02 15:57:02.623+00	KH000015
f62a9b06-c66c-496d-9f36-e485eba56d65	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Phương Uyên Đào	female	Kathryne_Dicki@yahoo.com	022 9712 2449	fYgVjWMrOL	Doyle and Sons	1996-12-04 10:09:23.469+00	https://jubilant-mixture.net/	711 Bashirian Ramp	Suppellex cunabula cruentus sui derideo facere curis tam.	New Merle	County Tyrone	Damon Valleys	2024-05-28 13:43:46.143+00	2025-01-03 01:56:07.294+00	KH000016
f1d9fb0a-39be-4eb6-b934-7b1da3eccb7c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Bích Huệ Đỗ	male	Pinkie.Tillman@gmail.com	0269 7538 9447	7TpFIvogLo	Daugherty LLC	1984-11-08 04:33:28.53+00	https://grave-ocelot.name	9955 Rebekah Loop	Coma eius fugiat degenero aspicio carmen ulciscor est.	South Jamey	Gloucestershire	Mohr Extensions	2024-05-20 10:53:28.659+00	2025-01-02 14:19:16.441+00	KH000017
45b930b8-fd8b-400b-9c4a-5e86d54517f8	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Hiền Hòa Đặng	female	Isac4@hotmail.com	023 3459 7566	2G2jkSsfG2	Hintz Inc	1976-11-17 14:39:53.118+00	https://scientific-polyester.info	241 Shannon Ports	Contra celer cohors amplexus maxime labore demens delinquo.	West Adonis	Oxfordshire	Jaunita Island	2024-05-16 18:41:29.98+00	2025-01-02 17:20:43.851+00	KH000018
9b591142-42af-4417-ade3-b0d84343a785	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Tú Tâm Hà	\N	Solon72@gmail.com	022 1604 5491	8tD3THuFG6	Hoppe LLC	1996-06-09 19:55:12.688+00	https://burly-cod.org	7786 Rogahn Viaduct	Auctor illo basium admiratio voluptates caste usque.	Ankundingtown	Lothian	Ruthie Club	2024-04-24 19:53:27.566+00	2025-01-03 03:26:28.848+00	KH000019
6cd23c27-ac1f-422c-b4a5-a21416508411	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Bảo Huệ Trịnh	\N	Jayme.Effertz99@gmail.com	020 1750 2598	bTxEs0dO6x	Hessel and Sons	1989-06-15 01:45:21.457+00	https://grumpy-venom.net/	54550 Front Street	Veniam subnecto vulgaris.	Durganville	Greene County	Hagenes Mills	2024-04-01 20:40:13.945+00	2025-01-03 09:18:04.83+00	KH000020
871f903b-018c-4a69-9db9-6bd191f8be31	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Trúc Vy Trương	female	Sadie51@gmail.com	0299 3588 4328	Ia4xt4B83O	Hegmann LLC	1992-11-11 04:42:11.397+00	https://pleased-encouragement.org/	4043 Dare Fall	Aperio excepturi pauper adicio.	Chanellecester	Perry County	Domenico Ports	2024-03-25 03:23:50.987+00	2025-01-02 16:10:49.89+00	KH000021
fb24b0fb-9a26-4dd3-8459-409209a5e7e7	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Nhật Lệ Dương	\N	Marcel_Roberts@gmail.com	0206 0148 4616	P0uhmMLjjw	Schulist LLC	2000-09-10 21:52:21.433+00	https://skeletal-scaffold.com/	14930 The Mews	Vindico cognatus aetas assumenda.	Burien	Hertfordshire	Nader Forest	2024-03-07 17:55:22.826+00	2025-01-02 13:15:38.076+00	KH000023
fa6744fa-5a50-414d-9d6e-e81e1c662a30	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Jane Doe	female	jane.doe@example.com	0912345678	\N	\N	1995-05-05 00:00:00+00	\N	456 Another St	Frequent buyer	HCMC	District 1	Ben Nghe	2024-12-08 04:18:39.195+00	2024-12-08 04:18:39.196+00	KH000002
6153d7ca-4cf3-4844-945c-eb8828a607cc	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Jane Doe	female	jane.doe@example.com	0912345678	null	null	1995-05-05 00:00:00+00	NULL	456 Another St	Frequent buyer	HCMC	District 1	Ben Nghe	2024-12-08 04:07:55.306+00	2024-12-08 04:07:55.306+00	KH000003
97266836-de2f-4bcf-8701-83e61e1ddb5f	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Jane Doe	female	jane.doe@example.com	0912345678	null	null	1995-05-05 00:00:00+00	NULL	456 Another St	Frequent buyer	HCMC	District 1	Ben Nghe	2024-12-08 04:07:52.689+00	2024-12-08 04:07:52.69+00	KH000004
f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Jane Doe	female	jane.doe@example.com	0912345678	null	null	1995-05-05 00:00:00+00		456 Another St	Frequent buyer	HCMC	District 1	Ben Nghe	2024-12-08 04:03:47.024+00	2024-12-08 04:03:47.025+00	KH000005
736a6e1e-3197-4d5c-9595-be7a9028470b	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Phương Nam Lý	female	Eunice.Hickle@yahoo.com	0249 7372 7329	98r95tWdOA	Schinner - Carroll	1976-09-18 09:25:52.425+00	https://knowledgeable-decryption.com/	2053 Pennsylvania Avenue	Conicio debilito cruentus terminatio vir vulgo facere cicuta cenaculum.	Hilbertside	Hamilton County	Dusty Grove	2024-02-15 03:20:20.894+00	2025-01-02 15:52:59.637+00	KH000024
8d007eb5-3f05-428e-989e-5d11cc37aa02	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Thi Ngôn Phan	\N	Gwendolyn.Dietrich8@hotmail.com	0267 5372 3913	ZajOpsvtpU	Roob LLC	1950-08-05 03:18:47.621+00	https://sore-cork.net/	17942 Elroy Mission	Degusto cubo provident aro acquiro amet ullam doloremque debitis utroque.	West Newell	Hancock County	Roman Road	2024-02-03 07:11:32.621+00	2025-01-03 00:46:00.924+00	KH000025
c4a08bf7-efc4-48dd-82f2-4bf09f14e8ca	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	0	Hồng Lân Phùng	male	Kayden68@yahoo.com	020 1932 2416	paNyXw5fMf	Osinski - Jacobi	1971-11-18 00:40:22.59+00	https://agile-diagram.info	7694 Constance Fields	Consequatur soluta absum vilis speciosus vado.	Gastonia	Dorset	E 9th Street	2024-02-01 22:36:51.301+00	2025-01-03 11:18:40.423+00	KH000026
a12ebe2b-8d0b-4497-b984-ed0b8986a25d	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	100000	170000	Mai Quyên Tăng	male	Myron_Prohaska18@gmail.com	020 8350 7647	dlwBYYKgGH	Hauck - Schaefer	1980-11-28 12:48:45.388+00	https://upright-season.com	8574 Hane Throughway	Confero placeat custodia vulgivagus trepide curia spargo calculus deporto pariatur.	Haagburgh	Marion County	Reinger Trail	2024-03-09 19:19:24.086+00	2025-01-03 06:14:36.527+00	KH000022
\.


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (id, doctor_id, branch_id, specialization, email, status, chuyen_khoa, dia_chi, sdt, ghi_chu, is_active, is_deleted, loai_so_quy, noi_cong_tac, ten_bac_si, ten_slug, trinh_do, created_at, updated_at, deleted_at, "storesId") FROM stdin;
be667e73-cc95-435f-90d3-f21570837855	BS000001	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	vuduycp123@gmail.com	1	asdasdasd	asdasdasdasd	asdasdasdasd	vg 	t	f	0	asdasdasd	Đài nhật huy	dai nhat huy	asdasdasd	2025-01-16 20:49:26.999+00	2025-01-16 20:49:26.999+00	\N	\N
2a29d9b2-2a37-4182-9eaf-c81d856e7e3e	BS000016	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Human Directives Designer	Santina_Sauer@gmail.com	0	Creative	97616 Anna Lights	029 2935 6813	Anh hai mượn khâu biển mười.	t	f	3	Chi nhánh Phùng	Trường Long Trương	truong-long-truong	Thạc sĩ	2024-08-19 12:43:05.465+00	2025-01-17 06:22:43.81+00	2024-02-12 13:39:10.649+00	\N
5e8eb2ae-5955-4652-9b55-9b568892d86a	BS000017	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Forward Web Officer	Katheryn67@yahoo.com	1	Directives	9441 Wiegand Passage	0266 6445 0854	Giết quê ừ phá đang trăng núi lầu thế tám.	f	t	3	Cty Trương	Thanh Hải Đoàn	thanh-hai-oan	Bác sĩ chuyên khoa I	2024-03-23 23:37:01.863+00	2025-01-16 23:37:35.006+00	2024-06-16 15:07:55.927+00	\N
a7124412-cbfd-40d7-a986-4919efc14337	BS000018	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Central Brand Analyst	Pietro_Ritchie-Langosh21@yahoo.com	1	Interactions	1425 Hillside Avenue	0243 0975 3551	Ác chín thôi kim trăng bảy chỉ.	f	t	5	Chi nhánh Lý	Phương Hoa Tô	phuong-hoa-to	Bác sĩ chuyên khoa I	2024-02-10 00:08:44.08+00	2025-01-16 19:53:01.663+00	2024-11-28 20:42:07.717+00	\N
10e0c69a-5a81-447f-9d1f-af2376ed0490	BS000019	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Dynamic Marketing Executive	Cordell.Zulauf@gmail.com	0	Solutions	334 Shaun Cape	0262 8199 1040	Việc đập mua mướn đỏ tím thương không khâu vàng.	f	t	4	Chi nhánh Tăng	Minh Tuấn Hồ	minh-tuan-ho	Thạc sĩ	2024-05-30 22:33:19.768+00	2025-01-16 15:26:54.543+00	2024-07-14 06:08:09.446+00	\N
3c607dd4-25e7-426c-bf99-bfc2b3cb166a	BS000020	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Future Web Engineer	Gideon_Trantow-Buckridge60@yahoo.com	2	Factors	89331 Issac Landing	028 5597 6940	Biển xuồng đang đang giày.	t	t	4	Chi nhánh Trịnh	Đăng Minh Đinh	ang-minh-inh	Bác sĩ chuyên khoa II	2024-07-29 05:53:50.693+00	2025-01-17 08:07:15.421+00	\N	\N
b4cd08aa-ce3c-4ef2-a20f-577c1403d3c4	BS000021	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Human Factors Director	Neil14@yahoo.com	0	Assurance	67843 E 6th Street	0203 0915 0901	Ba thế chết đã.	f	t	1	Cty Hà	Ngọc Lai Mai	ngoc-lai-mai	Tiến sĩ	2024-06-18 23:26:55.191+00	2025-01-16 21:48:49.852+00	2024-11-05 12:09:32.07+00	\N
2ea7f825-971a-47da-8de3-32ccb33b16a5	BS000022	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Investor Solutions Executive	Darlene.Stehr@yahoo.com	2	Response	924 W 4th Avenue	0269 1691 6950	Giết lỗi thuyền.	f	t	3	Cửa hàng Đinh	Hồng Vinh Vũ	hong-vinh-vu	Thạc sĩ	2024-04-01 19:42:09.558+00	2025-01-16 15:36:53.799+00	2024-11-06 10:16:48.851+00	\N
d1ffc706-a701-43e0-9abd-5ffd311b3b80	BS000023	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Regional Communications Liaison	Myles_Lindgren@hotmail.com	1	Functionality	26627 Jeffery Circles	024 4193 6683	Kim ba tám được ác mướn.	f	t	4	Cửa hàng Đào	Diệp Anh Phan	diep-anh-phan	Bác sĩ chuyên khoa II	2024-03-23 22:27:44.723+00	2025-01-17 05:10:36.918+00	2024-04-25 12:45:12.52+00	\N
47df4e4a-7452-480b-ad02-626e78928f4d	BS000024	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Regional Directives Officer	Haven26@gmail.com	1	Usability	848 Pinfold Lane	0211 1386 8237	Thuyền mười thế nghỉ viết ba mướn.	f	t	5	Cty TNHH Tăng	Bích Loan Hà	bich-loan-ha	Thạc sĩ	2024-08-27 21:40:17.378+00	2025-01-16 22:22:33.001+00	2024-05-01 05:19:44.355+00	\N
9260b561-66d1-41b3-9599-27c4826a4461	BS000002	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	vuduycp123@gmail.com	0	Mắt	ok	asdasdasdasd	ok thooi	f	f	0	asdasdasd	Đài nhật minh huy	dai nhat minh huy	asdasdasd	2025-01-17 08:19:28.048+00	2025-01-17 08:19:28.048+00	\N	\N
033f5ced-c22e-4bab-9f1a-a17782827421	BS000003	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	vuduycp123@gmail.com	1	mắt	asdasdasdasd	0869794205	\N	t	f	0	bạch mai	vvũ đình hưng	vvu dinh hung	tiến sĩ	2025-01-17 12:38:27.218+00	2025-01-17 12:38:27.218+00	\N	\N
126ff8c2-3ea9-42c6-9b05-8fb3b51c6c08	BS000004	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	vuduycp123@gmail.com	1	nội	asdasdasdasd	039823223	\N	t	f	0	bạch mai	Hoa mety	hoa mety	tiến sĩ	2025-01-17 12:41:19.497+00	2025-01-17 12:41:19.497+00	\N	\N
492f6ffe-44c2-4772-b87f-58c4b413676c	BS000005	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Direct Accountability Orchestrator	Shania.Feeney@yahoo.com	0	Research	14033 Braun Views	028 0714 2944	Thuê hai phá thôi vá bơi tàu bàn.	t	f	4	Cửa hàng Trương	Ngọc Huyền Đỗ	ngoc-huyen-o	Tiến sĩ	2024-02-02 02:57:45.704+00	2025-01-17 05:44:34.053+00	2024-04-04 03:13:42.728+00	\N
8ef970ca-d673-4df0-b69d-b0567deb74fd	BS000006	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	International Group Manager	Ettie.OKon46@gmail.com	0	Accountability	56244 The Rise	0210 9351 9531	Thuê năm độc gì tàu núi thương độc.	f	t	1	Cty Lê	Lệ Hoa Hà	le-hoa-ha	Bác sĩ chuyên khoa II	2024-03-07 06:41:04.853+00	2025-01-16 13:07:34.63+00	2024-02-05 05:27:26.176+00	\N
2fea164e-9347-4f43-9e2b-5b5c1d31936c	BS000007	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	National Tactics Administrator	Adriana_Bartell@yahoo.com	0	Markets	395 Haag Fort	0220 3187 1692	Khâu đâu ngọt lầu nghỉ máy may không khâu đang.	t	t	4	Công ty Đỗ	Minh Thái Trương	minh-thai-truong	Bác sĩ chuyên khoa I	2024-09-27 09:08:47.7+00	2025-01-16 15:44:37.591+00	\N	\N
4ccc38a1-2212-4ef5-908c-fc828b65600b	BS000008	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Direct Group Strategist	Ena21@yahoo.com	2	Identity	915 Bennett Valleys	0270 3449 8474	Đánh thích ruộng bàn ruộng biết nha.	t	t	1	Cửa hàng Ngô	Minh Hùng Vũ	minh-hung-vu	Bác sĩ chuyên khoa I	2024-09-22 07:29:26.972+00	2025-01-17 02:49:00.912+00	\N	\N
c1369d1c-7d89-4e85-bc4b-d72d2dfd0b81	BS000009	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	National Assurance Developer	Eric_Jacobs@hotmail.com	0	Solutions	69330 Adonis Mountains	0206 2973 9466	Ba nước mười trăng mướn ghét.	f	t	0	Cty TNHH Hồ	Đăng Khương Bùi	ang-khuong-bui	Thạc sĩ	2024-01-30 19:41:30.333+00	2025-01-16 15:47:49.258+00	\N	\N
98a7a90c-37d0-4a18-a8c7-60f01adc1321	BS000010	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Corporate Applications Representative	Glenda.Cummings8@hotmail.com	2	Integration	66457 Labadie Park	0264 6913 4827	Yêu ác hương mây đâu giết ruộng.	f	t	5	Công ty Nguyễn	Việt Hương Đặng	viet-huong-ang	Bác sĩ chuyên khoa I	2024-06-11 15:57:15.53+00	2025-01-17 10:32:45.317+00	\N	\N
f287506b-f191-461f-82b3-9d5d3617b97c	BS000011	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Investor Integration Supervisor	Daryl0@hotmail.com	0	Applications	808 Lorenz Rue	0203 0043 6167	Nghỉ em bè ghế đã hai tám em.	f	f	5	Cửa hàng Nguyễn	Mộng Vi Trương	mong-vi-truong	Bác sĩ chuyên khoa I	2024-03-25 00:43:22.79+00	2025-01-17 04:58:30.73+00	\N	\N
d6e33f3c-e284-4bf8-b907-c3f55a178ed3	BS000012	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Investor Paradigm Representative	Christopher.Kuphal@hotmail.com	0	Division	5523 River Street	027 6183 6811	Leo xanh nha tàu giết vàng đâu xanh quần hết.	t	f	2	Cửa hàng Trần	Uyên Minh Lý	uyen-minh-ly	Bác sĩ chuyên khoa I	2024-06-24 22:28:06.641+00	2025-01-17 12:31:48.674+00	\N	\N
c80485ef-7817-4fc7-ac22-8791c7bb3a15	BS000013	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Senior Paradigm Facilitator	Telly1@yahoo.com	1	Creative	669 Ford Trafficway	0200 9986 0394	Hương biết chỉ dép làm yêu đã.	f	t	1	Cty Vương	Nguyên Hồng Lâm	nguyen-hong-lam	Bác sĩ chuyên khoa I	2024-09-06 04:01:21.965+00	2025-01-16 15:03:47.583+00	2024-04-06 08:02:56.145+00	\N
ed6cf7f0-c4e5-4af8-a9e2-4b1bd0427cf4	BS000014	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Global Integration Developer	Joey16@hotmail.com	1	Research	5764 4th Street	021 8278 0607	Thì vá cửa con ghét tàu tám chìm nghỉ quê.	f	t	5	Cty Hồ	Thục Vân Lâm	thuc-van-lam	Thạc sĩ	2024-03-16 14:04:18.4+00	2025-01-17 08:02:49.169+00	\N	\N
532b22f9-499c-4a76-a10d-8254bccc0a5f	BS000015	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Regional Intranet Agent	Mateo.Zulauf@yahoo.com	2	Implementation	73153 Santino Neck	0292 0564 7656	Bốn ba đá vẽ.	f	t	1	Chi nhánh Tô	Yến Trang Phùng	yen-trang-phung	Thạc sĩ	2024-02-01 08:03:23.571+00	2025-01-17 11:29:23.812+00	2024-02-09 00:04:30.213+00	\N
\.


--
-- Data for Name: financial_ledger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.financial_ledger (id, "soQuyID", "maPhieu", loai_chung_tu, loai_thu_chi, ten_loai_thu_chi, loai_nguoi_nop_nhan, nguoi_nop_nhan_id, ten_nguoi_nop_nhan, ngay_thu_chi, ghi_chu_he_thong, ton_quy_truoc, gia_tri, ton_quy_sau, trang_thai, branch_id, ghi_chu, phuong_thuc_thanh_toan_id, phieu_lien_quan, tong_tien_phieu_lien_quan, ma_phieu_lien_quan, ten_loai_chung_tu, ten_loai_nguoi_nop_nhan, ten_nha_thuoc, user_id, user_type, phuong_thuc_thanh_toan, "createdAt", "updatedAt", ten_nguoi_tao, loai) FROM stdin;
af9d8347-6bbe-4656-a3af-a3658e6da5fa	SQ000001	HDTC000001	1	1	Chi	1	1	asdasdasdasd	2025-01-18 17:00:00	\N	0	100000000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	0	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	0	2025-01-18 16:35:38.828+00	2025-01-18 16:35:38.828+00	\N	0
4c874708-6d9a-47a4-af8e-6f302a1c7ea0	SQ000002	HDTC000002	1	0	Thu	1	1	asdasdasdasd	2025-01-25 17:00:00	\N	0	2000000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	wdqwqdqwdqd	1	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	1	2025-01-18 16:45:34.458+00	2025-01-18 16:45:34.458+00	\N	0
2103c4d4-390d-4656-9608-35aca090e9e8	SQ000003	HDTC000003	1	0	Thu	1	1	asdasdasdasd	2025-01-18 17:30:16.467	\N	0	800000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	0	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	0	2025-01-18 17:30:28.559+00	2025-01-18 17:30:28.559+00	\N	1
58c7dd39-b370-4b8b-8b16-af5074f822ed	SQ000004	HDTC000004	1	1	Chi	1	1	ok	2025-01-18 17:30:40.881	\N	0	100000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	0	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	0	2025-01-18 17:30:59.274+00	2025-01-18 17:30:59.274+00	\N	1
e9b8d531-a455-43c3-99ba-1f892df788c9	SQ000005	HDTC000005	1	2	Chi	1	1	asdasdasdasd	2025-01-18 17:31:16.228	\N	0	10000000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	0	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	0	2025-01-18 17:31:33.013+00	2025-01-18 17:31:33.013+00	\N	1
32595926-8075-4192-ba9f-e90c9e5fc24d	SQ000006	HDTC000006	1	0	Thu	1	1	adasdad	2025-01-18 17:31:46.617	\N	0	0	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	0	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	0	2025-01-18 17:31:55.741+00	2025-01-18 17:31:55.741+00	\N	0
57c86fdd-cd74-431d-b57c-ea86623968c1	SQ000007	HDTC000007	1	3	Chi	1	1	aadasdasd	2025-01-18 17:34:48.387	\N	0	1000000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	asdasdasd	0	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	0	2025-01-18 17:35:05.05+00	2025-01-18 17:35:05.05+00	\N	0
4163440e-87bd-41f0-85fd-bf850fe6ca22	SQ000008	HDTC000008	1	0	Thu	1	1	asdasdasdasd	2025-01-18 17:44:13.251	\N	0	10000000	0	approved	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	1	\N	\N	\N	\N	\N	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	USER	1	2025-01-18 17:44:29.902+00	2025-01-18 17:44:29.902+00	\N	0
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
c7e937d4-9e4d-482d-89dc-a21adbd17944	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc giảm đau	Nhóm thuốc Thuốc giảm đau	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
88630a50-a1cf-41f3-9a52-f1cc7316a937	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc kháng sinh	Nhóm thuốc Thuốc kháng sinh	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
1a01efba-2f6c-4c44-8c71-2a46cf37eb44	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc hạ sốt	Nhóm thuốc Thuốc hạ sốt	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
3eaf0acc-072d-4854-b37d-ec2be0380823	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống dị ứng	Nhóm thuốc Thuốc chống dị ứng	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
37acde56-aeb2-4785-9847-152998338e99	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc tim mạch	Nhóm thuốc Thuốc tim mạch	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
3dfb9f50-e9cc-4988-bdae-c2402273c463	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc tiêu hóa	Nhóm thuốc Thuốc tiêu hóa	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
ff8ba5a3-e928-4995-8134-ff7a79b0b1d2	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc thần kinh	Nhóm thuốc Thuốc thần kinh	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
15fd453f-c09c-40a1-851e-532e270c8537	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc nội tiết	Nhóm thuốc Thuốc nội tiết	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
6b495a77-2fbf-44d1-9251-e6e87421a700	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc da liễu	Nhóm thuốc Thuốc da liễu	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
492b1374-7b3d-4e10-ac89-d70d03e7a6bc	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc mắt	Nhóm thuốc Thuốc mắt	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
e4afe384-27de-40fb-a02e-d5627059353e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc tai mũi họng	Nhóm thuốc Thuốc tai mũi họng	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
fc1d7846-b999-448a-baf5-34847d2b6b00	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc hô hấp	Nhóm thuốc Thuốc hô hấp	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
30d84589-360d-4c9f-b4ed-e58345b094fe	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Vitamin & Khoáng chất	Nhóm thuốc Vitamin & Khoáng chất	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
189200c3-a743-4304-9844-f1734db01c97	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống viêm	Nhóm thuốc Thuốc chống viêm	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
84048aaa-7104-4644-ad3e-9c3d4ec62f42	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc cơ xương khớp	Nhóm thuốc Thuốc cơ xương khớp	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
62ed0e43-b952-4c45-aaf3-110d58a785c0	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc tiết niệu - sinh dục	Nhóm thuốc Thuốc tiết niệu - sinh dục	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
163d275f-1029-4cb4-9a83-194e875c8d6c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống ung thư	Nhóm thuốc Thuốc chống ung thư	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
064424d6-c54b-4658-a6f5-807161614d7a	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống đông máu	Nhóm thuốc Thuốc chống đông máu	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
0cdee28a-1853-4a9c-a887-f796a501781e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc trị ký sinh trùng	Nhóm thuốc Thuốc trị ký sinh trùng	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
1dfb489b-7eb3-444f-a638-e88f6036af88	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Dung dịch tiêm truyền	Nhóm thuốc Dung dịch tiêm truyền	1	2024-12-09 23:58:15.821+00	2024-12-09 23:58:15.821+00	\N	\N
\.


--
-- Data for Name: import_invoice_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.import_invoice_product (id, import_invoice, product_id, quantity, price, total, "createdAt", "updatedAt", active_ingredient, barcode, content, expired_date, import_date, ingredients, larger_unit, larger_unit_value, lot_no, manufacturer, note, packaging, register_no, smaller_unit, smaller_unit_value, status, type, usage) FROM stdin;
8bcaf824-4f76-4e3d-ad6d-e6e496d3b4fd	e39c8b90-1a70-405c-889b-b39dad6844f3	a3fda509-5d82-4821-84ec-1c860001fffa	12	10000	120000	2025-01-09 19:25:41.728+00	2025-01-09 19:25:41.728+00	\N	\N	\N	2025-01-18 23:37:08.483363+00	2025-01-18 23:37:08.483363+00	\N	Vỉ	1	\N	\N	\N	\N	\N	Vỉ	1	1	thuoc	\N
125ef2cc-4a34-4761-94ff-e90db49f7f53	69bc7daf-6eb3-4fe4-9c35-cced6c064114	98b48a3c-5d3a-4c68-939c-efee4a1e88d1	1	100000	100000	2025-01-09 20:20:00.149+00	2025-01-09 20:20:00.149+00	\N	\N	\N	2025-01-18 23:37:08.483363+00	2025-01-18 23:37:08.483363+00	\N	Vỉ	1	\N	\N	\N	\N	\N	Vỉ	1	1	thuoc	\N
8485944f-3917-4330-8161-22c25f2bdb30	2195d938-ca78-4267-9b98-c6fa24a80459	98b48a3c-5d3a-4c68-939c-efee4a1e88d1	1	100000	100000	2025-01-09 20:22:19.705+00	2025-01-09 20:22:19.705+00	\N	\N	\N	2025-01-18 23:37:08.483363+00	2025-01-18 23:37:08.483363+00	\N	Vỉ	1	\N	\N	\N	\N	\N	Vỉ	1	1	thuoc	\N
d40e4f1d-02cd-4d98-a83a-dcbe45a3731e	ee60a921-969b-41b8-8abe-2f82368db452	fd4dc955-f842-4fb8-98c1-65ee4a74fc5f	10	100000	1000000	2025-01-10 07:03:44.986+00	2025-01-10 07:03:44.986+00	\N	\N	\N	2025-01-18 23:37:08.483363+00	2025-01-18 23:37:08.483363+00	\N	Vỉ	1	\N	\N	\N	\N	\N	Vỉ	1	1	thuoc	\N
7907fa08-6a60-40b9-a32d-117a8cb153c9	642a193c-b667-46c5-9bf5-2241d9cdea83	fd4dc955-f842-4fb8-98c1-65ee4a74fc5f	10	100000	1000000	2025-01-10 07:10:04.489+00	2025-01-10 07:10:04.489+00	\N	\N	\N	2025-01-18 23:37:08.483363+00	2025-01-18 23:37:08.483363+00	\N	Vỉ	1	\N	\N	\N	\N	\N	Vỉ	1	1	thuoc	\N
3d62bb5d-1a31-458e-982b-448e837022ce	18131b33-7766-4afe-b5be-dd7118434015	44bd134f-6b74-44fb-9498-2302b367896a	10	100000	1000000	2025-01-10 08:59:50.382+00	2025-01-10 08:59:50.382+00	\N	\N	\N	2025-01-18 23:37:08.483363+00	2025-01-18 23:37:08.483363+00	\N	Vỉ	1	\N	\N	\N	\N	\N	Vỉ	1	1	thuoc	\N
ddd908a2-4633-4564-94af-330d429dc8c8	8c51f35b-fda9-4989-aae7-7cb1ebb8c240	927693f3-0117-44c6-b518-9d5711a905cb	200	200000	40000000	2025-01-19 00:30:43.84+00	2025-01-19 00:30:43.84+00		8934614031346		2025-01-19 00:22:00.133+00	2025-01-19 00:22:00.133+00	Cefuroxime natri - 750mg Cefuroxime	lo	10	LO-000010	Kyung Dong Pharm. Co., Ltd.		hộp 10 lọ	VN-9703-10	vien	1	1	thuoc	\N
\.


--
-- Data for Name: import_invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.import_invoices (id, store_id, provider_id, invoice_no, name, total_amount, amount_due, amount_paid, debit, notes, vat, status, "createdAt", "updatedAt", lot_no) FROM stdin;
e39c8b90-1a70-405c-889b-b39dad6844f3	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	NH-000001	Nhập Hàng 1	120000	120000	0	-120000		0	0	2025-01-09 18:34:19.917+00	2025-01-09 19:25:41.727+00	\N
69bc7daf-6eb3-4fe4-9c35-cced6c064114	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	NH-000002	Nhập Hàng 1	100000	110000	50000	-60000		10	0	2025-01-09 18:34:19.917+00	2025-01-09 20:20:00.148+00	\N
2195d938-ca78-4267-9b98-c6fa24a80459	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	NH-000003	Nhập Hàng 1	100000	110000	50000	-60000		10	0	2025-01-09 18:34:19.917+00	2025-01-09 20:22:19.704+00	\N
08726734-f70c-4837-8ff8-d79189aae4b8	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	NH-000004	Nhập Hàng 1	0	0	0	0		0	0	2025-01-09 20:23:57.716+00	2025-01-09 20:24:09.935+00	\N
32f14645-d661-4c33-8dfa-df9466cd41ab	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	NH-000005	Nhập Hàng 1	0	0	0	0		0	0	2025-01-09 20:23:57.716+00	2025-01-09 20:24:19.77+00	\N
ee60a921-969b-41b8-8abe-2f82368db452	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	d8b0f94c-3aef-40e2-9422-317a7f2a43a1	NH-000006	Nhập Hàng 1	1000000	1000000	0	-1000000		0	0	2025-01-10 06:29:51.688+00	2025-01-10 07:03:44.985+00	\N
642a193c-b667-46c5-9bf5-2241d9cdea83	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	d8b0f94c-3aef-40e2-9422-317a7f2a43a1	NH-000007	Nhập Hàng 1	1000000	1000000	0	-1000000		0	0	2025-01-10 06:29:51.688+00	2025-01-10 07:10:04.485+00	\N
18131b33-7766-4afe-b5be-dd7118434015	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	d8b0f94c-3aef-40e2-9422-317a7f2a43a1	NH-000008	Nhập Hàng 1	1000000	1000000	0	-1000000		0	0	2025-01-10 08:46:26.299+00	2025-01-10 08:59:50.379+00	\N
089fd965-1eee-470b-9213-9213421d881b	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	c80f53e7-3025-43a5-af78-1feeaad47c59	NH-000009	Nhập Hàng 1	40000000	44000000	0	-44000000		10	1	2025-01-19 00:21:06.802+00	2025-01-19 00:23:35.326+00	LO-000009
8c51f35b-fda9-4989-aae7-7cb1ebb8c240	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	c80f53e7-3025-43a5-af78-1feeaad47c59	NH-000010	Nhập Hàng 1	40000000	44000000	0	-44000000		10	1	2025-01-19 00:21:06.802+00	2025-01-19 00:30:43.811+00	LO-000010
\.


--
-- Data for Name: invoice_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice_items (id, "invoiceId", "productName", quantity, price, total, unit, note, "productId") FROM stdin;
1fe7bb41-1c9f-4f31-9a16-fe3671c02d36	c62ff53e-9258-42a6-8ad0-da9ab7470498	Sữa rửa mặt Cetaphil 250ml	1	110000	110000	vi		\N
774ee71f-320d-4347-97a1-050fe1fa8617	220a9dc4-92a1-4a3d-94be-ea29e8542b08	Nước Tẩy Trang Senka All Clear Water Micellar Formula White 230ml	1	90000	90000	Hộp		\N
7b8070dc-130b-4a38-997c-7239b12372ca	220a9dc4-92a1-4a3d-94be-ea29e8542b08	Nước Lau Sàn Gift Hương Hoa Thiên Nhiên 3.8kg	3	75000	225000	Hộp		\N
734103ed-52d0-4214-a144-6af11e341426	220a9dc4-92a1-4a3d-94be-ea29e8542b08	Nước Xả Vải Downy Đam Mê 3L	1	160000	160000	Lọ		\N
0a90c576-62e4-4b69-905e-cd3cf047ab1e	220a9dc4-92a1-4a3d-94be-ea29e8542b08	Dầu Gội Sunsilk Mềm Mượt Diệu Kỳ 640g	1	70000	70000	Hộp		\N
78d4c31a-7fad-4bfc-bbae-1d9fc2fec129	123b6f00-b834-4227-9d42-e3b74e049fb9	Sữa Tắm Lifebuoy Bảo Vệ Vượt Trội 850g	1	80000	80000	Lọ		\N
80fc756d-2cf6-419c-8d7f-7363f7ab4ba1	387494ba-6424-4cb9-93c9-e8ca58fa55ea	Sữa Tắm Lifebuoy Bảo Vệ Vượt Trội 850g	1	80000	80000	Lọ		\N
05ba9dfa-f173-4d9a-a00c-a56fe61b6b84	387494ba-6424-4cb9-93c9-e8ca58fa55ea	Sữa rửa mặt Cetaphil 250ml	1	110000	110000	Tuýp		\N
00d45b32-b9dd-49c1-93f7-e56d1a08448b	8855ffaf-c713-4f29-9862-3d6aa3fc2a45	Sữa rửa mặt Cetaphil 250ml	1	110000	110000	Tuýp		\N
d3144693-a538-4ee9-b0ed-0886d2fa91db	f075bb58-f7cd-407a-b8ff-1c86ccb3adec	Nước Tẩy Trang Senka All Clear Water Micellar Formula White 230ml	1	90000	90000	Hộp		\N
f88562ec-8f54-46f2-8b24-7b2b913364d2	f94a9c9f-9948-4d60-84b7-1a11b759708c	Sữa rửa mặt Cetaphil 250ml	1	110000	110000	Tuýp		\N
0fc44512-1d13-4f8e-bd58-9e0fa1feb63b	f4b5175c-5b8a-4b0c-8fe3-8910a52287cd	Sữa rửa mặt Cetaphil 250ml	1	110000	110000	Lọ		\N
90a90d24-6ff0-4e25-924d-2cf6a9e236bd	b4da1b21-5a18-4763-a9ab-a40329ee625a	Nước Tẩy Trang Senka All Clear Water Micellar Formula White 230ml	3	90000	270000	Tuýp		\N
c10255fa-feb5-4d21-a8fc-5ca925f2f7ac	d27ee42d-af73-450a-9155-554c8679d39c	Sữa rửa mặt Cetaphil 250ml	2	110000	220000	Lọ		1c5b87ac-44fa-429b-8905-0c6a6839218e
b4411593-f049-421c-95bb-1152a06b79f6	bbda1e63-1a15-49b8-b1e7-950f87d97659	Sữa rửa mặt Cetaphil 250ml	2	110000	220000	Lọ		1c5b87ac-44fa-429b-8905-0c6a6839218e
805a02d3-f033-4783-9f3f-d5679008b0b6	7ffa14a0-83f9-40be-bfd9-5414718413b5	Sữa rửa mặt Cetaphil 250ml	1	110000	110000	Lọ		1c5b87ac-44fa-429b-8905-0c6a6839218e
abb6b292-bcef-40b7-9065-45bc94520b0b	30f9972c-d0aa-413c-9f8e-b7f270186665	Nước Tẩy Trang Senka All Clear Water Micellar Formula White 230ml	1	90000	90000	Tuýp		b1b47442-a817-45c5-a6c3-93b39d53ac8c
2fcf24ae-113e-4741-a9f3-e0e4367293df	707a1d23-8d89-4908-8d8a-edf4ec653343	Yumangel F	1	20000	20000	goi		a3fda509-5d82-4821-84ec-1c860001fffa
c71b2d0d-bd42-4b2a-a784-490ad1ab5ba4	a04fb7e6-00d3-4a70-8cab-0fa6df32c17a	Yumangel F	1	20000	20000	goi		a3fda509-5d82-4821-84ec-1c860001fffa
b0e55389-ff0a-4ab8-9e30-9d72b20f845e	820f388c-a052-4153-b35c-24900b74638d	Yumangel F	1	20000	20000	goi		a3fda509-5d82-4821-84ec-1c860001fffa
36cfdb91-e06a-4669-90f8-467a29209db8	5d9c901c-33d6-4dc6-8d09-2ab8f30f6daf	Yumangel F	1	20000	20000	goi		a3fda509-5d82-4821-84ec-1c860001fffa
\.


--
-- Data for Name: invoice_prescriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice_prescriptions (id, "invoiceId", prescription_id, ma_don_thuoc, ngay_ke, bac_si_id, co_so_kham, chuan_doan, benh_nhan, ngay_sinh, nam_sinh, tuoi, thang_tuoi, can_nang, dia_chi, nguoi_giam_ho, cmnd, dien_thoai, the_bhyt, gioi_tinh, created_at, updated_at) FROM stdin;
60ef7f35-7f72-4aa8-bbd4-4cc6ac4c537c	30f9972c-d0aa-413c-9f8e-b7f270186665	DT000001		2025-01-18 10:16:51.901	47df4e4a-7452-480b-ad02-626e78928f4d	Cty TNHH Tăng		Hà minh tăng	\N	2002	0	0	0	số 8 ba đình	bà huệ		0869794205		0	2025-01-18 11:31:05.762+00	2025-01-18 11:31:05.762+00
b4e07f84-1247-460c-8816-43dabe6988e7	707a1d23-8d89-4908-8d8a-edf4ec653343	DT000002		2025-01-19 05:32:27.804	47df4e4a-7452-480b-ad02-626e78928f4d	Cty TNHH Tăng		Hà minh tăng	\N	20	0	0	0	số 8 ba đình	bà huệ		0897692043		0	2025-01-19 05:34:59.796+00	2025-01-19 05:34:59.796+00
dab01664-acba-414b-be6a-e1dbd98ab1b1	a04fb7e6-00d3-4a70-8cab-0fa6df32c17a	DT000003		2025-01-19 05:32:27.804	47df4e4a-7452-480b-ad02-626e78928f4d	Cty TNHH Tăng		Hà minh tăng	\N	20	0	0	0	số 8 ba đình	bà huệ		0897692043		0	2025-01-19 05:37:13.75+00	2025-01-19 05:37:13.75+00
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoices (id, invoice_id, "branchId", "saleDate", "saleTime", "customerName", "customerId", "priceList", "isPrescriptionSale", vat, "totalPrice", discount, "amountDue", "amountPaid", debit, notes, "autoPrintInvoice", "printBatchNumber", "userType", "userId", "createdAt", "updatedAt") FROM stdin;
c62ff53e-9258-42a6-8ad0-da9ab7470498	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-29	1735438268997	Frank Jakubowski	\N		f	0	110000	0	110000	0	-110000		f	f	user	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-29 03:11:28.998	2024-12-29 03:11:28.998
220a9dc4-92a1-4a3d-94be-ea29e8542b08	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-29	1735458767743	Bertha Lang	\N		f	0	545000	0	545000	2000000	1455000		f	f	user	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-29 07:55:14.36	2024-12-29 07:55:14.36
123b6f00-b834-4227-9d42-e3b74e049fb9	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-29	1735473437220	Bertha Lang	\N		f	0	80000	0	80000	0	-80000		f	f	\N	\N	2024-12-29 12:00:07.367	2024-12-29 12:00:07.367
387494ba-6424-4cb9-93c9-e8ca58fa55ea	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-29	1735473437220	Bertha Lang	\N		f	0	190000	0	190000	0	-190000		f	f	\N	\N	2024-12-29 12:05:54.04	2024-12-29 12:05:54.04
8855ffaf-c713-4f29-9862-3d6aa3fc2a45	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-30	1735541659382		\N		f	0	110000	0	110000	0	-110000		f	f	\N	\N	2024-12-30 06:54:28.574	2024-12-30 06:54:28.574
f075bb58-f7cd-407a-b8ff-1c86ccb3adec	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-30	1735545707468		\N		f	0	90000	0	90000	0	-90000		f	f	\N	\N	2024-12-30 08:01:55.515	2024-12-30 08:01:55.515
f94a9c9f-9948-4d60-84b7-1a11b759708c	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-30	1735548726915	Bertha Lang	\N		f	0	110000	0	110000	0	-110000		f	f	\N	\N	2024-12-30 08:52:32.133	2024-12-30 08:52:32.133
f4b5175c-5b8a-4b0c-8fe3-8910a52287cd	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-03	1735948430469	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		f	0	110000	0	110000	0	-110000		f	f	\N	\N	2025-01-04 00:23:34.608	2025-01-04 00:23:34.608
b4da1b21-5a18-4763-a9ab-a40329ee625a	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07	1736224569981	Trúc Vy Trương	871f903b-018c-4a69-9db9-6bd191f8be31		f	0	270000	250000	20000	80000	60000		f	f	\N	\N	2025-01-07 04:37:25.562	2025-01-07 04:37:25.562
d27ee42d-af73-450a-9155-554c8679d39c	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07	1736236297294	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		f	10	220000	0	232000	0	-232000		f	f	user	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07 07:52:39.525	2025-01-07 07:52:39.525
bbda1e63-1a15-49b8-b1e7-950f87d97659	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07	1736236297294	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		f	10	220000	0	232000	400000	168000		f	f	user	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07 07:54:42.082	2025-01-07 07:54:42.082
7ffa14a0-83f9-40be-bfd9-5414718413b5	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07	1736243359923	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		f	0	110000	0	100000	0	-100000		f	f	user	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-07 09:49:50.905	2025-01-07 09:49:50.905
30f9972c-d0aa-413c-9f8e-b7f270186665	HD000013	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-18	1737195780328	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		t	0	90000	0	90000	0	-90000		f	f	user	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-18 11:31:05.74	2025-01-18 11:31:05.74
707a1d23-8d89-4908-8d8a-edf4ec653343	HD000014	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-19	1737264862159	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		t	0	20000	0	20000	0	-20000		f	f	membership	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074	2025-01-19 05:34:59.781	2025-01-19 05:34:59.781
a04fb7e6-00d3-4a70-8cab-0fa6df32c17a	HD000015	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-19	1737264862159	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		t	0	20000	0	20000	0	-20000		f	f	membership	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074	2025-01-19 05:37:13.742	2025-01-19 05:37:13.742
820f388c-a052-4153-b35c-24900b74638d	HD000016	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-19	1737265159317	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		f	0	20000	0	20000	0	-20000		f	f	membership	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074	2025-01-19 05:40:53.929	2025-01-19 05:40:53.929
5d9c901c-33d6-4dc6-8d09-2ab8f30f6daf	HD000017	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-19	1737265159317	Mai Quyên Tăng	a12ebe2b-8d0b-4497-b984-ed0b8986a25d		f	0	20000	0	20000	0	-20000		f	f	membership	b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074	2025-01-19 05:41:20.101	2025-01-19 05:41:20.101
\.


--
-- Data for Name: membership_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership_permissions (membership_id, permission_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: memberships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt", address, age, last_login) FROM stdin;
1fa61b7e-61d0-4709-889f-4c8bb404b6a5	member 2	member	hai	2004-12-11 17:00:00+00	$2b$05$sQpjPTH1WF6ZUgv/dJgH2uDxOaufT/2DspmCSCcMRaRRudT9kD1pC	membership1@example.com	0912345678	https://static.vecteezy.com/system/resources/previews/023/211/970/non_2x/avatar-icon-sample-vector.jpg	\N	inactive	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	{Branch.Read,Branch.Update,Branch.Create,Medicine.Read,Medicine.Update,Medicine.Create,Medicine.Delete,Promotion.Read,Promotion.Update,Promotion.Create,Promotion.Delete,Customer.Read,Customer.Update,Customer.Create,Customer.Delete,Supplier.Read,Supplier.Update,Supplier.Create,Supplier.Delete,Report.Read,Report.Update,Report.Create}	2024-12-08 06:46:07.841+00	2024-12-08 06:46:07.841+00	\N	\N	\N
a3c689fa-f20b-4b1c-ae44-4f73e8b7c0a1	member 1	member	okd	2024-12-12 17:00:00+00	asdasdasd	membership1@example.com	0912345678	https://i.pinimg.com/736x/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg	This is a test user	active	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	{READ,WRITE,DELETE}	2024-12-08 06:11:40.197+00	2024-12-08 06:11:40.197+00	\N	\N	\N
b4ca396c-36fe-4cf6-8a2a-ce9f6f68f074	1234dcdd	okok	okk	2025-01-17 06:38:28.985+00	$2b$10$yrpvj3Rt8iY.6t0r/JPTT.BZc0IBu3sZCYAnoDqks1E/OhGARhQDK	zoocp123@gmail.com	0869794205	http://localhost:4001/storage/image/avatar/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/ff48b3f5-3178-42b9-a026-519582179ba1.png	\N	active	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All}	\N	\N	\N	\N	2025-01-24 18:22:04.368+00
\.


--
-- Data for Name: other_charges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.other_charges (id, "invoiceId", name, value) FROM stdin;
\.


--
-- Data for Name: payment_histories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_histories (id, subscription_id, admin_subscription_id, payment_date, amount, payment_method, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: point_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.point_transactions (id, "pointId", type, amount, note, "createdAt") FROM stdin;
d57c511a-21dd-4f35-a156-c05d513ee178	8124e54c-826d-4b00-a369-210cffe52fa8	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
0b908001-d8bd-4318-8c98-c7243a767454	14d381b4-93ee-4225-9bec-8aeb3d169470	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
cf8370eb-9e71-471b-a797-81a1676bc2e7	c451e04f-9a4b-4e5f-ad92-8f663bab4ad2	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
3256e3cb-cbdd-422f-a37f-c076b4deccb4	ce930333-274b-4a95-8336-24a0610783ce	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
bd284ed4-7e45-4a03-af6b-8515de8131a3	4b4725dd-a7c0-42b0-a7be-d4ddb83bb796	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
011d6b89-7208-4a8b-94e6-c461cdef5a30	d1f77fe8-88b9-45c0-9002-5a42a89a6b97	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
f132e2b7-1bf2-45ce-8e6c-6793033c0e78	a98d4b16-d1d4-413f-84bc-8f9d35b47d48	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
6b2dead5-e87f-40d7-9605-6dce46de75b3	d59e0253-1c3f-44a6-aff0-9710453a543e	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
9cbbebca-25cb-40fa-af0d-1da7d3bcceb4	a25318c3-2c82-4975-9e3a-a13d83bb5899	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
e63e7ea6-dd96-4161-8c16-1b27f28182cc	2926ef4f-5286-476e-9845-48b6d6deedc7	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
ab4c74c0-03a6-42ea-9d32-9cdfe1543cb1	42efb2d8-b1d3-456e-88bd-e109b0547eee	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
a806b764-e183-4f28-be59-aa9427b712a6	fc83dd75-f628-4b6c-bcbf-05593b6d53bc	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
12c36db7-385e-4486-9838-c96582770216	66de16e5-32d6-4c68-ada7-ad718d4c51ae	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
8c727ebe-e6c4-4c49-bba9-c2ceff9c35d0	3c429b1c-19d7-46f4-ba0d-bd5526c7f6af	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
6db561b3-ffc6-4880-beb6-65fb6e12f710	d01495d4-bad4-43db-9d8f-28b80898f321	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
f76958cd-0728-404e-9cbd-a147929d8888	730dee3f-b6d4-4817-bcf4-99ea75ba94be	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
51fff338-8ea5-435e-9111-5cb9b44e67ee	7b825ce8-d455-45ce-9404-9089a9ddc505	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
62758e89-a34e-4796-a856-5c7b1ef9fe9a	68f8eccb-8453-4a6e-a2ce-7081c8964c64	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
cae3633c-291a-4d28-99b8-8c78d07d79f2	cb722cc1-a803-43e4-bed6-deec300bda17	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
9bc19d79-a78d-45b0-8b9c-d19b216c95ea	94842c6f-6b59-400e-b5be-8544628d5bb2	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
35e92659-303e-451e-802c-17db24002d3d	843a01b1-4594-4c6e-a25a-ba85097d2853	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
8949023d-7974-4231-83d9-d28ee39b450a	6f73b9e2-508b-4872-b8da-2479e96e4e8d	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
54ecde2d-7e22-4f6e-be88-564a8306461e	8d9193d2-a107-4492-8440-9e6d17cfc54c	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
ccf47d89-4912-4515-94ed-707f1076dc10	0a1e9dc5-0549-4110-8a5e-8bfe9fb96efc	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
839c3d81-bc22-4871-a881-3df0d80b3332	47f46f1b-8d43-4c61-bef8-e0dc3c00bb3a	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
38367f02-5303-47bc-ae4c-d1f995342561	dac9bac8-f1ab-4424-95af-e92bbcd657ea	add	0	Initial transaction based on existing points	2025-01-11 02:55:13.815
\.


--
-- Data for Name: points; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.points (id, "totalPoints", "createdAt", "updatedAt", "consumerId", "storeId") FROM stdin;
8124e54c-826d-4b00-a369-210cffe52fa8	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	8d4333a6-6ce0-4796-9ff9-448f2cdc17a1	\N
14d381b4-93ee-4225-9bec-8aeb3d169470	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	90253c15-9f72-4f79-865a-61e618169f6b	\N
c451e04f-9a4b-4e5f-ad92-8f663bab4ad2	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	fa6744fa-5a50-414d-9d6e-e81e1c662a30	\N
ce930333-274b-4a95-8336-24a0610783ce	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	97266836-de2f-4bcf-8701-83e61e1ddb5f	\N
4b4725dd-a7c0-42b0-a7be-d4ddb83bb796	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	6153d7ca-4cf3-4844-945c-eb8828a607cc	\N
d1f77fe8-88b9-45c0-9002-5a42a89a6b97	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	\N
a98d4b16-d1d4-413f-84bc-8f9d35b47d48	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	e241a0bb-ce11-4bbe-b535-0b440afb1d4c	\N
d59e0253-1c3f-44a6-aff0-9710453a543e	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	fb24b0fb-9a26-4dd3-8459-409209a5e7e7	\N
a25318c3-2c82-4975-9e3a-a13d83bb5899	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	1e584fae-11e2-4c2f-98c9-6954ad8fd96e	\N
2926ef4f-5286-476e-9845-48b6d6deedc7	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	d4c0f077-60be-424d-8152-644121cc0511	\N
42efb2d8-b1d3-456e-88bd-e109b0547eee	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	c4a08bf7-efc4-48dd-82f2-4bf09f14e8ca	\N
fc83dd75-f628-4b6c-bcbf-05593b6d53bc	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	9f639a69-7ff5-4169-af15-005ca4cb026c	\N
66de16e5-32d6-4c68-ada7-ad718d4c51ae	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	a3120a05-e035-4a59-8068-9d21170370ce	\N
3c429b1c-19d7-46f4-ba0d-bd5526c7f6af	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	9b591142-42af-4417-ade3-b0d84343a785	\N
d01495d4-bad4-43db-9d8f-28b80898f321	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	d0703842-53d8-4fc3-81e6-bb4e96d579e4	\N
730dee3f-b6d4-4817-bcf4-99ea75ba94be	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	871f903b-018c-4a69-9db9-6bd191f8be31	\N
7b825ce8-d455-45ce-9404-9089a9ddc505	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	736a6e1e-3197-4d5c-9595-be7a9028470b	\N
68f8eccb-8453-4a6e-a2ce-7081c8964c64	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	6a9ce761-cae1-4000-a02b-c472df96b84d	\N
cb722cc1-a803-43e4-bed6-deec300bda17	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	2386da57-fad9-4c04-adb1-211fbe2478fb	\N
94842c6f-6b59-400e-b5be-8544628d5bb2	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	f1d9fb0a-39be-4eb6-b934-7b1da3eccb7c	\N
843a01b1-4594-4c6e-a25a-ba85097d2853	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	5ef538f5-73de-42a7-8fb8-9640eb0cb60e	\N
6f73b9e2-508b-4872-b8da-2479e96e4e8d	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	45b930b8-fd8b-400b-9c4a-5e86d54517f8	\N
8d9193d2-a107-4492-8440-9e6d17cfc54c	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	f62a9b06-c66c-496d-9f36-e485eba56d65	\N
0a1e9dc5-0549-4110-8a5e-8bfe9fb96efc	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	6cd23c27-ac1f-422c-b4a5-a21416508411	\N
47f46f1b-8d43-4c61-bef8-e0dc3c00bb3a	1000	2025-01-03 19:09:39.234	2025-01-03 19:09:39.234	8d007eb5-3f05-428e-989e-5d11cc37aa02	\N
dac9bac8-f1ab-4424-95af-e92bbcd657ea	997	2025-01-03 19:09:39.234	2025-01-19 05:41:20.099	a12ebe2b-8d0b-4497-b984-ed0b8986a25d	\N
\.


--
-- Data for Name: product_assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_assets (id, store_id, asset_id, product_id, "createdAt", "updatedAt") FROM stdin;
737547a0-617e-4768-8d54-dfdeb0b6ab8e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	d82ef21e-2ec9-4adb-a150-19e961b67adf	\N	2025-01-04 11:32:46.997+00	2025-01-04 11:32:46.997+00
f0355913-aa70-4fe0-8bfd-0ab87337e1e1	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	e37bab02-0572-4854-b266-fb09329ef3d9	\N	2025-01-04 11:48:15.409+00	2025-01-04 11:48:15.409+00
534759ae-6680-4edc-b78a-3587f1ea66b2	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	b2130651-34c4-4100-af43-0f56a6421369	\N	2025-01-04 11:52:49.073+00	2025-01-04 11:52:49.073+00
bdbf4621-2d00-4049-8b89-4bff546cc9b4	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	0cbeec20-4c7a-4b3b-ae71-7909d75d06fc	\N	2025-01-06 18:24:43.399+00	2025-01-06 18:24:43.399+00
2afeea4d-a02a-44ac-b41e-73ce66ded1d3	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2af1a93d-0403-4ac0-9701-82d225a3578e	\N	2025-01-06 18:26:00.565+00	2025-01-06 18:26:00.565+00
e912404a-9e24-4356-a006-c5808abf2552	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	b969c1b2-3f7c-4b8d-ada2-f6f839ea3c43	\N	2025-01-07 03:51:21.815+00	2025-01-07 03:51:21.815+00
7082ef1a-30cc-4ad1-bb03-71ce4b87eced	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	eec25dbc-8b2c-4c55-8bae-eb17db98176a	\N	2025-01-07 03:53:20.936+00	2025-01-07 03:53:20.936+00
6c53e474-27f5-440e-ba27-22ac13e0af81	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	5244a297-d856-4a80-b188-56e841f234d8	\N	2025-01-07 10:25:54.101+00	2025-01-07 10:25:54.101+00
bb153d5e-0b34-42cc-8334-4fe541256661	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	fdfdb772-bf83-4f31-a641-59d594eec381	\N	2025-01-07 10:25:58.152+00	2025-01-07 10:25:58.152+00
4b66ced0-cc1c-4f65-bbbf-554eefdd2aff	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	cf660beb-b3ed-4743-bd5f-b77ba08b8400	\N	2025-01-08 17:22:58.051+00	2025-01-08 17:22:58.051+00
145547de-3ddb-4176-95f7-0f913beb7827	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	13076023-db1e-412e-b5f4-918c68479e42	\N	2025-01-08 17:23:02.126+00	2025-01-08 17:23:02.126+00
90793b3a-c636-4bac-8475-1e0e8450bb06	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	7dde4470-efd1-4bfb-b6ef-3edf8e1d57e6	\N	2025-01-09 03:38:01.176+00	2025-01-09 03:38:01.176+00
60d59a94-8d70-45d8-b03a-2d80183316d5	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	6a55104d-660e-48b6-bd41-1ceab858a48e	\N	2025-01-09 03:38:05.089+00	2025-01-09 03:38:05.089+00
8366a987-4e07-4cff-aa71-2144433d5b81	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	27b17906-c6a4-4f39-9e9c-c95147d293dd	\N	2025-01-09 04:03:45.092+00	2025-01-09 04:03:45.092+00
dc64cd3b-97b1-4c1b-b4a7-f33682aac28c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	d7a7befa-086b-4b42-969f-7df83e0820b2	\N	2025-01-09 04:03:49.161+00	2025-01-09 04:03:49.161+00
a243759e-ba82-4412-804c-84853b7e8a8a	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	07e3be15-8bbf-4b17-8a86-eed5105ca774	a3fda509-5d82-4821-84ec-1c860001fffa	2025-01-09 04:24:33.848+00	2025-01-09 04:24:33.848+00
7448e559-6c85-4d11-8f32-0cab049892f3	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	6be4aa4b-851f-4213-bb86-23e898b16b90	a3fda509-5d82-4821-84ec-1c860001fffa	2025-01-09 04:24:38.709+00	2025-01-09 04:24:38.709+00
97e5fd6f-1d01-4a02-b8f1-93152ea132d7	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	fbc4a013-5646-4b72-bcf4-ec78d4149649	\N	2025-01-09 04:47:58.439+00	2025-01-09 04:47:58.439+00
5846d2ca-d807-4f46-b499-0b0af598a41b	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	7dfdd538-fad0-4137-9380-4218ffce3f64	\N	2025-01-09 04:48:24.738+00	2025-01-09 04:48:24.738+00
2540f40c-35b1-4978-af5f-7b48b9b3239c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	e515b2cf-2da9-4965-b631-1b5f01d2eb80	\N	2025-01-09 16:41:00.79+00	2025-01-09 16:41:00.79+00
1eadbd76-e3f9-4909-909a-eece696d40e5	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	663511cf-0108-4b60-bb95-13b6cd82b639	\N	2025-01-09 16:41:03.9+00	2025-01-09 16:41:03.9+00
aeb7e737-c80b-4570-b174-eadb764556f9	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	214dadbf-35fb-4ad4-abde-6121e0f496cd	\N	2025-01-09 17:48:11.056+00	2025-01-09 17:48:11.056+00
394d7a27-8b6a-4b92-bd33-8f8bf9be7a80	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	97e75ccc-5215-40ef-9dd7-20cfd5a23315	98b48a3c-5d3a-4c68-939c-efee4a1e88d1	2025-01-09 20:19:15.942+00	2025-01-09 20:19:15.942+00
ae3cc640-c3a9-4188-aa12-d02222b12c12	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	5661de8f-c225-471e-8360-70973df7ff08	fd4dc955-f842-4fb8-98c1-65ee4a74fc5f	2025-01-10 07:00:48.134+00	2025-01-10 07:00:48.134+00
cccda5ac-0ae3-4e77-9036-3fa5eb18627a	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	182e2f88-7bec-4c7e-be59-605e23f5a424	fd4dc955-f842-4fb8-98c1-65ee4a74fc5f	2025-01-10 07:00:51.816+00	2025-01-10 07:00:51.816+00
cf7f7f66-9682-4f00-99f6-42b3f12e3e19	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	95a6412d-8905-4508-a1e0-cc8df04f7c5b	44bd134f-6b74-44fb-9498-2302b367896a	2025-01-10 08:58:49.201+00	2025-01-10 08:58:49.201+00
b821c65e-4593-4708-b79f-1aa03d11ec09	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	bbf1cfd4-f814-4aa6-9c7c-727cda919af3	44bd134f-6b74-44fb-9498-2302b367896a	2025-01-10 08:58:54.201+00	2025-01-10 08:58:54.201+00
\.


--
-- Data for Name: product_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: product_unit_labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: product_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
3da5354c-2bf0-49d4-a2ed-97dd6e63dbe1	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Hộp	1	NO-AJZOKNS5	1	LOT-UI24KG	2025-01-23	2024-12-10 00:08:39.1+00	2024-12-10 00:08:39.1+00
4948b8e1-ca99-4c43-8712-1cde5220b3f0	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Viên	1	NO-HAAVZRO4	1	LOT-G4UPO7	2026-10-19	2024-12-10 00:08:39.101+00	2024-12-10 00:08:39.101+00
396bec25-5d96-4d8c-ad79-baeff9014c30	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Tuýp	1	NO-HGLKVT68	1	LOT-TXQ1EB	2025-08-21	2024-12-10 00:08:39.101+00	2024-12-10 00:08:39.101+00
18a29e9b-4b29-4d81-b1c7-c145fa48cb7f	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Gói	1	NO-7UGSKVUV	1	LOT-2GI5K5	2025-09-07	2024-12-10 00:08:39.101+00	2024-12-10 00:08:39.101+00
41fa1589-7367-4555-b878-d200d542dd0c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Hộp	1	NO-O03SBUEP	1	LOT-NBLKA2	2026-11-12	2024-12-10 00:34:26.498+00	2024-12-10 00:34:26.498+00
021bdee2-0284-4bff-8aaa-00dae591d7d5	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Lọ	1	NO-ALXQXDKC	1	LOT-DZDRBH	2026-08-25	2024-12-10 00:34:26.498+00	2024-12-10 00:34:26.498+00
3728702f-f65a-49ef-a389-e0eb9f32b913	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Ống	1	NO-6Q36LSBO	1	LOT-5ZLEUU	2026-05-06	2024-12-10 00:34:26.498+00	2024-12-10 00:34:26.498+00
e6540cc9-ccbc-4069-bec7-17925e4ac22f	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	goi	1	dv-800	0	\N	\N	2025-01-09 04:25:16.842+00	2025-01-09 19:25:41.695+00
2052372d-0cb5-4809-9940-b40f43def7d6	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	hop	1	adasd	0	\N	\N	2025-01-09 20:20:00.131+00	2025-01-09 20:22:19.689+00
8934f409-8740-4c1d-b258-52e6a6cf6dca	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	hop	1	h-111	0	\N	\N	2025-01-10 07:03:44.937+00	2025-01-10 07:10:04.44+00
23f125e7-7737-4e8e-948a-34041f0fa58c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	lo	1	hh-100	0	\N	\N	2025-01-10 08:59:50.337+00	2025-01-10 08:59:50.337+00
930b82f1-816f-464a-886d-bc86cf928aac	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	lo	10	LO-000010	0	\N	\N	2025-01-19 00:30:43.826+00	2025-01-19 00:30:43.826+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity, store_group_id, register_no, lot_no, product_id, expire_date, import_date, active_ingredient, content, ingredient, packing, usage) FROM stdin;
5cb0daf1-5c5d-45cc-8fb7-501a7ff35452	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc hô hấp	\N	8809685635416	SP003	Kem Chống Nắng Anessa Perfect UV Sunscreen Skincare Milk 60ml	KCN Anessa	200000	250000	100	100	fc1d7846-b999-448a-baf5-34847d2b6b00	1	Lọ	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Kem chống nắng vật lý lai hóa học	Hàng chính hãng	Anessa	Nhật Bản	\N	\N	200000	https://cdn.example.com/images/anessa-perfect-uv-sunscreen-skincare-milk-60ml.jpg	021bdee2-0284-4bff-8aaa-00dae591d7d5	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000006	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
ed424336-2bd3-43f7-a80d-230ef6ee4c3e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Dung dịch tiêm truyền	\N	\N	105402004	Thống Kinh Bổ Huyết P/H (Hộp 1 lọ 60 viên)	\N	60000	70000	\N	100	1dfb489b-7eb3-444f-a638-e88f6036af88	1	Viên	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	\N	\N	\N	\N	\N	\N	60000	\N	4948b8e1-ca99-4c43-8712-1cde5220b3f0	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000014	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
1c5b87ac-44fa-429b-8905-0c6a6839218e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc giảm đau	\N	8936067760019	SP002	Sữa rửa mặt Cetaphil 250ml	SRM Cetaphil	90000	110000	300	95	c7e937d4-9e4d-482d-89dc-a21adbd17944	1	Lọ	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Sữa rửa mặt dịu nhẹ cho da nhạy cảm	Hàng nhập khẩu	Cetaphil	Canada	\N	\N	90000	https://cdn.example.com/images/cetaphil-gentle-skin-cleanser-250ml.jpg	021bdee2-0284-4bff-8aaa-00dae591d7d5	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000001	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
2200cd41-65f8-40a8-a40c-2fa942553ae2	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống ung thư	\N	8936014110171	SP010	Nước Rửa Chén Sunlight Chanh 3.8kg	Sunlight Chanh	75000	95000	4000	100	163d275f-1029-4cb4-9a83-194e875c8d6c	1	Hộp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Nước rửa chén sạch dầu mỡ, hương chanh	\N	Sunlight	Việt Nam	\N	\N	75000	https://cdn.example.com/images/sunlight-chanh-3.8kg.jpg	41fa1589-7367-4555-b878-d200d542dd0c	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000002	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
3a93d459-8532-4d60-bdf4-72bebb944676	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc nội tiết	\N	8936086960023	SP007	Viên Uống DHC Vitamin C 60 Ngày	DHC Vitamin C	120000	150000	50	100	15fd453f-c09c-40a1-851e-532e270c8537	1	Tuýp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Bổ sung Vitamin C, tăng cường sức đề kháng	Hàng nội địa Nhật	DHC	Nhật Bản	\N	\N	120000	https://cdn.example.com/images/dhc-vitamin-c-60-ngay.jpg	396bec25-5d96-4d8c-ad79-baeff9014c30	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000003	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
4d13670f-66e2-45d6-ac75-a7b9852c9511	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc hạ sốt	\N	8935004104016	SP006	Sữa Tắm Lifebuoy Bảo Vệ Vượt Trội 850g	Sữa Tắm Lifebuoy	65000	80000	900	100	1a01efba-2f6c-4c44-8c71-2a46cf37eb44	1	Tuýp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Sữa tắm diệt khuẩn, bảo vệ da	\N	Lifebuoy	Việt Nam	\N	\N	65000	https://cdn.example.com/images/lifebuoy-bao-ve-vuot-troi-850g.jpg	396bec25-5d96-4d8c-ad79-baeff9014c30	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000004	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
5218ebdd-65a7-4f82-9d25-f86303d3aa66	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc nội tiết	\N	8935254100017	SP012	Nước Lau Sàn Gift Hương Hoa Thiên Nhiên 3.8kg	Gift Hương Hoa	60000	75000	4000	100	15fd453f-c09c-40a1-851e-532e270c8537	1	Hộp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Nước lau sàn sạch bóng, thơm ngát	\N	Gift	Việt Nam	\N	\N	60000	https://cdn.example.com/images/gift-huong-hoa-thien-nhien-3.8kg.jpg	41fa1589-7367-4555-b878-d200d542dd0c	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000005	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
647b6699-0a50-4f21-811c-138e8087ff98	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống viêm	\N	8934588902058	SP009	Nước Xả Vải Downy Đam Mê 3L	Downy Đam Mê	130000	160000	3100	100	189200c3-a743-4304-9844-f1734db01c97	1	Lọ	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Nước xả vải thơm lâu, mềm vải	\N	Downy	Việt Nam	\N	\N	130000	https://cdn.example.com/images/downy-dam-me-3l.jpg	021bdee2-0284-4bff-8aaa-00dae591d7d5	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000007	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
7051357c-5494-4ff0-a605-bbcf0757e946	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc kháng sinh	\N	8935049500406	SP013	Nước Giặt Omo Matic Cửa Trên 2.7kg	Omo Matic Cửa Trên	100000	130000	2800	100	88630a50-a1cf-41f3-9a52-f1cc7316a937	1	Tuýp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Nước giặt chuyên dụng cho máy giặt cửa trên	\N	Omo	Việt Nam	\N	\N	100000	https://cdn.example.com/images/omo-matic-cua-tren-2.7kg.jpg	396bec25-5d96-4d8c-ad79-baeff9014c30	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000008	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
8c0b6ab3-eefd-470a-b64a-ab9ada405a0b	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc tiết niệu - sinh dục	\N	8934683012340	SP011	Giấy Vệ Sinh Pulppy 2 Lớp 10 Cuộn	Giấy VS Pulppy	40000	50000	500	100	62ed0e43-b952-4c45-aaf3-110d58a785c0	1	Tuýp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Giấy vệ sinh mềm mại, dai	\N	Pulppy	Việt Nam	\N	\N	40000	https://cdn.example.com/images/pulppy-2-lop-10-cuon.jpg	396bec25-5d96-4d8c-ad79-baeff9014c30	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000009	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
a87eef95-0e45-4757-9956-90573585a001	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc tim mạch	\N	4902430678402	SP008	Bột Giặt Ariel Hương Nắng Mai 4.1kg	Ariel Hương Nắng Mai	95000	120000	4200	100	37acde56-aeb2-4785-9847-152998338e99	1	Tuýp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Bột giặt sạch nhanh, thơm lâu	\N	Ariel	Việt Nam	\N	\N	95000	https://cdn.example.com/images/ariel-huong-nang-mai-4.1kg.jpg	396bec25-5d96-4d8c-ad79-baeff9014c30	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000010	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
be96d1f4-d9f5-4c14-93b9-bcb843900204	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc da liễu	\N	8936035850230	SP014	Bàn Chải Đánh Răng P/S Lông Tơ Mềm Mại	Bàn Chải P/S	15000	20000	50	100	6b495a77-2fbf-44d1-9251-e6e87421a700	1	Lọ	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Bàn chải đánh răng lông tơ mềm mại, sạch sâu	\N	P/S	Việt Nam	\N	\N	15000	https://cdn.example.com/images/ps-long-to-mem-mai.jpg	021bdee2-0284-4bff-8aaa-00dae591d7d5	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000012	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
dd7e96f5-c910-4aba-bda9-23ff9462c49e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc giảm đau	\N	8935212800100	SP005	Dầu Gội Sunsilk Mềm Mượt Diệu Kỳ 640g	Dầu Gội Sunsilk	55000	70000	700	100	c7e937d4-9e4d-482d-89dc-a21adbd17944	1	Ống	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Dầu gội giúp tóc mềm mượt, óng ả	\N	Sunsilk	Việt Nam	\N	\N	55000	https://cdn.example.com/images/sunsilk-mem-muot-dieu-ky-640g.jpg	3728702f-f65a-49ef-a389-e0eb9f32b913	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000013	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
fd4dc955-f842-4fb8-98c1-65ee4a74fc5f	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e		\N	0c4f58c9-498a-4833-b8d5-9a860b0854dd	h-111	Yuraf tab.	\N	100000	100000	\N	20	\N	0	hop	1	2025-01-10 07:03:44.942+00	2025-01-10 07:10:04.447+00	0	100000	\N		KMS Pharm. Co., Ltd.	\N	\N	\N	100000	http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/b3ac6e96-a985-4719-a76a-f1b02f7788b2.png	8934f409-8740-4c1d-b258-52e6a6cf6dca	"{}"	7e2d9be2-daa6-48a3-8037-592f09702664	VN-21441-18	h-111	DQG00059704	2025-01-10 07:00:21.461+00	2025-01-10 07:00:21.461+00	\N	\N	Tramadol HCl 37,5 mg; Acetaminophen 325mg - 37,5 mg, 325mg	hộp 3 vỉ, 10 vỉ x 10 viên	\N
44bd134f-6b74-44fb-9498-2302b367896a	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e		\N	8936174970110	hh-100	Bepanthen Ointment	\N	100000	110000	\N	10	\N	0	lo	1	2025-01-10 08:59:50.342+00	2025-01-10 08:59:50.342+00	0	100000	\N		GP Grenzach Produktions GmbH	\N	\N	\N	100000	http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/78f35dfa-a665-4e85-9498-4e0cc65a8ec6.png	23f125e7-7737-4e8e-948a-34041f0fa58c	"{}"	7e2d9be2-daa6-48a3-8037-592f09702664	VN-8454-09	hh-100	DQG00057856	2025-01-10 08:57:33.446+00	2025-01-10 08:57:33.446+00	\N	\N	Dexpanthenol - --	hộp 1 tuýp 30g, 100g	\N
a3fda509-5d82-4821-84ec-1c860001fffa	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e		\N	8869b2ea-d0b8-47a9-9eb4-8b6d81a8ff43	dv-800	Yumangel F	\N	10000	20000	0	75	\N	0	goi	1	2025-01-09 04:25:16.861+00	2025-01-09 19:25:41.702+00	0	100000			Yuhan Corporation		\N	\N	10000	\N	e6540cc9-ccbc-4069-bec7-17925e4ac22f	"{}"	7e2d9be2-daa6-48a3-8037-592f09702664	VN-19209-15	dv-800	DQG00084948	2025-01-09 19:11:55.676+00	2025-01-09 19:11:55.676+00				hộp 20gói x 15ml	
98b48a3c-5d3a-4c68-939c-efee4a1e88d1	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e		\N	426ca6cb-b2ba-40c2-bdf5-ffea92be3e5c	adasd	Yumangel	\N	100000	120000	\N	2	\N	0	hop	1	2025-01-09 20:20:00.133+00	2025-01-09 20:22:19.692+00	0	100000	\N		Yuhan Corporation	\N	\N	\N	100000	http://localhost:4001/storage/image/product/f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e/581124a7-2a27-4db9-8c92-b1ad3f02fa6f.png	2052372d-0cb5-4809-9940-b40f43def7d6	"{}"	7e2d9be2-daa6-48a3-8037-592f09702664	VN-17995-14	adasd	DQG00080700	2025-01-09 20:18:56.568+00	2025-01-09 20:18:56.568+00	\N	\N	Almagat 6,66g/100ml	hộp 20gói x 15ml	\N
b1b47442-a817-45c5-a6c3-93b39d53ac8c	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc chống đông máu	\N	4901872465835	SP004	Nước Tẩy Trang Senka All Clear Water Micellar Formula White 230ml	Tẩy Trang Senka	70000	90000	250	99	064424d6-c54b-4658-a6f5-807161614d7a	1	Tuýp	1	2024-12-10 00:37:46.719+00	2024-12-10 00:37:46.719+00	1	100	Nước tẩy trang dịu nhẹ, làm sạch sâu	\N	Senka	Nhật Bản	\N	\N	70000	https://cdn.example.com/images/senka-all-clear-water-micellar-formula-white-230ml.jpg	396bec25-5d96-4d8c-ad79-baeff9014c30	{}	d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	\N	\N	HH-000011	2025-01-02 04:15:28.080386+00	2025-01-02 04:15:28.080386+00	\N	\N	\N	\N	\N
927693f3-0117-44c6-b518-9d5711a905cb	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e		\N	8934614031346	LO-000010	Gucabo Inj.	\N	200000	240000	\N	200	\N	0	vien	1	2025-01-19 00:30:43.835+00	2025-01-19 00:30:43.835+00	0	100000	\N		Kyung Dong Pharm. Co., Ltd.	\N	\N	\N	200000	\N	930b82f1-816f-464a-886d-bc86cf928aac	"{}"	7e2d9be2-daa6-48a3-8037-592f09702664	VN-9703-10	LO-000010	DQG00054870	2025-01-19 00:22:00.133+00	2025-01-19 00:22:00.133+00	\N	\N	Cefuroxime natri - 750mg Cefuroxime	hộp 10 lọ	\N
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.providers ("companyName", "phoneNumber", email, "taxCode", address, city, district, wards, note, "storeId", "createdAt", "updatedAt", id) FROM stdin;
Công ty Hùng Vĩ	0324515648	hungvi@example.com	123456789	123 Đường ABC, Phường XYZ	Hà Nội	Đống Đa	Trung Tự	Ghi chú cho công ty Hùng Vĩ	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-28 19:17:12.878	2024-12-28 19:17:12.878	7f83e1d8-8a5d-4b09-9f63-1c7892e2e890
Công ty Minh Đức	0987654321	minhduc@example.com	\N	456 Đường DEF, Phường GHI	Hồ Chí Minh	Quận 1	Phường Bến Nghé	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-28 19:17:12.891	2024-12-28 19:17:12.891	5c2b0e27-7f77-4f68-87fc-bd9d1d2e3f2e
Công ty No1	0869794205	vuduycp123@gmail.com	asadasdasd	tran phu				\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-13 12:22:15.446	2025-01-13 12:22:15.446	50a0fc3a-d91e-4e38-a8ed-5463255afb86
Công ty Ánh Dương	0912345678	vuduycp123@gmail.com	987654321	789 Đường XYZ, Phường LMN	Đà Nẵng	Hải Châu	Phường Thạch Thang	Nhà cung cấp thân thiết	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2024-12-28 19:17:12.895	2025-01-13 12:22:44.67	d8b0f94c-3aef-40e2-9422-317a7f2a43a1
Công ty No2	0869794205	vuduycp123@gmail.com	asadasdasd	tran phu	Thành phố Hà Nội	Ba Đình	Phúc Xá	\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-19 00:06:45.305	2025-01-19 00:06:45.305	97b7a1be-6660-479a-ba72-3c729c0ce6c2
Công ty No3	0869794205	vuduycp123@gmail.com		tran phu				\N	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	2025-01-19 00:11:50.326	2025-01-19 00:11:50.326	c80f53e7-3025-43a5-af78-1feeaad47c59
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role_name, "createdAt", "updatedAt", permission) FROM stdin;
\.


--
-- Data for Name: store_assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store_assets (id, store_id, asset_id, "createdAt", "updatedAt") FROM stdin;
5efd7f0f-f7b6-4e07-aa36-c82ffe57e6ac	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	3af87690-05a2-44e3-8e7b-24e5e6819344	2025-01-04 14:58:40.03+00	2025-01-04 14:58:40.03+00
0328825b-7279-46b1-afba-da39d63e8e51	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	50c01b76-cb18-41e6-8a28-7c81a75c3e1c	2025-01-05 02:37:32.603+00	2025-01-05 02:37:32.603+00
c96a67ea-9a78-48e4-9aad-eb57ed7db8bc	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	c9931b1d-91c1-492e-bcb6-21db5904b4fe	2025-01-05 10:59:13.386+00	2025-01-05 10:59:13.386+00
\.


--
-- Data for Name: store_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store_group (id, store_id, group_name, created_at, updated_at, status, description, deleted_at, deleted_by, group_slug) FROM stdin;
02ce97a7-7597-4291-b7cd-b0ce7b4df518	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Hàng hóa khác	2024-12-28 18:30:01.345+00	2024-12-28 18:30:01.345+00	1	Nhóm các sản phẩm hàng hóa khác	\N	\N	hang-hoa-khac
03388087-b077-416b-b6f3-6e0c3bdcdb64	50b1b432-e12a-4536-9c24-650b6a140923	Thuốc	2024-12-28 18:30:01.347+00	2024-12-28 18:30:01.347+00	1	Nhóm các sản phẩm thuốc	\N	\N	thuoc
04c94d68-9cfd-4498-b711-6843ba038443	50b1b432-e12a-4536-9c24-650b6a140923	Mỹ phẩm	2024-12-28 18:30:01.352+00	2024-12-28 18:30:01.352+00	1	Nhóm các sản phẩm mỹ phẩm	\N	\N	my-pham
7cd9b045-7019-4997-b54c-8112ec130a00	50b1b432-e12a-4536-9c24-650b6a140923	Dụng cụ y tế	2024-12-28 18:30:01.354+00	2024-12-28 18:30:01.354+00	1	Nhóm các sản phẩm dụng cụ y tế	\N	\N	dung-cu-y-te
7d00d29a-9985-48fe-adde-cd14a98e87ca	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thực phẩm chức năng	2024-12-28 18:30:01.338+00	2024-12-28 18:30:01.338+00	1	Nhóm các sản phẩm thực phẩm chức năng	\N	\N	thuc-pham-chuc-nang
7e2d9be2-daa6-48a3-8037-592f09702664	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Thuốc	2024-12-28 18:30:01.329+00	2024-12-28 18:30:01.329+00	1	Nhóm các sản phẩm thuốc	\N	\N	thuoc
82de65d7-03df-48c8-ba96-e6d887bec474	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Dụng cụ y tế	2024-12-28 18:30:01.343+00	2024-12-28 18:30:01.343+00	1	Nhóm các sản phẩm dụng cụ y tế	\N	\N	dung-cu-y-te
83dc6097-fc8e-4b03-b246-1cb70a1487b9	50b1b432-e12a-4536-9c24-650b6a140923	Hàng hóa khác	2024-12-28 18:30:01.356+00	2024-12-28 18:30:01.356+00	1	Nhóm các sản phẩm hàng hóa khác	\N	\N	hang-hoa-khac
8a6ba66a-66f3-4496-8a51-0a77cce9e8e6	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Mỹ phẩm	2024-12-28 18:30:01.34+00	2024-12-28 18:30:01.34+00	1	Nhóm các sản phẩm mỹ phẩm	\N	\N	my-pham
d95fdffd-0d0b-43e5-9fc2-e257bbbc2a0f	50b1b432-e12a-4536-9c24-650b6a140923	Thực phẩm chức năng	2024-12-28 18:30:01.349+00	2024-12-28 18:30:01.349+00	1	Nhóm các sản phẩm thực phẩm chức năng	\N	\N	thuc-pham-chuc-nang
\.


--
-- Data for Name: store_reward_point; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store_reward_point (id, store_id, convert_to, convert_rate, created_at, updated_at, status, description, deleted_at, deleted_by, point_value) FROM stdin;
a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7	50b1b432-e12a-4536-9c24-650b6a140923	VND	100000	2025-01-03 01:48:37.405045+00	2025-01-03 01:48:37.405045+00	1	Reward points settings for store 3	\N	\N	5000
c3b2a1f0-e9d8-4765-a4c3-b2a1f0e9d8c7	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	VND	90000	2025-01-03 01:48:37.405045+00	2025-01-03 01:48:37.405045+00	1	Reward points settings for store 1	\N	\N	5000
2aa37d50-2ab1-4b18-bf86-b0d2d547d4ac	20689287-a2f8-4177-9d9e-f5663277afaf	VND	100000	2025-01-26 20:21:42.419+00	2025-01-26 20:21:42.419+00	1	\N	\N	\N	5000
72877e08-316b-4e65-898e-04abb2710438	5b483f98-c45e-4eab-b044-b39362c44ecc	VND	100000	2025-01-26 21:01:22.113+00	2025-01-26 21:01:22.113+00	1	\N	\N	\N	5000
97ab14ed-9c4b-41b9-8f32-3c2e378ccd57	9be259dc-9663-479d-b2c1-ce892927ff2a	VND	100000	2025-01-26 21:03:06.754+00	2025-01-26 21:03:06.754+00	1	\N	\N	\N	5000
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
50b1b432-e12a-4536-9c24-650b6a140923	50b1b432-e12a-4536-9c24-650b6a140923	Kho Trung Tâm	123 Đường ABC, Quận 1, TP.HCM	0901234567	central@store.com	2024-12-09 23:45:02.697+00	2024-12-09 23:45:02.697+00	1	Kho trung tâm phục vụ chính	\N	\N
f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	Kho Phụ	456 Đường DEF, Quận 3, TP.HCM	0909876543	branch@store.com	2024-12-09 23:45:02.697+00	2024-12-09 23:45:02.697+00	1	Kho phụ hỗ trợ khu vực	\N	\N
20689287-a2f8-4177-9d9e-f5663277afaf	6527b039-3fa7-4dd8-af9c-50cdefd5634e	ádasdasd	ádasdasd	\N	\N	2025-01-26 20:21:42.401+00	2025-01-26 20:21:42.401+00	1	\N	\N	\N
5b483f98-c45e-4eab-b044-b39362c44ecc	5bdb318b-1e0f-4c2b-8f75-fead6da742f7	chi nhánh hà đông 1	số 6 ngõ 49 phường hà đông	\N	\N	2025-01-26 21:01:22.111+00	2025-01-26 21:01:22.111+00	1	\N	\N	\N
9be259dc-9663-479d-b2c1-ce892927ff2a	792c9de2-decd-4ded-a616-c5ad995a48f2	chi nhánh hà đông 2	số 19 đường 18m	\N	\N	2025-01-26 21:03:06.752+00	2025-01-26 21:03:06.752+00	1	\N	\N	\N
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, branch_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt", plan_type, auto_renew, payment_method, payment_status) FROM stdin;
0db690af-0e00-470e-be2e-054638a773f8	e417a506-4154-425b-a834-34da2c7678f3	3df449fa-78f8-4e26-abbc-60c3dbaa958d	2025-01-25 18:50:24.264+00	2026-01-25 18:50:24.264	ACTIVE	2025-01-25 18:50:24.266+00	2025-01-25 18:50:24.266	branch	t	\N	paid
ebb8016f-4e34-43d4-901e-4b5896999909	6527b039-3fa7-4dd8-af9c-50cdefd5634e	3df449fa-78f8-4e26-abbc-60c3dbaa958d	2025-01-26 20:21:58.369+00	2026-01-26 20:21:58.369	ACTIVE	2025-01-26 20:21:58.371+00	2025-01-26 20:59:15.705	branch	t	\N	pending
a53b07cf-f046-4aee-9165-48cf6c2d149d	5bdb318b-1e0f-4c2b-8f75-fead6da742f7	3df449fa-78f8-4e26-abbc-60c3dbaa958d	2025-01-26 21:01:45.356+00	2026-01-26 21:01:45.356	ACTIVE	2025-01-26 21:01:45.358+00	2025-01-26 21:01:54.961	branch	t	\N	paid
\.


--
-- Data for Name: user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_permissions (user_id, permission_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt", first_name, last_name) FROM stdin;
bfd7183a-8fb7-4417-b1b3-70423b0e0a34	huy_123	$2b$10$HnD7AELMpf99jyvyikJuoeJjy2xOtWlzsZIGEXkLU8d5qxL1xqBvW	vuduycp123@gmail.com	\N	0869794205	tran phu	\N	\N	t	\N	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.Read,User.Update,User.Create}	2025-01-26 20:05:43.094+00	2025-01-26 20:05:43.094+00	\N	\N
9cc4563e-f510-4e78-ab30-d47f8aa080d4	user_4	$2b$10$o/4dDqdJMdxK8DRl11HtR.kWj/fXtTr58Ld66fj.14aYzV9cM.1lO	vuduycp123@gmail.com	\N	0869794205	tran phu	\N	\N	t	\N	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.Read,User.Update,User.Create}	2025-01-26 20:58:28.944+00	2025-01-26 20:58:28.944+00	\N	\N
684884cc-128c-4553-91a9-ec54135d6848	ádasdasd	$2b$10$mYqUnreZfuAZe2hVSB0ztecfBJuXXf3.Z/PilzE4Tu9OxW/Pig9Wi	adc@gmail.com	\N	0869794205	ngõ 36, số 4	\N		t	\N	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.Read,User.Update,User.Create}	2025-01-23 13:55:38.845628+00	2025-01-23 13:55:38.845628+00	\N	\N
9b621b5e-5ad5-409a-b64e-1c22b3c52380	user_1	$2b$10$zRbHDmGafu2xlzV/bDcDVOoCCkxJUpBkSHETUoa4z1eSlLyAY8hk.	\N	\N	0559707528	so 9 ngo 46	\N	\N	t	2025-01-26 03:54:46.677+00	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.Read,User.Update,User.Create}	2025-01-25 08:39:31.08+00	2025-01-26 03:54:46.679+00	\N	\N
1bce4112-b3ff-409c-9f5f-2f74d113af8a	thanh_le1	$2b$10$YMWuJLRpCghxEEOquyRpqu/0yTNQbpfIfxYXaLOtc6cz0nzd1ovfy	vuduycp123@gmail.com	\N	0869794205	tran phu	\N	\N	t	2025-01-26 21:02:24.656+00	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.Read,User.Update,User.Create}	2025-01-26 21:00:23.714+00	2025-01-26 21:02:24.658+00	\N	\N
f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e	sampleuser	$2a$05$oFwrQ0n2xEEUwA4lXGzQ9.21/q3MxxxQp/vE3Ndq4Pj1mG92cLg3u	sampleuser@example.com	30	1234567890	123 Sample Street	https://www.w3schools.com/howto/img_avatar.png	This is a sample user.	t	2025-02-11 09:50:39.43+00	\N	{Store.All,Report.All,Supplier.All,Medicine.All,Membership.All,Promotion.All,Customer.All,User.Read,User.Update,User.Create}	2024-12-07 09:40:24.571+00	2025-02-11 09:50:39.432+00	\N	\N
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions admin_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (admin_id, permission_id);


--
-- Name: admin_plans admin_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_plans
    ADD CONSTRAINT admin_plans_pkey PRIMARY KEY (id);


--
-- Name: admin_subsciption admin_subsciption_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_pkey PRIMARY KEY (id);


--
-- Name: admin_to_user admin_to_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT admin_to_user_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- Name: branch_details branch_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_pkey PRIMARY KEY (id);


--
-- Name: branch_integration branch_integration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_integration
    ADD CONSTRAINT branch_integration_pkey PRIMARY KEY (id);


--
-- Name: branch_payment branch_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_pkey PRIMARY KEY (id);


--
-- Name: branch_plans branch_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_plans
    ADD CONSTRAINT branch_plans_pkey PRIMARY KEY (id);


--
-- Name: branches branches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);


--
-- Name: clinics clinics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);


--
-- Name: consumers consumers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);


--
-- Name: financial_ledger financial_ledger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_ledger
    ADD CONSTRAINT financial_ledger_pkey PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: import_invoice_product import_invoice_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_pkey PRIMARY KEY (id);


--
-- Name: import_invoices import_invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_pkey PRIMARY KEY (id);


--
-- Name: invoice_items invoice_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);


--
-- Name: invoice_prescriptions invoice_prescriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_prescriptions
    ADD CONSTRAINT invoice_prescriptions_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: membership_permissions membership_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_permissions
    ADD CONSTRAINT membership_permissions_pkey PRIMARY KEY (membership_id, permission_id);


--
-- Name: memberships memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: other_charges other_charges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT other_charges_pkey PRIMARY KEY (id);


--
-- Name: payment_histories payment_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_histories
    ADD CONSTRAINT payment_histories_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: point_transactions point_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_pkey PRIMARY KEY (id);


--
-- Name: points points_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);


--
-- Name: product_assets product_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_pkey PRIMARY KEY (id);


--
-- Name: product_groups product_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (product_id, group_id);


--
-- Name: product_units product_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: store_assets store_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_pkey PRIMARY KEY (id);


--
-- Name: store_group store_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_pkey PRIMARY KEY (id);


--
-- Name: store_reward_point store_reward_point_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_pkey PRIMARY KEY (id);


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: user_permissions user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_pkey PRIMARY KEY (user_id, permission_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: admin_to_user_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "admin_to_user_userId_key" ON public.admin_to_user USING btree ("userId");


--
-- Name: admins_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX admins_username_key ON public.admins USING btree (username);


--
-- Name: branch_details_branch_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX branch_details_branch_id_key ON public.branch_details USING btree (branch_id);


--
-- Name: branch_integration_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX branch_integration_branch_id_idx ON public.branch_integration USING btree (branch_id);


--
-- Name: branch_integration_branch_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX branch_integration_branch_id_key ON public.branch_integration USING btree (branch_id);


--
-- Name: branch_payment_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX branch_payment_branch_id_idx ON public.branch_payment USING btree (branch_id);


--
-- Name: branch_payment_branch_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX branch_payment_branch_id_key ON public.branch_payment USING btree (branch_id);


--
-- Name: branches_branch_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX branches_branch_name_idx ON public.branches USING btree (branch_name);


--
-- Name: branches_owner_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX branches_owner_id_idx ON public.branches USING btree (owner_id);


--
-- Name: clinics_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clinics_store_id_idx ON public.clinics USING btree (store_id);


--
-- Name: consumers_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX consumers_branch_id_idx ON public.consumers USING btree (branch_id);


--
-- Name: consumers_consumer_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX consumers_consumer_email_idx ON public.consumers USING btree (consumer_email);


--
-- Name: consumers_consumer_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX consumers_consumer_id_idx ON public.consumers USING btree (consumer_id);


--
-- Name: consumers_consumer_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX consumers_consumer_name_idx ON public.consumers USING btree (consumer_name);


--
-- Name: consumers_phone_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX consumers_phone_number_idx ON public.consumers USING btree (phone_number);


--
-- Name: doctors_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX doctors_branch_id_idx ON public.doctors USING btree (branch_id);


--
-- Name: groups_group_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX groups_group_name_idx ON public.groups USING btree (group_name);


--
-- Name: groups_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX groups_store_id_idx ON public.groups USING btree (store_id);


--
-- Name: import_invoice_product_import_invoice_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX import_invoice_product_import_invoice_idx ON public.import_invoice_product USING btree (import_invoice);


--
-- Name: import_invoice_product_product_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX import_invoice_product_product_id_idx ON public.import_invoice_product USING btree (product_id);


--
-- Name: import_invoices_provider_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX import_invoices_provider_id_idx ON public.import_invoices USING btree (provider_id);


--
-- Name: import_invoices_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX import_invoices_store_id_idx ON public.import_invoices USING btree (store_id);


--
-- Name: invoices_branchId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "invoices_branchId_idx" ON public.invoices USING btree ("branchId");


--
-- Name: invoices_customerName_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "invoices_customerName_idx" ON public.invoices USING btree ("customerName");


--
-- Name: invoices_saleDate_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "invoices_saleDate_idx" ON public.invoices USING btree ("saleDate");


--
-- Name: memberships_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX memberships_branch_id_idx ON public.memberships USING btree (branch_id);


--
-- Name: memberships_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX memberships_email_idx ON public.memberships USING btree (email);


--
-- Name: memberships_phone_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX memberships_phone_number_idx ON public.memberships USING btree (phone_number);


--
-- Name: memberships_username_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX memberships_username_idx ON public.memberships USING btree (username);


--
-- Name: point_transactions_pointId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "point_transactions_pointId_key" ON public.point_transactions USING btree ("pointId");


--
-- Name: points_consumerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "points_consumerId_idx" ON public.points USING btree ("consumerId");


--
-- Name: points_consumerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "points_consumerId_key" ON public.points USING btree ("consumerId");


--
-- Name: product_groups_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX product_groups_group_id_idx ON public.product_groups USING btree (group_id);


--
-- Name: product_units_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX product_units_name_idx ON public.product_units USING btree (name);


--
-- Name: product_units_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX product_units_store_id_idx ON public.product_units USING btree (store_id);


--
-- Name: products_barcode_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_barcode_idx ON public.products USING btree (barcode);


--
-- Name: products_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_group_id_idx ON public.products USING btree (group_id);


--
-- Name: products_medicine_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_medicine_id_idx ON public.products USING btree (medicine_id);


--
-- Name: products_product_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_id_idx ON public.products USING btree (product_id);


--
-- Name: products_product_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_product_id_key ON public.products USING btree (product_id);


--
-- Name: products_product_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_name_idx ON public.products USING btree (product_name);


--
-- Name: products_product_no_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_no_idx ON public.products USING btree (product_no);


--
-- Name: products_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_store_id_idx ON public.products USING btree (store_id);


--
-- Name: store_group_group_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX store_group_group_name_idx ON public.store_group USING btree (group_name);


--
-- Name: store_group_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX store_group_store_id_idx ON public.store_group USING btree (store_id);


--
-- Name: store_reward_point_store_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX store_reward_point_store_id_idx ON public.store_reward_point USING btree (store_id);


--
-- Name: store_reward_point_store_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX store_reward_point_store_id_key ON public.store_reward_point USING btree (store_id);


--
-- Name: stores_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX stores_branch_id_idx ON public.stores USING btree (branch_id);


--
-- Name: stores_store_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX stores_store_name_idx ON public.stores USING btree (store_name);


--
-- Name: subscriptions_branch_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subscriptions_branch_id_idx ON public.subscriptions USING btree (branch_id);


--
-- Name: subscriptions_plan_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subscriptions_plan_id_idx ON public.subscriptions USING btree (plan_id);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_phone_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_phone_number_idx ON public.users USING btree (phone_number);


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_username_idx ON public.users USING btree (username);


--
-- Name: admin_permissions admin_permissions_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin_permissions admin_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin_subsciption admin_subsciption_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin_subsciption admin_subsciption_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.admin_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin_to_user admin_to_user_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin_to_user admin_to_user_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admins admins_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: assets assets_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: branch_details branch_details_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: branch_integration branch_integration_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_integration
    ADD CONSTRAINT branch_integration_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: branch_payment branch_payment_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: branches branches_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: clinics clinics_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: consumers consumers_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: doctors doctors_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: doctors doctors_storesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT "doctors_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: financial_ledger financial_ledger_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_ledger
    ADD CONSTRAINT financial_ledger_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: groups groups_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: import_invoice_product import_invoice_product_import_invoice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_import_invoice_fkey FOREIGN KEY (import_invoice) REFERENCES public.import_invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: import_invoice_product import_invoice_product_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: import_invoices import_invoices_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: import_invoices import_invoices_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invoice_items invoice_items_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: invoice_items invoice_items_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invoice_prescriptions invoice_prescriptions_bac_si_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_prescriptions
    ADD CONSTRAINT invoice_prescriptions_bac_si_id_fkey FOREIGN KEY (bac_si_id) REFERENCES public.doctors(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: invoice_prescriptions invoice_prescriptions_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_prescriptions
    ADD CONSTRAINT "invoice_prescriptions_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: invoices invoices_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invoices invoices_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: membership_permissions membership_permissions_membership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_permissions
    ADD CONSTRAINT membership_permissions_membership_id_fkey FOREIGN KEY (membership_id) REFERENCES public.memberships(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: membership_permissions membership_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_permissions
    ADD CONSTRAINT membership_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: memberships memberships_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);


--
-- Name: other_charges other_charges_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT "other_charges_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payment_histories payment_histories_admin_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_histories
    ADD CONSTRAINT payment_histories_admin_subscription_id_fkey FOREIGN KEY (admin_subscription_id) REFERENCES public.admin_subsciption(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_histories payment_histories_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_histories
    ADD CONSTRAINT payment_histories_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: point_transactions point_transactions_pointId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT "point_transactions_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES public.points(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: points points_consumerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: points points_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_assets product_assets_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: product_assets product_assets_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_assets product_assets_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_groups product_groups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_groups product_groups_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_unit_labels product_unit_labels_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_unit_labels product_unit_labels_product_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_units product_units_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);


--
-- Name: products products_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: products products_productUnit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_store_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_group_id_fkey FOREIGN KEY (store_group_id) REFERENCES public.store_group(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: products products_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: providers providers_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: store_assets store_assets_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: store_assets store_assets_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: store_group store_group_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: store_reward_point store_reward_point_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stores stores_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.branch_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_permissions user_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_permissions user_permissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

