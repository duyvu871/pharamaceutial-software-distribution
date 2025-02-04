PGDMP     -                     }            quan_ly_nha_thuoc %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    16384    quan_ly_nha_thuoc    DATABASE     b   CREATE DATABASE quan_ly_nha_thuoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
 !   DROP DATABASE quan_ly_nha_thuoc;
                postgres    false            %           0    0    DATABASE quan_ly_nha_thuoc    ACL     3   GRANT ALL ON DATABASE quan_ly_nha_thuoc TO adc300;
                   postgres    false    3876            a           1247    124316    LoaiChungTu    TYPE     C   CREATE TYPE public."LoaiChungTu" AS ENUM (
    'Thu',
    'Chi'
);
     DROP TYPE public."LoaiChungTu";
       public          postgres    false            d           1247    124322 
   LoaiThuChi    TYPE     B   CREATE TYPE public."LoaiThuChi" AS ENUM (
    'Thu',
    'Chi'
);
    DROP TYPE public."LoaiThuChi";
       public          postgres    false                       1247    122932    UserType    TYPE     H   CREATE TYPE public."UserType" AS ENUM (
    'user',
    'membership'
);
    DROP TYPE public."UserType";
       public          postgres    false            �           1247    123623    admin_permission    TYPE     �   CREATE TYPE public.admin_permission AS ENUM (
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
 #   DROP TYPE public.admin_permission;
       public          postgres    false            �           1247    123644 
   admin_type    TYPE     J   CREATE TYPE public.admin_type AS ENUM (
    'super_admin',
    'admin'
);
    DROP TYPE public.admin_type;
       public          postgres    false            �           1247    123650    all_permission    TYPE     �   CREATE TYPE public.all_permission AS ENUM (
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
 !   DROP TYPE public.all_permission;
       public          postgres    false            �           1247    123672    enum_branches_branch_status    TYPE     Y   CREATE TYPE public.enum_branches_branch_status AS ENUM (
    'active',
    'inactive'
);
 .   DROP TYPE public.enum_branches_branch_status;
       public          postgres    false            �           1247    123678    enum_branchs_branch_status    TYPE     X   CREATE TYPE public.enum_branchs_branch_status AS ENUM (
    'active',
    'inactive'
);
 -   DROP TYPE public.enum_branchs_branch_status;
       public          postgres    false            �           1247    123684    enum_consumers_gender    TYPE     \   CREATE TYPE public.enum_consumers_gender AS ENUM (
    'male',
    'female',
    'other'
);
 (   DROP TYPE public.enum_consumers_gender;
       public          postgres    false            �           1247    123692    enum_gender    TYPE     R   CREATE TYPE public.enum_gender AS ENUM (
    'male',
    'female',
    'other'
);
    DROP TYPE public.enum_gender;
       public          postgres    false            �           1247    123700     enum_memberships_employee_status    TYPE     ^   CREATE TYPE public.enum_memberships_employee_status AS ENUM (
    'active',
    'inactive'
);
 3   DROP TYPE public.enum_memberships_employee_status;
       public          postgres    false            �           1247    123706    enum_users_permission    TYPE     �   CREATE TYPE public.enum_users_permission AS ENUM (
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
 (   DROP TYPE public.enum_users_permission;
       public          postgres    false            �            1259    123727    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �            1259    131100    admin_permissions    TABLE     �   CREATE TABLE public.admin_permissions (
    admin_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 %   DROP TABLE public.admin_permissions;
       public         heap    postgres    false            �            1259    123734    admin_plans    TABLE     �  CREATE TABLE public.admin_plans (
    id uuid NOT NULL,
    plan_name character varying(255) NOT NULL,
    plan_type character varying(255) NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
    DROP TABLE public.admin_plans;
       public         heap    postgres    false            �            1259    123740    admin_subsciption    TABLE     5  CREATE TABLE public.admin_subsciption (
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
    trial_ends_at timestamp(6) with time zone
);
 %   DROP TABLE public.admin_subsciption;
       public         heap    postgres    false            �            1259    123745    admin_to_user    TABLE     �   CREATE TABLE public.admin_to_user (
    id uuid NOT NULL,
    "adminId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 !   DROP TABLE public.admin_to_user;
       public         heap    postgres    false            �            1259    123749    admins    TABLE     �  CREATE TABLE public.admins (
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
    "createdAt" timestamp(6) with time zone,
    "updatedAt" timestamp(6) with time zone,
    dob timestamp(6) with time zone
);
    DROP TABLE public.admins;
       public         heap    postgres    false    922            �            1259    123756    assets    TABLE     O  CREATE TABLE public.assets (
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
    DROP TABLE public.assets;
       public         heap    postgres    false            �            1259    123766    branch_details    TABLE     0  CREATE TABLE public.branch_details (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    so_dang_ky text NOT NULL,
    ten_nha_thuoc text NOT NULL,
    loai_hinh text NOT NULL,
    tinh text NOT NULL,
    huyen text NOT NULL,
    dia_chi text NOT NULL,
    nguoi_dai_dien text NOT NULL,
    nguoi_chiu_trach_nhiem text NOT NULL,
    nguoi_chiu_trach_nhiem_chuyen_mon text NOT NULL,
    so_chung_chi_hanh_nghe text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 "   DROP TABLE public.branch_details;
       public         heap    postgres    false            �            1259    123772    branch_integration    TABLE       CREATE TABLE public.branch_integration (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    type character varying(255) NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) with time zone,
    deleted_by uuid,
    integration_account text NOT NULL,
    integration_id text NOT NULL,
    integration_password text NOT NULL
);
 &   DROP TABLE public.branch_integration;
       public         heap    postgres    false            �            1259    123780    branch_payment    TABLE     �  CREATE TABLE public.branch_payment (
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
 "   DROP TABLE public.branch_payment;
       public         heap    postgres    false            �            1259    123788    branch_plans    TABLE     �  CREATE TABLE public.branch_plans (
    id uuid NOT NULL,
    plan_name character varying(255) NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    plan_type character varying(255) NOT NULL
);
     DROP TABLE public.branch_plans;
       public         heap    postgres    false            �            1259    123794    branches    TABLE     �  CREATE TABLE public.branches (
    branch_id uuid NOT NULL,
    branch_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    branch_status public.enum_branches_branch_status NOT NULL,
    owner_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone,
    "updatedAt" timestamp(6) with time zone,
    enabled_points boolean DEFAULT true NOT NULL
);
    DROP TABLE public.branches;
       public         heap    postgres    false    913            �            1259    123800    clinics    TABLE       CREATE TABLE public.clinics (
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
    DROP TABLE public.clinics;
       public         heap    postgres    false            �            1259    123808 	   consumers    TABLE     B  CREATE TABLE public.consumers (
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
    DROP TABLE public.consumers;
       public         heap    postgres    false    919            �            1259    123159    doctors    TABLE     �  CREATE TABLE public.doctors (
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
    DROP TABLE public.doctors;
       public         heap    postgres    false            �            1259    124327    financial_ledger    TABLE     �  CREATE TABLE public.financial_ledger (
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
 $   DROP TABLE public.financial_ledger;
       public         heap    postgres    false            �            1259    123824    groups    TABLE     �  CREATE TABLE public.groups (
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
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    123832    import_invoice_product    TABLE       CREATE TABLE public.import_invoice_product (
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
 *   DROP TABLE public.import_invoice_product;
       public         heap    postgres    false            �            1259    123836    import_invoices    TABLE     a  CREATE TABLE public.import_invoices (
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
 #   DROP TABLE public.import_invoices;
       public         heap    postgres    false            �            1259    123843    invoice_items    TABLE     +  CREATE TABLE public.invoice_items (
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
 !   DROP TABLE public.invoice_items;
       public         heap    postgres    false            �            1259    123269    invoice_prescriptions    TABLE     �  CREATE TABLE public.invoice_prescriptions (
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
 )   DROP TABLE public.invoice_prescriptions;
       public         heap    postgres    false            �            1259    123257    invoices    TABLE     L  CREATE TABLE public.invoices (
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
    DROP TABLE public.invoices;
       public         heap    postgres    false    895            �            1259    131094    membership_permissions    TABLE     �   CREATE TABLE public.membership_permissions (
    membership_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 *   DROP TABLE public.membership_permissions;
       public         heap    postgres    false            �            1259    123848    memberships    TABLE     :  CREATE TABLE public.memberships (
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
    DROP TABLE public.memberships;
       public         heap    postgres    false    925            �            1259    123854    other_charges    TABLE     �   CREATE TABLE public.other_charges (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    name text NOT NULL,
    value double precision DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.other_charges;
       public         heap    postgres    false            �            1259    131075    payment_histories    TABLE     �  CREATE TABLE public.payment_histories (
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
 %   DROP TABLE public.payment_histories;
       public         heap    postgres    false            �            1259    131106    permissions    TABLE       CREATE TABLE public.permissions (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
    DROP TABLE public.permissions;
       public         heap    postgres    false            �            1259    123860    point_transactions    TABLE       CREATE TABLE public.point_transactions (
    id uuid NOT NULL,
    "pointId" uuid NOT NULL,
    type character varying(255) NOT NULL,
    amount integer NOT NULL,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public.point_transactions;
       public         heap    postgres    false            �            1259    123866    points    TABLE     #  CREATE TABLE public.points (
    id uuid NOT NULL,
    "totalPoints" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "consumerId" uuid NOT NULL,
    "storeId" uuid
);
    DROP TABLE public.points;
       public         heap    postgres    false            �            1259    123871    product_assets    TABLE     *  CREATE TABLE public.product_assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    product_id uuid,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 "   DROP TABLE public.product_assets;
       public         heap    postgres    false            �            1259    123876    product_groups    TABLE     E  CREATE TABLE public.product_groups (
    product_id uuid NOT NULL,
    group_id uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.726+07'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.727+07'::timestamp with time zone NOT NULL
);
 "   DROP TABLE public.product_groups;
       public         heap    postgres    false            �            1259    123881    product_unit_labels    TABLE     �   CREATE TABLE public.product_unit_labels (
    product_id uuid NOT NULL,
    product_unit uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public.product_unit_labels;
       public         heap    postgres    false            �            1259    123884    product_units    TABLE     �  CREATE TABLE public.product_units (
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
 !   DROP TABLE public.product_units;
       public         heap    postgres    false            �            1259    123889    products    TABLE       CREATE TABLE public.products (
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
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    123899 	   providers    TABLE     �  CREATE TABLE public.providers (
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
    DROP TABLE public.providers;
       public         heap    postgres    false            �            1259    131082    role_permissions    TABLE     �   CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 $   DROP TABLE public.role_permissions;
       public         heap    postgres    false            �            1259    123905    roles    TABLE       CREATE TABLE public.roles (
    id uuid NOT NULL,
    role_name character varying(255) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    permission character varying(255)[]
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    123911    store_assets    TABLE       CREATE TABLE public.store_assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.store_assets;
       public         heap    postgres    false            �            1259    123916    store_group    TABLE       CREATE TABLE public.store_group (
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
    DROP TABLE public.store_group;
       public         heap    postgres    false            �            1259    123925    store_reward_point    TABLE     =  CREATE TABLE public.store_reward_point (
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
 &   DROP TABLE public.store_reward_point;
       public         heap    postgres    false            �            1259    123936    stores    TABLE     !  CREATE TABLE public.stores (
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
    DROP TABLE public.stores;
       public         heap    postgres    false            �            1259    123944    subscriptions    TABLE     5  CREATE TABLE public.subscriptions (
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
    payment_method character varying(255)
);
 !   DROP TABLE public.subscriptions;
       public         heap    postgres    false            �            1259    131088    user_permissions    TABLE     �   CREATE TABLE public.user_permissions (
    user_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 $   DROP TABLE public.user_permissions;
       public         heap    postgres    false            �            1259    123949    users    TABLE     �  CREATE TABLE public.users (
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
    "createdAt" timestamp(6) with time zone,
    "updatedAt" timestamp(6) with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    123727    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    212   O�                0    131100    admin_permissions 
   TABLE DATA           ^   COPY public.admin_permissions (admin_id, permission_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    251   �      �          0    123734    admin_plans 
   TABLE DATA           w   COPY public.admin_plans (id, plan_name, plan_type, price, duration, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   /�      �          0    123740    admin_subsciption 
   TABLE DATA           �   COPY public.admin_subsciption (id, admin_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt", auto_renew, payment_method, trial_ends_at) FROM stdin;
    public          postgres    false    214   5�      �          0    123745    admin_to_user 
   TABLE DATA           Z   COPY public.admin_to_user (id, "adminId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   C�      �          0    123749    admins 
   TABLE DATA           �   COPY public.admins (id, username, last_name, first_name, gender, password, email, phone_number, postal_code, address, avatar, notes, bio, is_active, last_login, reset_token, permission, "roleId", "createdAt", "updatedAt", dob) FROM stdin;
    public          postgres    false    216   <�      �          0    123756    assets 
   TABLE DATA              COPY public.assets (id, store_id, path, name, description, url, type, meta_data, "from", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �      �          0    123766    branch_details 
   TABLE DATA           �   COPY public.branch_details (id, branch_id, so_dang_ky, ten_nha_thuoc, loai_hinh, tinh, huyen, dia_chi, nguoi_dai_dien, nguoi_chiu_trach_nhiem, nguoi_chiu_trach_nhiem_chuyen_mon, so_chung_chi_hanh_nghe, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   ��      �          0    123772    branch_integration 
   TABLE DATA           �   COPY public.branch_integration (id, branch_id, type, status, "createdAt", "updatedAt", deleted_at, deleted_by, integration_account, integration_id, integration_password) FROM stdin;
    public          postgres    false    219   N�      �          0    123780    branch_payment 
   TABLE DATA           �   COPY public.branch_payment (id, branch_id, type, status, payment_bank, payment_account_number, payment_account_owner, "createdAt", "updatedAt", deleted_at, deleted_by) FROM stdin;
    public          postgres    false    220   �      �          0    123788    branch_plans 
   TABLE DATA           x   COPY public.branch_plans (id, plan_name, price, duration, description, "createdAt", "updatedAt", plan_type) FROM stdin;
    public          postgres    false    221   o�                 0    123794    branches 
   TABLE DATA           �   COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt", enabled_points) FROM stdin;
    public          postgres    false    222   �                0    123800    clinics 
   TABLE DATA           �   COPY public.clinics (id, store_id, clinic_name, address, phone, email, created_at, updated_at, status, description, deleted_at) FROM stdin;
    public          postgres    false    223   ��                0    123808 	   consumers 
   TABLE DATA           �   COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt", consumer_id) FROM stdin;
    public          postgres    false    224   ��      �          0    123159    doctors 
   TABLE DATA              COPY public.doctors (id, doctor_id, branch_id, specialization, email, status, chuyen_khoa, dia_chi, sdt, ghi_chu, is_active, is_deleted, loai_so_quy, noi_cong_tac, ten_bac_si, ten_slug, trinh_do, created_at, updated_at, deleted_at, "storesId") FROM stdin;
    public          postgres    false    209   ;�                0    124327    financial_ledger 
   TABLE DATA             COPY public.financial_ledger (id, "soQuyID", "maPhieu", loai_chung_tu, loai_thu_chi, ten_loai_thu_chi, loai_nguoi_nop_nhan, nguoi_nop_nhan_id, ten_nguoi_nop_nhan, ngay_thu_chi, ghi_chu_he_thong, ton_quy_truoc, gia_tri, ton_quy_sau, trang_thai, branch_id, ghi_chu, phuong_thuc_thanh_toan_id, phieu_lien_quan, tong_tien_phieu_lien_quan, ma_phieu_lien_quan, ten_loai_chung_tu, ten_loai_nguoi_nop_nhan, ten_nha_thuoc, user_id, user_type, phuong_thuc_thanh_toan, "createdAt", "updatedAt", ten_nguoi_tao, loai) FROM stdin;
    public          postgres    false    246   5�                0    123824    groups 
   TABLE DATA              COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    225   ��                0    123832    import_invoice_product 
   TABLE DATA           Z  COPY public.import_invoice_product (id, import_invoice, product_id, quantity, price, total, "createdAt", "updatedAt", active_ingredient, barcode, content, expired_date, import_date, ingredients, larger_unit, larger_unit_value, lot_no, manufacturer, note, packaging, register_no, smaller_unit, smaller_unit_value, status, type, usage) FROM stdin;
    public          postgres    false    226   V�                0    123836    import_invoices 
   TABLE DATA           �   COPY public.import_invoices (id, store_id, provider_id, invoice_no, name, total_amount, amount_due, amount_paid, debit, notes, vat, status, "createdAt", "updatedAt", lot_no) FROM stdin;
    public          postgres    false    227   `�                0    123843    invoice_items 
   TABLE DATA           x   COPY public.invoice_items (id, "invoiceId", "productName", quantity, price, total, unit, note, "productId") FROM stdin;
    public          postgres    false    228   ��      �          0    123269    invoice_prescriptions 
   TABLE DATA             COPY public.invoice_prescriptions (id, "invoiceId", prescription_id, ma_don_thuoc, ngay_ke, bac_si_id, co_so_kham, chuan_doan, benh_nhan, ngay_sinh, nam_sinh, tuoi, thang_tuoi, can_nang, dia_chi, nguoi_giam_ho, cmnd, dien_thoai, the_bhyt, gioi_tinh, created_at, updated_at) FROM stdin;
    public          postgres    false    211   "�      �          0    123257    invoices 
   TABLE DATA           5  COPY public.invoices (id, invoice_id, "branchId", "saleDate", "saleTime", "customerName", "customerId", "priceList", "isPrescriptionSale", vat, "totalPrice", discount, "amountDue", "amountPaid", debit, notes, "autoPrintInvoice", "printBatchNumber", "userType", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   ��                0    131094    membership_permissions 
   TABLE DATA           h   COPY public.membership_permissions (membership_id, permission_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    250   �                0    123848    memberships 
   TABLE DATA           �   COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt", address, age, last_login) FROM stdin;
    public          postgres    false    229   $�                0    123854    other_charges 
   TABLE DATA           E   COPY public.other_charges (id, "invoiceId", name, value) FROM stdin;
    public          postgres    false    230   G�                0    131075    payment_histories 
   TABLE DATA           �   COPY public.payment_histories (id, subscription_id, admin_subscription_id, payment_date, amount, payment_method, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    247   d�                0    131106    permissions 
   TABLE DATA           V   COPY public.permissions (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    252   ��      	          0    123860    point_transactions 
   TABLE DATA           \   COPY public.point_transactions (id, "pointId", type, amount, note, "createdAt") FROM stdin;
    public          postgres    false    231   ��      
          0    123866    points 
   TABLE DATA           f   COPY public.points (id, "totalPoints", "createdAt", "updatedAt", "consumerId", "storeId") FROM stdin;
    public          postgres    false    232   �                0    123871    product_assets 
   TABLE DATA           f   COPY public.product_assets (id, store_id, asset_id, product_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233   �                0    123876    product_groups 
   TABLE DATA           X   COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   E                0    123881    product_unit_labels 
   TABLE DATA           a   COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    235   b                0    123884    product_units 
   TABLE DATA           �   COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
    public          postgres    false    236                   0    123889    products 
   TABLE DATA             COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity, store_group_id, register_no, lot_no, product_id, expire_date, import_date, active_ingredient, content, ingredient, packing, usage) FROM stdin;
    public          postgres    false    237   m                0    123899 	   providers 
   TABLE DATA           �   COPY public.providers ("companyName", "phoneNumber", email, "taxCode", address, city, district, wards, note, "storeId", "createdAt", "updatedAt", id) FROM stdin;
    public          postgres    false    238   �                 0    131082    role_permissions 
   TABLE DATA           \   COPY public.role_permissions (role_id, permission_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    248   5#                0    123905    roles 
   TABLE DATA           T   COPY public.roles (id, role_name, "createdAt", "updatedAt", permission) FROM stdin;
    public          postgres    false    239   R#                0    123911    store_assets 
   TABLE DATA           X   COPY public.store_assets (id, store_id, asset_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   o#                0    123916    store_group 
   TABLE DATA           �   COPY public.store_group (id, store_id, group_name, created_at, updated_at, status, description, deleted_at, deleted_by, group_slug) FROM stdin;
    public          postgres    false    241   j$                0    123925    store_reward_point 
   TABLE DATA           �   COPY public.store_reward_point (id, store_id, convert_to, convert_rate, created_at, updated_at, status, description, deleted_at, deleted_by, point_value) FROM stdin;
    public          postgres    false    242   �&                0    123936    stores 
   TABLE DATA           �   COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    243   �'                0    123944    subscriptions 
   TABLE DATA           �   COPY public.subscriptions (id, branch_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt", plan_type, auto_renew, payment_method) FROM stdin;
    public          postgres    false    244   �(                0    131088    user_permissions 
   TABLE DATA           \   COPY public.user_permissions (user_id, permission_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    249   �)                0    123949    users 
   TABLE DATA           �   COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    245   �)      �           2606    123957 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    212            (           2606    131105 (   admin_permissions admin_permissions_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (admin_id, permission_id);
 R   ALTER TABLE ONLY public.admin_permissions DROP CONSTRAINT admin_permissions_pkey;
       public            postgres    false    251    251            �           2606    123959    admin_plans admin_plans_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.admin_plans
    ADD CONSTRAINT admin_plans_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.admin_plans DROP CONSTRAINT admin_plans_pkey;
       public            postgres    false    213            �           2606    123961 (   admin_subsciption admin_subsciption_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_pkey;
       public            postgres    false    214            �           2606    123963     admin_to_user admin_to_user_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT admin_to_user_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT admin_to_user_pkey;
       public            postgres    false    215            �           2606    123965    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    216            �           2606    123967    assets assets_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
       public            postgres    false    217            �           2606    123969 "   branch_details branch_details_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_pkey;
       public            postgres    false    218            �           2606    123971 *   branch_integration branch_integration_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.branch_integration
    ADD CONSTRAINT branch_integration_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.branch_integration DROP CONSTRAINT branch_integration_pkey;
       public            postgres    false    219            �           2606    123973 "   branch_payment branch_payment_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_payment DROP CONSTRAINT branch_payment_pkey;
       public            postgres    false    220            �           2606    123975    branch_plans branch_plans_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.branch_plans
    ADD CONSTRAINT branch_plans_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.branch_plans DROP CONSTRAINT branch_plans_pkey;
       public            postgres    false    221            �           2606    123977    branches branches_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);
 @   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pkey;
       public            postgres    false    222            �           2606    123979    clinics clinics_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_pkey;
       public            postgres    false    223            �           2606    123981    consumers consumers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_pkey;
       public            postgres    false    224            �           2606    123171    doctors doctors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    209                       2606    124334 &   financial_ledger financial_ledger_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.financial_ledger
    ADD CONSTRAINT financial_ledger_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.financial_ledger DROP CONSTRAINT financial_ledger_pkey;
       public            postgres    false    246            �           2606    123983    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    225            �           2606    123985 2   import_invoice_product import_invoice_product_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_pkey;
       public            postgres    false    226            �           2606    123987 $   import_invoices import_invoices_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_pkey;
       public            postgres    false    227            �           2606    123989     invoice_items invoice_items_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT invoice_items_pkey;
       public            postgres    false    228            �           2606    123277 0   invoice_prescriptions invoice_prescriptions_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.invoice_prescriptions
    ADD CONSTRAINT invoice_prescriptions_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.invoice_prescriptions DROP CONSTRAINT invoice_prescriptions_pkey;
       public            postgres    false    211            �           2606    123268    invoices invoices_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.invoices DROP CONSTRAINT invoices_pkey;
       public            postgres    false    210            &           2606    131099 2   membership_permissions membership_permissions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.membership_permissions
    ADD CONSTRAINT membership_permissions_pkey PRIMARY KEY (membership_id, permission_id);
 \   ALTER TABLE ONLY public.membership_permissions DROP CONSTRAINT membership_permissions_pkey;
       public            postgres    false    250    250            �           2606    123991    memberships memberships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_pkey;
       public            postgres    false    229            �           2606    123993     other_charges other_charges_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT other_charges_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT other_charges_pkey;
       public            postgres    false    230                        2606    131081 (   payment_histories payment_histories_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.payment_histories
    ADD CONSTRAINT payment_histories_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.payment_histories DROP CONSTRAINT payment_histories_pkey;
       public            postgres    false    247            *           2606    131113    permissions permissions_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pkey;
       public            postgres    false    252            �           2606    123995 *   point_transactions point_transactions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT point_transactions_pkey;
       public            postgres    false    231            �           2606    123997    points points_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.points DROP CONSTRAINT points_pkey;
       public            postgres    false    232            �           2606    123999 "   product_assets product_assets_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_pkey;
       public            postgres    false    233            �           2606    124001 "   product_groups product_groups_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (product_id, group_id);
 L   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_pkey;
       public            postgres    false    234    234            �           2606    124003     product_units product_units_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_pkey;
       public            postgres    false    236            �           2606    124005    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    237                       2606    124007    providers providers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
       public            postgres    false    238            "           2606    131087 &   role_permissions role_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);
 P   ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_pkey;
       public            postgres    false    248    248                       2606    124009    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    239                       2606    124011    store_assets store_assets_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_pkey;
       public            postgres    false    240            
           2606    124013    store_group store_group_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_pkey;
       public            postgres    false    241                       2606    124015 *   store_reward_point store_reward_point_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.store_reward_point DROP CONSTRAINT store_reward_point_pkey;
       public            postgres    false    242                       2606    124017    stores stores_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
       public            postgres    false    243                       2606    124019     subscriptions subscriptions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_pkey;
       public            postgres    false    244            $           2606    131093 &   user_permissions user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_pkey PRIMARY KEY (user_id, permission_id);
 P   ALTER TABLE ONLY public.user_permissions DROP CONSTRAINT user_permissions_pkey;
       public            postgres    false    249    249                       2606    124021    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    245            �           1259    131114    admin_to_user_userId_key    INDEX     _   CREATE UNIQUE INDEX "admin_to_user_userId_key" ON public.admin_to_user USING btree ("userId");
 .   DROP INDEX public."admin_to_user_userId_key";
       public            postgres    false    215            �           1259    131115    admins_username_key    INDEX     Q   CREATE UNIQUE INDEX admins_username_key ON public.admins USING btree (username);
 '   DROP INDEX public.admins_username_key;
       public            postgres    false    216            �           1259    124022    branch_details_branch_id_key    INDEX     c   CREATE UNIQUE INDEX branch_details_branch_id_key ON public.branch_details USING btree (branch_id);
 0   DROP INDEX public.branch_details_branch_id_key;
       public            postgres    false    218            �           1259    124023     branch_integration_branch_id_idx    INDEX     d   CREATE INDEX branch_integration_branch_id_idx ON public.branch_integration USING btree (branch_id);
 4   DROP INDEX public.branch_integration_branch_id_idx;
       public            postgres    false    219            �           1259    124024     branch_integration_branch_id_key    INDEX     k   CREATE UNIQUE INDEX branch_integration_branch_id_key ON public.branch_integration USING btree (branch_id);
 4   DROP INDEX public.branch_integration_branch_id_key;
       public            postgres    false    219            �           1259    124025    branch_payment_branch_id_idx    INDEX     \   CREATE INDEX branch_payment_branch_id_idx ON public.branch_payment USING btree (branch_id);
 0   DROP INDEX public.branch_payment_branch_id_idx;
       public            postgres    false    220            �           1259    124026    branch_payment_branch_id_key    INDEX     c   CREATE UNIQUE INDEX branch_payment_branch_id_key ON public.branch_payment USING btree (branch_id);
 0   DROP INDEX public.branch_payment_branch_id_key;
       public            postgres    false    220            �           1259    124027    branches_branch_name_idx    INDEX     T   CREATE INDEX branches_branch_name_idx ON public.branches USING btree (branch_name);
 ,   DROP INDEX public.branches_branch_name_idx;
       public            postgres    false    222            �           1259    124028    branches_owner_id_idx    INDEX     N   CREATE INDEX branches_owner_id_idx ON public.branches USING btree (owner_id);
 )   DROP INDEX public.branches_owner_id_idx;
       public            postgres    false    222            �           1259    124029    clinics_store_id_idx    INDEX     L   CREATE INDEX clinics_store_id_idx ON public.clinics USING btree (store_id);
 (   DROP INDEX public.clinics_store_id_idx;
       public            postgres    false    223            �           1259    124030    consumers_branch_id_idx    INDEX     R   CREATE INDEX consumers_branch_id_idx ON public.consumers USING btree (branch_id);
 +   DROP INDEX public.consumers_branch_id_idx;
       public            postgres    false    224            �           1259    124031    consumers_consumer_email_idx    INDEX     \   CREATE INDEX consumers_consumer_email_idx ON public.consumers USING btree (consumer_email);
 0   DROP INDEX public.consumers_consumer_email_idx;
       public            postgres    false    224            �           1259    124032    consumers_consumer_id_idx    INDEX     V   CREATE INDEX consumers_consumer_id_idx ON public.consumers USING btree (consumer_id);
 -   DROP INDEX public.consumers_consumer_id_idx;
       public            postgres    false    224            �           1259    124033    consumers_consumer_name_idx    INDEX     Z   CREATE INDEX consumers_consumer_name_idx ON public.consumers USING btree (consumer_name);
 /   DROP INDEX public.consumers_consumer_name_idx;
       public            postgres    false    224            �           1259    124034    consumers_phone_number_idx    INDEX     X   CREATE INDEX consumers_phone_number_idx ON public.consumers USING btree (phone_number);
 .   DROP INDEX public.consumers_phone_number_idx;
       public            postgres    false    224            �           1259    124035    doctors_branch_id_idx    INDEX     N   CREATE INDEX doctors_branch_id_idx ON public.doctors USING btree (branch_id);
 )   DROP INDEX public.doctors_branch_id_idx;
       public            postgres    false    209            �           1259    124036    groups_group_name_idx    INDEX     N   CREATE INDEX groups_group_name_idx ON public.groups USING btree (group_name);
 )   DROP INDEX public.groups_group_name_idx;
       public            postgres    false    225            �           1259    124037    groups_store_id_idx    INDEX     J   CREATE INDEX groups_store_id_idx ON public.groups USING btree (store_id);
 '   DROP INDEX public.groups_store_id_idx;
       public            postgres    false    225            �           1259    124038 )   import_invoice_product_import_invoice_idx    INDEX     v   CREATE INDEX import_invoice_product_import_invoice_idx ON public.import_invoice_product USING btree (import_invoice);
 =   DROP INDEX public.import_invoice_product_import_invoice_idx;
       public            postgres    false    226            �           1259    124039 %   import_invoice_product_product_id_idx    INDEX     n   CREATE INDEX import_invoice_product_product_id_idx ON public.import_invoice_product USING btree (product_id);
 9   DROP INDEX public.import_invoice_product_product_id_idx;
       public            postgres    false    226            �           1259    124040    import_invoices_provider_id_idx    INDEX     b   CREATE INDEX import_invoices_provider_id_idx ON public.import_invoices USING btree (provider_id);
 3   DROP INDEX public.import_invoices_provider_id_idx;
       public            postgres    false    227            �           1259    124041    import_invoices_store_id_idx    INDEX     \   CREATE INDEX import_invoices_store_id_idx ON public.import_invoices USING btree (store_id);
 0   DROP INDEX public.import_invoices_store_id_idx;
       public            postgres    false    227            �           1259    124042    invoices_branchId_idx    INDEX     R   CREATE INDEX "invoices_branchId_idx" ON public.invoices USING btree ("branchId");
 +   DROP INDEX public."invoices_branchId_idx";
       public            postgres    false    210            �           1259    124043    invoices_customerName_idx    INDEX     Z   CREATE INDEX "invoices_customerName_idx" ON public.invoices USING btree ("customerName");
 /   DROP INDEX public."invoices_customerName_idx";
       public            postgres    false    210            �           1259    124044    invoices_saleDate_idx    INDEX     R   CREATE INDEX "invoices_saleDate_idx" ON public.invoices USING btree ("saleDate");
 +   DROP INDEX public."invoices_saleDate_idx";
       public            postgres    false    210            �           1259    124045    memberships_branch_id_idx    INDEX     V   CREATE INDEX memberships_branch_id_idx ON public.memberships USING btree (branch_id);
 -   DROP INDEX public.memberships_branch_id_idx;
       public            postgres    false    229            �           1259    124046    memberships_email_idx    INDEX     N   CREATE INDEX memberships_email_idx ON public.memberships USING btree (email);
 )   DROP INDEX public.memberships_email_idx;
       public            postgres    false    229            �           1259    124047    memberships_phone_number_idx    INDEX     \   CREATE INDEX memberships_phone_number_idx ON public.memberships USING btree (phone_number);
 0   DROP INDEX public.memberships_phone_number_idx;
       public            postgres    false    229            �           1259    124048    memberships_username_idx    INDEX     T   CREATE INDEX memberships_username_idx ON public.memberships USING btree (username);
 ,   DROP INDEX public.memberships_username_idx;
       public            postgres    false    229            �           1259    124049    point_transactions_pointId_key    INDEX     k   CREATE UNIQUE INDEX "point_transactions_pointId_key" ON public.point_transactions USING btree ("pointId");
 4   DROP INDEX public."point_transactions_pointId_key";
       public            postgres    false    231            �           1259    124050    points_consumerId_idx    INDEX     R   CREATE INDEX "points_consumerId_idx" ON public.points USING btree ("consumerId");
 +   DROP INDEX public."points_consumerId_idx";
       public            postgres    false    232            �           1259    124051    points_consumerId_key    INDEX     Y   CREATE UNIQUE INDEX "points_consumerId_key" ON public.points USING btree ("consumerId");
 +   DROP INDEX public."points_consumerId_key";
       public            postgres    false    232            �           1259    124052    product_groups_group_id_idx    INDEX     Z   CREATE INDEX product_groups_group_id_idx ON public.product_groups USING btree (group_id);
 /   DROP INDEX public.product_groups_group_id_idx;
       public            postgres    false    234            �           1259    124053    product_units_name_idx    INDEX     P   CREATE INDEX product_units_name_idx ON public.product_units USING btree (name);
 *   DROP INDEX public.product_units_name_idx;
       public            postgres    false    236            �           1259    124054    product_units_store_id_idx    INDEX     X   CREATE INDEX product_units_store_id_idx ON public.product_units USING btree (store_id);
 .   DROP INDEX public.product_units_store_id_idx;
       public            postgres    false    236            �           1259    124055    products_barcode_idx    INDEX     L   CREATE INDEX products_barcode_idx ON public.products USING btree (barcode);
 (   DROP INDEX public.products_barcode_idx;
       public            postgres    false    237            �           1259    124056    products_group_id_idx    INDEX     N   CREATE INDEX products_group_id_idx ON public.products USING btree (group_id);
 )   DROP INDEX public.products_group_id_idx;
       public            postgres    false    237            �           1259    124057    products_medicine_id_idx    INDEX     T   CREATE INDEX products_medicine_id_idx ON public.products USING btree (medicine_id);
 ,   DROP INDEX public.products_medicine_id_idx;
       public            postgres    false    237            �           1259    124058    products_product_id_idx    INDEX     R   CREATE INDEX products_product_id_idx ON public.products USING btree (product_id);
 +   DROP INDEX public.products_product_id_idx;
       public            postgres    false    237            �           1259    124059    products_product_id_key    INDEX     Y   CREATE UNIQUE INDEX products_product_id_key ON public.products USING btree (product_id);
 +   DROP INDEX public.products_product_id_key;
       public            postgres    false    237            �           1259    124060    products_product_name_idx    INDEX     V   CREATE INDEX products_product_name_idx ON public.products USING btree (product_name);
 -   DROP INDEX public.products_product_name_idx;
       public            postgres    false    237                        1259    124061    products_product_no_idx    INDEX     R   CREATE INDEX products_product_no_idx ON public.products USING btree (product_no);
 +   DROP INDEX public.products_product_no_idx;
       public            postgres    false    237                       1259    124062    products_store_id_idx    INDEX     N   CREATE INDEX products_store_id_idx ON public.products USING btree (store_id);
 )   DROP INDEX public.products_store_id_idx;
       public            postgres    false    237                       1259    124063    store_group_group_name_idx    INDEX     X   CREATE INDEX store_group_group_name_idx ON public.store_group USING btree (group_name);
 .   DROP INDEX public.store_group_group_name_idx;
       public            postgres    false    241                       1259    124064    store_group_store_id_idx    INDEX     T   CREATE INDEX store_group_store_id_idx ON public.store_group USING btree (store_id);
 ,   DROP INDEX public.store_group_store_id_idx;
       public            postgres    false    241                       1259    124065    store_reward_point_store_id_idx    INDEX     b   CREATE INDEX store_reward_point_store_id_idx ON public.store_reward_point USING btree (store_id);
 3   DROP INDEX public.store_reward_point_store_id_idx;
       public            postgres    false    242                       1259    124066    store_reward_point_store_id_key    INDEX     i   CREATE UNIQUE INDEX store_reward_point_store_id_key ON public.store_reward_point USING btree (store_id);
 3   DROP INDEX public.store_reward_point_store_id_key;
       public            postgres    false    242                       1259    124067    stores_branch_id_idx    INDEX     L   CREATE INDEX stores_branch_id_idx ON public.stores USING btree (branch_id);
 (   DROP INDEX public.stores_branch_id_idx;
       public            postgres    false    243                       1259    124068    stores_store_name_idx    INDEX     N   CREATE INDEX stores_store_name_idx ON public.stores USING btree (store_name);
 )   DROP INDEX public.stores_store_name_idx;
       public            postgres    false    243                       1259    124069    subscriptions_branch_id_idx    INDEX     Z   CREATE INDEX subscriptions_branch_id_idx ON public.subscriptions USING btree (branch_id);
 /   DROP INDEX public.subscriptions_branch_id_idx;
       public            postgres    false    244                       1259    124070    subscriptions_plan_id_idx    INDEX     V   CREATE INDEX subscriptions_plan_id_idx ON public.subscriptions USING btree (plan_id);
 -   DROP INDEX public.subscriptions_plan_id_idx;
       public            postgres    false    244                       1259    124071    users_email_idx    INDEX     B   CREATE INDEX users_email_idx ON public.users USING btree (email);
 #   DROP INDEX public.users_email_idx;
       public            postgres    false    245                       1259    124072    users_phone_number_idx    INDEX     P   CREATE INDEX users_phone_number_idx ON public.users USING btree (phone_number);
 *   DROP INDEX public.users_phone_number_idx;
       public            postgres    false    245                       1259    124073    users_username_idx    INDEX     H   CREATE INDEX users_username_idx ON public.users USING btree (username);
 &   DROP INDEX public.users_username_idx;
       public            postgres    false    245            f           2606    131156 1   admin_permissions admin_permissions_admin_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.admin_permissions DROP CONSTRAINT admin_permissions_admin_id_fkey;
       public          postgres    false    3507    216    251            g           2606    131161 6   admin_permissions admin_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.admin_permissions DROP CONSTRAINT admin_permissions_permission_id_fkey;
       public          postgres    false    251    252    3626            1           2606    124074 1   admin_subsciption admin_subsciption_admin_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_admin_id_fkey;
       public          postgres    false    3507    216    214            2           2606    124079 0   admin_subsciption admin_subsciption_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.admin_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_plan_id_fkey;
       public          postgres    false    214    213    3500            3           2606    124084 (   admin_to_user admin_to_user_adminId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_adminId_fkey";
       public          postgres    false    216    3507    215            4           2606    124089 '   admin_to_user admin_to_user_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_userId_fkey";
       public          postgres    false    245    3611    215            5           2606    124094    admins admins_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.admins DROP CONSTRAINT "admins_roleId_fkey";
       public          postgres    false    3589    239    216            6           2606    124099    assets assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_store_id_fkey;
       public          postgres    false    3602    217    243            7           2606    124104 ,   branch_details branch_details_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_branch_id_fkey;
       public          postgres    false    222    3527    218            8           2606    124109 4   branch_integration branch_integration_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_integration
    ADD CONSTRAINT branch_integration_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.branch_integration DROP CONSTRAINT branch_integration_branch_id_fkey;
       public          postgres    false    222    3527    219            9           2606    124114 ,   branch_payment branch_payment_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_payment DROP CONSTRAINT branch_payment_branch_id_fkey;
       public          postgres    false    3527    222    220            :           2606    124119    branches branches_owner_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_owner_id_fkey;
       public          postgres    false    222    245    3611            ;           2606    124124    clinics clinics_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_store_id_fkey;
       public          postgres    false    243    3602    223            <           2606    124129 "   consumers consumers_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_branch_id_fkey;
       public          postgres    false    222    3527    224            +           2606    124134    doctors doctors_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_branch_id_fkey;
       public          postgres    false    3527    209    222            ,           2606    124139    doctors doctors_storesId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT "doctors_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.doctors DROP CONSTRAINT "doctors_storesId_fkey";
       public          postgres    false    3602    243    209            ]           2606    124337 0   financial_ledger financial_ledger_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.financial_ledger
    ADD CONSTRAINT financial_ledger_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.financial_ledger DROP CONSTRAINT financial_ledger_branch_id_fkey;
       public          postgres    false    3527    222    246            =           2606    124144    groups groups_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_store_id_fkey;
       public          postgres    false    225    3602    243            >           2606    124149 A   import_invoice_product import_invoice_product_import_invoice_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_import_invoice_fkey FOREIGN KEY (import_invoice) REFERENCES public.import_invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 k   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_import_invoice_fkey;
       public          postgres    false    227    226    3547            ?           2606    124154 =   import_invoice_product import_invoice_product_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 g   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_product_id_fkey;
       public          postgres    false    237    226    3580            @           2606    124159 0   import_invoices import_invoices_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Z   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_provider_id_fkey;
       public          postgres    false    238    227    3587            A           2606    124164 -   import_invoices import_invoices_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_store_id_fkey;
       public          postgres    false    227    243    3602            B           2606    124169 *   invoice_items invoice_items_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_invoiceId_fkey";
       public          postgres    false    228    210    3493            C           2606    124174 *   invoice_items invoice_items_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_productId_fkey";
       public          postgres    false    228    237    3580            0           2606    123571 :   invoice_prescriptions invoice_prescriptions_bac_si_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_prescriptions
    ADD CONSTRAINT invoice_prescriptions_bac_si_id_fkey FOREIGN KEY (bac_si_id) REFERENCES public.doctors(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 d   ALTER TABLE ONLY public.invoice_prescriptions DROP CONSTRAINT invoice_prescriptions_bac_si_id_fkey;
       public          postgres    false    209    3489    211            /           2606    123566 :   invoice_prescriptions invoice_prescriptions_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_prescriptions
    ADD CONSTRAINT "invoice_prescriptions_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 f   ALTER TABLE ONLY public.invoice_prescriptions DROP CONSTRAINT "invoice_prescriptions_invoiceId_fkey";
       public          postgres    false    211    3493    210            -           2606    124179    invoices invoices_branchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_branchId_fkey";
       public          postgres    false    3527    222    210            .           2606    124184 !   invoices invoices_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_customerId_fkey";
       public          postgres    false    3537    210    224            d           2606    131146 @   membership_permissions membership_permissions_membership_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.membership_permissions
    ADD CONSTRAINT membership_permissions_membership_id_fkey FOREIGN KEY (membership_id) REFERENCES public.memberships(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.membership_permissions DROP CONSTRAINT membership_permissions_membership_id_fkey;
       public          postgres    false    250    3556    229            e           2606    131151 @   membership_permissions membership_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.membership_permissions
    ADD CONSTRAINT membership_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.membership_permissions DROP CONSTRAINT membership_permissions_permission_id_fkey;
       public          postgres    false    250    252    3626            D           2606    124189 &   memberships memberships_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_branch_id_fkey;
       public          postgres    false    3527    222    229            E           2606    124194 *   other_charges other_charges_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT "other_charges_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT "other_charges_invoiceId_fkey";
       public          postgres    false    3493    210    230            ^           2606    131121 >   payment_histories payment_histories_admin_subscription_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_histories
    ADD CONSTRAINT payment_histories_admin_subscription_id_fkey FOREIGN KEY (admin_subscription_id) REFERENCES public.admin_subsciption(id) ON UPDATE CASCADE ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.payment_histories DROP CONSTRAINT payment_histories_admin_subscription_id_fkey;
       public          postgres    false    247    214    3502            _           2606    131116 8   payment_histories payment_histories_subscription_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_histories
    ADD CONSTRAINT payment_histories_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.payment_histories DROP CONSTRAINT payment_histories_subscription_id_fkey;
       public          postgres    false    3606    244    247            F           2606    124199 2   point_transactions point_transactions_pointId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT "point_transactions_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES public.points(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT "point_transactions_pointId_fkey";
       public          postgres    false    232    231    3566            G           2606    124204    points points_consumerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_consumerId_fkey";
       public          postgres    false    232    3537    224            H           2606    124209    points points_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_storeId_fkey";
       public          postgres    false    243    232    3602            I           2606    124214 +   product_assets product_assets_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_asset_id_fkey;
       public          postgres    false    233    217    3510            J           2606    124219 -   product_assets product_assets_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 W   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_product_id_fkey;
       public          postgres    false    237    233    3580            K           2606    124224 +   product_assets product_assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_store_id_fkey;
       public          postgres    false    233    3602    243            L           2606    124229 +   product_groups product_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_group_id_fkey;
       public          postgres    false    225    234    3540            M           2606    124234 -   product_groups product_groups_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_product_id_fkey;
       public          postgres    false    237    3580    234            N           2606    124239 7   product_unit_labels product_unit_labels_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_id_fkey;
       public          postgres    false    237    3580    235            O           2606    124244 9   product_unit_labels product_unit_labels_product_unit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_unit_fkey;
       public          postgres    false    236    3574    235            P           2606    124249 )   product_units product_units_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);
 S   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_store_id_fkey;
       public          postgres    false    243    236    3602            Q           2606    124254    products products_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_group_id_fkey;
       public          postgres    false    225    237    3540            R           2606    124259 "   products products_productUnit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_productUnit_fkey";
       public          postgres    false    3574    236    237            S           2606    124264 %   products products_store_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_group_id_fkey FOREIGN KEY (store_group_id) REFERENCES public.store_group(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_group_id_fkey;
       public          postgres    false    241    3594    237            T           2606    124269    products products_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_id_fkey;
       public          postgres    false    237    3602    243            U           2606    124274     providers providers_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.providers DROP CONSTRAINT "providers_storeId_fkey";
       public          postgres    false    243    3602    238            `           2606    131131 4   role_permissions role_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_permission_id_fkey;
       public          postgres    false    248    252    3626            a           2606    131126 .   role_permissions role_permissions_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_role_id_fkey;
       public          postgres    false    239    3589    248            V           2606    124279 '   store_assets store_assets_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_asset_id_fkey;
       public          postgres    false    217    240    3510            W           2606    124284 '   store_assets store_assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_store_id_fkey;
       public          postgres    false    240    3602    243            X           2606    124289 %   store_group store_group_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_store_id_fkey;
       public          postgres    false    243    241    3602            Y           2606    124294 3   store_reward_point store_reward_point_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public.store_reward_point DROP CONSTRAINT store_reward_point_store_id_fkey;
       public          postgres    false    3602    242    243            Z           2606    124299    stores stores_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_branch_id_fkey;
       public          postgres    false    3527    243    222            [           2606    124304 *   subscriptions subscriptions_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_branch_id_fkey;
       public          postgres    false    244    222    3527            \           2606    124309 (   subscriptions subscriptions_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.branch_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_plan_id_fkey;
       public          postgres    false    221    244    3523            b           2606    131141 4   user_permissions user_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.user_permissions DROP CONSTRAINT user_permissions_permission_id_fkey;
       public          postgres    false    249    252    3626            c           2606    131136 .   user_permissions user_permissions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.user_permissions DROP CONSTRAINT user_permissions_user_id_fkey;
       public          postgres    false    249    3611    245            �   �  x���Mo�F��ί���F�|�H@4�n��j@��P� Y�j��A��^J��l`���>x�!��$-se�V���/t�� ,�0��2	��URF]�2I)�d���H���&	%���XkK���q%�ԅ��,����m�5�/�-^!��-j^�};��_��G�JK.�).|0�K�
�*4S�)��\U�Y5N����E�e��N"z���\�ДڠF�+����z����N����.��G��Z��3>}�N��+Z:Yjh�m�|c�4*�4FK�B;:�+yT:9�#�A;�Aa������t��4���)��^����E����8���D����z��PS���5$�%��J�+� �ɡP���� ���h�О�AB^�D��E)�D�	� K.������8��~�cݦz��ah#���}{7��=k��0�i`p8tO�_ܙE��abKW6Èl�!�qF�f6bp$o3��AHl?_�0�Ol7<�%F�C���ʷ9�cfmπ�!��Ŝ`� +���C���c�7��U�z��l�o����z�S�O�b��X�&�2h�'w�ն�����")�s�u���:�D��k�H����)/9����o����NO[/y֗� c�T�xn�=~Z>_in�u�i�t�p�}�9���g���
��P�g_ž=^�]�O��!�s���qG�O�w��Ӊz�����~�G7=^y�<��P�α���ᰉkRԵ��*��E��6�Ÿ\�#ə�~l�]�R7ܭ?��.3�x��~f�G�c�hjղ��y�N���0-��ל�e?�y�~]��>����L���ߑ���E�!���>��:����f��h�KvQ����*�=�)�SI�/����^��bG<
:Q���gm�Xr�7���G��x�/e�s)�ۧuYWI�Q�(��Y������_�Lp�            x������ � �      �   �   x�}�;R1��>�{F;�-�'�̎��C��"I�557����"܄А0�Ќ��F��ŗ
�qb3B(�@:�G[NAܝ^wʢ����EXJZ��s������5�PGv�l��7��Oe���b^��2����7\�s�]�o�V���$��Դ����/	&"G��g×��T&4D�+��	]��CH#�N���e������I��<oE:���r8�I|I���5�:����a���M'����b�      �   �   x����J�1���Oa/��5�l'bac%V�̟Z����ju�0�|�9�xp+T E+��ՇA��v�{X��wZ��0���{�k�!�$vI��:m����bP��R�,$1��� �%L��ޢ'&V �j�v~�����tzZo#������r������+�RI�戌\A�h�c-UZ��g���&	Ѭ���O�9nP��X��~7Ez?b9T���7�)��??�<�N
]%��Ω���W��a۶OEl      �   �   x���AjAE�ӧ�>�hiiu�%����!�U�$��}�a7����t1��.���J�\a5��� �v(�����X��y:?�v��+A�F�Z\WP|�G����]o�n���)F�h��;56q��d�V7��Fb�����襮@����� =�h�|�4~kxw��Nj׳�otD��p��W�`.�-�\51����FS�����d�u@a��r���&z��8��'t|��q|��x      �   �  x����n�0���)8p�:�·����i
TU����(�ei�c_���c��o�$M���v4_iF3�y��+W��m���c�ye��
�ص���Xf*G���s�������)G�Hu��P��k����7�4��pqn�w|��<�Q2t��,L�/�7J����΄J�Xg�R�c�.���h��:i���Xd�v�2��bBKo3zJ��k[��|#��x8+D��zizr	[]�����m����,U�rhD&��%j[�i�3m��k5�5+�
B�=V7�����Z��#,�6�v���;�G�'������D�	�>#m(Jܲ��T�]�����q�Q�{3�̠''����^
ǫ?���r4\�������]n��]���c�3:k�>�=�;Z"��Z��;���^      �   �  x��\]oɍ}v�
�O�Hx],��c&d��� ټXU,[Y[r$y�$���,ɞH�¸�L����f�jVש�C6[�x�6� ��`t�����,}<XQs���
�b�ҊvܰM��Ky���^�߯//��v�l�W�u��G�*"��$�@�.K�d�����O�t~}v�Ro�x���8;����5��?��:{�O�O:���O���a�0P(���g������͉wǴs��]�3����ٵ�zum�_�]��������[u#O���o���;�!�p�eO~Ҏ��Ϙ�\�:.f�� է�:&ow�:o��eĂut����}��|�0p��Y��ׯ�Ϟ��h���������}
?�t�Ǹ���5-�#�(� �����$����CQ���ІD#���t2j��;*��5�	�ῃ��~|��F0�s��s״���;�1�	JP4W�A��2��9z{��p}5'(�.
�]t��ր7����\���w�Ӎ0�ڛU�.&ʇ :��QB��>ḝ�����D�֜�U4�F��'�@n%�F�ms(qLZ���d������DidJ7�w��7��W������Z��xy�f�r��V{���0{����Y!���=eD����LKc&��X��Bm5��k�3�0t{���W�,u@Hf/�\�IS`�d~�P�ڏ/8�����{��� =L�kU������'K�4#dv�s�.������7����1e�5 �S�͉�_^��'�*����uB�t�-�k�.���_[뽼���t�cw����V����O�}�X)��w`Z����MGS��[k�߽�B1�홫[j����؈t��x�)�1nWո�uE��ٓ�Ӈĭ7m�q�[ao��+��S�� z��x��K{�v1>�;��r�aL���v?k�S�zibj�6�^���[�f�U;�*Lf��R��S��~|�A3���GC	�{���eF��k�R����h�,Ҋ�W.��l���qX�fz�wB�+Y�8�+F	����z/��9F��اG�wǴDL�p�^�eLRXfY`&R-i
�l/�rax�~#��
j�<�șꬖܮ�T�`H��p�?��F�ÏJ�+n&�V{�{~V��z�ǉ���q��1=��}�2��5gբ$�A�B�9+R����\9��S
�ۻ]�
&������&Z�xq��&?nU[�ɺ���� \�gq�*;���zgZ�H�U�P�TFȁ��'�9Wq�[��TmaY�e���E��I!V&t���S;��ύP�ڻU�
��C����!���9���&G���i1��ə��6�dP�qX ��,d��7�bd��z�	n�ԭ�d�DMQ�[�r����|�-�9�DgR�~0�far��k%Z���V��h�G{�w����1-�w����~m�at�L�卢�cִ=�IkeJ�����Mx'K�PS�&�R*�$�7#���mS�7��D�)~*{�;$z��;�0��Ķ�,����&�&Ȱ����OPAK!�p�`h�3&`ˋ3�Ğ,Q.����˭8l�+9,yz$�|;�c�M�qyHPL��3�d�O���lw˄kcS��{��7�MkQ�(��L)��jE�4�����V{�5��Cܹ�ݳ,=K�:\I�F8�lq�����"�M�$t�{[I���J
�ѓ���O�hr�_p��'���<�L��&M�B��Y�Q)�ti��7�P���p4�YKSm��۾�60ij(�����m�_np�yth�o9�D�MK�D���`㑠V��'-\,���}�AZ�!R��*�f�
t_Ծ�,'(��İڻ����Me��mw,˨-�3p���>��mЖ�I��)l�a���>���NJ�+!TNΉ~�������x��l��ޕu�-b��,�@!�BT�|�����dP�
���l�^��2FSi� �f��Hbu��EŃ)6B�Y���r�U��@?��L����~���§���#q�eш��6�wa��)BM�����{�e�0�ɳAVAo���`�1z��i�R|y_�ۈ�V{�U5��7���&�����VH%���0�sG��LH�#��z���#\0�R���v�@��� �c���*�OH����Ro�d����^��c��-ǣ8�|q/�T	=��m��������N�O'�BaG�k�R�0�։�z��D�|�2_��.lMgͱ��c�0�}��޵ѣx"���&DĮ*37ﳪ���;��!i|>~Z��W�OM�G�o��z9�,1%�Z4o����)��>;��G�m�pUIZR6M���	�I��l��s)տf��Ӽ��mU,�����q�l#> �ӂū�@�:�J�B�Ȑ\TO#J���K�Q�%�2�<,G;��н���]7 ���!��1��j�ܲ����z�{�6R���~��zq�-���ɴ�jM�)v�y�	~1�m6��0r�u�~�2(�! ɲ٠�%x\k���ۗ�{�������޸����=��<��W[5ȯule�_����g�t���7������7-�K$M׏��;���m����Mղ��_�H��V�<�h�A�UpTط�[����|s���ż��솟�����7jku��W'p�X��<�~�'ߜ���?c�l�ذ������;�#Ff;<wL�D��ك�O���0�$:�ᑱ��	��}�����#Bu�G����o�e����-K��E�^]m��>��5�΢l>lq��Y}0�꥜�̟��������b���R�
�<�J-�j�/�}�C��G��˕/�G�J�G23[9q(������6��n��q娟e>���
�!���]٢P��w�Ÿ�0K��}k�i�!Yڠ�+�Un�$\���gb��/�b9�����7"���S:4-c�a�F7�H�M ��RZ�����ۇ�b��-���x���_}���):�$ϟ�����g�ߟ��8E���/���n��g����h����{��{/fX��9��	bF�۔��'�!�S���D�-�����B�3H�1;Еs�����D�>K���SC�d�';����q$Д-��2\����o������BG���4k���C܁i)��L-!$��o'�}J��<�Tz��QO�>dٺES$ YZ6�2�M�2B'ʜ|lݹ���ޅ/9a����#���e��nY�����E      �   �   x�����0Ek{
/pѝcb;e���4Nl'H(B�$�@l@���ě� !z�N���׏��]E���8rl����A�"5�G g��0�	@>���v����ʸ��6۶V-�A��4�C�܇^\�4_E���I���5t�N�m�D��ݷ����rH@J��KTYn��o�2�2��?f��7�V�      �   �   x�}�A� E�p
�f����!<A7� ��6j^_� ��-^c�y��T��S�TH��b
(��4d�P� �Ҕ�)j��2��оM~ɮW��yb���8^әÿ�^�R��~���W�|�Q���v���.K      �   ~   x�}���0kj��>�ؒ��nD�FR�E�/�,�p����>��\�K�`+���Kג�vb��-����`��7��6٧��"�a$*�%T���}
��rC]��I$�e����Eڦ��B(�      �   �   x�����@�*���v�v��"���u_"�9�z�°	�%�&y�`l�̱'��f��8,�攢��hX_��"�LY'j>+�F 	h'�����,����ek��4S@�XZ��@�M��9II��^������A}�GG�� �+-.5mz��o5�:
          �   x���1�0E��ّ+�q��#;SW�$ME�"��ۓ"$6��f����w)�a���3|b�a��=u
˪�[X�E��ǲ��Ă�=�e�,��f��݄@�g��}�3�df�(�X1�'ĀN����r@����1��:����%ߊfU]����w���aB��s�4���\�            x������ � �            x��ZMo�Hz>�E�wIW�Ū>�l��ؒ��d;3X�(����d��ڷ r�e�r�$� ����I���'y��m�4�@�Y ��?D�M>��>oQ�2�F�0-�$2%KBJ�܈<�\�A�2fӂ��h��e�ʕY�:g��0�48���_~����|3�n~S���_���l�W�5���Mk9�je�M��"��!M8g*V���W�ǳ�hh�{w�K��us�Zbꂜ6M0����t*�i�F\�_P��~�M<0y?�*솬�]?���#W�̓ �O��V�qכ�v���mC���a���%f(l�;C�a���`+7�u�੩.m�7u�5��3u��,\E^9{p�E�x��r��)K#��_��_�,��p6�jJu�&����`��MT!�862����H�uY�PU��Yj�=󬙣�]W�-����^��+�.����"�i�c��iM�[��(S�o�_�192�&g}p��Ҷ�-  Y�680uゃ��乳tŐ�s@�Ņ��ɩ�S.�D�.���9��.�ѡ�Ly(�T�J&&��J�п����qĥ�kd|��0�2(��y|٫�~n[Γ݄&"ٰ��<:z컮o]�<�59�����tRД�J�0�`�8T�$�2a�,�T[qO`�͂��M='?������w��Q0DO]W���������[�,Jj��A��<}*_�y�ڽ7��:z��
�$LM6e2���ngڢ�]���E�)D*J^c^��UUp<T�!��lg��F�Y3�s`�`X����Hت�2�`��F��M�m�e!��ipy��5�1a��.�H+����H�s�J�ƲP�k��<s���2S��'��>��#�k�<��O��^O�aӺ�|h���W�_Wm@��ƈ�4�����Ξ���iQ�-����<�0���T<�����ծt9�����fe���@����mMA�[�����Cm���I���y?~�� ���(�i�+��?��0lWu��x� �v�-�I	�� LGIz����T�H�]�ԓĖI� `i\ ^n�P��
��f4�$����4��q�{���\ڶ~����p�}���S��(�*"ɂx�:y�2i�g}�t��%90��]��x��3�'�|T
�e,Vx�H��`[���<���M[ب6�\RM��s�wi��B�2��1�כ��@�w�Бˡ���u�Om�kf��l��kP��mm��k� ���r��ͨ��19����j����Q��#Ѹ�tG�0�"� F�b_����J&I��������2�\���=���o�	tu8|��CMo~���'M�G�^V��4�S5A�f�h%U��<{x���|��(VH^�]o��H=i���0�t@�t�-ԼY�r�B�. 5��Aǂ�#W��n�F𪩆������(]���ض��1�ئg��gM��yp�����5�<�N
< c��Q�0@p*"��w�6�N�4Mw��&�&J��2e�yj��P�D�B������O�Fp%9owm���::�3L�J���� ��͈�l������%<H�>�ʻ����P0��-:�� Y�t�R����R��y�����h�r�\:PW����5�y���c{E�3�ܴ�����8ȷ��U�u��3�T�1i����a���1*���|��g�f1Yf�,���2!�)3V��:���7��϶�?7-x���<�.gwF��U�H"D��r�_�}��%���1	͕��bF�d�Xڢ�rW��%X���ҭ�����(/yҺ�m��6B#�=︡���=��L:�) ^ *7NY��vސ�m�z�1��5��+L��
�Rd-8�sW�J�yG�-�1[���e*�1D_'w��Lc�Q
V�OPZ�4%ͼ��faD
�8�s�����o�O�*'����H���6�:�5]�wWq(Q䅌���7��U~�W����ߨّ- ]��?=+�Z*�T�(NoM�-��x�1�85R0��7��[�SM�j��$( ��8��P��K׮��ɇz��暘�'+�g���m]���b�;o�F�y�"�f�>ә�ꂛ�.QEBޝ�q�}�R�;ObbbƩ��Z/&AP������*�4�=��r�`���O�a�ɎL��Ò�Na#����z�~�m�^}��+�WU�5���	�C�}�@�e4Je|k�<��������&�ƈ��SZŃ�7`�P�` �ٰ���R�����k`{�=��nn��5��|o��Yk�So�x��2����W��#����I)���f.e
�X�V��f&��L~߽���C�o������f����(N��B巳Wo_�/��fU���y�k��L�ɛ�h�[���9�f.�5�&����1�p�G��h����\�#���aVP� A`�X���қc�)���b�3G��m����mP�}ğ��B|���`$�/�q�!d��]���$�s�5rR�B�5a�=w�Q�"L!1&�y�����7?���`��|��7��8q����9�}a��*�I
�N�W��|����fv��Iasl�G_+�Uf-��b�����e��Mn��_�b����^�r�,���)'�0s�G�۽�2��堨v1|���9X�[�M�|��\O�f�婣fޒ�׽�;���sI�o�d�Q��ӂ̥}҅J�$���,e�2�!�P���CND��Rݗ�ܧ��s�Ɨ�ÿC�7��ugrq��b��[�H����YW>�����%:z�O�c�1v��B��4#<�˦Z�p�T�ڐ�9,��B�y7�#�D�A��˖k�ia��������}�t��aN��n�^\�D[�j���Ø�k�#%�b�=�ݝ:g�k�$j��D3&�O�e���PD�-��ElRu_;��@ν;��ާɳ�j�ߚ�%	J�f�������S4����]GxJ(�7������m�
���#HS%��33�8$����6sِ�t^�M�p��ח�hbL �ݻ�F�^}1 �׳ާ�æ����)���Q5d�E���S�F�O�K? J�lR��ȼ�q�t� 9������p&�L��6U��1A�?�e=��?3����%��ַ*�'��'Q���qG��:8���ծ`(=�!�L���Y$��/�4,���	d�2>�	8��f�W0P~s5d�D�)=
��vf�K�O�pY7{`<u��U�}F�M���͂du�-��jN'*e��q�oSj���/+�f��l|_��ۛ0��/�oC<g�p6a��֚�	����
�6�U�x㻐86=�G�a^��5ַ�s����y3���{�u�T��7�'~]����6pC�]B���/a �D�#�W�1:A@Ym��o�.o6$�F>���:��OW���y��v��Mʌ����z�e(�"8��9�&��Mﻰ�����o���������?��m��v	r��Z�dpB������۫�,���6�s��D���,b����[:�]��{Ғ��l�����	�9�[ؚ�.x�@ �O۳�x;d��Q!�{�Z��>DEl���b?�d���:�e @�#��]�1ɸ�ZǛ��42������70����U�2�Unb�G~~0�%{�#�9��̥`(�H��E��P�e
%D�C�)�#i�����z�|���p�_�a���&IS�Sxn]��OtʥTH0���,/C���Tl%:�(�������������'1�=��1: d �i�/�2�K�g�$�����0���c�t��lj4�J���[��I�������𿹍��+{�<�>N9~�:Ъ�I��x��i�ՈB$$�L�6#z��d��g�����N#.�檲�̚����]-Ǔ�����غ�Vե��ٞM<�yΟ2 H;�tݦb�­O�.];z�/���C�Bm���\5
B4���U=b�V����i�\nW|�Q�6�Sh����+Z�#��ù�����fI�h&�Qx>&cy��P~_g4w詛C
���\��.�R�;�[o���$�5���� .  ���_��w!�{�dC�hB�٭�TH'A{���,Ղ��U۬�!;a�};���!k��9��1>%���_؞����-�#�������з͘�xvl�5��/��9E��+�mq�5S�����oǳt*$�7�|g���	�1UY����Ԫ(B�K�����dª����r_�����._
��t�J�MKs�����<*�����s}f�&s~��h]���e��yCe��93k�b�S� ����������{)ƿ��!�a(Lㄑ������룋KS4���j�30�m����~~��Σ����&p��.��%�N���0n3�gA3�c[�W5UZIÓ��y�t��ȸ�[C;�G~	��m榻0L݉k*F�J�H���z����gO�x�.$ 8��M�y�����5=>�E���<,[7��ag����$��+��|<��o���-+0�����W�<o�K3���%&h\��ƴ3�f�<��]�¯�q��3Cn�ͽYw_���"p���'�[��x."�~�8�%|����W�d2�ou���      �   �  x��YM�Gz>�~E݃j�wu������ͬ����dCd�l�96��0� ���!0� ��E"g���@�,�@������UMrH�eq�N����>�|��{���;g$\�ؐ��Q�I�u&erxF�4)iN�.��x,r���eӂ��Q.'_�&��b6w��O�[�S�L��i���ӭ7�C�tI���O��xU�zt��m�F�yR����on>���PL5"| ̀���wD��%�{�8��,3��f�k,hư��.�E&�מ�%T���lbkt�j��K?Ew��־M�l�U�}~fg�݀�$G���Éъ*tP��T�Q7M3�.��(O����x}�}�^���P^]_}]����*�H��h�Z���<-�T��6~���^�۟^��v��8��?'� �k����&�Q3|@d*�����cp5���
|�a�#n��J,��#}�sf=�F���s�	^T�Vdʮ`���~�i��m�>�9��,+�?��ȷ�Z�O�v�4KB��&1BP�y凶.�;�ڡȕBJ�H&E�~���f��]_�� L��o, صￆ�Ż
�����u��_P�x=Ia]C7�A�|da��ﾯ�����U�t�W��['��u���.��	DԀ��i��.��%.SB��N�p�H���S��2��]^X�Bck2���Ɨ�
��j
�~S8�u��1:l��ϧ]��]�<ZunTy|�5��[SyXw��0���&T0����xZ\�z�"8"FKĥ���wPZ���ŏzQMV��9\����~r�4�,��<�A� �����b� ����#c Zh�l DJ��)���a@j= �)�p��
�A����@�'N���(B��Ķd\+_a�j
f�)ܝ�vR9�ض/<H���ʻYT���-�x���llg�
�5�Y?����FG�"�2j@ � �3��tp@�/�df{���:���_��oa+�A�~��������͑���%��������k8#W��L�����r[�$�9�|@M���"�H�Jq3�1A�`xĤB���SD��Lz���Kc�ű�����&1��&ͺY�$ݫ�U�A� ����9����܋�*�^������p�v�d��M>ar�MÄqdHJ��20��^���`�s/L��Z��;�E�����zOK���KxM�[8��|�<\	��������Aq(��7��W��Z�<wX��a�H��֠8�܉�{F��q��-��i�S_���@�$���w>Q:1��T7Bg]�}�� /d�@�9�K1w����Y|�3�FM?^�JN��W�S�Y��5�Ǡ�p���`�]UpPP��I�RCweC�I3�6e����8K�J5�����FS��.,�
�1g��[�*�1��kpD �u`C6��v�k��u~�n1���^�g!��7}� ��kQ�Q%Y������+�v6���]�v�뫷��<,�x���Y 糿�IFA�/7/g�� �rޠ�&��g���<��d؃��*�p_���o�4L�j����`c�˲,8�9ϳ�&3��O� k<j&�Y]9�C|R�j������O��Tu1l}�ɨ�6"��Y�ю�n�@<a}���:�Z_�5)����anc�ƴ�P8�K�^k��W�#P�tc#$���8D��ч��v@���3jvKA�Djhv#�Asc���Ҟ�0`u)��X�"#9���b�!%f�(VS�6��*-[�-S[��WS�W�Ld�IU�͸B�M)�H�PF��	�J�K�!��˞����_�����x逇��
$��/y�F˃�ٟ��`A5Ȁ�Jۮ���9�4�����8FIj��a�@��X�8$�F��1�DƔ���N���|����������vl^ jMS6�P�?m���o~�����,%b��K�E�K�|�c��l�M	*k��˘C[!����p;�D$�` �2�Fd�^_��0�
�ry��7���n��?k./g��1mn�xַ
����L���Υ�TYf�a<��3`OV��I�#�
�=O߇Q�����vP�}�9Bl�x8����mAC<F߾��K�m�J�q��.�f8� ��̉\P��r�ۖ{��5���fVwKAA��n~�ڐU lוM�{���Vd{�>��p�C��T���_Nc$�,�
jXĂ�w�K�)��5����� ��v`[���t�g��R��%xu�j�t�7�S��k_���ۊ/ĀCM�|S�	�pЭЇ�'������h�,.��X%��2�)]�\�r%�d�}L앵��=h�����~���ʧ�=jj���i{V�TP���ȣ��4J?A�K���t�|���I,@�:4\��G<n�U���"O?$'෱���XAA�?�$.]��D@tề����ot�0,&��TJ�����[��ǆ�>� ��,�2���TqC�=�1�+��C�wStP�LW+�mCx~h������
-�Htl��o��A�f:DJ�<�}d^�@�n��Y:�d�zJ1��Q� S�y޷O8;�́�hX�,�b��n	^\@ǿ�A�QЩ4�H8�xf)f��P� ӓ��ҁ��J*B��{na���s�, �g�%�j��ta����]`x�=���}סgv<��/ LhL8�G��QZ�߆U(�͛>�)��-�9.~�Q>�Ș�#���B��(�Q1`�W�ݸc�Ȗ�^�m
�.2�1�I����B��eA�lm�{�W��^�It�_�qs$����O�k��V��\�@W�D�=�BS�oh#�h��P*�:�Ew�)���j�2-�t����$7'�j�h%=��?U�ݿ��\���(i\���)�������CCer#(��jk��< ',Ͱ͜Ɗ�����Kt���Q�^4�����b��JO�Evp�N� iaӣ�X4�f[x�(��6~5QJH�=�Pg���NS��[��z��,�b��w�{Z/Y���+�8����_�u�x%�/���_�g��p����(h�hW'�V�Mg�i9�-%˴$*�%5��-q�B�/d�չ�+��{.U�ۀ��(~	}�����P|sZIF2h2Pf���m@X��*Q#ʴ����o`r(Ka�L��>��ˀ���,�~�KγM��W�i5�,R���}^D�@f�h~�s�<t�g� ���h�0H��/�
�u��r'�,?�����ȷ�����w+�H ���C@����JK��hr��Ux� ��Ǔ%�/���?�Xi����l'0��ɯ"�Q��N=F�(���GY��~��J��݅�JB�NFi����4�K�3b
�����3m��y�-]-�������&����/f�s&���uJ�K
����v��d
Aw�J���F�b����&hgw��l�{ЖK���w�����G�2�� ����y^�?�!��l;������(V�_(WjH�Nx	�PYD� �iW���t�2�`��࡛�r㢟6~N��l]�����[�@á)61��C�q���YeO�(->2Y%��`os�����=[|W��w��×����rN!Q|@��V���oBr�a��,g��Pb�L���[�B!��\a�g�\����p����u��#���7��I�5� �S�Q���A���4��$ �!�&��W��a��}�.���yMߍ���~{bx�1\=~��_�E�-Y\M�@L�S�o�B�_x�̶J��O�D�kF�z}��Ν;�;�P|         C  x����n�0 ���H��(_�;���z���;�ݰ���8I���֭V[q��/��Z,J���j؋7�R�/Z}I��p���ߞ�no�����;}/wcp�� �#@�Ň�����������'����{�	'�Y��B-f���fz��O����ݧ>{oU�F��Ԫ�7~Z'^q������ؤ���F��P��B�:�?'rr���#�m����rSz��H�=�lY�H�f)�@��P6�}�#I9A���h��?Km��`Do�o����)���/˩�FC=	�Ds(���(@O�=̈́��@������b�w����U��V{2�|Tf	�25NZ��$1L�L�S2�4�҂j�;Ydd]�Oي���nG�@	G"HG��C�9��7
�+atfJ��!�*-;���(����� �����:dDl`<*����GBV�J1�����L�7S�z�(z͸�	�L���Oz�xxd���x�Zh����Ăqڋl^g���0�M�֭�
��srnǤ�>u�f��|~��ثl��s�Fp�B�҅]�V� ��&S         �  x��W=�E��~�D$�����vL��9������.��  ��	Y�$X�	�Bk�����;�8N;����jW�ҫ�W���P�!V,�d
P,�h.����N���@s��I'�Lt�-f���G�����<w'����E���G��ퟋn���Be��:�:z��2�c�u�������U���P7����sV{�ڦ�?��˓�ɰ�G��E�c�Y���i>fD!4F��5M�}��������;�y�m�8gP��u���j6�*K����=��%�-�͏�n�ly2R���Z�R��� r	hgb$k��8��հ���<&�;���KK���(���R�
٠2&،~�=�����NX�(�[�<�Qb�V���i��Z��J����E߿-���齋�9��t�AVQ:�X9]�YSMP��T�Y�6?����?c���<�>at��O�Ģ!���J���R���v���|���y�1��m@Ɋ�T-��)B	�([���1�Q�c��7g�W�V-!�P��j	X�
�y�����:Q�<t�W�q��O�Vy5s^�.��C�1�b�!qs`Qܲ���T���������uu{>�%U!t"�(&�	�l+G]R����aŋa�}�}�y��}��fzE�T��-�U��T�:X,I�'z��e�����=�33���0C�B���b+�l��MÉ���.�o��_�|*L��L5��*��dN�o�%�j��#��'�Í�wKq��\��}�y�Gw��f*��b�k�02�9�Ҙ����\��'z�[��ꯞ�Gl��yu(Q���!;L�7G�^<�T�^^X��:^�o_��b{1��!gV#9��]-��%x0Q���� HO�#g�}���F:���_��� v��$�"��#!6�KP��W�s#���>Y�y&��uD�g�ow����yp^-��bެP         �  x���MnG�ץS�>�,����:�NV^yS�� KR�!� g�it�p'�:F�14��Uw�z|��ץQ@V� �ԑ�<���&k��ֵՂ �:�Z��6|��,�ר	����@ev��i�U�@~�~�t� ���&t,Q���_һ7�����eC=�2g~��/����Ǉ�}z�_�ǻ�.�O��\PLs��A*;��	Lւi8��*+q��zuA�����	z�#w�B$���V��+H�
�pa�9��T�/?1¿���-�x$�=���ҐT4�;ب�0#(9�{L+���K!K�X�ע 1�f~�W�R%�W�7�c��H�K/iNY4 c �K��E�ަ�ʅi�93V��1�5�mB�F�n��2��K��m� �N��R���r6�)=�D�9��i�a�K/���UQ!�|�fP9 *U{���B�X��&-��$��^Z�'4���d�&��d�r{�1�ȱ��\*H���E���T.�7)15f(%{��5�%w��H�)�6��ys+�p����c�\�r�LiK�%<��=����M7��V_��$eOf� QC���]��D�S��x�n�:��lM{K6^��:g�G��$��H������扏���R6�M������X2	��L��c����I�溿=�ru=7���� ������>��k��8��Ͼ�����ồ�~�����ë�����q���Ꮯ��~o߀d_���ռy������Oc��G         V  x���K��0@��)�/h�"%�:�,���ѷ]=R/�tۓ�&�3I����ml��Lz�"�٪C�}U+P�ZnAE/�
�ض���*�U;P�a��^��p�h9|���Ƿ�ï�_?�i!��>��i�l���K"[���/B.9���莡��.X����]�*{���P1����^���q\��	�	�n���0!�$z�wd�+�ąVl.��N��x������PD9����#bQ��c(�h��s��7��5?��W�2�8��F
o�J©����n���B ���F�6LB�M(��Y�c���9�{���Lp*
�K7�q�VĻ��6-8�*p�cww`�0���.2����˸��iz�GS�5�^��<N"���,��L�J�)/����ÃsB�j�Y��sn�w�Yز�E����L�C ɣC��[�D*,H���/�������̮}��W�v�|͂�}�G,0��q�T��T�������<f7��{�Mb�=�,hׂ�'�g��|ko�lb{��Q°*��O!N�Wv�
����N�����h�@Lfk���/E��������IxU��\	w��n��'�F         L  x���;o\U���_q����c�W	D�$M,R�};elG����B�E4��H$
�����?柰f&�H��qqg������^{;��5v�zUb���D:Cʮ[?BZz�1L�>b/��KC����r-˽��'1��͏bN���0��y�p�6>ړ���,~�|�t�,����sf��ā3�,�l�:�JI./�[��3�KT�M���,�}�e������n���xb����7O�yk�6ﬧ���b��;�>�k�������ŻW��p�{����v���h+6����v�j͝��9��r5��ri���Լ��s���/��31�W/������p�<z��%����5��Ά9(z���1�c�$��ć����>�>j>�een�}v�������;/��p{�c:�xx���|���l�9Q�[�Tm��G�j9Ks��q��>��Ҽ��̽��OV�G��v�9v�O/���v�ťy���$�@��4�u����PVAy5�ԚLr�j�:��u�{-���J ������f@yO������Q\?���+����y"�A���Wh��{��Te�S��T��sL�|�D�j�2�R)(t�&n	%3�J�����,]bQ�q�uB����
�ˁxT!���Ĥ3��Z�@]!
�/_�v�����O��U;��ЄZNla.m)%FUQ�فT= J�F	�U8���>�M�x��,�˖��W�n�Em��!5w��,�UiI�� c�7I
%�l��p#����Kn�UB���,u��2N3���-��Z�5����eڙ��h��eRХN��P�)@-n���)�"hC�c��JuV��"^�ڭ��8yREN�/|�/�Ӈ���x�k�Q!r��`$l�g&�����5���Ջ.�-��HA(�.�����}>��~����.F��Q]��P��e�O�����:,�C��k�	6��IR	ջ2��s�ܮ��ҩ��	�bS�U����P����V	����.yԜb}���F�m(��)�@U�҈����lKKFR8}P�b�4�"�bv�]h�!,�@)��+"�O�@!� Xl�r��K��e�wVp' ������\I)�7�&�J��ƙ1��IR����:b�^��׮�w��a��Q�P����}��0�����Q x�e�Nh��S�����	��ڼ����3���!�¤Q<qA���>[�%����߰����y̫\x�D��hg��emy&�`A�HFt�<�)��,���1,*!���]��5"����R�&���j#��b����(N���	��� �/	0i��)"/elY������Ec�MQ�R?pcvE9�!z0�o�.
�F      �   r  x��ҽnU1 �9�)�#9�c;g��N���%?'�w���}�7�ؾH߄�J�@���dq�(�?Yp:bJ�����5)�[��\đ�R��� �� ۡ� �`"�ܻ#�Wp��`�`>�dKa�3���\@9Ϳ+��B��e��ݽ�����?>|9�w�p���>]������|�����xw����n￟�\���>=�}uM�f&L3~U�m1l�Vz����RyG��X��Y��K�%�����N�[�h��~�I�������i#]�����MVɄ���6��"o)����/�e
`a(����+L��v�g+5��
� �8�K��
8���-�6�?��-�U�oh~f��uY�(���      �   S  x��WˮE]w��@�l�]U�%B!@B�X��'��t�e͗�eŚmP���3��f.�PF#M��U�sl�j�1�w�$�1��Rn�Z�\"G`M��N�h0kw\��TSw��Њu{<;$G:a��>QH�q��&?}|�*?~Q~����GێӘ`B���pǕ=Ӌg��ң�WĕҢ���}&�������8��Kw=��$L��-)��O����������3d{|��� ��L�"�W�y�a�<#��+ɳ�����亷`w�(z5���G#����1��_�ބ�ޱ�[.#� +Ds9��g�"[̲l/p-��Wu=�,id��?�S��9k�pd^�w�sJ"c��jD�x��I��o!g?*e���x�#�AԊq��u�.��V;y�>�R��Ȉ�9��-��pXS����z��D��'��1���hZ�Aٳ�C9k��T�İp�K4?K��� E
j��7�.�GZ�VOz�g��(�II�܄����%E�B�,L������1����ɏ߽x������j�2R/�l��1ktE�n�%u&i���;�V��W�K��g�����IFb�m��eo���E�pwH�P"�`��7�����_ܼ���o;E
���ZG	V��4)���#���6�[�$p���,�]�� ����ej�=��(���\�dD ;K9q�~V�Q�׋2����H�ׇ.CM��1?�.o|g
�m��"${��ˋn�`�,��$���T`��4�F�����`����i�D{�9Z�AΦx�����Be4u�<8bb���=�M1��#p�rT<3�+�*�(Ȟ}�0l���d�Q���MKVɘB2}���
��\���Q%&S�t-?�?�/'���e�6�,w-�=��Zr�F�RZ��QH�*�w�{�m�:Q�:p;�Y�d�P��35�:QCo�yҟ�~��ᣟ��5{��0̿:��eW��0B���-&l��9���!���<J��4S��ª�#9��b�'�䓤(��-Yh�>'��5�BV`�]�6��%ؽ$��N�+)��N=���ǣ�a���=v�4�KmS��dZ��:�6a�@��ǉ��IRd7wX�Yhg���2����:��            x������ � �           x��T�n�8}���y�P������vo�ݦ���A�EQ�bKԊ�7�����
��s�9Cj�!q�8N�g0�b e��e�2�R���4ej�9�`��� � &>�-������(�p����k��%���=����59�ޫc��d��ry����$�l�W�^��ݮ�����`Bm� ŘPq!�]��n�kU[��dtk��Ǯ�Gך6��c���ucN���AD($�X X��/� �I����p�R�kf���_��J�8� �)6�O�� ��H-��c�u��#�{ݨJ��Ĩ�r�?֙j�-ӡw&+tQ��rBc��^�������m[�'8�^��^��G���4C�	��	��	���c]�3{B#{�#{�#;1�mځ;�#sD��������$B�p籟|�2�1STs�cr��N4�a�\P#S���g_���9���Z�l�瘴�*�m�NA��r��	GT�$�{3�\j�	����.��
7���q�����k�d}�����٬/W�?֛����x�P�c���~�imʴ�1׀��/�s�"
���y�e��Yd:��L��?�]� ��ZS� 2�et�40�xl��=MZY|y���f�	��4zs}��n����������ݫ�d�a�{��Z]��^lKU)$�E��z)���ag]�a{�Fm,��9\�WF
3#5a���/R�"�AF��9�t�����W�s����2���p>]:��L�� �N���9��tl=�6���Y��^��-"RI��/�l6����            x������ � �            x������ � �            x������ � �      	   �  x��WK�%7\g��/@C�(���ވ"5(`�L��ǟx�����W�b|�S�d��9��I���fNU��w�)��/�(Z�=��=��[��m��|��_���������s�__���g�w|Q}����������׏_?��������������o��[o�������Fv��h��u�LyXr��%Iǟ�(`�#y�h{Թ6�U��2�r�VW2޼t��ϑ���o	��.��Nv��Cv�7A�>W�t�C_�7�> ��sB�S>���~@m�dc,���6N�	*��T
i�ļ6h�d�g���=	�>z�i@ДFQJf؈P_�j�9W���f e R
B��'��=ړ|UoAnN2��[�4��m�W��	����C���ϼ"�uh�ߌ�Vp�vK	^���
�K&�_�1�ƔWݷ�g�T%IK%_m��S��t�xrz���� ��^��b]�M��Sƫ��Qq�Sj�v7�$έ9✂�7 ����H��W�ȏ����	��(-�뙾��b����z���s��}�E$�nx��"��/,Vb���UM!d�
���I�M�I'?y���	~�����s@x e��-nm�V�J߶�B�`�a�CQ�io�����z	����%`�8q���˚��MP��X	��� z�Ό�i]�u^�E�j��u�eH����_�x�W7e8rZB� �~�)b;�~�^?cf{Ƒ�����NYW(6�9g_G����HȘ�cнK0k�/�yc��?�X|��'�F"a�.uk�vG�W�S�O;IM?ric�����1���!���2Vh
�r�� ���U�&�{Dd���a93R�Cpp�G�c83)s����5�1�yf����uZ���%a;kCɛG���-�ϲk����XG�mh����˫}j�X�q��S�@J|��Z6M�۟���h�)PW�����"7���c)l
 �Z	�����@���~֥�0i�(&kSɕ3�ݒ77��	@&Y�0�ft��9�14�Ɓf:���77�h��b�s��S.��HBƼ>p�F:a���M]��зĴSX�C�嫤,_u��\��( K�2��P�F[�z�X:�Ȏ�hO��sT�Z�z���ΫBG�h�}��)y<?��^ @�Bx���0>�_�!���9o`W�UP6pJ�i�ٔ��b�v$Z����BD/ntp��GSxy]�jyPN[�د
��������vE��%�]�9;��>�]�Дt��ܗ����k���	�߾}���nA(      
   �  x��W˭$7<�F�� %J"7G�)Q���궯���<�Mԥb}8&Mk�&k�&3E�NMx�[�ݰ��?�A,����쿻�j]��s;�{�Is�.���:��m�lY!?�����&�佊��4����G���o��-8�Fz���4��N�3[��%M��x#�s���8��s�ޠ��g�Iɞ�E�Ayg�Em=�YO�e}�GV��pԩv1�}��g����>4u�q��@�:XYt_����}C0e��v���IM1i�*͚������]떑YB%0���:ma3}}����:L��$ٶ"9����<~�C�)�J�bZ\�1��O ��G/TS	Τ]"@ bst|5U9n�}�p0�ђl�\�{A���ch�����	��Ij��xfo�1j�z9���6�����T
���0�o���
�]
'o��m;M0����B�6���.����y�:��@2_^�&�4p��h4U���<�M$m���� �&��']U���g˻���~�v�F^�+Z��Ap��s�����tnʝ�x�a�����/9�{�)B
CD2����|�8�������4db,�Y��!���8xP1��x?Mdq_�_���S6��E:�R�3@�;�~� ��(ho�L�kU��cڵǲ�E}��O��@��,����&�ȸ����aR��c��K�3�(��� )�kd���)ؒ���lc
Ё���#.ײ�녕��F*�Ie�Q@@�9{���`�����c���ŗ��m�����]���ɫ� -��M���6�c3��ZShG!���}�!�Q���L��s���
c �E�y*�vg��1�Z�yb,�X8�2'ۗ�Di,�/��l{^���l~�fC	qF��E����O&VB�ޕ�/���z� �FQB�O<S�.�a�}�f�C0�n��ϓ��y0�+y��7�]=�1��V��ؑ�t��|C�Wf���dL�IM�0���p]{98.�OC2�ϊ��FA�#kߍ=���	�Z&a'��Y���ڨ���{�C��9�B"�5y@yc�#��O�!	��gG� �1dAI�r���E?��G/\C���7��_/0�J4�E9h������#���|S9�glLK�B�#7���-s��U�ñ+� �?x�V���c�	i�=W��`�Rb�¿H�	��q�ׯ�?�I��         �  x��W]��8|�|�~_( ERs�=�����G���� q2��F���_U��M�Q*�+����4Ms�թ������y���-�P��+�����5��y��F$m��ƆwbE�^����ǿ2eKĉ�ק䧖G�������Mb,�5��{Q�}�D �"�x�=�K��N9�yNZ�lϥ��)$��2���'�C)>q��u��R)8��{mI����J��ΞY�'ѡI�(���h[iE-_p�r���:��[K�'V�@=+���6-cD�{8i��F�!��}9'��6����?�>U���������(�tm��b�\�*e�	,�p�$�#�$��A)�y�lM�1�8˓�až�|	+8��-���Xb*iX����fw��{N�}ࡊ�g�i�]%V��r���4��G�+�K�p:ה1�4ƹ��zG=��·|�5o��n��M�I��0�������/8��R��|	e�,uMٷ��Ro�S�m�,j���w˘��fES�a-;ך������W����4}0��{��M��D]����V9�e��J)7qnPnwPRG��ps���j2���>��w���������Ӌ��}'3���v�{8�.���˚PPR��As�U�(���E���C�^Ϗ��
D>W�	QQ
����^���	��BY���pR���\G��4�)O���Η��!]ZE0U��3-�"�������s.U���'���e���x��r��e��$~�<���Q��B��nڬ	��@����e�=���1���~<T{A�1� h�զ���=��w���*����$�3�>��Ī*ذ~w߳������=� '�H#�1Y0�8�I�T��|��:�(:&4.������)5�6r7��7�k�D�`һ�����v\�ԯ��'�xp���%t��pvq�f�����Jzi5�j�����������<�	/����<�h���d�f	v�*��k`8j!"�{�\ȼ�x>3y�,x�TF�L��[`�\�F��o:�җ��#8(p 2ɲj�Υ�n&���1��#|ٞeP8�����^�%ϛܶ����oEO�9Uc�������(���~�����ê��G�b�������Av-����r�Ť���8�=}q��X��~�YQ��˗�xٔ�Ҁ�>w1��!C�����K�������b6h��ǩ��P�W�WM�(�Я�|�0��O��=��h�o����F��6w��1%1U<T�dz@s���i�k���"� ���� ��ѝQ	\d~z$���Hr�q�}Y'^�|��RS��¸�[���Ni=�P�f��CBA���P����)B�e0�r��{8��nn�2�=�)愿����e���Vnp$Sa0����;�6^�N~�+O��2�����Pq��19'�4����'e��߼/�b�\u��k��ĔH�enߛ*̥N��]�3�;2��S�3�=l��e}����dr	("����۱�O$���d��4��Iިt�Q8�k��O��lk��73��t��K�(���B�O�߸Gl�k��e��-;�{���'�uŸ���M�����>QÝJǪ)RI=�>X�FiopO?J|~��|����>�	.}����	t��	4��-�} [Cum����Lp���L�<����ru�            x������ � �            x������ � �         �  x����jK��ه���o��b#'V|�0&��&��9o�6���Y����M�#O �� ����M�_�r�JK�A|\2x��)F�XhR)R���/ �"��
PV�'JC<9����iB��콺X-�Nu��\���%�b>adH�j�*@�����z�;z����T���
A
ރ$Q���ǔ�fƨ*��ܼ�����y����8Y�����jk0 ������h���%�������l=�Pj�H�Ԏֳ��gz8_.6gƍֳ�c:��3u��D+������+A�d!��ĥh�n����o�v=?]l֛���z�G���z�F����`�� Zk��:Ȍ��pΘ]�������h=�-{<V��HIϦ��[���s)�N�Vp!h�P��l��ͺ���2n����|�b��_��o�C��ʲ���ѡ� �BPm�K�Uq��v��\}����j��Y��V�U_,����Z`�h-F��!��@д�*��d=�"!1��ַ�CY��'8ys4|~�P���{2�Q�h@�	u��Ũ�1��A\�����\��f7Իˡ�!����i8X��=bG��Z�=��8?��WR�I�mI�!�v���`R59�ǘ޵m��L$};[����1��W:��T���,X����vP��(���X�v;���A�H���\�k�k��}����+��+�#SA�pδY%׆���#Lغ�6�p�m���96���E�7�t:���Z           x��Z[oǕ~n��B�v��a�/�'�Bą.VLE� ~����D3=�L-n��`,A �a�`kc� F(�bI�@��c�ɞ��xsLJ��g4��<�����#}M�KK/�{lR��$�锸�U��4�@0u6bQ�o"��'���ճ�ru�G��?������'�1�*#܇�j�)!�z�hw�6C�du�Gx�����CO�<Eߢ�>G��f��16h�Ÿ�n����Rd:��>�T��?�����A�pm��B�k�$��X��|a�hu�;xa�	L�����PM�?�זh�M��;�t����i���/h���7�q�;_�~	�~t�M3�Ͽj�U�œQ������&������bg{ۇf_���$�l�=��a\l��t���C�X/���)��~q0��u��a�d���s�A�d��_U��R
�Rc���6y�#���k�I��{{�X�r�$&�(ݡr��1��G�v�Z�/��
�:p��IcgH����T���x3d�_B����~�������/�V'�^ǚ)\ ��T>C�>\��ڃ+���EO������N�8@M � Etwk�>�B�l����R-����58 D�Nq��1I�\2P�<��=Qx1to�7�
S�H�w�(x����^>D��y"�n*6�n�em����`7c	���)�-���^�p�i����-Y���"Cm�"V��N���|u�C�����h7��`4� ``����}Tَchy������h��(�?`v��1�B��Bl�i�ښ!�Dp����Pp����Ϟ�|�?�� ������̙]׸���ۛp���al�I,���$�f���	�nq ~⃠X�d� �`'��,9+����[��u!�|ӎ���� �PM3�(��|�����=��$swt���o2� �#���Ű��a�s�����)��	������pL��FKo�� �B]�	���}�{�^���^.O^m!���W��e�!k7��V'�֢'nڧ�������rC\BS�&hrT�5Wċ�8�� �R��G��M"�;˃��A\�$�fu�k`����@6�P�ri:C�Qȍ�Bn�+,�$�������M��ͥ����ˣ���e�ubJ����	����|L(�A#W"�ăOϖ�y_|���ȧ�̦-�~��Kz�	o���H�7p�)�l�s%$y�u�*�w�����؅�Ǉ�؃~����q��� 2X�4��A[И1%���w�� �7�;(��R@�B���;][#����[�{8�9��QP�ҫ{՗�g ����8�z9;*����p���ȯZ�l^�e$^��R�Lɔ]s�#4��G+�Ō [5��	��U��&�����BG[/ ǯ�-Tw�;]	=3�
���ܤ� ��È��������5�6*�d�iuPTPr2� ��Q����S�Ou�A;��.���Gn���Ѓqj�^_��f �Qa�'�KW]/_������o��un,�}q�O�4í,)^MQ3<}U�Ϳp7��!lţ�����v4�~�)?�&�UnrJ�Z)hn�� � A�zL����ü����ݴǜ��F�)Dgϒ��@@m�_���٧���37E�O������'�]�����
jl֢�Y�V���3�m�j.BM��z3M������bt����-��~����<�]��
�ދ*�y3n���;o~4���&�r�=��>����Q�Չh	=��%�uR-Ɲ".�Sd%/H��������twMg�k����l���40׵k�FF}z���e2���ON5�A2@���S�tSn�°s���G�hhT�.��MO�=]/��b;���k7�ͦ3<���~	t6+����i6	:�I�\�q�`����Z	�]m�SD:R�t]�DM�Ⴞ��&5e8�O.H� �2��>��~���rrpp�������½�hή��/)37�ς�b 8�� 8�k�=��� ��Fz�!���QV��l
t�2�Zo������l�Of`@m��5��&�hY�!x[+�Dj.��ܲh�]���5B�8Qڈ<[{���t_�kJ�`>��3�����1
��}��ģ����ŵ�3L�ib�0媩1��Zá�[�����i�eMFl�+�9Ņ���7�\�۫�������;F%�DY�
4	l�y
b��`������1�8n����"���c܌V�x�Z��0k��Q�3�~�v�>.S��������ݳ�^�ǅgF����f�C���C�P����l�P7��ƖI���FF���C�b������?/�O��-�~��z.z�e��Λ@�`dHk�|�i��4�ѹZ����[�c�j���Y�8������@C��T	<͝��2�|P����2?��Տ6�w�����R���RI������V'�5���\gҰ�4����_ìsd�AD�!n1�
��g�yw�<���/�pP�o�MX�II�!s	;�g$����ڂF~7�mt�����<�PvRm����!F\�2�t��ċ$�����lA�d�+R#E��~����ZW�	������ܯ��jW\ P�C��+�yo�%Jv������U����t�vg�-�����8'�!듙w��l��ۋv6��w��>���ҷ�7	�v͝Wp���&�j�+V�����15 ��|M�XdLr�	�f�`ɢr�'��~��_��ґ[��r�1$WciY"0����?��
a1}����AU��r8�����p^X�"�l�.�@��N�[M���>ȏӦ�fv0��LN������jT�7�j�}+����,��]�tO`V���i�-�)?'g51f��9sy�Z�ӠѫD"קx��6��Ѹi��i�#��}��!p2�@�#�$~���. ��S� Z�qP�f�hǳf�L뽻�6�ː��R
����q�xe�W�Pm(�Qc�Tpa��0CW�6I���h���� p����s8�ꚰ�_�"u?���`��_�Y##N�dP�r��Sp����ZD���1�&O�hJ�6�2��,:�!�P�m�6�
�:���U8�yf����/t?>Ko/��l���p6>�1b3o3�C��\9���%A���W��v� L2����o���m��u��*��C��A�{���K-��R�v�ˮ��Ӹd5�$�@��ٽ��D22<}3�� ���5u6�C
9���Rq�qL�R�hL�a�W�;�<�j,:���CL(�):����W.�E8��y�`gu�{��(��(��%�����Wsx�� �j=f�����@	�x�L�	ʔS��"��*�1�xk�ZՂ �CL:�[�GCˎ���"݃�hB.���R������E�	D��Hm)5܆�~��T��h-� ��͏���<7y�	��������vgz�jُ��L(i�,�[����_!��p�~l^8��d�v'����\����������|��8��Ѹ��"�qe{/Ļ��0h ���/EP�KB� G�m��?���ܴ-v�Ůs��قF���嶯3�����&ӬEލ�dR��3ǟ��i5����Os�p��]O!6��˴�<qؐQ
�kI� ��@I���0�lTJ� �T������һz����Š��~�[M�K��ql�ӝ-@ ;� ���ե���(?��,O7�W����-���R~$��X8��2�q�,������r@�(��D@�v�`�k��Rg�nL����xQ���4��t�ۅ�b!�+�9џ�ݻ�����         �  x��S�jA?O�b�	�wg&��T��
A��2;;�4��&�}��'�U<,TЃ��Æ�Ǿ��J"5H�e�������ϴ�E�Oq�����D���D�O���`#�q��Ah��!b\H�hc���]_U�������#��߼�z�:�'ܭfh~V��:?s�wMq��}G�� ����r���I"KY�%��@d�Rb�	�e"Z�|�q�%a�p��m1�b�i�Y��hD`�!Ʃ�RKlLaH�����ѾfgP���#j�N���!������~�2+�l=y�*�v��T���������Ť�^��e�f5�]�n?//��������<��k���D���ѓ4��x����C��I���S�N&��ԏ������ݱ��q}��+�(� ��@@����-��R&kqE�^8�YM�0ę�%��r15ɒ@�<ܺ��>/�`�M���d�1�a�L����w���E��?�m��~��~����˫���頦�C������Cu� ,?�iu[()��F�Ii���B$<'`"'�i�#wR8�j4���=�
�r8�xy�7�W~�����x�<�{ ,��E��TMA�Z��T;��$	%R[GR�����z�C��*Q�_���b<�Z�6O���ШD�D���".jCX��Lj�lc��h4� 0ǿ�            x������ � �            x������ � �         �   x���1n1E�Sl1��YҀ���L�DE��'�ǧ�^�q�� �
<`Zۻ�ֈ�ؔT�(�@�lZ-�>i~��6��=���&4�^��Y�Ѱu@�g���%x"��O�f�z�6u���3`�\V��S�8�R���j�E3�i�'���D�X/n�xq����#�V��ޫ��N����p�J�7{��|�~@���hew��]�MH����6^$_��y��v�wm         ^  x��U�nA�o�bs�V�L��1	�:���J֝-a��8DD��#�'�q!�ܭ���vG-uWMWբ�}��m�@:*Ȟd��3����TV��b�*C�PA3DV�-/^ݿ_������_��x�Q(:����:2d_��WR���YZ�o�����j��n����g'�gL�s/\��;4&^x�\���"�\�dG�B����t��AdA���"��,NǛi�E÷i��4������RPG*.�� Q���29�	Df�����ä��Y�D�+��/��C�\�՘��(&f$U�"�l�!(�++�	q����l��կ����[+�i�~��;6�F��7���ډܱ� �`��P!�R���C��<c����3���r��~�����q�&4��J����[n�se�ۯ�x��U��������@@��F=`���Xf&�=�ѱIkWz�e�.���M5�eRtP]	����g��+92mϛ�\0���8[���@��@q�(Zq���e�um�g��\N�%p��Ts�U��{��N��[��Tk���0hgZ�v(��1�@�Z�˽k�sάs�$O j;�:�?����;w�         �   x����nAE��W��c�+�8��(d�*$�����nK��j��=��k�ԏ S������*×P��{R�(��9@nN � ̎����g:H�l1]$]8�=�?a���yׯ�t���m��n����1/v��E-���x�wM��+44��E�Oz�-�A�4v*YAvH-)P�����O�����4� ��`=           x��ϿN�0��y�۩#��%�)c��u�MPHx6&c%X�X�{�Mp"�:�H��O��X���:�9�Jhj,�T+V�%3\�K��W��my��yI��|�z��O���p2�˶�X��#Ȧ���0�BL*��ʦ�o�v�����p9EL��3k���=��Gz���֯���7�ғ�Ex�tɜQ̍�2ijSGq.Ƣ��d�Pqڟ!���>:>�E�m�I�� E�����y�B��߭_�ڷ=����gqE߉���         �   x��ϻJA���)̥��uw�d"&Fb�IW_02�we��˂������
��bV�\3�Pl�v�\�$��;�2@��� �2K�v� }��Y!۴c�	�{��M��Z��������h#�"��t��Di'�����Ǘ�+��e�]J����^�G8<-�"YKk�����T��8�����<��h��C�#��=O��՟km#\Y�����k홮��9���L�~�eY>pl,            x������ � �         �  x�͔Kn�0���)��̷(��rS�y9��4P)+�,E�m5E�#�]u���&��Ȣ]7� �G?�}Ҡi?� �@�%4@11�B���Jf�\/+]:},������r�'�:�:xF�r\������$~�gw(;�:J���w�u�iO�C��0���"�;�LwlK��3�����`�^{kR�Y�ϫv�`��m>H��V����W,�b�Vn�}��=�:b �������{��w�wnN�/c���ۙϷ�u�����eQ��f}��8U�Bo�,�e5K�.=+�,�i�貽ee�l�l��?�2~V�"�V?�R7�k�軈���z�Gmk/�.$!f!$C��z�(fx�R� s�H�@G�@����wڿ�E��E}��8�������f��t8]=-?�����^��>3������Ƈ#�V����}�>��ټ����f�mk37����{�����=.�T��P�2F@М��������ﱬ�x��}z�,J}m�;��.ǻ��jev�WW�x׃�t�8��ഞ6ILSG�j;�d:�)�my.��.�[n���7����K�'����_�v{b$�a������`��Ed��(�<����}�W��6�0]���D�$�,������rQ�VE��t|	w'���8�3����oj<�z7^������     