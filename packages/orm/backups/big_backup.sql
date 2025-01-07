PGDMP     +    '                 }            quan_ly_nha_thuoc %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    quan_ly_nha_thuoc    DATABASE     b   CREATE DATABASE quan_ly_nha_thuoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
 !   DROP DATABASE quan_ly_nha_thuoc;
                postgres    false            �           0    0    DATABASE quan_ly_nha_thuoc    ACL     3   GRANT ALL ON DATABASE quan_ly_nha_thuoc TO adc300;
                   postgres    false    3763            Y           1247    90065    UserType    TYPE     H   CREATE TYPE public."UserType" AS ENUM (
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
       public         heap    postgres    false            �            1259    106512    branch_intergration    TABLE       CREATE TABLE public.branch_intergration (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    type character varying(255) NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    intergration_id text NOT NULL,
    intergration_account text NOT NULL,
    intergration_password text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) with time zone,
    deleted_by uuid
);
 '   DROP TABLE public.branch_intergration;
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
       public         heap    postgres    false            �            1259    106545    import_invoices    TABLE     G  CREATE TABLE public.import_invoices (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    provider_id uuid NOT NULL,
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
       public         heap    postgres    false    857            �            1259    90269    memberships    TABLE     �  CREATE TABLE public.memberships (
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
    permission character varying(255)[] NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
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
       public         heap    postgres    false            �            1259    90304    products    TABLE     �  CREATE TABLE public.products (
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
    product_id text,
    expire_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    import_date timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
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
    public          postgres    false    209   �J      �          0    91503    admin_plans 
   TABLE DATA           w   COPY public.admin_plans (id, plan_name, plan_type, price, duration, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    237   �N      �          0    91496    admin_subsciption 
   TABLE DATA           z   COPY public.admin_subsciption (id, admin_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    236   �N      �          0    90183    admin_to_user 
   TABLE DATA           Z   COPY public.admin_to_user (id, "adminId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �N      �          0    90187    admins 
   TABLE DATA           �   COPY public.admins (id, username, last_name, first_name, gender, password, email, phone_number, postal_code, address, avatar, notes, bio, is_active, last_login, reset_token, permission, "roleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   XO      �          0    90194    assets 
   TABLE DATA              COPY public.assets (id, store_id, path, name, description, url, type, meta_data, "from", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   �P      �          0    90204    branch_details 
   TABLE DATA           �   COPY public.branch_details (id, branch_id, so_dang_ky, ten_nha_thuoc, loai_hinh, tinh, huyen, dia_chi, nguoi_dai_dien, nguoi_chiu_trach_nhiem, nguoi_chiu_trach_nhiem_chuyen_mon, so_chung_chi_hanh_nghe, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   �T      �          0    106512    branch_intergration 
   TABLE DATA           �   COPY public.branch_intergration (id, branch_id, type, status, intergration_id, intergration_account, intergration_password, "createdAt", "updatedAt", deleted_at, deleted_by) FROM stdin;
    public          postgres    false    241   �T      �          0    106522    branch_payment 
   TABLE DATA           �   COPY public.branch_payment (id, branch_id, type, status, payment_bank, payment_account_number, payment_account_owner, "createdAt", "updatedAt", deleted_at, deleted_by) FROM stdin;
    public          postgres    false    242   �T      �          0    91476    branch_plans 
   TABLE DATA           x   COPY public.branch_plans (id, plan_name, price, duration, description, "createdAt", "updatedAt", plan_type) FROM stdin;
    public          postgres    false    235   �T      �          0    90210    branches 
   TABLE DATA           �   COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt", enabled_points) FROM stdin;
    public          postgres    false    214   U      �          0    90215    clinics 
   TABLE DATA           �   COPY public.clinics (id, store_id, clinic_name, address, phone, email, created_at, updated_at, status, description, deleted_at) FROM stdin;
    public          postgres    false    215   �U      �          0    90223 	   consumers 
   TABLE DATA           �   COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �U      �          0    90239    doctors 
   TABLE DATA           �   COPY public.doctors (id, store_id, doctor_name, specialization, phone, email, created_at, updated_at, status, deleted_at) FROM stdin;
    public          postgres    false    217   h      �          0    90247    groups 
   TABLE DATA              COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    218   8h      �          0    106554    import_invoice_product 
   TABLE DATA           �   COPY public.import_invoice_product (id, import_invoice, product_id, quantity, price, total, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    244   l      �          0    106545    import_invoices 
   TABLE DATA           �   COPY public.import_invoices (id, store_id, provider_id, invoice_no, name, total_amount, amount_due, amount_paid, debit, notes, vat, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    243   #l      �          0    90255    invoice_items 
   TABLE DATA           x   COPY public.invoice_items (id, "invoiceId", "productName", quantity, price, total, unit, note, "productId") FROM stdin;
    public          postgres    false    219   @l      �          0    90260    invoices 
   TABLE DATA           )  COPY public.invoices (id, "branchId", "saleDate", "saleTime", "customerName", "priceList", "isPrescriptionSale", "totalPrice", discount, "amountDue", "amountPaid", debit, notes, "autoPrintInvoice", "printBatchNumber", "userType", "userId", "createdAt", "updatedAt", "customerId", vat) FROM stdin;
    public          postgres    false    220   @p      �          0    90269    memberships 
   TABLE DATA           �   COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   Us      �          0    90274    other_charges 
   TABLE DATA           E   COPY public.other_charges (id, "invoiceId", name, value) FROM stdin;
    public          postgres    false    222   �u      �          0    90280    point_transactions 
   TABLE DATA           \   COPY public.point_transactions (id, "pointId", type, amount, note, "createdAt") FROM stdin;
    public          postgres    false    223   �u      �          0    90286    points 
   TABLE DATA           f   COPY public.points (id, "totalPoints", "createdAt", "updatedAt", "consumerId", "storeId") FROM stdin;
    public          postgres    false    224   �u      �          0    98306    product_assets 
   TABLE DATA           f   COPY public.product_assets (id, store_id, asset_id, product_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    239   �z      �          0    90291    product_groups 
   TABLE DATA           X   COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   �|      �          0    90296    product_unit_labels 
   TABLE DATA           a   COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   �|      �          0    90299    product_units 
   TABLE DATA           �   COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
    public          postgres    false    227   �|      �          0    90304    products 
   TABLE DATA           �  COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity, store_group_id, register_no, lot_no, product_id, expire_date, import_date) FROM stdin;
    public          postgres    false    228   �~      �          0    90312 	   providers 
   TABLE DATA           �   COPY public.providers ("companyName", "phoneNumber", email, "taxCode", address, city, district, wards, note, "storeId", "createdAt", "updatedAt", id) FROM stdin;
    public          postgres    false    229   ��      �          0    90318    roles 
   TABLE DATA           T   COPY public.roles (id, role_name, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   {�      �          0    98313    store_assets 
   TABLE DATA           X   COPY public.store_assets (id, store_id, asset_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   ��      �          0    90324    store_group 
   TABLE DATA           �   COPY public.store_group (id, store_id, group_name, created_at, updated_at, status, description, deleted_at, deleted_by, group_slug) FROM stdin;
    public          postgres    false    231   ��      �          0    91528    store_reward_point 
   TABLE DATA           �   COPY public.store_reward_point (id, store_id, convert_to, convert_rate, created_at, updated_at, status, description, deleted_at, deleted_by, point_value) FROM stdin;
    public          postgres    false    238   �      �          0    90333    stores 
   TABLE DATA           �   COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    232   ؏      �          0    91469    subscriptions 
   TABLE DATA           �   COPY public.subscriptions (id, branch_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt", plan_type) FROM stdin;
    public          postgres    false    234   ��      �          0    90341    users 
   TABLE DATA           �   COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233   �      _           2606    90351 *   _prisma_migrations _prisma_migrations_pkey 
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
       public            postgres    false    236            a           2606    90353     admin_to_user admin_to_user_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT admin_to_user_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT admin_to_user_pkey;
       public            postgres    false    210            c           2606    90355    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    211            e           2606    90357    assets assets_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
       public            postgres    false    212            g           2606    90359 "   branch_details branch_details_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_pkey;
       public            postgres    false    213            �           2606    106521 ,   branch_intergration branch_intergration_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.branch_intergration
    ADD CONSTRAINT branch_intergration_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.branch_intergration DROP CONSTRAINT branch_intergration_pkey;
       public            postgres    false    241            �           2606    106531 "   branch_payment branch_payment_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_payment DROP CONSTRAINT branch_payment_pkey;
       public            postgres    false    242            �           2606    91483    branch_plans branch_plans_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.branch_plans
    ADD CONSTRAINT branch_plans_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.branch_plans DROP CONSTRAINT branch_plans_pkey;
       public            postgres    false    235            k           2606    90361    branches branches_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);
 @   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pkey;
       public            postgres    false    214            m           2606    90363    clinics clinics_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_pkey;
       public            postgres    false    215            t           2606    90365    consumers consumers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_pkey;
       public            postgres    false    216            v           2606    90367    doctors doctors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    217            z           2606    90369    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    218            �           2606    106559 2   import_invoice_product import_invoice_product_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_pkey;
       public            postgres    false    244            �           2606    106553 $   import_invoices import_invoices_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_pkey;
       public            postgres    false    243            }           2606    90371     invoice_items invoice_items_pkey 
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
       public            postgres    false    233            �           1259    106532 !   branch_intergration_branch_id_idx    INDEX     f   CREATE INDEX branch_intergration_branch_id_idx ON public.branch_intergration USING btree (branch_id);
 5   DROP INDEX public.branch_intergration_branch_id_idx;
       public            postgres    false    241            �           1259    106533    branch_payment_branch_id_idx    INDEX     \   CREATE INDEX branch_payment_branch_id_idx ON public.branch_payment USING btree (branch_id);
 0   DROP INDEX public.branch_payment_branch_id_idx;
       public            postgres    false    242            h           1259    90398    branches_branch_name_idx    INDEX     T   CREATE INDEX branches_branch_name_idx ON public.branches USING btree (branch_name);
 ,   DROP INDEX public.branches_branch_name_idx;
       public            postgres    false    214            i           1259    90399    branches_owner_id_idx    INDEX     N   CREATE INDEX branches_owner_id_idx ON public.branches USING btree (owner_id);
 )   DROP INDEX public.branches_owner_id_idx;
       public            postgres    false    214            n           1259    90400    clinics_store_id_idx    INDEX     L   CREATE INDEX clinics_store_id_idx ON public.clinics USING btree (store_id);
 (   DROP INDEX public.clinics_store_id_idx;
       public            postgres    false    215            o           1259    91431    consumers_branch_id_idx    INDEX     R   CREATE INDEX consumers_branch_id_idx ON public.consumers USING btree (branch_id);
 +   DROP INDEX public.consumers_branch_id_idx;
       public            postgres    false    216            p           1259    91433    consumers_consumer_email_idx    INDEX     \   CREATE INDEX consumers_consumer_email_idx ON public.consumers USING btree (consumer_email);
 0   DROP INDEX public.consumers_consumer_email_idx;
       public            postgres    false    216            q           1259    91432    consumers_consumer_name_idx    INDEX     Z   CREATE INDEX consumers_consumer_name_idx ON public.consumers USING btree (consumer_name);
 /   DROP INDEX public.consumers_consumer_name_idx;
       public            postgres    false    216            r           1259    91434    consumers_phone_number_idx    INDEX     X   CREATE INDEX consumers_phone_number_idx ON public.consumers USING btree (phone_number);
 .   DROP INDEX public.consumers_phone_number_idx;
       public            postgres    false    216            w           1259    90401    doctors_store_id_idx    INDEX     L   CREATE INDEX doctors_store_id_idx ON public.doctors USING btree (store_id);
 (   DROP INDEX public.doctors_store_id_idx;
       public            postgres    false    217            x           1259    91436    groups_group_name_idx    INDEX     N   CREATE INDEX groups_group_name_idx ON public.groups USING btree (group_name);
 )   DROP INDEX public.groups_group_name_idx;
       public            postgres    false    218            {           1259    91435    groups_store_id_idx    INDEX     J   CREATE INDEX groups_store_id_idx ON public.groups USING btree (store_id);
 '   DROP INDEX public.groups_store_id_idx;
       public            postgres    false    218            �           1259    106562 )   import_invoice_product_import_invoice_idx    INDEX     v   CREATE INDEX import_invoice_product_import_invoice_idx ON public.import_invoice_product USING btree (import_invoice);
 =   DROP INDEX public.import_invoice_product_import_invoice_idx;
       public            postgres    false    244            �           1259    106563 %   import_invoice_product_product_id_idx    INDEX     n   CREATE INDEX import_invoice_product_product_id_idx ON public.import_invoice_product USING btree (product_id);
 9   DROP INDEX public.import_invoice_product_product_id_idx;
       public            postgres    false    244            �           1259    106561    import_invoices_provider_id_idx    INDEX     b   CREATE INDEX import_invoices_provider_id_idx ON public.import_invoices USING btree (provider_id);
 3   DROP INDEX public.import_invoices_provider_id_idx;
       public            postgres    false    243            �           1259    106560    import_invoices_store_id_idx    INDEX     \   CREATE INDEX import_invoices_store_id_idx ON public.import_invoices USING btree (store_id);
 0   DROP INDEX public.import_invoices_store_id_idx;
       public            postgres    false    243            ~           1259    90402    invoices_branchId_idx    INDEX     R   CREATE INDEX "invoices_branchId_idx" ON public.invoices USING btree ("branchId");
 +   DROP INDEX public."invoices_branchId_idx";
       public            postgres    false    220                       1259    90403    invoices_customerName_idx    INDEX     Z   CREATE INDEX "invoices_customerName_idx" ON public.invoices USING btree ("customerName");
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
       public            postgres    false    221            �           1259    91512    points_consumerId_idx    INDEX     R   CREATE INDEX "points_consumerId_idx" ON public.points USING btree ("consumerId");
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
       public          postgres    false    236    3427    211            �           2606    91518 0   admin_subsciption admin_subsciption_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_subsciption
    ADD CONSTRAINT admin_subsciption_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.admin_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.admin_subsciption DROP CONSTRAINT admin_subsciption_plan_id_fkey;
       public          postgres    false    236    237    3514            �           2606    90413 (   admin_to_user admin_to_user_adminId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_adminId_fkey";
       public          postgres    false    3427    211    210            �           2606    90418 '   admin_to_user admin_to_user_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_userId_fkey";
       public          postgres    false    233    210    3503            �           2606    90423    admins admins_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.admins DROP CONSTRAINT "admins_roleId_fkey";
       public          postgres    false    211    230    3491            �           2606    90428    assets assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_store_id_fkey;
       public          postgres    false    232    212    3498            �           2606    90433 ,   branch_details branch_details_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_branch_id_fkey;
       public          postgres    false    214    213    3435            �           2606    106534 6   branch_intergration branch_intergration_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_intergration
    ADD CONSTRAINT branch_intergration_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.branch_intergration DROP CONSTRAINT branch_intergration_branch_id_fkey;
       public          postgres    false    214    241    3435            �           2606    106539 ,   branch_payment branch_payment_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_payment
    ADD CONSTRAINT branch_payment_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_payment DROP CONSTRAINT branch_payment_branch_id_fkey;
       public          postgres    false    3435    242    214            �           2606    90438    branches branches_owner_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_owner_id_fkey;
       public          postgres    false    3503    233    214            �           2606    90443    clinics clinics_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_store_id_fkey;
       public          postgres    false    3498    232    215            �           2606    90448 "   consumers consumers_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_branch_id_fkey;
       public          postgres    false    216    214    3435            �           2606    90453    doctors doctors_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_store_id_fkey;
       public          postgres    false    232    217    3498            �           2606    90458    groups groups_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_store_id_fkey;
       public          postgres    false    232    3498    218            �           2606    106574 A   import_invoice_product import_invoice_product_import_invoice_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_import_invoice_fkey FOREIGN KEY (import_invoice) REFERENCES public.import_invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 k   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_import_invoice_fkey;
       public          postgres    false    244    243    3529            �           2606    106579 =   import_invoice_product import_invoice_product_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoice_product
    ADD CONSTRAINT import_invoice_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 g   ALTER TABLE ONLY public.import_invoice_product DROP CONSTRAINT import_invoice_product_product_id_fkey;
       public          postgres    false    244    3484    228            �           2606    106569 0   import_invoices import_invoices_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_provider_id_fkey;
       public          postgres    false    243    229    3489            �           2606    106564 -   import_invoices import_invoices_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.import_invoices
    ADD CONSTRAINT import_invoices_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public.import_invoices DROP CONSTRAINT import_invoices_store_id_fkey;
       public          postgres    false    232    3498    243            �           2606    90463 *   invoice_items invoice_items_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_invoiceId_fkey";
       public          postgres    false    219    3457    220            �           2606    91460 *   invoice_items invoice_items_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_productId_fkey";
       public          postgres    false    219    3484    228            �           2606    90473    invoices invoices_branchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_branchId_fkey";
       public          postgres    false    214    3435    220            �           2606    91455 !   invoices invoices_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_customerId_fkey";
       public          postgres    false    3444    216    220            �           2606    90483 &   memberships memberships_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_branch_id_fkey;
       public          postgres    false    3435    221    214            �           2606    90488 *   other_charges other_charges_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT "other_charges_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT "other_charges_invoiceId_fkey";
       public          postgres    false    3457    222    220            �           2606    90493 2   point_transactions point_transactions_pointId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT "point_transactions_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES public.points(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT "point_transactions_pointId_fkey";
       public          postgres    false    3472    223    224            �           2606    91523    points points_consumerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_consumerId_fkey";
       public          postgres    false    216    224    3444            �           2606    91546    points points_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_storeId_fkey";
       public          postgres    false    224    232    3498            �           2606    98325 +   product_assets product_assets_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_asset_id_fkey;
       public          postgres    false    3429    239    212            �           2606    98345 -   product_assets product_assets_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 W   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_product_id_fkey;
       public          postgres    false    239    228    3484            �           2606    98330 +   product_assets product_assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_assets
    ADD CONSTRAINT product_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.product_assets DROP CONSTRAINT product_assets_store_id_fkey;
       public          postgres    false    3498    239    232            �           2606    90503 +   product_groups product_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_group_id_fkey;
       public          postgres    false    218    3450    225            �           2606    90508 -   product_groups product_groups_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_product_id_fkey;
       public          postgres    false    228    225    3484            �           2606    90513 7   product_unit_labels product_unit_labels_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_id_fkey;
       public          postgres    false    228    226    3484            �           2606    90518 9   product_unit_labels product_unit_labels_product_unit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_unit_fkey;
       public          postgres    false    3478    226    227            �           2606    90523 )   product_units product_units_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);
 S   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_store_id_fkey;
       public          postgres    false    232    227    3498            �           2606    90528    products products_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_group_id_fkey;
       public          postgres    false    3450    218    228            �           2606    90533 "   products products_productUnit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_productUnit_fkey";
       public          postgres    false    227    228    3478            �           2606    91450 %   products products_store_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_group_id_fkey FOREIGN KEY (store_group_id) REFERENCES public.store_group(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_group_id_fkey;
       public          postgres    false    228    231    3494            �           2606    90543    products products_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_id_fkey;
       public          postgres    false    228    232    3498            �           2606    90548     providers providers_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.providers DROP CONSTRAINT "providers_storeId_fkey";
       public          postgres    false    229    3498    232            �           2606    98340 '   store_assets store_assets_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_asset_id_fkey;
       public          postgres    false    240    212    3429            �           2606    98335 '   store_assets store_assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_assets
    ADD CONSTRAINT store_assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.store_assets DROP CONSTRAINT store_assets_store_id_fkey;
       public          postgres    false    232    3498    240            �           2606    90553 %   store_group store_group_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_store_id_fkey;
       public          postgres    false    232    231    3498            �           2606    91541 3   store_reward_point store_reward_point_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_reward_point
    ADD CONSTRAINT store_reward_point_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public.store_reward_point DROP CONSTRAINT store_reward_point_store_id_fkey;
       public          postgres    false    238    232    3498            �           2606    90558    stores stores_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_branch_id_fkey;
       public          postgres    false    3435    232    214            �           2606    91486 *   subscriptions subscriptions_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_branch_id_fkey;
       public          postgres    false    234    214    3435            �           2606    91491 (   subscriptions subscriptions_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.branch_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_plan_id_fkey;
       public          postgres    false    235    3510    234            �   �  x���Mo�F��ί���F�|�H@4�n��j@��P� Y�j��A��^J��l`���>x�!��$-se�V���/t�� ,�0��2	��URF]�2I)�d���H���&	%���XkK���q%�ԅ��,����m�5�/�-^!��-j^�};��_��G�JK.�).|0�K�
�*4S�)��\U�Y5N����E�e��N"z���\�ДڠF�+����z����N����.��G��Z��3>}�N��+Z:Yjh�m�|c�4*�4FK�B;:�+yT:9�#�A;�Aa������t��4���)��^����E����8���D����z��PS���5$�%��J�+� �ɡP���� ���h�О�AB^�D��E)�D�	� K.������8��~�cݦz��ah#���}{7��=k��0�i`p8tO�_ܙE��abKW6Èl�!�qF�f6bp$o3��AHl?_�0�Ol7<�%F�C���ʷ9�cfmπ�!��Ŝ`� +���C���c�7��U�z��l�o����z�S�O�b��X�&�2h�'w�ն�����")�s�u���:�D��k�H����)/9����o����NO[/y֗� c�T�xn�=~Z>_in�u�i�t�p�}�9���g���
��P�g_ž=^�]�O��!�s���qG�O�w��Ӊz�����~�G7=^y�<��P�α���ᰉkRԵ��*��E��6�Ÿ\�#ə�~l�]�R7ܭ?��.3�x��~f�G�c�hjղ��y�N���0-��ל�e?�y�~]��>����L���ߑ���E�!���>��:����f��h�KvQ����*�=�)�SI�/����^��bG<
:Q���gm�Xr�7���G��x�/e�s)�ۧuYWI�Q�(��Y������_�Lp�      �      x������ � �      �      x������ � �      �   v   x�}��1�v�G���9_-���/!N�V�V�%\���6p�\#��۳t�T���D���Ɲ�ӹl:�-�#A��h�A�ӥa�su�j��=ʗ������j�_b�(*      �     x�}�KN�@���)��&���A���R�� 	 !u3i�v�LfHS�
��2\�%'�&$Q��˲�O�e�aN0�ב�a����ðI�[#[��x�D	3��YB���>JP\"�h�#^��7#����]:]\��x�1y���u:3�m<����~�3}�.d�*���_l�]i��R�F0hW�N��ۏk;�
�	 �@=8i¦dH�a�\��ϼ��x�+^�H�~�FWug��1R`���%�@�X���tx[i�k�ˎv��Q��ֽ�;���t-���ej*      �     x��Mo#7�Ϟ_�ڥM����{����
��/;�m��^:)
�,mg���L�%=zI�d�[#`�2��
d�SB̭/�)FbSkfWL�T��iԹ�zt/���c������}xܵ�zXO�뺱tW��Y�ך@��x��K���a{���=lw��c�m�7[i�?�T�o��ͽ,��_���~󫚌#���r����l��w�����W�u�6���lji�?h��f�U��_���Iy��o�_X�� �+�F��+f��/��XrA����bC�^���.S��O3u�L�Ǥ���(�Vr����+�y{8<���ݮ����0&L��q�wz\�_9|��S�P�!� ���D��`�!��0?=����g��T�F*T�c��6N��!�B��8�;=^�W蒞S�@��U{�j��$��u���s�ӓM+�X��B�ܲ�g��1����=����\��d2C���ĐE(^Bt��7��5�W���s��\�Ǌ�� �Un#z��Mk29�Jb��(����`Т���W4S�%
=Rx>��OO"��un���i��n�s�C9̄��ȦI����U_^�$�_!�� Zy��v�*3�X����
�ZX��z;]q]�'L�~͖�s����SҐ[��X[��Hu��xǩ�_�8z�(�3z�\�"RU�]�Y�'}4I4�E�0���)as�V����*e����C�5�է�Y�"�z� 6i]��!�tPk�M"��^z��lM��e���]G�	^�X��k�� {�
�h����>c��5��udj�7��u�qk�k��Z���4�r5}��!��
�WV!��N��B����j)61|��z_8k}H\[��������QNd/���K|��q��k蝸��A��J�z��,��Y=�D,����ы��4��Tu~W�A)����=aH��Isr�8i�+��WJ�*�9=g��1}+R�JO�^[��bb+�Lyvzz3]S5k����+zas�9�J���Isz���y��U�b^a��5����R��l      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���1�0E��ّ+�q��#;SW�$ME�"��ۓ"$6��f��?w)�a���3|b�a��=u
˪�[X�E��ǲ�5b��UHe�g5S��&
>��v�S��&3�DiǊ�� t�� 8�����o�4?��9]�)l���.�VT��R�}���	ղ�C��6M��\T      �      x������ � �      �      x��ZMo�Hz>ӿ��Y�U�b}�id˶Ɩl�$ۙ��b��M�M��CR�m9�2A�N�C�E	� Al�����<�n�j�,� X�!Yb�"��}���օH���X:Oc���MY�X]rW8�,�J�3�
3k|,r���i�"-�c.�"=o�o}�����㫤h���.W�O\������"�*����b�И2�U3J��:��ȑ�r2D�;_���qc?�K�E�i�蠵yQ�e�z1:rj��S.b�c��3Ag\$�1ᬿ��Cy�:���ǢT&�2��d^2ͤ)e~�r0>}zn?դ����럩ʶ(�sU����ݪ�]d�i���Ba�v���7��u(����~�]�¢G�!/���,Ji���qf3�El
�c��gNJnS��PM�1=KM�L�S��Cr�ťԩ��Kܯ+c���:E�xVyV�_��z�������?Lip֌'R���f{hjɲ�P��i,����}�5�VR��ae�$���+s}�����?��T�t&T�o�LY��=�\0K�<v�1�q��<KqQ�Ԗ9+��:&5�|���͜^�ݒ���g�|#I/l�ֶi�y1.*ǾX���V��H�J�u�I&��|w>�o�?z�&z�6��A{᧺e��,����&�d-�a��>\����(R��a�l�o`)�R򴫆�-�)��:���cO�膶#v>��U����%��r������ո$��|޵����I���y�X_���ź�EA�c3��U3/�>���n�-PT����b��ߐ^6iqJh6KS�pB�	(˸�=G���#�F���Km��<+�׿�Q:�����o��@�����u�.lf��b~'�ӌ%SQ_<����g0�;N'na�[ R��8��̄�	����N��W]5_q�m�6��u�9cu���q�����8cKV5 ��ƅ�%�c=����_U���@�����ڍ5�~�p��h��k�����AW��5b�������+�%��pPg���X:c@R&W��\��cc��EQ������y����\g̹���9���/�����w� ����o���wC���$�	M�d2zM��������0�5f�>���#�AGf|�Y{z����~�u�;[�m]��?ą��*O��E����r�{;oPf�~�~\���I���&:���mW���K[��O����M��W��,�q�h�[rN0�C��&�g>ӰJ(�0���hgb	���.#���	l'�沽��mK>���&9���u�St�0�� �$���x�͏_������*��� ����2�!oW��((,o��2ɫ�"�5Lyw�r�A��:���B�狖�WC��(���;K�0,�)A~i1��)�ltb�YY�� �l}�����
3KU���v�8K&ɂ�<�JВ*K
>U���Rƙs4c��2�I�2}5~��W�����ʍ�O���V�GP��s����Ϫ;Z~ҌI�\�E��W/��;�+�w�רh��P� $p�A����F6&I���|�bBAg� Ե)�qk���X�GPN���� ��/�.��xY�A8�ظ���%	3�|������F�]��L��xnq�؂����!���g:�'t�)�2>NX��Ržtư >�Ĕ�%5%^;{/|�b܀O>�|C^/���Я�H���.��F7�I1�?��/�z��Ge��� H�[��U �M
���S �D��Ϋ����yg�IՔm��`�,��<��A7z�{ |ҷ�8XbsPF���n3)���<C��s��v��'�@�O�,���x����r�1�Kv��:�"h"x:��R��J�����/["�R�9+\�����eF!no��Z��o3�^St>8�}0�wPP"�9�Ѹ>���>~9����~W�����S�ۄ�n�`�8�o�:�,S	�z7�A��k��̈́��(��A�j����Nmh{�A�;�)������]�u5�^T���X�g {U���j��7ޖc���1����j���%*۸���b�=�U,,�YS��9c�����iE�JO���Gr����Ӈh�v�k��ﰔf�L�L5Ͽο�_�_��AU�u�R,�~��t2!&d@�h�d��y������Co���DЋ~A���X��ʱ�5�?
�<^���/C����@9��~a/����ѭsm�A�L�B`����҃�oQ��g���@%,һ`
���8���H��ٽJ�E��N�>��7�~�褭�F�U�p� �L@������O���Z4ݵ(˘ʭك�`!u�8V8�z��H�n)�%�{n��B&�ho�$ aKr�޷Ų�&�?	��9�5E]��#�%�س��̇����B�����|[n�l��t�U������͞h�'e�hg�rgi�cQ:Q�e���Y�񼸧+����naa�~�����	5?��"�gU_??Y.=�r�C@��jih�G��iy�L���]��%_6.��F�d`ӌ͘L(巻��]�>w�|��.�m�V����v��^"iېӖ��~�B���֚"��%�h?Qh�nC���O4����D45���O��St��?]+V��8���o�V4/�a��}z_;���� 7��lD�f�����N�C�vQ�\G_Zq9�G:}�w!Qo�OR˂�8�4�n7��F6���k�s8#4��HP�� 1�i(��
`�`�W`�
&gķ��T6��]����P^#���C�~�ӆ��)��� h�����J��]�cT*����):�+s��LNTրl���[!Å28��Z����?���d�%��rg���qCT�8>pݙlxW����j�$&�m׵�>C�)z��YX�i;s�Y�^Ծ�{���]�^M;%0��a�u}nA�d��7��'����|ЅMR�ʾ[V͆��n
�-)�ˀ�U.�$���2	j4�J�k�fH��9,�#[�ɳ�=�7�m@/ #~F�2�L��,�q^I;�2���<��P�(�̵��f#�2�Ǆ����o��Mz��;l�*9;�"���dd�( 9M#v�b/��et��mo�i���`P7�mjn#���*��CÛm|{i���}g���1�ø���� 1L�&(|;Ѐ��v`��F�ړ� OmHw�z~MW4H2�K�L�o��YGܜ�O�,l����c���X�{.�.�96:S������	�p8~��[���o��f��7u�A�;�12��~����A��E�����y7�RT��anX�E	���E��שc�-[X�i��`�
�qkI��[Q�r��iY��.lX9�ݴ ��?,�v�KE��fc��y�Eσ�F;Ma��	��'��>�H�Y�ӽ�H���ވ�̩�S��ϡ�&��YaS�\��D&�Ri���nAư7���O�f3�����)�
4aw�
�RML�ƪ���/���a�[�;�`�=	�f_���zd;{#D�s����4v�#c���ܟYtGۮ��KX�
�/�ye !T�����0�k�}w�g��H~=���vh>jyr9��S^��!���>i�a~�	~�4���5@pSiVŘ)�ϩ�%��c��2:���C�4m�Q�������fB��5��J�I����Wk�J!(��ѿ �;ǐ��|	9�{,>E�i��jL���i�<T~�v�������<^�&גrjs����V�Ş%UX��]վC�c5�������v���Q: �!F K�	o���1��;�l�=�̴�K��Bچh�DM���01��΃��q�ƙ�e"c������45d���_���a�>��g��eo���TJҐ�<zğ��g'}�	�j��>�H�^*�]jД	c;ֻ*�bI�j���ޛu���O5Ф�e��Ci��5����L��.��^VKOj��R��2U��x��^p�}����Z���Á�~��z�����)�!�ݕ�I�A�:��(%�&�\:)a�:bS�2�Bg>��,���BI�}veo&�����^������>�Y� !  c�81*(�&*���}��{u��7l~�bJ�ᙙtA<h"�ƿa�,~Y]��bj��0R�ҏ�~F�#�@ :	K��˰����Dr���)�w�V���h������w������\ƃ����-L�_ߢ6M��τL��+5QJ�'J|�����ߎ!�s��\�,��	���=w�0�&<�{Vk�Rs�}����"��s�^��IYB;�3��%���p(��哞��%�J���6(�L�+�����"S�j3.W�l�5��ǩ��n�5��E��p̛io~M]	�l7��9��G��^���ؠH=�C]�7a<���`�6vjG�e�B��������Y��@Kp�7��`̹TY��{:]*�.��
�����
�NA<�j
F��W><*^�.W�,�԰4��}�j՟�7Q��m�=�S϶�C�Dr���%1��lSh����IݵkT�����dOݘ�d��P�E�A�$$|^�����$�d�r����2`F۴ �(
�@2Zwv������ov�(��G�7W�;
0�D����_%<�oZ'��      �      x������ � �      �   �  x��W=�E��~�D$�����vL��9������.��  ��	Y�$X�	�Bk�����;�8N;����jW�ҫ�W���P�!V,�d
P,�h.����N���@s��I'�Lt�-f���G�����<w'����E���G��ퟋn���Be��:�:z��2�c�u�������U���P7����sV{�ڦ�?��˓�ɰ�G��E�c�Y���i>fD!4F��5M�}��������;�y�m�8gP��u���j6�*K����=��%�-�͏�n�ly2R���Z�R��� r	hgb$k��8��հ���<&�;���KK���(���R�
٠2&،~�=�����NX�(�[�<�Qb�V���i��Z��J����E߿-���齋�9��t�AVQ:�X9]�YSMP��T�Y�6?����?c���<�>at��O�Ģ!���J���R���v���|���y�1��m@Ɋ�T-��)B	�([���1�Q�c��7g�W�V-!�P��j	X�
�y�����:Q�<t�W�q��O�Vy5s^�.��C�1�b�!qs`Qܲ���T���������uu{>�%U!t"�(&�	�l+G]R����aŋa�}�}�y��}��fzE�T��-�U��T�:X,I�'z��e�����=�33���0C�B���b+�l��MÉ���.�o��_�|*L��L5��*��dN�o�%�j��#��'�Í�wKq��\��}�y�Gw��f*��b�k�02�9�Ҙ����\��'z�[��ꯞ�Gl��yu(Q���!;L�7G�^<�T�^^X��:^�o_��b{1��!gV#9��]-��%x0Q���� HO�#g�}���F:���_��� v��$�"��#!6�KP��W�s#���>Y�y&��uD�g�ow����yp^-��bެP      �      x������ � �      �      x������ � �      �   �  x����n\E��맘8�̙3�J�E,a���P�9g�ī���xA.�R!�"P
D$�HH^Q�=�M8��H+�-���[��|�w�q�'r�j@�;(�"��cr�b�q���C����#dn�D�R���j����j�;�������~��g'���`O瓛��z�]��M��Ý����x��S��؁vt78G�&D˥UR�D�������������j�W׿]��>{b���S6�������yė���j������Ŝͣ��e7跜e÷�ﭖ?>ۂJ�ɶ
�[Y3d(%UH�8�	+�t�����3�`6.�ޛ�o~Q�s6�'���g�p��{���O)���;`����A@5���#��ù�	����Z]�0�63��ߞ]���Ssp������q��v�_-��p�l)B�N@:��바X\?������@w83G���g��`��Nք/.��l�|�0_���H��R�Mz׵ܨzǐk�dT���Qq��L��a-H�J��l�нƻk���ۀk�^�����8�2��H�*��yx�v|���aC�7<��Je;j
���\��[�|�Cu"a7��H�a��
UE���@ϕCB�	e��3�a��Za`k+p��G'Q2��Up���kk����x)M�*U�H%��j9��(˔sc�����T�|��^me
Ѽ�O,^��C��T@�Η�96\\�i�D�G�Jjkz��"ͱV��z�ԕ4T	6M��FYԗ$(�y��4
qY�{)��i�B&I��9I�$��Y6*Qp�#�q#w����n;�d��Ip)T�Y�Ю���\�倘UĻC��ݲ;�chv�/��/.}�6	5v�;"E5X0`�^˧G���^azG��,jzuʺuCq8k)��z���S��;a�Q��� �t��|y��Lڹ���Z�?"� ,�&� �F��t���sA'@{����
E���FIe�ID�쪢&I�R$�6�V���9��b(���񽝝� |��      �     x�����7�빧��B�H��2�� 	��ʍ�����!p�'I�*uZ~�pg�α�Avρ��Z����j�����K-K��X�B�t��.��:P��i���a-����	"�%1%Ŭf2�8�����������W�4��_Sx����7������.�9�uo.y+��)� �bK#�.���j�^к2aτf�,Bi��~���)�?�|�y^`X�)�gR��<Gڧ�^�#��GP5�l!������<�=�Y%�~̬��>>A��%��/��� �W6�+HR!�V�L�+j��R3��
�(̽�� ��jOf��`�ih+���2�Q4�	h��hFHK.%����:�V��ټ�z�C�)�Bv��~a���
0�p�>7��(Hqw��in�����L � �ux��S�7�T�s���=Gތ��k6��|�-9�R�c6	�\�*�Ϳ󱑮��Όs�}Li3~b��Q�W-.34����PQ�@�0�!�,�J��MߖW��޼��~w��o����v�ʘ�D�t3^"����-��	TS���R�G���X1��哜�xfA��|���|�8	�#rF$�~V���������������w���QV@��4��#.o��.МdF�_�͸JR�=m~.e�Ϸ\�hqh�):���;�e���ln<o<�%������o4�d��5Ƅ�b�Wן^O��:�������Q��}��@V�j�8��ć���������	�Aq3~in^�onn���I      �   L  x����o�0ǟ�_�o�c;	N��:�kױu)��Tir�ȏ�&�N����S�M�����{'���,S�R��ȋ�@<y��B��pje��PuO�E-�8�"A��J�i�"��s�%=�&��:�T__V�$J���Cm�g����Wt��������buw�U�\_q3@-dI_Ög�lQd	��z}��B�R0�v)s���y�l�]3�]�����Ar��'>�)sE���rnMRu�û��nT�0.���JiL�O�<��Rb� M�4T�����g4>��EW���h�~<���f���Д3��m�z>	Q�؂<ıG������dÂ˦'9��N����L ���T.o����}��k���_:���#ߤS�T�o�b�(�$�p5���%&(͵vB<�^��Ґ�
T��(\VPK��0q\�P�C��ȿ;[�k�y��(r��оYQ<jv,���X����ĳ2�N4�`OH��9+[2�-?������вȏ�'4������tn�.2��Z2����e��ݔ�Z��-u�FݲQGP�>jMl�������c�ہG����:�v����Y�      �      x������ � �      �      x������ � �      �   �  x��W˭$9<��b`��(�l#ւ���	����yy��,(C���L���M��!Mf�>���F�a?��?�� �����?�����s;�{�Is�.���:��m�lY!?����&�佊��4����G���o��-8�Fz���4��N�3[��%M��x#�s���8��s�ޠ��g�Iɞ�E�Ayg�Em=�YO�e}�GV��pԩv1�}��g����>4u�q��@�:XYt_����}C0e��v���IM1i�*͚������]떑YB%0���:ma3}}����:L��$ٶ"9����<~�C�)�J�bZ\�1��O ��G/TS	Τ]"@ bst|5U9n�}�r0�ђl�\�{A���ch�����	��Ij��xfo�1j�z9���6�����T
���0�o���
�]
'o��m;M0����B�6���.����y�:��@2_^�&�4p��h4U���<�M$m���� �&��']U���g˻���~�v�F^�+Z��Ap��s�����tnʝ�x�a�����/9�{�)B
CD2����|�8�������4db,�Y��!���8xP1��x?Mdq_�_���S6��E:�R�3@�;�~� ��(ho�L�kU��cڵǲ�E}��O��@��,����&�ȸ����aR��c��K�3�(��� )�kd���)ؒ���lc
Ё���#.ײ�녕��F*�Ie�Q@@�9{���`�����c���ŗ��m�����]���ɫ� -��M���6�c3��ZShG!���}�!�Q���L��s���
c �E�y*�vg��1�Z�yb,�X8�2'ۗ�Di,�/��l{^���l~�fC	qF��E����O&VB�ޕ�/���z� �FQB�O<S�.�a�}�f�C0�n��ϓ��y0�+y��7�]=�1��V��ؑ�t��|C�Wf���dL�IM�0���p]{98.�OC2�ϊ��FA�#kߍ=���	�Z&a'��Y���ڨ���{�C��9�B"�5y@yc�#��O�!	��gG� �1dAI�r�o7��(~6(���^��0?�oP�=��^`^�h��r�fO�c_G��}���rl�ؘ���Gn ��[�Q��Ǳ��_ �/^����������鞫�s0R)�yP�_�����8����_��JK�      �   �  x�����$1D��(�?���H����ч�?��x�;�C{����E/���ԭB]Ea���Q�iP�B�޲hЀ:k -�m�|ʏU96S �l�}�T�N�f4��ڏ�F.��_T/�K�l����G:6J)�zw݁P�^�	�"t�3�GȀ���g��؄[lY�S�E�Tl�QD��`V�3քᵃ�ꛢ���9���N%D�[p릩�Β��]�9_�c��՘�W6VԖ~֜�ػ��ن���9"&g��=�$�N��������_H�rJ���tp�]t��=�����+Y�qf��%#�(�ω�<���K���wN��b��tD#N;����Kb4��b�cs)w��,σA��,������*-�L�_��WI:+���%��5�$���R�1����ǌus�r�e�����4K�S?���[��)���>p�H��y�?�f      �      x������ � �      �      x������ � �      �   �  x��Ի�1��y���A>�w:63b��A��5�f�&�)m^!mJ��'�M2,.�$�"t�~��~�G'��g�F�R�cTI��2zL:2@g�L0	0�l�s<X��>p�la�~��˵�wM���D=#	��y) 	��az�̈�!�e�ŠVoBpւ����!&I�<��:�������\����C+�s.���٠z ��7��,}�*n�O����V��&��ڂw)g�P~�u�����t1o��F�b��V8��� �ъƑM���g+�Ǡ!���	���Y�������z�m��w���j�U�kT�١44W����"1��Y�襁��'��X���S� ��?@\�H�5[�*F�cJ���9�q�A/uIZ�:����𥼪f��M�w�:�O&��� y#�k2�Q��������~ʉ%o3'o�_G=�>}�XՊ�f=i�U�Y�k�u��ð��_|��      �   �
  x��YMo�>��[T#���o��F�-U���\fgfIV��J����(zć��@#(�H (*"聆��Iߙ]*q�Ԓ)Ֆ�����}�y�y�wV��WQ,�XHﱩJ�%�NW�B���%�:L��X���ƛ�i���ԧ��A��?������g�L�vc�UF*xU��!�xGh���=��<�o�q:uh/U�7�GhVO�Q�5�?��E�3"EF����n7�`$�)�����<��Kk-�8\�Jb.�Ё��L7������2L	"�����������u��oJ��.��M�xy��A�ŏh�P���1��ۋ���/��}8���]��<���ٓ:�~���M3�޻{ׇz3~�F�a��������������-���px���p8n�O�^A-C�fLfUa��p���Y|��"XY��
�Rb��Ķ�G&uY��9Ru�no��J���Px6������$�p��j���; +��`��%v�sly�m��y���ļx�����,�+,�F3���2�R�/�_ο��`y��9�?և�5��atG�}��#����!�����h6t�����������ѮP�AC�)��^
(-��<�T�_�|�?N���*�&����r��Հ�o N��������t�u.P�%��W��4��n8�>��� lˆ��l��T6�˖qɭ*���`�x삶�pcU��	�ɛ�ҵpL�
�2p��JBIH��J��ū�����>Ժ,����N��OV��D
�:�> W����mÝg�i���m������	�h�����i�o�#T��v��r�*��%ֱ��� n��hL�W�2��(=cM��i��G�"V��D��K���F�g�%c��՛ίXk~�����Ce*��BK`�WNn5W�����fF@;./'c�"Jk(��oX������r�̡���_ڊ���C,L�������>(���D^G�u�F�mX��,F](�V��Ѹ����A�d�(����	�)�N�ҩgt����<�-W��)�Wa�ŽX7Ø�-�K=f���mi[�B ��A�����8 |A<f���IжxM�����(M����8�`B5M8�?���y�����u�V�A���;`�i{ū'-�l�Oqn�L�
���.|�pL��FKo��LN7�[-�|��S��<���8?�@����l�R�I��4�͖�5h׍V�%��]�p��si2����b�U2'Rb ��l���@�B��-�,BZl$g ���2TkVƲPZ]Z5L� �)��9���@_�g�ҭV��Z���B��j���h����x�tAY�a�Q��b	�+��i]PH�F�D��������Ӵ\�c�@͋�$�$���3]Οz�mPd`� k�d�$�§��(�w�E��|�B���6�����Nn�A��D� }Ra��a�����Kk$�V�Ϻ^��9���
f�A� ]��:�S��=T���Or���,o�(�ܓw� #I��1�ʋ߬�x>Gh�J,�|2$b�3'��8��,�7�6�&�Zb:�"�=�7P��9N鴪x�
SW��a73����n����s�[ϊ���@'�le�TFq�wN�Of�I���Y#ٹ�<t3���3���I�����|��Z���M+��ɼ�ݤd!�iJ���r��m$�p:Buoq��¿aW!���ٸ�����?�5����E0�ZSB�JAB�$�13B�ǔ�h�Ѱ̛y�Ԅ�:�	i��`D�Le�|v������ �X�����Y|�����3�f���W�[���'9P�H)f��*��%���q���?JA�[_�6��dԞOi��/b���u����Fx1�u?���C�Hʥ�XBW�t��2�wUDK���5y��h:hmlC�� Y)?��w���h�v\3�h+{䃣�MlS7]z���b7�tp2�\�Zp�W�-W/��{ͩ�yS&l�B�M��g')hh'��&~���N�/�؛;���\W�&��x�����*��Ь�2�I�\�q��B�K%v��Z�Hy=��:��T��n��~E[�p�D.H-ؾ9i��~�{o6�LNC@/_NL�<���������w� ��@"�Via��?: ��A���䆰�œ�Uγe���`�V��.��WA�$����5�oQv-D9�K�PyL���
["5� E���A[R��v���F�=�������Y��[G�8<wM�۟7@b�o���n#����ĵK��Ј���IB�1��Z�AЭ����舩3Vu�#���"��.�^ź�4�sV�����\���!'뽹�VZ	l��T��6�/���o1�����J�ן�O<	�-/���dp��ْ�����������}�0��9xy�v��Ik��!pW�Ѿg[�G�4�i-a	R-/�LRU4Z0��M�7���.��9���0��@���/�Ф�/j�U06�]�P�8J�e�E���
�Tz9�-P�pЯ��Y�8`^(�]{w���r������y���;�7���s�n��~+����H	һlH!�O�bt�YWܶ_�?�{kb���C�g�,����D6P�T��=́_�����i��*�:�A����
�2�fFV�
|3WaǡG�$��⬴�s�e�mn}�y�Ν�N��?      �   �  x����n�0���S��*v���	���F �PA�$���Ħ�Ep�q�P��8�R+����!�}�	�J�B{��=�=�5�y���z���p�����z���	��-���y��.^��>�!�"'B�>����Ʒ������~���/Q�}ƙo?Uh���P��M^�)����
k�5��c�w%�Ԉ2$4W���Dji-#�4��5b!�2�$�ꀊ�FRȽ��22��D�q	��"�&��b���`�-椪��_i*)��G����B�A�,C@f����!���1J}��]w}g��-|s]c�vY���U�l�U���ݫǚ�a�+�6�jR���%3�ef��{�67��z
��W�����;r���MC�LR�|�z_��'�7W���CN� _���}���!���>�����KY�VqM��XQ�1Q��r�48A���K      �      x������ � �      �   �   x���1n1E�Sl1��YҀ���L�DE��'�ǧ�^�q�� �
<`Zۻ�ֈ�ؔT�(�@�lZ-�>i~��6��=���&4�^��Y�Ѱu@�g���%x"��O�f�z�6u���3`�\V��S�8�R���j�E3�i�'���D�X/n�xq����#�V��ޫ��N����p�J�7{��|�~@���hew��]�MH����6^$_��y��v�wm      �   ^  x��U�nA�o�bs�V�L��1	�:���J֝-a��8DD��#�'�q!�ܭ���vG-uWMWբ�}��m�@:*Ȟd��3����TV��b�*C�PA3DV�-/^ݿ_������_��x�Q(:����:2d_��WR���YZ�o�����j��n����g'�gL�s/\��;4&^x�\���"�\�dG�B����t��AdA���"��,NǛi�E÷i��4������RPG*.�� Q���29�	Df�����ä��Y�D�+��/��C�\�՘��(&f$U�"�l�!(�++�	q����l��կ����[+�i�~��;6�F��7���ډܱ� �`��P!�R���C��<c����3���r��~�����q�&4��J����[n�se�ۯ�x��U��������@@��F=`���Xf&�=�ѱIkWz�e�.���M5�eRtP]	����g��+92mϛ�\0���8[���@��@q�(Zq���e�um�g��\N�%p��Ts�U��{��N��[��Tk���0hgZ�v(��1�@�Z�˽k�sάs�$O j;�:�?����;w�      �   �   x����n1Eq�+�+���y-.^PP�$�Z�S͌��oF%ee��}WWh h�	$E�Oz�-�A�4v*YA*UH-)P����۫!<�8t� �b�J�r�z���J�M������x���8Ϗݎu���nj��o��yk)T]�.�~�)�2��uV��gs�,�@��rsa�PH0;�G�-p�,��O{`e      �     x��ϿN�0��y�۩#��%�)c��u�MPHx6&c%X�X�{�Mp"�:�H��O��X���:�9�Jhj,�T+V�%3\�K��W��my��yI��|�z��O���p2�˶�X��#Ȧ���0�BL*��ʦ�o�v�����p9EL��3k���=��Gz���֯���7�ғ�Ex�tɜQ̍�2ijSGq.Ƣ��d�Pqڟ!���>:>�E�m�I�� E�����y�B��߭_�ڷ=����gqE߉���      �      x������ � �      �   K  x�M�Mo�@��˯��e�/D8�륚*5���Y``��UH���ڤ�{x&�yg�8�"̑�y$<��ԛe3���g��U%.Fh0!|���|n�5�[.��U﫯m	��t�u�V��%��g����UD������$��a&k@���`΢�d4��j!,(�U&���maKMVHY�!����/���r�5T�	��q����
!�� x{(t1�Y3È<�6�;�R8��ǝPR���RU���y�����:��嫖���lF��+�{l?���o�W9���-z��1�q�4f(&!��Y���$��z�9@�q~���     