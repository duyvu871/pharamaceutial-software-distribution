PGDMP     *                     }            quan_ly_nha_thuoc %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    quan_ly_nha_thuoc    DATABASE     b   CREATE DATABASE quan_ly_nha_thuoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
 !   DROP DATABASE quan_ly_nha_thuoc;
                postgres    false            �           0    0    DATABASE quan_ly_nha_thuoc    ACL     3   GRANT ALL ON DATABASE quan_ly_nha_thuoc TO adc300;
                   postgres    false    3771            Y           1247    90065    UserType    TYPE     H   CREATE TYPE public."UserType" AS ENUM (
    'user',
    'membership'
);
    DROP TYPE public."UserType";
       public          postgres    false            \           1247    90070    admin_permission    TYPE     �   CREATE TYPE public.admin_permission AS ENUM (
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
       public          postgres    false            _           1247    90092 
   admin_type    TYPE     J   CREATE TYPE public.admin_type AS ENUM (
    'super_admin',
    'admin'
);
    DROP TYPE public.admin_type;
       public          postgres    false            b           1247    90098    all_permission    TYPE     �   CREATE TYPE public.all_permission AS ENUM (
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
       public          postgres    false            e           1247    90120    enum_branches_branch_status    TYPE     Y   CREATE TYPE public.enum_branches_branch_status AS ENUM (
    'active',
    'inactive'
);
 .   DROP TYPE public.enum_branches_branch_status;
       public          postgres    false            h           1247    90126    enum_branchs_branch_status    TYPE     X   CREATE TYPE public.enum_branchs_branch_status AS ENUM (
    'active',
    'inactive'
);
 -   DROP TYPE public.enum_branchs_branch_status;
       public          postgres    false            k           1247    90132    enum_consumers_gender    TYPE     \   CREATE TYPE public.enum_consumers_gender AS ENUM (
    'male',
    'female',
    'other'
);
 (   DROP TYPE public.enum_consumers_gender;
       public          postgres    false            n           1247    90138    enum_gender    TYPE     R   CREATE TYPE public.enum_gender AS ENUM (
    'male',
    'female',
    'other'
);
    DROP TYPE public.enum_gender;
       public          postgres    false            q           1247    90146     enum_memberships_employee_status    TYPE     ^   CREATE TYPE public.enum_memberships_employee_status AS ENUM (
    'active',
    'inactive'
);
 3   DROP TYPE public.enum_memberships_employee_status;
       public          postgres    false            t           1247    90152    enum_users_permission    TYPE     �   CREATE TYPE public.enum_users_permission AS ENUM (
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
       public          postgres    false            �            1259    90176    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
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
       public         heap    postgres    false            �            1259    91503    admin_plans    TABLE     �  CREATE TABLE public.admin_plans (
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
       public         heap    postgres    false            �            1259    91496    admin_subsciption    TABLE     �  CREATE TABLE public.admin_subsciption (
    id uuid NOT NULL,
    admin_id uuid NOT NULL,
    plan_id uuid NOT NULL,
    start_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    status character varying(50) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 %   DROP TABLE public.admin_subsciption;
       public         heap    postgres    false            �            1259    90183    admin_to_user    TABLE     �   CREATE TABLE public.admin_to_user (
    id uuid NOT NULL,
    "adminId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 !   DROP TABLE public.admin_to_user;
       public         heap    postgres    false            �            1259    90187    admins    TABLE     s  CREATE TABLE public.admins (
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
    "updatedAt" timestamp(6) with time zone
);
    DROP TABLE public.admins;
       public         heap    postgres    false    878            �            1259    90194    assets    TABLE     O  CREATE TABLE public.assets (
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
       public         heap    postgres    false            �            1259    90204    branch_details    TABLE     0  CREATE TABLE public.branch_details (
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
       public         heap    postgres    false            �            1259    106591    branch_integration    TABLE       CREATE TABLE public.branch_integration (
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
       public         heap    postgres    false            �            1259    106522    branch_payment    TABLE     �  CREATE TABLE public.branch_payment (
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
       public         heap    postgres    false            �            1259    91476    branch_plans    TABLE     �  CREATE TABLE public.branch_plans (
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
       public         heap    postgres    false            �            1259    90210    branches    TABLE     �  CREATE TABLE public.branches (
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
       public         heap    postgres    false    869            �            1259    90215    clinics    TABLE       CREATE TABLE public.clinics (
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
       public         heap    postgres    false            �            1259    90223 	   consumers    TABLE       CREATE TABLE public.consumers (
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
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.consumers;
       public         heap    postgres    false    875            �            1259    90239    doctors    TABLE     �  CREATE TABLE public.doctors (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    doctor_name character varying(255) NOT NULL,
    specialization character varying(255),
    phone character varying(255),
    email character varying(255),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    deleted_at timestamp(6) with time zone
);
    DROP TABLE public.doctors;
       public         heap    postgres    false            �            1259    90247    groups    TABLE     �  CREATE TABLE public.groups (
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
       public         heap    postgres    false            �            1259    106554    import_invoice_product    TABLE     }  CREATE TABLE public.import_invoice_product (
    id uuid NOT NULL,
    import_invoice uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL,
    total double precision NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 *   DROP TABLE public.import_invoice_product;
       public         heap    postgres    false            �            1259    106545    import_invoices    TABLE     >  CREATE TABLE public.import_invoices (
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
    "updatedAt" timestamp(6) with time zone NOT NULL
);
 #   DROP TABLE public.import_invoices;
       public         heap    postgres    false            �            1259    90255    invoice_items    TABLE     +  CREATE TABLE public.invoice_items (
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
       public         heap    postgres    false            �            1259    90260    invoices    TABLE     %  CREATE TABLE public.invoices (
    id uuid NOT NULL,
    "branchId" uuid NOT NULL,
    "saleDate" date NOT NULL,
    "saleTime" text NOT NULL,
    "customerName" text,
    "priceList" text,
    "isPrescriptionSale" boolean,
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
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "customerId" uuid,
    vat double precision DEFAULT 0 NOT NULL
);
    DROP TABLE public.invoices;
       public         heap    postgres    false    857            �            1259    90269    memberships    TABLE     :  CREATE TABLE public.memberships (
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
       public         heap    postgres    false    881            �            1259    90274    other_charges    TABLE     �   CREATE TABLE public.other_charges (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    name text NOT NULL,
    value double precision DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.other_charges;
       public         heap    postgres    false            �            1259    90280    point_transactions    TABLE       CREATE TABLE public.point_transactions (
    id uuid NOT NULL,
    "pointId" uuid NOT NULL,
    type character varying(255) NOT NULL,
    amount integer NOT NULL,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public.point_transactions;
       public         heap    postgres    false            �            1259    90286    points    TABLE     #  CREATE TABLE public.points (
    id uuid NOT NULL,
    "totalPoints" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "consumerId" uuid NOT NULL,
    "storeId" uuid
);
    DROP TABLE public.points;
       public         heap    postgres    false            �            1259    98306    product_assets    TABLE     *  CREATE TABLE public.product_assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    product_id uuid,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 "   DROP TABLE public.product_assets;
       public         heap    postgres    false            �            1259    90291    product_groups    TABLE     E  CREATE TABLE public.product_groups (
    product_id uuid NOT NULL,
    group_id uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.726+07'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.727+07'::timestamp with time zone NOT NULL
);
 "   DROP TABLE public.product_groups;
       public         heap    postgres    false            �            1259    90296    product_unit_labels    TABLE     �   CREATE TABLE public.product_unit_labels (
    product_id uuid NOT NULL,
    product_unit uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public.product_unit_labels;
       public         heap    postgres    false            �            1259    90299    product_units    TABLE     �  CREATE TABLE public.product_units (
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
       public         heap    postgres    false            �            1259    90304    products    TABLE       CREATE TABLE public.products (
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
       public         heap    postgres    false            �            1259    90312 	   providers    TABLE     �  CREATE TABLE public.providers (
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
       public         heap    postgres    false            �            1259    90318    roles    TABLE       CREATE TABLE public.roles (
    id uuid NOT NULL,
    role_name character varying(255) NOT NULL,
    permission character varying(255) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    98313    store_assets    TABLE       CREATE TABLE public.store_assets (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.store_assets;
       public         heap    postgres    false            �            1259    90324    store_group    TABLE       CREATE TABLE public.store_group (
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
       public         heap    postgres    false            �            1259    91528    store_reward_point    TABLE     =  CREATE TABLE public.store_reward_point (
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
       public         heap    postgres    false            �            1259    90333    stores    TABLE     !  CREATE TABLE public.stores (
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
       public         heap    postgres    false            �            1259    91469    subscriptions    TABLE     �  CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    plan_id uuid NOT NULL,
    start_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    status character varying(50) NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    plan_type character varying(255) NOT NULL
);
 !   DROP TABLE public.subscriptions;
       public         heap    postgres    false            �            1259    90341    users    TABLE     �  CREATE TABLE public.users (
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
       public         heap    postgres    false            �          0    90176    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    209   �U      �          0    91503    admin_plans 
   TABLE DATA           w   COPY public.admin_plans (id, plan_name, plan_type, price, duration, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    237   ZY      �          0    91496    admin_subsciption 
   TABLE DATA           z   COPY public.admin_subsciption (id, admin_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    236   wY      �          0    90183    admin_to_user 
   TABLE DATA           Z   COPY public.admin_to_user (id, "adminId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �Y      �          0    90187    admins 
   TABLE DATA           �   COPY public.admins (id, username, last_name, first_name, gender, password, email, phone_number, postal_code, address, avatar, notes, bio, is_active, last_login, reset_token, permission, "roleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   Z      �          0    90194    assets 
   TABLE DATA              COPY public.assets (id, store_id, path, name, description, url, type, meta_data, "from", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   B[      �          0    90204    branch_details 
   TABLE DATA           �   COPY public.branch_details (id, branch_id, so_dang_ky, ten_nha_thuoc, loai_hinh, tinh, huyen, dia_chi, nguoi_dai_dien, nguoi_chiu_trach_nhiem, nguoi_chiu_trach_nhiem_chuyen_mon, so_chung_chi_hanh_nghe, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   �f      �          0    106591    branch_integration 
   TABLE DATA           �   COPY public.branch_integration (id, branch_id, type, status, "createdAt", "updatedAt", deleted_at, deleted_by, integration_account, integration_id, integration_password) FROM stdin;
    public          postgres    false    244   �f      �          0    106522    branch_payment 
   TABLE DATA           �   COPY public.branch_payment (id, branch_id, type, status, payment_bank, payment_account_number, payment_account_owner, "createdAt", "updatedAt", deleted_at, deleted_by) FROM stdin;
    public          postgres    false    241   yg      �          0    91476    branch_plans 
   TABLE DATA           x   COPY public.branch_plans (id, plan_name, price, duration, description, "createdAt", "updatedAt", plan_type) FROM stdin;
    public          postgres    false    235   h      �          0    90210    branches 
   TABLE DATA           �   COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt", enabled_points) FROM stdin;
    public          postgres    false    214   $h      �          0    90215    clinics 
   TABLE DATA           �   COPY public.clinics (id, store_id, clinic_name, address, phone, email, created_at, updated_at, status, description, deleted_at) FROM stdin;
    public          postgres    false    215   �h      �          0    90223 	   consumers 
   TABLE DATA           �   COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �h      �          0    90239    doctors 
   TABLE DATA           �   COPY public.doctors (id, store_id, doctor_name, specialization, phone, email, created_at, updated_at, status, deleted_at) FROM stdin;
    public          postgres    false    217   {      �          0    90247    groups 
   TABLE DATA              COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    218   %{      �          0    106554    import_invoice_product 
   TABLE DATA           �   COPY public.import_invoice_product (id, import_invoice, product_id, quantity, price, total, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    243   �~      �          0    106545    import_invoices 
   TABLE DATA           �   COPY public.import_invoices (id, store_id, provider_id, invoice_no, name, total_amount, amount_due, amount_paid, debit, notes, vat, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   ��      �          0    90255    invoice_items 
   TABLE DATA           x   COPY public.invoice_items (id, "invoiceId", "productName", quantity, price, total, unit, note, "productId") FROM stdin;
    public          postgres    false    219   ǂ      �          0    90260    invoices 
   TABLE DATA           )  COPY public.invoices (id, "branchId", "saleDate", "saleTime", "customerName", "priceList", "isPrescriptionSale", "totalPrice", discount, "amountDue", "amountPaid", debit, notes, "autoPrintInvoice", "printBatchNumber", "userType", "userId", "createdAt", "updatedAt", "customerId", vat) FROM stdin;
    public          postgres    false    220   ��      �          0    90269    memberships 
   TABLE DATA           �   COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt", address, age, last_login) FROM stdin;
    public          postgres    false    221   F�      �          0    90274    other_charges 
   TABLE DATA           E   COPY public.other_charges (id, "invoiceId", name, value) FROM stdin;
    public          postgres    false    222   0�      �          0    90280    point_transactions 
   TABLE DATA           \   COPY public.point_transactions (id, "pointId", type, amount, note, "createdAt") FROM stdin;
    public          postgres    false    223   M�      �          0    90286    points 
   TABLE DATA           f   COPY public.points (id, "totalPoints", "createdAt", "updatedAt", "consumerId", "storeId") FROM stdin;
    public          postgres    false    224   ��      �          0    98306    product_assets 
   TABLE DATA           f   COPY public.product_assets (id, store_id, asset_id, product_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    239   ��      �          0    90291    product_groups 
   TABLE DATA           X   COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   {�      �          0    90296    product_unit_labels 
   TABLE DATA           a   COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   ��      �          0    90299    product_units 
   TABLE DATA           �   COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
    public          postgres    false    227   ��      �          0    90304    products 
   TABLE DATA             COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity, store_group_id, register_no, lot_no, product_id, expire_date, import_date, active_ingredient, content, ingredient, packing, usage) FROM stdin;
    public          postgres    false    228   u�      �          0    90312 	   providers 
   TABLE DATA           �   COPY public.providers ("companyName", "phoneNumber", email, "taxCode", address, city, district, wards, note, "storeId", "createdAt", "updatedAt", id) FROM stdin;
    public          postgres    false    229   ޯ      �          0    90318    roles 
   TABLE DATA           T   COPY public.roles (id, role_name, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   ��      �          0    98313    store_assets 
   TABLE DATA           X   COPY public.store_assets (id, store_id, asset_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   ױ      �          0    90324    store_group 
   TABLE DATA           �   COPY public.store_group (id, store_id, group_name, created_at, updated_at, status, description, deleted_at, deleted_by, group_slug) FROM stdin;
    public          postgres    false    231   Ҳ      �          0    91528    store_reward_point 
   TABLE DATA           �   COPY public.store_reward_point (id, store_id, convert_to, convert_rate, created_at, updated_at, status, description, deleted_at, deleted_by, point_value) FROM stdin;
    public          postgres    false    238   @�      �          0    90333    stores 
   TABLE DATA           �   COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    232   �      �          0    91469    subscriptions 
   TABLE DATA           �   COPY public.subscriptions (id, branch_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt", plan_type) FROM stdin;
    public          postgres    false    234   <�      �          0    90341    users 
   TABLE DATA           �   COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233   Y�      `           2606    90351 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    209            �           2606    91510    admin_plans admin_plans_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.admin_plans
    ADD CONSTRAINT admin_plans_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.admin_plans DROP CONSTRAINT admin_plans_pkey;
       public            postgres    false    237            �           2606    91502 (   admin_subsciption admin_subsciption_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_pkey;
       public            postgres    false    236            b           2606    90353     admin_to_user admin_to_user_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT admin_to_user_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT admin_to_user_pkey;
       public            postgres    false    210            d           2606    90355    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    211            f           2606    90357    assets assets_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
       public            postgres    false    212            i           2606    90359 "   branch_details branch_details_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_pkey;
       public            postgres    false    213            �           2606    106600 *   branch_integration branch_integration_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.branch_integration
    ADD CONSTRAINT branch_integration_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.branch_integration DROP CONSTRAINT branch_integration_pkey;
       public            postgres    false    244            �           2606    106531 "   branch_payment branch_payment_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_payment DROP CONSTRAINT branch_payment_pkey;
       public            postgres    false    241            �           2606    91483    branch_plans branch_plans_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.branch_plans
    ADD CONSTRAINT branch_plans_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.branch_plans DROP CONSTRAINT branch_plans_pkey;
       public            postgres    false    235            m           2606    90361    branches branches_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);
 @   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pkey;
       public            postgres    false    214            o           2606    90363    clinics clinics_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_pkey;
       public            postgres    false    215            v           2606    90365    consumers consumers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_pkey;
       public            postgres    false    216            x           2606    90367    doctors doctors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    217            |           2606    90369    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    218            �           2606    106559 2   import_invoice_product import_invoice_product_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_pkey;
       public            postgres    false    243            �           2606    106553 $   import_invoices import_invoices_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_pkey;
       public            postgres    false    242                       2606    90371     invoice_items invoice_items_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT invoice_items_pkey;
       public            postgres    false    219            �           2606    90373    invoices invoices_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.invoices DROP CONSTRAINT invoices_pkey;
       public            postgres    false    220            �           2606    90375    memberships memberships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_pkey;
       public            postgres    false    221            �           2606    90377     other_charges other_charges_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT other_charges_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT other_charges_pkey;
       public            postgres    false    222            �           2606    90379 *   point_transactions point_transactions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT point_transactions_pkey;
       public            postgres    false    223            �           2606    90381    points points_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.points DROP CONSTRAINT points_pkey;
       public            postgres    false    224            �           2606    98312 "   product_assets product_assets_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_pkey;
       public            postgres    false    239            �           2606    90383 "   product_groups product_groups_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (product_id, group_id);
 L   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_pkey;
       public            postgres    false    225    225            �           2606    90385     product_units product_units_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_pkey;
       public            postgres    false    227            �           2606    90387    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    228            �           2606    90389    providers providers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
       public            postgres    false    229            �           2606    90391    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    230            �           2606    98319    store_assets store_assets_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_pkey;
       public            postgres    false    240            �           2606    90393    store_group store_group_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_pkey;
       public            postgres    false    231            �           2606    91539 *   store_reward_point store_reward_point_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.store_reward_point DROP CONSTRAINT store_reward_point_pkey;
       public            postgres    false    238            �           2606    90395    stores stores_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
       public            postgres    false    232            �           2606    91475     subscriptions subscriptions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_pkey;
       public            postgres    false    234            �           2606    90397    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    233            g           1259    106611    branch_details_branch_id_key    INDEX     c   CREATE UNIQUE INDEX branch_details_branch_id_key ON public.branch_details USING btree (branch_id);
 0   DROP INDEX public.branch_details_branch_id_key;
       public            postgres    false    213            �           1259    106601     branch_integration_branch_id_idx    INDEX     d   CREATE INDEX branch_integration_branch_id_idx ON public.branch_integration USING btree (branch_id);
 4   DROP INDEX public.branch_integration_branch_id_idx;
       public            postgres    false    244            �           1259    106607     branch_integration_branch_id_key    INDEX     k   CREATE UNIQUE INDEX branch_integration_branch_id_key ON public.branch_integration USING btree (branch_id);
 4   DROP INDEX public.branch_integration_branch_id_key;
       public            postgres    false    244            �           1259    106533    branch_payment_branch_id_idx    INDEX     \   CREATE INDEX branch_payment_branch_id_idx ON public.branch_payment USING btree (branch_id);
 0   DROP INDEX public.branch_payment_branch_id_idx;
       public            postgres    false    241            �           1259    106608    branch_payment_branch_id_key    INDEX     c   CREATE UNIQUE INDEX branch_payment_branch_id_key ON public.branch_payment USING btree (branch_id);
 0   DROP INDEX public.branch_payment_branch_id_key;
       public            postgres    false    241            j           1259    90398    branches_branch_name_idx    INDEX     T   CREATE INDEX branches_branch_name_idx ON public.branches USING btree (branch_name);
 ,   DROP INDEX public.branches_branch_name_idx;
       public            postgres    false    214            k           1259    90399    branches_owner_id_idx    INDEX     N   CREATE INDEX branches_owner_id_idx ON public.branches USING btree (owner_id);
 )   DROP INDEX public.branches_owner_id_idx;
       public            postgres    false    214            p           1259    90400    clinics_store_id_idx    INDEX     L   CREATE INDEX clinics_store_id_idx ON public.clinics USING btree (store_id);
 (   DROP INDEX public.clinics_store_id_idx;
       public            postgres    false    215            q           1259    91431    consumers_branch_id_idx    INDEX     R   CREATE INDEX consumers_branch_id_idx ON public.consumers USING btree (branch_id);
 +   DROP INDEX public.consumers_branch_id_idx;
       public            postgres    false    216            r           1259    91433    consumers_consumer_email_idx    INDEX     \   CREATE INDEX consumers_consumer_email_idx ON public.consumers USING btree (consumer_email);
 0   DROP INDEX public.consumers_consumer_email_idx;
       public            postgres    false    216            s           1259    91432    consumers_consumer_name_idx    INDEX     Z   CREATE INDEX consumers_consumer_name_idx ON public.consumers USING btree (consumer_name);
 /   DROP INDEX public.consumers_consumer_name_idx;
       public            postgres    false    216            t           1259    91434    consumers_phone_number_idx    INDEX     X   CREATE INDEX consumers_phone_number_idx ON public.consumers USING btree (phone_number);
 .   DROP INDEX public.consumers_phone_number_idx;
       public            postgres    false    216            y           1259    90401    doctors_store_id_idx    INDEX     L   CREATE INDEX doctors_store_id_idx ON public.doctors USING btree (store_id);
 (   DROP INDEX public.doctors_store_id_idx;
       public            postgres    false    217            z           1259    91436    groups_group_name_idx    INDEX     N   CREATE INDEX groups_group_name_idx ON public.groups USING btree (group_name);
 )   DROP INDEX public.groups_group_name_idx;
       public            postgres    false    218            }           1259    91435    groups_store_id_idx    INDEX     J   CREATE INDEX groups_store_id_idx ON public.groups USING btree (store_id);
 '   DROP INDEX public.groups_store_id_idx;
       public            postgres    false    218            �           1259    106562 )   import_invoice_product_import_invoice_idx    INDEX     v   CREATE INDEX import_invoice_product_import_invoice_idx ON public.import_invoice_product USING btree (import_invoice);
 =   DROP INDEX public.import_invoice_product_import_invoice_idx;
       public            postgres    false    243            �           1259    106563 %   import_invoice_product_product_id_idx    INDEX     n   CREATE INDEX import_invoice_product_product_id_idx ON public.import_invoice_product USING btree (product_id);
 9   DROP INDEX public.import_invoice_product_product_id_idx;
       public            postgres    false    243            �           1259    106561    import_invoices_provider_id_idx    INDEX     b   CREATE INDEX import_invoices_provider_id_idx ON public.import_invoices USING btree (provider_id);
 3   DROP INDEX public.import_invoices_provider_id_idx;
       public            postgres    false    242            �           1259    106560    import_invoices_store_id_idx    INDEX     \   CREATE INDEX import_invoices_store_id_idx ON public.import_invoices USING btree (store_id);
 0   DROP INDEX public.import_invoices_store_id_idx;
       public            postgres    false    242            �           1259    90402    invoices_branchId_idx    INDEX     R   CREATE INDEX "invoices_branchId_idx" ON public.invoices USING btree ("branchId");
 +   DROP INDEX public."invoices_branchId_idx";
       public            postgres    false    220            �           1259    90403    invoices_customerName_idx    INDEX     Z   CREATE INDEX "invoices_customerName_idx" ON public.invoices USING btree ("customerName");
 /   DROP INDEX public."invoices_customerName_idx";
       public            postgres    false    220            �           1259    90404    invoices_saleDate_idx    INDEX     R   CREATE INDEX "invoices_saleDate_idx" ON public.invoices USING btree ("saleDate");
 +   DROP INDEX public."invoices_saleDate_idx";
       public            postgres    false    220            �           1259    91437    memberships_branch_id_idx    INDEX     V   CREATE INDEX memberships_branch_id_idx ON public.memberships USING btree (branch_id);
 -   DROP INDEX public.memberships_branch_id_idx;
       public            postgres    false    221            �           1259    91439    memberships_email_idx    INDEX     N   CREATE INDEX memberships_email_idx ON public.memberships USING btree (email);
 )   DROP INDEX public.memberships_email_idx;
       public            postgres    false    221            �           1259    91440    memberships_phone_number_idx    INDEX     \   CREATE INDEX memberships_phone_number_idx ON public.memberships USING btree (phone_number);
 0   DROP INDEX public.memberships_phone_number_idx;
       public            postgres    false    221            �           1259    91438    memberships_username_idx    INDEX     T   CREATE INDEX memberships_username_idx ON public.memberships USING btree (username);
 ,   DROP INDEX public.memberships_username_idx;
       public            postgres    false    221            �           1259    106610    point_transactions_pointId_key    INDEX     k   CREATE UNIQUE INDEX "point_transactions_pointId_key" ON public.point_transactions USING btree ("pointId");
 4   DROP INDEX public."point_transactions_pointId_key";
       public            postgres    false    223            �           1259    91512    points_consumerId_idx    INDEX     R   CREATE INDEX "points_consumerId_idx" ON public.points USING btree ("consumerId");
 +   DROP INDEX public."points_consumerId_idx";
       public            postgres    false    224            �           1259    91511    points_consumerId_key    INDEX     Y   CREATE UNIQUE INDEX "points_consumerId_key" ON public.points USING btree ("consumerId");
 +   DROP INDEX public."points_consumerId_key";
       public            postgres    false    224            �           1259    91441    product_groups_group_id_idx    INDEX     Z   CREATE INDEX product_groups_group_id_idx ON public.product_groups USING btree (group_id);
 /   DROP INDEX public.product_groups_group_id_idx;
       public            postgres    false    225            �           1259    91443    product_units_name_idx    INDEX     P   CREATE INDEX product_units_name_idx ON public.product_units USING btree (name);
 *   DROP INDEX public.product_units_name_idx;
       public            postgres    false    227            �           1259    91442    product_units_store_id_idx    INDEX     X   CREATE INDEX product_units_store_id_idx ON public.product_units USING btree (store_id);
 .   DROP INDEX public.product_units_store_id_idx;
       public            postgres    false    227            �           1259    91447    products_barcode_idx    INDEX     L   CREATE INDEX products_barcode_idx ON public.products USING btree (barcode);
 (   DROP INDEX public.products_barcode_idx;
       public            postgres    false    228            �           1259    91445    products_group_id_idx    INDEX     N   CREATE INDEX products_group_id_idx ON public.products USING btree (group_id);
 )   DROP INDEX public.products_group_id_idx;
       public            postgres    false    228            �           1259    91449    products_medicine_id_idx    INDEX     T   CREATE INDEX products_medicine_id_idx ON public.products USING btree (medicine_id);
 ,   DROP INDEX public.products_medicine_id_idx;
       public            postgres    false    228            �           1259    106590    products_product_id_idx    INDEX     R   CREATE INDEX products_product_id_idx ON public.products USING btree (product_id);
 +   DROP INDEX public.products_product_id_idx;
       public            postgres    false    228            �           1259    106589    products_product_id_key    INDEX     Y   CREATE UNIQUE INDEX products_product_id_key ON public.products USING btree (product_id);
 +   DROP INDEX public.products_product_id_key;
       public            postgres    false    228            �           1259    91446    products_product_name_idx    INDEX     V   CREATE INDEX products_product_name_idx ON public.products USING btree (product_name);
 -   DROP INDEX public.products_product_name_idx;
       public            postgres    false    228            �           1259    91448    products_product_no_idx    INDEX     R   CREATE INDEX products_product_no_idx ON public.products USING btree (product_no);
 +   DROP INDEX public.products_product_no_idx;
       public            postgres    false    228            �           1259    91444    products_store_id_idx    INDEX     N   CREATE INDEX products_store_id_idx ON public.products USING btree (store_id);
 )   DROP INDEX public.products_store_id_idx;
       public            postgres    false    228            �           1259    90406    store_group_group_name_idx    INDEX     X   CREATE INDEX store_group_group_name_idx ON public.store_group USING btree (group_name);
 .   DROP INDEX public.store_group_group_name_idx;
       public            postgres    false    231            �           1259    90407    store_group_store_id_idx    INDEX     T   CREATE INDEX store_group_store_id_idx ON public.store_group USING btree (store_id);
 ,   DROP INDEX public.store_group_store_id_idx;
       public            postgres    false    231            �           1259    91540    store_reward_point_store_id_idx    INDEX     b   CREATE INDEX store_reward_point_store_id_idx ON public.store_reward_point USING btree (store_id);
 3   DROP INDEX public.store_reward_point_store_id_idx;
       public            postgres    false    238            �           1259    106609    store_reward_point_store_id_key    INDEX     i   CREATE UNIQUE INDEX store_reward_point_store_id_key ON public.store_reward_point USING btree (store_id);
 3   DROP INDEX public.store_reward_point_store_id_key;
       public            postgres    false    238            �           1259    90408    stores_branch_id_idx    INDEX     L   CREATE INDEX stores_branch_id_idx ON public.stores USING btree (branch_id);
 (   DROP INDEX public.stores_branch_id_idx;
       public            postgres    false    232            �           1259    90409    stores_store_name_idx    INDEX     N   CREATE INDEX stores_store_name_idx ON public.stores USING btree (store_name);
 )   DROP INDEX public.stores_store_name_idx;
       public            postgres    false    232            �           1259    91484    subscriptions_branch_id_idx    INDEX     Z   CREATE INDEX subscriptions_branch_id_idx ON public.subscriptions USING btree (branch_id);
 /   DROP INDEX public.subscriptions_branch_id_idx;
       public            postgres    false    234            �           1259    91485    subscriptions_plan_id_idx    INDEX     V   CREATE INDEX subscriptions_plan_id_idx ON public.subscriptions USING btree (plan_id);
 -   DROP INDEX public.subscriptions_plan_id_idx;
       public            postgres    false    234            �           1259    90410    users_email_idx    INDEX     B   CREATE INDEX users_email_idx ON public.users USING btree (email);
 #   DROP INDEX public.users_email_idx;
       public            postgres    false    233            �           1259    90411    users_phone_number_idx    INDEX     P   CREATE INDEX users_phone_number_idx ON public.users USING btree (phone_number);
 *   DROP INDEX public.users_phone_number_idx;
       public            postgres    false    233            �           1259    90412    users_username_idx    INDEX     H   CREATE INDEX users_username_idx ON public.users USING btree (username);
 &   DROP INDEX public.users_username_idx;
       public            postgres    false    233            �           2606    91513 1   admin_subsciption admin_subsciption_admin_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_admin_id_fkey;
       public          postgres    false    3428    211    236            �           2606    91518 0   admin_subsciption admin_subsciption_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.admin_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_plan_id_fkey;
       public          postgres    false    236    3519    237            �           2606    90413 (   admin_to_user admin_to_user_adminId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_adminId_fkey";
       public          postgres    false    211    210    3428            �           2606    90418 '   admin_to_user admin_to_user_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_userId_fkey";
       public          postgres    false    3508    233    210            �           2606    90423    admins admins_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.admins DROP CONSTRAINT "admins_roleId_fkey";
       public          postgres    false    3496    211    230            �           2606    90428    assets assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_store_id_fkey;
       public          postgres    false    232    3503    212            �           2606    90433 ,   branch_details branch_details_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_branch_id_fkey;
       public          postgres    false    3437    213    214                       2606    106602 4   branch_integration branch_integration_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_integration
    ADD CONSTRAINT branch_integration_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.branch_integration DROP CONSTRAINT branch_integration_branch_id_fkey;
       public          postgres    false    3437    214    244                       2606    106539 ,   branch_payment branch_payment_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_payment DROP CONSTRAINT branch_payment_branch_id_fkey;
       public          postgres    false    241    214    3437            �           2606    90438    branches branches_owner_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_owner_id_fkey;
       public          postgres    false    233    3508    214            �           2606    90443    clinics clinics_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_store_id_fkey;
       public          postgres    false    3503    232    215            �           2606    90448 "   consumers consumers_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_branch_id_fkey;
       public          postgres    false    216    214    3437            �           2606    90453    doctors doctors_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_store_id_fkey;
       public          postgres    false    3503    232    217            �           2606    90458    groups groups_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_store_id_fkey;
       public          postgres    false    218    232    3503                       2606    106574 A   import_invoice_product import_invoice_product_import_invoice_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_import_invoice_fkey FOREIGN KEY (import_invoice) REFERENCES public.import_invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 k   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_import_invoice_fkey;
       public          postgres    false    242    243    3533                       2606    106579 =   import_invoice_product import_invoice_product_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 g   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_product_id_fkey;
       public          postgres    false    228    243    3487                       2606    106584 0   import_invoices import_invoices_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Z   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_provider_id_fkey;
       public          postgres    false    3494    229    242                       2606    106564 -   import_invoices import_invoices_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_store_id_fkey;
       public          postgres    false    3503    232    242            �           2606    90463 *   invoice_items invoice_items_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_invoiceId_fkey";
       public          postgres    false    219    220    3459            �           2606    91460 *   invoice_items invoice_items_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_productId_fkey";
       public          postgres    false    219    228    3487            �           2606    90473    invoices invoices_branchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_branchId_fkey";
       public          postgres    false    3437    214    220            �           2606    91455 !   invoices invoices_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_customerId_fkey";
       public          postgres    false    220    216    3446            �           2606    90483 &   memberships memberships_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_branch_id_fkey;
       public          postgres    false    214    3437    221            �           2606    90488 *   other_charges other_charges_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT "other_charges_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT "other_charges_invoiceId_fkey";
       public          postgres    false    3459    222    220            �           2606    90493 2   point_transactions point_transactions_pointId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT "point_transactions_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES public.points(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT "point_transactions_pointId_fkey";
       public          postgres    false    224    223    3475            �           2606    91523    points points_consumerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_consumerId_fkey";
       public          postgres    false    224    3446    216            �           2606    91546    points points_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_storeId_fkey";
       public          postgres    false    224    232    3503            �           2606    98325 +   product_assets product_assets_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_asset_id_fkey;
       public          postgres    false    3430    239    212            �           2606    98345 -   product_assets product_assets_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 W   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_product_id_fkey;
       public          postgres    false    228    239    3487            �           2606    98330 +   product_assets product_assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_store_id_fkey;
       public          postgres    false    239    232    3503            �           2606    90503 +   product_groups product_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_group_id_fkey;
       public          postgres    false    3452    225    218            �           2606    90508 -   product_groups product_groups_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_product_id_fkey;
       public          postgres    false    3487    225    228            �           2606    90513 7   product_unit_labels product_unit_labels_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_id_fkey;
       public          postgres    false    226    3487    228            �           2606    90518 9   product_unit_labels product_unit_labels_product_unit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_unit_fkey;
       public          postgres    false    226    227    3481            �           2606    90523 )   product_units product_units_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);
 S   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_store_id_fkey;
       public          postgres    false    227    3503    232            �           2606    90528    products products_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_group_id_fkey;
       public          postgres    false    228    3452    218            �           2606    90533 "   products products_productUnit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_productUnit_fkey";
       public          postgres    false    3481    227    228            �           2606    91450 %   products products_store_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_group_id_fkey FOREIGN KEY (store_group_id) REFERENCES public.store_group(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_group_id_fkey;
       public          postgres    false    231    228    3499            �           2606    90543    products products_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_id_fkey;
       public          postgres    false    232    3503    228            �           2606    90548     providers providers_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.providers DROP CONSTRAINT "providers_storeId_fkey";
       public          postgres    false    229    3503    232            �           2606    98340 '   store_assets store_assets_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_asset_id_fkey;
       public          postgres    false    240    3430    212                        2606    98335 '   store_assets store_assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_store_id_fkey;
       public          postgres    false    3503    240    232            �           2606    90553 %   store_group store_group_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_store_id_fkey;
       public          postgres    false    3503    232    231            �           2606    91541 3   store_reward_point store_reward_point_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public.store_reward_point DROP CONSTRAINT store_reward_point_store_id_fkey;
       public          postgres    false    238    3503    232            �           2606    90558    stores stores_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_branch_id_fkey;
       public          postgres    false    3437    232    214            �           2606    91486 *   subscriptions subscriptions_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_branch_id_fkey;
       public          postgres    false    214    234    3437            �           2606    91491 (   subscriptions subscriptions_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.branch_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_plan_id_fkey;
       public          postgres    false    234    3515    235            �   �  x���Mo�F��ί���F�|�H@4�n��j@��P� Y�j��A��^J��l`���>x�!��$-se�V���/t�� ,�0��2	��URF]�2I)�d���H���&	%���XkK���q%�ԅ��,����m�5�/�-^!��-j^�};��_��G�JK.�).|0�K�
�*4S�)��\U�Y5N����E�e��N"z���\�ДڠF�+����z����N����.��G��Z��3>}�N��+Z:Yjh�m�|c�4*�4FK�B;:�+yT:9�#�A;�Aa������t��4���)��^����E����8���D����z��PS���5$�%��J�+� �ɡP���� ���h�О�AB^�D��E)�D�	� K.������8��~�cݦz��ah#���}{7��=k��0�i`p8tO�_ܙE��abKW6Èl�!�qF�f6bp$o3��AHl?_�0�Ol7<�%F�C���ʷ9�cfmπ�!��Ŝ`� +���C���c�7��U�z��l�o����z�S�O�b��X�&�2h�'w�ն�����")�s�u���:�D��k�H����)/9����o����NO[/y֗� c�T�xn�=~Z>_in�u�i�t�p�}�9���g���
��P�g_ž=^�]�O��!�s���qG�O�w��Ӊz�����~�G7=^y�<��P�α���ᰉkRԵ��*��E��6�Ÿ\�#ə�~l�]�R7ܭ?��.3�x��~f�G�c�hjղ��y�N���0-��ל�e?�y�~]��>����L���ߑ���E�!���>��:����f��h�KvQ����*�=�)�SI�/����^��bG<
:Q���gm�Xr�7���G��x�/e�s)�ۧuYWI�Q�(��Y������_�Lp�      �      x������ � �      �      x������ � �      �   v   x�}��1�v�G���9_-���/!N�V�V�%\���6p�\#��۳t�T���D���Ɲ�ӹl:�-�#A��h�A�ӥa�su�j��=ʗ������j�_b�(*      �     x�}�KN�@���)��&���A���R�� 	 !u3i�v�LfHS�
��2\�%'�&$Q��˲�O�e�aN0�ב�a����ðI�[#[��x�D	3��YB���>JP\"�h�#^��7#����]:]\��x�1y���u:3�m<����~�3}�.d�*���_l�]i��R�F0hW�N��ۏk;�
�	 �@=8i¦dH�a�\��ϼ��x�+^�H�~�FWug��1R`���%�@�X���tx[i�k�ˎv��Q��ֽ�;���t-���ej*      �   w  x��\�o�~��?��q#�7���8�-���V� %*�5�s�s����^�����L�g��a�j5���Ǐ'�z�6��]�19@R�(�pO
j�v�I!

�V��A�l~ru}q����������Eݮ�.���N:b�hwE�ػgb��
'��a߾:������z�Ǔ��]�ٹ�'o�i�s��쥞�N�]:������v	c���9��<{vv�/��7��im��]�3��;)rvmW�^][�볋s����<��y���~��'�����]𻘷D�W�c�4aq\*bM��CoO9tZ}6�Het�T�}PJ>�d�B8zo�����W��O_\4~����zW]uOÏ/=��0m�{ =wM�x.'�[�������9G������'�'#����`��Gr�:_��':��z��'����p����)�%�3�a㞨��(�"�WGco��bN�\�;+$r�Qa��7���9_���/�o�+ah�7�0�]ʡ��p(G	%��d����Ci�4%�J����Qm���PZE.�Ŷ:�(e�!(q�D	͓�:tlÇ�G	�f��|�z~u����W��Oǋ���M��J�Z��2j�������:B����](&����=���F��d}�6�
�$��k�3J�>���+� �2 f��j.��9�}3#�-��ui�e�h�aJ�CϞirMT��zl���`I��B�zI��>?U�#�怊�!lLY�D �)��dNlx�Ϟ�PGgP_M�q `��jm]u�-yl-���{蚯݁WD�x�G���q��q`���ށi�<���-n�0����Z����C*u}�ꖚ9��152"ev�=�����j\꺢���������@�7m�QJkao���Wr,� z��x���;�)=�;�I([7�d�(�<��Y�zy�@ʡŰ:�*�"whv�(�A�����R��������f٠�%C	n��GϞi�#f�Ҡ�7����%C*X�PŒyu��B5��3��,��b���%���˽�����`Y�|~ {wLS��T�5Y��Ձe��D*�%M���[�#π����Y�j�p�d�-��U��� �˼����q#��G��	��^.Ğ�w��x�ǉ���i���Q���}�4��R��(	q�!QO�C��wUI(害J�O[�
&������&Z�tq�~���[�ɲ=1,�����T�6���4����`*#���'���*��du�M�"1��s"g�I0+$��]���*�z%T-�n�b��P�x`G4�8g<�Ʌ�a��4Q��Lrt�L2(H �6�4�Ձ���$��^��Z�&%�(QSԾ��=����9_`DK�RI��ٟ#h?�h�0��˥������h�v�o�ػc�J���AM�Z���.�5�U���y}����,yZ��7�-�C��M�\�IίFrK�[g���Ȏi��C�9�b{H�c�3�2�u��EU�J�pj����T9>�Z���cC{��� �lyq	.��(�[���r-[��B�><�e��1�&n��Ԟi�E��˶�8�:��i�pmd��tO���a�ZRD2
�ʳLP�XF!!B���b�F����� h�,S/\D��Y���2(��Ꝭ/��MFׁ�����m�I�2zv1���q�&���ﲾCm1�����4�b���)T��r���rͦK������_��-�Z�jT�Խ�р�憬X��ܖ������CK|�&�o��hd��kB��� "�R�TZh�-n} �)˩Ji�� C�U�g�r����{��m1�AS��b��4�Ev��c���]�6"h+�$x�ׯ0%�⋏0R�F����kLo낟���ԟN_��ޖ��,��CL��X˼="�i2�{
�M"�b�^��Yu��a������F��U�j`fe���G"�w���ZA�#��p�3���z7���O5�ٖ��ˤ	��6�w&��9�乨[�pؽJ]?�i�d�UЛ�]��v9�V�������h�g_Ua)m�)l�aJ���wL�B*��hs8�H�΄��:ɭWop[?�E�*B�4ܰ��P(1�:"��q�|Bj�w_��z�&��{�z�&��s�/�!�{XLDd��n��G؎��,��p�|:!
�,����&���>|����,e~��.���94MT���$�	�\�C�𮍞؇�iuؤ��#�]y��������5&����y|>~Z��W�O3��i~c�~�ˁeJ9c�:�ykڢ���Q	}�1��W�e%��To� ����6���*��0��N�z��f9/�0�n�kkqh{�	�W?j�":���D�]RF����C�5)���AÂq������o��W��$���h�@��V�|�6h�V���˥��|����K�x��Ks�2=�w��Tk��My����M�i/hsa����$����R�-��j\B��� �Z6���e��^��������6��|���ߝ�K~�V��R���t(��;��W�yՕ�X���i�H����l[���_Z7UK<��"s�T���D��N��J���Zx�ͷ��\^����=��..7�U��s�����Ol��rs�\7�n����^�+�6,vzy��C9��������ݞi�!k�`��2���Y�S	��G(�7�́�`��a�,�E͢?1�ᗙ$N�nY��n���jEe��-Qve�a���G���K>o�W�ߠ�a�h��b�&q9k�|��e��}5��+i�ˡ?`�_��p%���l2f�J�XGm���Km>&I]Ź��Qe>���@�(�k��t%����\��Ĺ�6mݷ�I�63���0�q�a��͍���y��1[ɱ���|�i��;�C���4M�	�8      �      x������ � �      �   �   x�}�A� E�p
�f����!<A7� ��6j^_� ��-^c�y��T��S�TH��b
(��4d�P� �Ҕ�)j��2��оM~ɮW��yb���8^әÿ�^�R��~���W�|�Q���v���.K      �   ~   x�}���0kj��>�ؒ��nD�FR�E�/�,�p����>��\�K�`+���Kג�vb��-����`��7��6٧��"�a$*�%T���}
��rC]��I$�e����Eڦ��B(�      �      x������ � �      �   �   x�����0D��+�##�q��#;SW�4ME�"���' $6��v�g��L#�0!P�d������1S~b5�|Y����aKk>�Z�U���C��b�;˄*�܊��gdb�`���=��E�a���v���2�⬇�۽o�'�l�1-��[[��Ͷ���!tղ�����Z? @\T      �      x������ � �      �      x��ZMo�Hz>ӿ��Y�U�b��O#Y�d[�5R��0��b7-6��I�[9�2A�N�C�E	� Al�����<�n�jyX66vC��M���>/����X(���s���!�	Ն9�Q,c.�iȌv��X*�\��ЖY8��{^�s��6����J�TN�`�W�����8���u4���.pB���ܲ԰��
�pϚyM�,L�w�*����4�e�"�,�)�Hd���5)Ë�tB)^Bǃx92eMN��u�k[�;t}�pmp`�S��[Ǹ}25u�)�cHS��D�	Q��?��>�@S�Ė%(B
@�T�J&&��I��ԅ��[S���[_�LA6�P���Կ��";u��]�k�u���I6�|==
�ʮoK�캚����/�Gad*Da��$h&�P�҅N1Ǭ�����06aj��d�[���)�R�2�/p��U��U1�ñ<ϒ���PU���&/^�a���&<�JY�͡�I$K�<�&��C���Hl�2��2�����*J�T�|Q�=��n���*����F���Tds����34�B� y"�\�%1.*��"c��o�|��7��^���L��z���m*S�o��Ҳ��M�0e����p+���=�W�v��
5uMBr�\��d	n��,�7��$��V�_v�������Sڰ L��?��&1yҖ}g�d
�2�;(��3ؾi��͠c%�e��k�����8�l�� A9,H�Z���n0]�h�~Nv��r�_�j���Q3��*x^ֳ��<�����`DUH�gu*&1���%��Ƅ&�8F�F412���>�fp:3�D���J�����M�VW��oCt�j���q��Mwf��jv!�ℒT����������`πЩ�����#�f��&㧔��k��e[��}�9�5�x~����Y���f��/�ʃ�36dY,ӯF^r>T���̀Mߺe�;tK�΀���P�h�@g08�v�p�f��l��eS_cu� �����Pq�(�|����º���e��t�����Y���:ơ	���1q�K�	ԋ��?����ǿ${���������ڭ�ޞ4�k�n'I(��dpL�����ݻ�  �>�MPx;�Zx;՘p�t��;s��Mv�ES���&tL�#G�^�u^ZT���(0f	?��]7,\��(�0�p�E��ݼl]������u]Sl�X0I&�G�o�L;�`���#�3�(� �2����P�#L��\��r���v`٧����`����C7k�N%[�)�5#��A������+��Һ�����г�a�$���v�m����2�D�,��|�`��3דS�����y�;p�][�7��˦CهE�R�+���@��!�4���A]E骜�1�٦��Z�$N#��8�!�-I���4MCI!��|*��P
�8��&������ǿ�����lX}�������K����lٝ�w4l��&	R,�_?oW�t'�W�R �#��A�=0�%{�E�C��D�(N�0p�`M����c�%�uB@T뢝4&^X�$h�r��ݢi�x�e����`�\?��ɵ )
�8?��Mp��δ�gGN�����_,�n�"!� �H^@'=2V��"]a_dx���
�&���+yM��W��Y�W����je�Ms�L�S�Y��?�H��"xٕ5�όm��C�FǴ�1�p$��nfe�B���5����&H�`���<�t^:(�'v�5��b2�L1pv=�&�X��M�Y�k����c�!ާPwMB�3��_9I\#�[t��4<�G!cm�ӢH���/S �R�X#l~��}:����Z��n�N���;�=�w �9S��:��:y1��ּ/�~Ev��Ո�}37�wS
7� ��x���j
�^�������� ���T�1P�]L��u��:��Ƚo2����y�vU9�0����yD�}�,M�)X�y]����1 CLX�ԓ��@��dm�bƩ��;x�P���R! s�R���Q���6@d�~�����+�|�"�RR� `�$I��g�d��S�m�UUy���y���Z��ah��Q|F�T�[V�K�*���w���1� �0tsr�N�C	*�����n�i�-k̀��e�Ï=�LW��\�k�]�{�[�ZA�����i��̃�����,ь	P7����P�͕�ElR�ܳ�ӫd������6US�|Ky9<4(2��ߋ�Ó}4�k�!�_�|p�r�p��*�M5�,HS%��33�ф��;�l ����3��e;2�9Hg96?,'JJ�Y-���z�7up�,��d�g�(0d�J��'���Fɗv���H	5�/E+T�^���0���0˄�2G�9q_�i�����j_�i�����]�z�x�ph���x���&`����ɾ|-����!Ok�~�c��f�&LF���-ޙ6Gs�p6k�&/����xu�f�
^ 0���3n��6Ø��<�<f72X�j|x��O��d�a��u3E��5�Sn�=?�[���4�pXY�	�]�,f�3�
����fg�^}��Y}6��sj��%l�õ&q(b���F\�bW�/��.��M��QN��qa����M����`l\m���y���0T��k	y�˼��Hú%軄��-t|	%��Gh�p��c���u��kpZ����S��]���K�����ظ�z���H�\�w��D'���hp�H�}W�7r���꿮��x�ź蠴g���kM�8���u�U���M�r����Q��<2mی��T�1J�<���b��gusQ�|�L�M���j9�蘦��J�v��܀��ι�筍/9�=����K x]�(�5����R@z�-�7A�����E�eg���Ȉ�P��s��CZX���9w7�����/`"~���ґ���+��.�,��1�\�JCyZ���2S⾛��O��${k�s�F�����CkD�;���a�%�q�.�N�e�$��m����`tZ��m�fV�ڢ�C�t��b���g�5�fA�i`X�p�h�&cm�� ��DeZpho�u�ɞ��'�'5�l<�&'�U~n��Q��b���Ft����M����5�/�����"s\��������?C�O~�\��zV�9=zUU^��N��1L+���������v��´��ջ�ԫ���0�y"����f	#S��]4p�k��c��Q���i�7�[f��̽͢��,�qi�	[���g͸Q
��z�~�8�ϼ�F#�������$ ��ȼI������z��r]dԄ��q�e�b�0�Xnbgm�����^�h��`�������o��\�g���0"���+��~w�N�O��7��&�3�k�j#j��uޏco+����ֹ몦�j�p��IBN\����i�h�<|��ì4=����n���X蹚"��s�Qk�{�
��f�}��yK_������H$�O��h���_:������H$�@��8��	��� 8)�˨�$���?�n�5xk4n�Q��~����p@����%���"2�,����+�6��o�EL{�����	���q|L;�
,V��H%[BR������is�(�j�hR�_K��d�')���8�K���baZ�]��*�".{ٺ9H��5��9 �! �߮7w�+�V[��#�H������|f�8�(���`J(�)r�y��Bm�	RKD��B�W7�O�p]���c��?>[�����F1�}XN���ߝ�v�>�Y���g��*��k4b��]u����.�j5��z]�AY��J5�gm���P(s��)%��K��0��ʀ�ƍF��IY7\#��}r����D}f�a �O��a������;.���]�ԫ��Br�3Ȣ�!"�E,C'T�2��\�7��8�W��CU~h��xn�y~��Un�.Nt�Y��^�{sԾ<��\Uk�>��0f:�(Kx �  r��2rK���L�(/ab1)��0Ȼc#���>8�;	��K��3ـ�q㲺1U��M����'�7����ȵ����r��� �Vڭn�"c�'BFLܕ�h$�����I���rdhː�9�a&L�C.R���]pX���i���_�sOe��j��E�x����=,E㉆�O/w4)/�<��U��Pz4Uɸ�K��I��*�b�
�MpS#p��	*�_��kD�톬���D���3S�C�\���B�7���x������	�~���J[�-��Ү�ͅ�)M]��q�GqC.LrƬ�S7{߀7/a[���oL͘���%?��^��c۹�k^S���kߚw/��y�|�-�F�:&�d��"�$g[I�Bo��5f�����mV(P�5�s��u�!k�����9b�x[h���p=�Y{Ap�8����!�G�P�q�12��?�=�64���9B�^�߬TQw1񦃯�z�����H������<x�?����      �      x������ � �      �   �  x��W=�E��~�D$�����vL��9������.��  ��	Y�$X�	�Bk�����;�8N;����jW�ҫ�W���P�!V,�d
P,�h.����N���@s��I'�Lt�-f���G�����<w'����E���G��ퟋn���Be��:�:z��2�c�u�������U���P7����sV{�ڦ�?��˓�ɰ�G��E�c�Y���i>fD!4F��5M�}��������;�y�m�8gP��u���j6�*K����=��%�-�͏�n�ly2R���Z�R��� r	hgb$k��8��հ���<&�;���KK���(���R�
٠2&،~�=�����NX�(�[�<�Qb�V���i��Z��J����E߿-���齋�9��t�AVQ:�X9]�YSMP��T�Y�6?����?c���<�>at��O�Ģ!���J���R���v���|���y�1��m@Ɋ�T-��)B	�([���1�Q�c��7g�W�V-!�P��j	X�
�y�����:Q�<t�W�q��O�Vy5s^�.��C�1�b�!qs`Qܲ���T���������uu{>�%U!t"�(&�	�l+G]R����aŋa�}�}�y��}��fzE�T��-�U��T�:X,I�'z��e�����=�33���0C�B���b+�l��MÉ���.�o��_�|*L��L5��*��dN�o�%�j��#��'�Í�wKq��\��}�y�Gw��f*��b�k�02�9�Ҙ����\��'z�[��ꯞ�Gl��yu(Q���!;L�7G�^<�T�^^X��:^�o_��b{1��!gV#9��]-��%x0Q���� HO�#g�}���F:���_��� v��$�"��#!6�KP��W�s#���>Y�y&��uD�g�ow����yp^-��bެP      �   �  x���M�\!���"��-���g�0���$�4݊�ͬ ����5�����@�$�l	�m��2��%��@��m�{L�Y�]��5��0�tu&p�hyCD:猋��:`m~-�l��ߐ�lO�Gg����Ml��Z�C��7��s`��8��\-��9�=���
��`��maS"�§��U�2@Ws�*��[m���~3��3�<���x�~�nW�(�@�:��S�3/��3����!kt��!fԱ��:��K��I��h��$ݩ��P�J�,���i��Նt�}��pD�;�sP�>��`I�j��uRs�׊ǩKዠ�t׳��+�6��T���M�{`?�h��C8��_�LV\MyP�����ږ��Ǫ!J+wU�5�T9Ї�{Dޤ[��V�C�|�g\��o���}�����[M�8��ۙ��U�.ՙ$�6{MHqׄT�X��������i�4|��;��t�x����f�Q      �   �  x����q�0�c^�=���]V��*P��y\�PN]�;1p�5���"g�����?�ūG��C3/P�[n�T�l�
���G�A�j���Ju����v�\m�/�~<~�������;ڈ��?n�<�ւ� ��!z��N���J|p8��īt�^jjy@�E@GW�*j�-V�J�7��+p|��[�<!>���r0�;�-x&�Š�d�x�#�fC~3�| <�RB]�hi��HXAM�-9��ܵ���z�����L9B��7@��� a�
ҨZ�ZE���Іk��)�r3h�o��^��{��L�3ԠT,�<�%Z+�}��
N�
�����3�2�P�ipV��b����k�>O��h�h�fWr4[ ���v�BT��R��s�5̬� �J�k���y��d�>̎�N�]���H��d�#hJ��k-��"������h<8��~m�0�q��J���t:�J�p�      �   "  x����n[G�뫧�cgw��L,�"��`�p3�?!J21��T���$pa�@`)�H����7ɐ�ĕ�,�y���9g�GO"�����
c��}LX�k>N5�1��P\�@�#dn�D�R���j����j�������n��'ǳ�q���'��~�޾�Mӣ���������S���;:�����*)�>"�
I�ή�ȉ����׫�O���~}j�.��9�g'l>����y��/��ٟ�>���/�/Ns6�g��8��,����j��-�d�l���ʚ!C)�Br�:�\�ہ���^�|f��ƥ�����_��9������3s���;�����D΅w�<���Apj
9$`$����Cr�v`_����z����oϞ��~�S�������q�����Z~����R��:I,Pl�P���Rb��~���sO'�����׳���_-�S�5��K�;[-�-̗���&�}�TiC��u-7��`���
"�[Ս^ѕIݓ8��^ɝ�6rнƻk�����k�^�����8j>W��U��3����bÝÆ*ox���v�bWG�R!�4 ���D�8��H�a������k��+�<8���Qg���Za`k+p��G�(�nu�*8Z\�����FA�)M�*U�H%��j!�L�e�9�1x@M���)D�|��^me
Ѽ�O,^G�%�z* V����\��4l
"ڇ#U%��5=ch��X�xn�~�J��.��gu#Yԗ$N
z��i�n�RH�i�B&I��()�ds� �F%
�t�6n��T���`�HF�j�L�B�̺�v��=䂖�sYE�=�?�-��i:yC+����B���ҝ��&��(!0�)��z���Z>=���1�K�U�:M�nY��n(g-�PYO��t���\�\�U��`i�Ri���e�Lڹ���U-З �R�+�&� �F�����b���.�#�BѴ����FIe�ID�쪢&IG)�A^�SO�ZI1�OJ�m��?��*S���ZP���b%NI��5�~�(V��@�s1a&��?���������mٱ      �   =  x����n$E�ϝ����v��r9p@��q�KUw�")K��̓p�ę�}.<�%+Z;�"Z-M�k4����^2������J]�굙��iP�n���Q������-�퉑��}"K*�p.�6}yWoov_՛���/on^OӘ�0�	?,༊�1ݿ�w�}��L4s�{����W�X}]$�+�Դ�K��+{/*����Z,�I���w?�Xw_��H�s�</��D����6��$����Gf���@�V�D���Wa�)�ܣͣ�˘-I�(�����هO()���|�g�-���$��V�,�+Y���š��jU�����A��(V���*{����1��(���ҚkMc�*�<��G��q ������0G���&��#�@���7�-+Zu����,-յ//PC�\� U��f�Y�)��W���){��p���5#iy5S7,/;g��|,��v���s�=��?�HS2]@[��&.PFOP��*s�]̢���,QI(٧o���w�o��~��������Qvq�9�I��f���9�[���4/=��8 �u�&k��Z)�g9�afALa�=�^��D쀜�Es�
����������{����N�lG@V|4���Mrۡ��f�eތ��Z�%�RCX��r[�i����ֻ�
uX��b��B/����r�>!�ۍ]�����s�s�ϫ�O�G|;*��ʺ�H�h��:�� �
�W�V�0���.r��|~md�c������4$5,.Vo;m�1*Ĩ�v��yRI������/|�{��Y|V�;�f�By��������      �   �  x��TMo�8=˿�J�H��OMmg��f7�]�
,(jd��>V�'���R6� )P �@�G�R��$��$�8I0bGH�(EL�8f��\����a�o�2/Ę!�b<>�,��0�����~�|OV����z$�߇����j�eNM�O}3W�y�,��T��l�����ʫ���=�����4Me�A`�d�߃n ���<��S��T5�3�7iDEY��W��Q����R�kV���j�}���
��l^JbªCT��$FRK@$�i���;���jU�?�\��s���hRC�n �tV���G���/����o�2/��,N�'��O��Ӏ�0iMS�P����{��=v�E[U����c�ر{��s�ʺ9q]��x?��£��:f|��/�<��){�(����Bi����4R�b�� c��"g_���&}sB��Z���1i�WY���;净���j�pL5H%��DJp�U" N9�#~t�r���5l�4���=�֔����r5�s9���>Ζ���2f�'��U�gS��1ӊF\#�S��N9�*T��E�S.S,��i�h�h���m�x�0ADt���ҏ���d|a��}��P})n?\��R67�m������������$�8,V7-T�w���{,K]��ޮs��N!y$"���k%[�W ������.�܁�N���G�t�:��~�v�+b�F�$���ZE���`����B      �      x������ � �      �   3  x��WKn%7\�O�h ��D����E*0x�������,r��°��=���)�ܝh�FE�����k�N�IS/�&�emy�e�0���s����ZW�~�x�z_�~�\�k���x������ϯ��?^������y��z�T�^k{�����R�nU+^u�ǤE�iٳ	�9�t�H��\�e���2O`\�4Lf}�>ʳ��IE&yY�fQZ4���r^[:e�Sl��֊�1ؗˊ�$(n}$o/������x��$ro�k�qe���jY/�<J�Uթ��IPM%C�L�8�rYgx�N=R�i�%.�u�^sW wpjz��Wv�6�QW+�U(�"%At�#O_\��3�I�M݊t �Z[�K�R[�m>	��l>�i�yY4�.c��خ	�-��Q�0S!>E�A�c�cyT}�[�^R�$�1���ˈ�2"gw��[��\h������&U鼺𣜲ힾ�Sl�zΫQ(���D_ D�A���MXB2�$��R]͞��s&���� �E��iJ�������Л�9��޺P�qf�G9��S���@&-WOZ�'	{�N�|�f-N� @���Iռv����oi>�� �yN��V�2i�'�5���#��3�8���O��cX{~��#�>֎�ǔ36��9k�q��F��-0�=��&�M�.���I)Bn&�> �o�⾬���ܣ^����.dP��#����{{��Σ��9�s6��Z�>e��#����Jb=n(�Oq�aCOi�Z��p�G�s뺣�yӥ
����eZ����&WH� ���0.�\02��]_�s�D�gˈ�����e]�6��	��?�7�G� c,b��]_�]ٷC�t`֊���t�c'm]C��}�[��gY�\�Ui�P_�S+y �J3�OAg�R�nzS�Θvڵ}6�(/Z2�J�;�\�ǢG��|ߒ¤ �A+A؈^s�����2Qi{�2&�f��j�sEw���D��(t��hm�o8�ǥhƕʹ�����Ĩ���x;?�S&VGA�y��}Vp���
N��n�UѷDg+���FJj<�>It�P�P ��Z�@��:����02���0O���K�����M�Q��of@}bt�<�w��:�V�<�4a�"o�<�!���y�2�$�����t�ïhUZׅv�<�\tt|s
��ђ56�iu��(ѕ�<w��[�%w���;f���bm�Z��4�f_�@#�;FG#{�6�7b@�	�3�7�w�8������k!���l�����.,��+�}Ӻ~���������V_[}����7f{������_g<\�      �     x��WI�$7<w�b>�)RY���Bj��J�i` /���P0�q��t�}M�ҽT�y�n��}1}U���_���O����TD��>7ދ��E�N�k�����7����wъ�<7 �NY�]�C�x_&�3j�3�XoQ:�Ά�Oϋ`j�Mz��f���Z��.���;'�P=QZ4p��_}�m�y�^C�A�]l�:.��VL���A�i�����Q{7�v=��<��g6���\�:j[�Ę@Z:��R|�$�{��s�5f�G��b��f�iV-:�9/��g����%T� É*�������)p��
�Ca�Yl�.����y?�¡�dp�K1-W`:�%-}�]��2���@ b�	���'�8h��hO<\�s@�`�&�T^��d��OB�Up���+y�=�x8���&�8���l�,�ʠ��;���
��7N�����ҽ�`v��g
�k�nlՀt�.�PN����k��H�Cc�Ny�n4n�tU�<'5~I�]�
��6 �&W�L��t��r
~�<��3�0�߬�����n�q�i��?�>����S�5��$��<8]�%/�p����Dm�Τ�%v0�}�"ua
�21��Kf�x�AW
je��x_�y���dj��Y��(ڏ�Z%Wk 9N��lά���u�km)I�TTbX{�H���}��Yp�Z������R��� 1���z������������"���c��|9|�$�ML:�������Xny�0�j�H奭�T��� ��5�w���wv�w����r�@sj�i�n���y�J.�]�� �iޡM}�L�s��e�F*��}�"�Q��xO���s�Z��F@ ���V�B�+�e"U����r�p�e 6V2�/>��v�Yg?ϓ�t�fM	�Z������(�7wB�.Z�/��>�<�1�P����̓;�R��Ǫ����OCY7�2�5�+�����<�gH:��!B��ti+�#�-���z�@�Lx�Y�dL�8�����4,�����rvYeHP�������<{��)`D��nD`g�Ҷ���h(�'�(x;<�"P耙�&7� ����y���UeV$��s�p4�Cf�(��qD�ݠ��_0�pa��LP�o/��h��r�j�������fo>��3&�Łi�Ƒ���5s����˱��/��Ƨ�G��
���W�{0R)�y���H��?qP�H6�C��fDU�j�v|����L�*}}H~D��v�?c9���~��_K\a/L�߇������dK�      �   �  x��W]��8|�|�~_( ERs�=�����G���� q2��F���_U��M�Q*�+����4Ms�թ������y���-�P��+�����5��y��F$m��ƆwbE�^����ǿ2eKĉ�ק䧖G�������Mb,�5��{Q�}�D �"�x�=�K��N9�yNZ�lϥ��)$��2���'�C)>q��u��R)8��{mI����J��ΞY�'ѡI�(���h[iE-_p�r���:��[K�'V�@=+���6-cD�{8i��F�!��}9'��6����?�>U���������(�tm��b�\�*e�	,�p�$�#�$��A)�y�lM�1�8˓�až�|	+8��-���Xb*iX����fw��{N�}ࡊ�g�i�]%V��r���4��G�+�K�p:ה1�4ƹ��zG=��·|�5o��n��M�I��0�������/8��R��|	e�,uMٷ��Ro�S�m�,j���w˘��fES�a-;ך������W����4}0��{��M��D]����V9�e��J)7qnPnwPRG��ps���j2���>��w���������Ӌ��}'3���v�{8�.���˚PPR��As�U�(���E���C�^Ϗ��
D>W�	QQ
����^���	��BY���pR���\G��4�)O���Η��!]ZE0U��3-�"�������s.U���'���e���x��r��e��$~�<���Q��B��nڬ	��@����e�=���1���~<T{A�1� h�զ���=��w���*����$�3�>��Ī*ذ~w߳������=� '�H#�1Y0�8�I�T��|��:�(:&4.������)5�6r7��7�k�D�`һ�����v\�ԯ��'�xp���%t��pvq�f�����Jzi5�j�����������<�	/����<�h���d�f	v�*��k`8j!"�{�\ȼ�x>3y�,x�TF�L��[`�\�F��o:�җ��#8(p 2ɲj�Υ�n&���1��#|ٞeP8�����^�%ϛܶ����oEO�9Uc�������(���~�����ê��G�b�������Av-����r�Ť���8�=}q��X��~�YQ��˗�xٔ�Ҁ�>w1��!C�����K�������b6h��ǩ��P�W�WM�(�Я�|�0��O��=��h�o����F��6w��1%1U<T�dz@s���i�k���"� ���� ��ѝQ	\d~z$���Hr�q�}Y'^�|��RS��¸�[���Ni=�P�f��CBA���P����)B�e0�r��{8��nn�2�=�)愿����e���Vnp$Sa0����;�6^�N~�+O��2�����Pq��19'�4����'e��߼/�b�\u��k��ĔH�enߛ*̥N��]�3�;2��S�3�=l��e}����dr	("����۱�O$���d��4��Iިt�Q8�k��O��lk��73��t��K�(���B�O�߸Gl�k��e��-;�{���'�uŸ���M�����>QÝJǪ)RI=�>X�FiopO?J|~��|����>�	.}����	t��	4��-�} [Cum����Lp���L�<����ru�      �      x������ � �      �      x������ � �      �   �  x����jSQ�u��e.3s�|�]cK�	��M(���TA� ��[_����O�7���
�֒�H������Q9h�%Ǌ >.����r,4��،@��H\r(���!��_��8���
v^��G��Z��a��e1�0�$`5| �'h{t��=E��`*^\t� �A�(pv�c�E3cT�sn�]��p����ٜ�Z�������` �����K����&��Vgo@�K��C��#IR[Z�?_�g�?_.6�ƍ��Cڛ�3u��H+������+A�d!��ĥh�v����w�T��-6��H��s��#�ý���B5�v�2Dk�Y���Ӄ��Bu4[����b��
P�� )��t��m����b.��Ic�
.� M���m��Y���_ǭZ���.������W��k�� �H���,r�jth7@�T�r�}U=������>����Ce�G��hէ˽�z���GZ�т)yH)&4m�Jk+YϺHH�[����P���'��ϟ
���uO�s�#�*P<DB��z@1jnC̀)j�:� D�**�j����lhe��S�eV=c�ؑ���qO�3�&�Tig�De��h.&�TMN�!��m�.I��鼲7L-�ƕN�jL�R{I�Um}K;����`�l�A�-���� j�;^�p���5v�6��h���N�����      �   Y  x��Z[oǕ~n��B�v��a�/�'�BD@�hMEY~���̬fz3=��A�E,� ��>�Vc� �(�bI�@��c�ɞ��x�cR�-q���s����TI���(�^,��ؤZcI��)q)$��iԁ`�lĢ�56�DLO�S�oWOG�����N��F����Ǐ+c�UF*xU��Bx� N���m�����[�����ҡ'q��o�ϟ��U��t�|�x����x�)2�T��C*F������A�pm��B�k�$��X���`�p}�{�`�	L�����PM�?��n���d|?���̋��7-���M����A>N~遲�/��~ӌ��WͰ�g�xT�|�>���i�?��Fm;_������n:�ā�Mw�S7��]W��y�8�z�����e�8<��᜸��̇a�12L�P̔�q�a8��B€~��*X�BJ�@j,x��&�pdR�u�#���� �hUΗĄ»�{T�13 �p��l���ݻ6� ʄ�ag��Ȕ�)ϱ�5�Ar獿27u���ӿ�����*�.a	5�	%���z����'������z�p��al�;tw2A������@���	����b��8�Ѹ����+�+]�j7�-"
�)��^
�4�3�����E���tu���{�u3��֖����w+� �g`��-��/�-O�X�E����@t�Gc7�`�ӆ?�iLviéK�$����r���/2X�E0��-��TLxN���n�1@�8W�Ձ��O KB�IL*F�3^��V}1 ����OS���h}��M�)���ϧ=���I>X��:�'���EOv���O��#�&@;��������
U*�խ�R-����5L@���Gc�"\�d��Y~�{��b���S�0��{�������!J�H�ӻ�[l�����h�!Q�a� o��S�[F�5˽a��V�Hɕ�f,WDi������'�:�X�|��t}��-ڏ����<s�ᣳK=�PZ>xfYy-�A`ȼa���u�T[!�#�Wc=�/@�3\����y�,�K���s�x���&��\�{���P<�M;�E�4K����������� (V2,�u�c��L��:��f�iG���vT j��v�X|X��?:}�d_6G������|X]�XiY4�|g�L���L��xXt�cjE4Zz��ڒ�u �%�^�����V�˓�;f���b�r�Y��i ׭O~ۢ�n�:y����B\RS�&hrT�5W��H��CP� ��wD�&Ҹ�<i�����*��֬�u�������,K�ʌ�@n�rӝ���w��w����[77h?K����GՅ�e�u��7Qr'$O���2�01L%2M<�Io�D�]��s�j��������o��WH�8�p�Ṓ�|�wu�*O�m�����.�<~�Ł=�|���-[(�ⶈ;(,��R@�B�v^��׵5�y+��ݬ�՞K��u A� }�z���=�X�fG%�3�?z��U޽��H2|�Jj0[�a�S퀣��fF@��b���*j�,v1�%����sH��f�e:/�t:	=�
���ܤ ���X�Z�.fc��sې۪��٧�!��:��d��'�8�;�ޟ�$�"�0����3az�V�� ���:t0p�
>�>:u�����_�����6�u�X�i��Z��n�;�R���fx��$"���]�چ0�V�f�G3���86�)_�_�UnrJ�Z)hn�� Ǡ@�zL����ü����ݴǜ��F�)Dgϊ��@@m�_�ѽ�'���37E�N�����╊�N`�"�ͮ56{Q�,r�K���D5�&�[��&b��9�%�U��?�v�������]��
�~?&�y0n���[o~47��&�r�=��>����Q�Չh	=��!�uV-ǝ#.�)���('�g��?.��Ϧ3�ȵc����~�������*��l��a�G��ԛ���>aX�� ]�kN��m�����hu���F����������{[b����ނ�k��Φ3<���~t� +��m�4���V��8FBh�p��î�Щ"�o�N4Q���B����oHM��)�U���G�S;�O?YM��#����*����9{��fn����@"pZmp���{:�t�A���dK���)��̳�)(�xlZ!�>�+(�ټ�Ofs��6kn`v� sF�,�P<���
["5��En���.�~���3/���{kO�����vCiw�89s\��#7Fb@��~�v���wm������=L�ib�0e�ԘJf����n�1�Y��՛�&oF윓Ϝ�2������\ۻ�����㒙�޷'[=^�V�6�<�d	���:9ǍP�@F�f7��0ޱ��>�^yT��w��ЎЇe����!zXΤ�~�=*��(3!�T��ѝn6>T���f�݄f[&)�*-uz[g�%���y�Q⟔�[���]:F��_��@n�2�� �q�w�6�nu_-pb�@�[�c�jP��,fV�P���g��f'U�����^��_��|���{d�[�:�}�>y�� ÷��|s`�{F��a���f����B������9jO_�̺���w"�H��[��4y�=�<��Y����ϏpNP�o�MX�II��r	;�g$����ڂG~7�muS-��yKC��ڀ��|���.y����B�E��[���Y�lA�d��W�&F��&Z}�Z��ZW����������ѬW�2%  {��	1����mw��="B�|������ۍ�b:@���z؆��L�3�P��̻�h�l��J��e;[@ٻ��������u��[s��j��&�Z芕�n�phmL�s���I���I֙�k&�,*�|R���'���O*Y�5�Yp��8���K���9�D��1fTH���}���
x@\N'�ct �����L=]��3p6����D��?���8m:nf�Qlgr:�����.T�r�̳����l��7���ݸk��� ����"������99�9�1�����j��^� Y���5m��g㦝Ʀ=�@��лC�dv	�rO�=I�* /ݺ ��O�}h��Ձ�=�zގg�ݟ��Dm�!A�� 1f{��*"�(�D�
Am(�Qc�T�`�a1CW�6I��̀h�����`p����sX��-i=��Խ�i_G #F�����q2� ���O�IX^2���BX�c�M޽�)����([��0p6�P�H�Xlju&%����=��VSp��	�������v���@Fl&n&���+˒�|K�d�
�>Z���[�)_�����J
(����yX���:�H�3�nVaj���͜����5.E�r���_�Յ|w@w-�;r�K�tҗ�����qf�|�kM���P^����ǔU�Fc�5{���1�sk``�`�+�8A"St��D�W.�e8��yag���@�Ȁr~9pRa�޼��@�P��`��A�����'�0�RGD2�<�c|�b ւ�Ղ�b1�n*�<�~��t�)�	��0j��He���­��R;J��aT}<�s����oR8      �   �  x����n�0���S��*v���	���F �PA�$���Ħ�Ep�q�P��8�R+����!�}�	�J�B{��=�=�5�y���z���p�����z���	��-���y��.^��>�!�"'B�>����Ʒ������~���/Q�}ƙo?Uh���P��M^�)����
k�5��c�w%�Ԉ2$4W���Dji-#�4��5b!�2�$�ꀊ�FRȽ��22��D�q	��"�&��b���`�-椪��_i*)��G����B�A�,C@f����!���1J}��]w}g��-|s]c�vY���U�l�U���ݫǚ�a�+�6�jR���%3�ef��{�67��z
��W�����;r���MC�LR�|�z_��'�7W���CN� _���}���!���>�����KY�VqM��XQ�1Q��r�48A���K      �      x������ � �      �   �   x���1n1E�Sl1��YҀ���L�DE��'�ǧ�^�q�� �
<`Zۻ�ֈ�ؔT�(�@�lZ-�>i~��6��=���&4�^��Y�Ѱu@�g���%x"��O�f�z�6u���3`�\V��S�8�R���j�E3�i�'���D�X/n�xq����#�V��ޫ��N����p�J�7{��|�~@���hew��]�MH����6^$_��y��v�wm      �   ^  x��U�nA�o�bs�V�L��1	�:���J֝-a��8DD��#�'�q!�ܭ���vG-uWMWբ�}��m�@:*Ȟd��3����TV��b�*C�PA3DV�-/^ݿ_������_��x�Q(:����:2d_��WR���YZ�o�����j��n����g'�gL�s/\��;4&^x�\���"�\�dG�B����t��AdA���"��,NǛi�E÷i��4������RPG*.�� Q���29�	Df�����ä��Y�D�+��/��C�\�՘��(&f$U�"�l�!(�++�	q����l��կ����[+�i�~��;6�F��7���ډܱ� �`��P!�R���C��<c����3���r��~�����q�&4��J����[n�se�ۯ�x��U��������@@��F=`���Xf&�=�ѱIkWz�e�.���M5�eRtP]	����g��+92mϛ�\0���8[���@��@q�(Zq���e�um�g��\N�%p��Ts�U��{��N��[��Tk���0hgZ�v(��1�@�Z�˽k�sάs�$O j;�:�?����;w�      �   �   x����nAE��W��c�+�8��(d�*$�����nK��j��=��k�ԏ S������*×P��{R�(��9@nN � ̎����g:H�l1]$]8�=�?a���yׯ�t���m��n����1/v��E-���x�wM��+44��E�Oz�-�A�4v*YAvH-)P�����O�����4� ��`=      �     x��ϿN�0��y�۩#��%�)c��u�MPHx6&c%X�X�{�Mp"�:�H��O��X���:�9�Jhj,�T+V�%3\�K��W��my��yI��|�z��O���p2�˶�X��#Ȧ���0�BL*��ʦ�o�v�����p9EL��3k���=��Gz���֯���7�ғ�Ex�tɜQ̍�2ijSGq.Ƣ��d�Pqڟ!���>:>�E�m�I�� E�����y�B��߭_�ڷ=����gqE߉���      �      x������ � �      �   L  x�M��o�0�������F�ׂ��L3e&;�,�����
ٲ�}�.Y�~//�{� 	� ��P:^�3M�ҁ����F��t)/�4h�Ę�c�ܘ=�v��53�|_~mB��=�U۶�^|����O��!K_����ϓl&�����I0��`��)-ʭ�u�MӐ��i�TY�I7W�UnQ?�UXa�>�[^Ը;�o}�/$�"F��Pp�a"#:%�?� ���;��H2+�ǭ�����e��{��Y�'yU"M�z��FU��4�������v}�V��F;�	+o<7��~���rh�ay4b���Y@1��#ʉ��ў�F�_t��     