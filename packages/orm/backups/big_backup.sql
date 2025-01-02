PGDMP     	    0                 }            quan_ly_nha_thuoc %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) �    B           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            C           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            D           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            E           1262    16384    quan_ly_nha_thuoc    DATABASE     b   CREATE DATABASE quan_ly_nha_thuoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
 !   DROP DATABASE quan_ly_nha_thuoc;
                postgres    false            F           0    0    DATABASE quan_ly_nha_thuoc    ACL     3   GRANT ALL ON DATABASE quan_ly_nha_thuoc TO adc300;
                   postgres    false    3653            P           1247    90065    UserType    TYPE     H   CREATE TYPE public."UserType" AS ENUM (
    'user',
    'membership'
);
    DROP TYPE public."UserType";
       public          postgres    false            S           1247    90070    admin_permission    TYPE     �   CREATE TYPE public.admin_permission AS ENUM (
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
       public          postgres    false            V           1247    90092 
   admin_type    TYPE     J   CREATE TYPE public.admin_type AS ENUM (
    'super_admin',
    'admin'
);
    DROP TYPE public.admin_type;
       public          postgres    false            Y           1247    90098    all_permission    TYPE     �   CREATE TYPE public.all_permission AS ENUM (
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
       public          postgres    false            \           1247    90120    enum_branches_branch_status    TYPE     Y   CREATE TYPE public.enum_branches_branch_status AS ENUM (
    'active',
    'inactive'
);
 .   DROP TYPE public.enum_branches_branch_status;
       public          postgres    false            _           1247    90126    enum_branchs_branch_status    TYPE     X   CREATE TYPE public.enum_branchs_branch_status AS ENUM (
    'active',
    'inactive'
);
 -   DROP TYPE public.enum_branchs_branch_status;
       public          postgres    false            b           1247    90132    enum_consumers_gender    TYPE     \   CREATE TYPE public.enum_consumers_gender AS ENUM (
    'male',
    'female',
    'other'
);
 (   DROP TYPE public.enum_consumers_gender;
       public          postgres    false            e           1247    90138    enum_gender    TYPE     R   CREATE TYPE public.enum_gender AS ENUM (
    'male',
    'female',
    'other'
);
    DROP TYPE public.enum_gender;
       public          postgres    false            h           1247    90146     enum_memberships_employee_status    TYPE     ^   CREATE TYPE public.enum_memberships_employee_status AS ENUM (
    'active',
    'inactive'
);
 3   DROP TYPE public.enum_memberships_employee_status;
       public          postgres    false            k           1247    90152    enum_users_permission    TYPE     �   CREATE TYPE public.enum_users_permission AS ENUM (
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
       public         heap    postgres    false    869            �            1259    90194    assets    TABLE     O  CREATE TABLE public.assets (
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
       public         heap    postgres    false            �            1259    91476    branch_plans    TABLE     \  CREATE TABLE public.branch_plans (
    id uuid NOT NULL,
    plan_name character varying(255) NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL
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
    "updatedAt" timestamp(6) with time zone
);
    DROP TABLE public.branches;
       public         heap    postgres    false    860            �            1259    90215    clinics    TABLE       CREATE TABLE public.clinics (
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
       public         heap    postgres    false    866            �            1259    90239    doctors    TABLE     �  CREATE TABLE public.doctors (
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
       public         heap    postgres    false            �            1259    90260    invoices    TABLE     �  CREATE TABLE public.invoices (
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
    "customerId" uuid
);
    DROP TABLE public.invoices;
       public         heap    postgres    false    848            �            1259    90269    memberships    TABLE     �  CREATE TABLE public.memberships (
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
       public         heap    postgres    false    872            �            1259    90274    other_charges    TABLE     �   CREATE TABLE public.other_charges (
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
       public         heap    postgres    false            �            1259    90286    points    TABLE       CREATE TABLE public.points (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "totalPoints" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.points;
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
    "updatedAt" timestamp(3) without time zone NOT NULL
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
       public         heap    postgres    false            %          0    90176    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    209   ��       &          0    90183    admin_to_user 
   TABLE DATA           Z   COPY public.admin_to_user (id, "adminId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   ��       '          0    90187    admins 
   TABLE DATA           �   COPY public.admins (id, username, last_name, first_name, gender, password, email, phone_number, postal_code, address, avatar, notes, bio, is_active, last_login, reset_token, permission, "roleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   
�       (          0    90194    assets 
   TABLE DATA              COPY public.assets (id, store_id, path, name, description, url, type, meta_data, "from", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   2�       )          0    90204    branch_details 
   TABLE DATA           �   COPY public.branch_details (id, branch_id, so_dang_ky, ten_nha_thuoc, loai_hinh, tinh, huyen, dia_chi, nguoi_dai_dien, nguoi_chiu_trach_nhiem, nguoi_chiu_trach_nhiem_chuyen_mon, so_chung_chi_hanh_nghe, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   O�       ?          0    91476    branch_plans 
   TABLE DATA           m   COPY public.branch_plans (id, plan_name, price, duration, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    235   l�       *          0    90210    branches 
   TABLE DATA           �   COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   ��       +          0    90215    clinics 
   TABLE DATA           �   COPY public.clinics (id, store_id, clinic_name, address, phone, email, created_at, updated_at, status, description, deleted_at) FROM stdin;
    public          postgres    false    215   E�       ,          0    90223 	   consumers 
   TABLE DATA           �   COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   b�       -          0    90239    doctors 
   TABLE DATA           �   COPY public.doctors (id, store_id, doctor_name, specialization, phone, email, created_at, updated_at, status, deleted_at) FROM stdin;
    public          postgres    false    217   @       .          0    90247    groups 
   TABLE DATA              COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    218   ]       /          0    90255    invoice_items 
   TABLE DATA           x   COPY public.invoice_items (id, "invoiceId", "productName", quantity, price, total, unit, note, "productId") FROM stdin;
    public          postgres    false    219   +      0          0    90260    invoices 
   TABLE DATA           $  COPY public.invoices (id, "branchId", "saleDate", "saleTime", "customerName", "priceList", "isPrescriptionSale", "totalPrice", discount, "amountDue", "amountPaid", debit, notes, "autoPrintInvoice", "printBatchNumber", "userType", "userId", "createdAt", "updatedAt", "customerId") FROM stdin;
    public          postgres    false    220   I      1          0    90269    memberships 
   TABLE DATA           �   COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   +	      2          0    90274    other_charges 
   TABLE DATA           E   COPY public.other_charges (id, "invoiceId", name, value) FROM stdin;
    public          postgres    false    222   �      3          0    90280    point_transactions 
   TABLE DATA           \   COPY public.point_transactions (id, "pointId", type, amount, note, "createdAt") FROM stdin;
    public          postgres    false    223   �      4          0    90286    points 
   TABLE DATA           W   COPY public.points (id, "userId", "totalPoints", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   �      5          0    90291    product_groups 
   TABLE DATA           X   COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   �      6          0    90296    product_unit_labels 
   TABLE DATA           a   COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   �      7          0    90299    product_units 
   TABLE DATA           �   COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
    public          postgres    false    227         8          0    90304    products 
   TABLE DATA           �  COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity, store_group_id, register_no, lot_no, product_id, expire_date, import_date) FROM stdin;
    public          postgres    false    228          9          0    90312 	   providers 
   TABLE DATA           �   COPY public.providers ("companyName", "phoneNumber", email, "taxCode", address, city, district, wards, note, "storeId", "createdAt", "updatedAt", id) FROM stdin;
    public          postgres    false    229   �      :          0    90318    roles 
   TABLE DATA           T   COPY public.roles (id, role_name, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   �      ;          0    90324    store_group 
   TABLE DATA           �   COPY public.store_group (id, store_id, group_name, created_at, updated_at, status, description, deleted_at, deleted_by, group_slug) FROM stdin;
    public          postgres    false    231   �      <          0    90333    stores 
   TABLE DATA           �   COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    232   8      >          0    91469    subscriptions 
   TABLE DATA           w   COPY public.subscriptions (id, branch_id, plan_id, start_date, end_date, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   Z      =          0    90341    users 
   TABLE DATA           �   COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233   w      #           2606    90351 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    209            %           2606    90353     admin_to_user admin_to_user_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT admin_to_user_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT admin_to_user_pkey;
       public            postgres    false    210            '           2606    90355    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    211            )           2606    90357    assets assets_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
       public            postgres    false    212            +           2606    90359 "   branch_details branch_details_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_pkey;
       public            postgres    false    213            y           2606    91483    branch_plans branch_plans_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.branch_plans
    ADD CONSTRAINT branch_plans_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.branch_plans DROP CONSTRAINT branch_plans_pkey;
       public            postgres    false    235            /           2606    90361    branches branches_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);
 @   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pkey;
       public            postgres    false    214            1           2606    90363    clinics clinics_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_pkey;
       public            postgres    false    215            8           2606    90365    consumers consumers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_pkey;
       public            postgres    false    216            :           2606    90367    doctors doctors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    217            >           2606    90369    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    218            A           2606    90371     invoice_items invoice_items_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT invoice_items_pkey;
       public            postgres    false    219            E           2606    90373    invoices invoices_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.invoices DROP CONSTRAINT invoices_pkey;
       public            postgres    false    220            K           2606    90375    memberships memberships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_pkey;
       public            postgres    false    221            N           2606    90377     other_charges other_charges_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT other_charges_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT other_charges_pkey;
       public            postgres    false    222            P           2606    90379 *   point_transactions point_transactions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT point_transactions_pkey;
       public            postgres    false    223            R           2606    90381    points points_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.points DROP CONSTRAINT points_pkey;
       public            postgres    false    224            V           2606    90383 "   product_groups product_groups_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (product_id, group_id);
 L   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_pkey;
       public            postgres    false    225    225            Y           2606    90385     product_units product_units_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_pkey;
       public            postgres    false    227            _           2606    90387    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    228            d           2606    90389    providers providers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
       public            postgres    false    229            f           2606    90391    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    230            i           2606    90393    store_group store_group_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_pkey;
       public            postgres    false    231            m           2606    90395    stores stores_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
       public            postgres    false    232            v           2606    91475     subscriptions subscriptions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_pkey;
       public            postgres    false    234            r           2606    90397    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    233            ,           1259    90398    branches_branch_name_idx    INDEX     T   CREATE INDEX branches_branch_name_idx ON public.branches USING btree (branch_name);
 ,   DROP INDEX public.branches_branch_name_idx;
       public            postgres    false    214            -           1259    90399    branches_owner_id_idx    INDEX     N   CREATE INDEX branches_owner_id_idx ON public.branches USING btree (owner_id);
 )   DROP INDEX public.branches_owner_id_idx;
       public            postgres    false    214            2           1259    90400    clinics_store_id_idx    INDEX     L   CREATE INDEX clinics_store_id_idx ON public.clinics USING btree (store_id);
 (   DROP INDEX public.clinics_store_id_idx;
       public            postgres    false    215            3           1259    91431    consumers_branch_id_idx    INDEX     R   CREATE INDEX consumers_branch_id_idx ON public.consumers USING btree (branch_id);
 +   DROP INDEX public.consumers_branch_id_idx;
       public            postgres    false    216            4           1259    91433    consumers_consumer_email_idx    INDEX     \   CREATE INDEX consumers_consumer_email_idx ON public.consumers USING btree (consumer_email);
 0   DROP INDEX public.consumers_consumer_email_idx;
       public            postgres    false    216            5           1259    91432    consumers_consumer_name_idx    INDEX     Z   CREATE INDEX consumers_consumer_name_idx ON public.consumers USING btree (consumer_name);
 /   DROP INDEX public.consumers_consumer_name_idx;
       public            postgres    false    216            6           1259    91434    consumers_phone_number_idx    INDEX     X   CREATE INDEX consumers_phone_number_idx ON public.consumers USING btree (phone_number);
 .   DROP INDEX public.consumers_phone_number_idx;
       public            postgres    false    216            ;           1259    90401    doctors_store_id_idx    INDEX     L   CREATE INDEX doctors_store_id_idx ON public.doctors USING btree (store_id);
 (   DROP INDEX public.doctors_store_id_idx;
       public            postgres    false    217            <           1259    91436    groups_group_name_idx    INDEX     N   CREATE INDEX groups_group_name_idx ON public.groups USING btree (group_name);
 )   DROP INDEX public.groups_group_name_idx;
       public            postgres    false    218            ?           1259    91435    groups_store_id_idx    INDEX     J   CREATE INDEX groups_store_id_idx ON public.groups USING btree (store_id);
 '   DROP INDEX public.groups_store_id_idx;
       public            postgres    false    218            B           1259    90402    invoices_branchId_idx    INDEX     R   CREATE INDEX "invoices_branchId_idx" ON public.invoices USING btree ("branchId");
 +   DROP INDEX public."invoices_branchId_idx";
       public            postgres    false    220            C           1259    90403    invoices_customerName_idx    INDEX     Z   CREATE INDEX "invoices_customerName_idx" ON public.invoices USING btree ("customerName");
 /   DROP INDEX public."invoices_customerName_idx";
       public            postgres    false    220            F           1259    90404    invoices_saleDate_idx    INDEX     R   CREATE INDEX "invoices_saleDate_idx" ON public.invoices USING btree ("saleDate");
 +   DROP INDEX public."invoices_saleDate_idx";
       public            postgres    false    220            G           1259    91437    memberships_branch_id_idx    INDEX     V   CREATE INDEX memberships_branch_id_idx ON public.memberships USING btree (branch_id);
 -   DROP INDEX public.memberships_branch_id_idx;
       public            postgres    false    221            H           1259    91439    memberships_email_idx    INDEX     N   CREATE INDEX memberships_email_idx ON public.memberships USING btree (email);
 )   DROP INDEX public.memberships_email_idx;
       public            postgres    false    221            I           1259    91440    memberships_phone_number_idx    INDEX     \   CREATE INDEX memberships_phone_number_idx ON public.memberships USING btree (phone_number);
 0   DROP INDEX public.memberships_phone_number_idx;
       public            postgres    false    221            L           1259    91438    memberships_username_idx    INDEX     T   CREATE INDEX memberships_username_idx ON public.memberships USING btree (username);
 ,   DROP INDEX public.memberships_username_idx;
       public            postgres    false    221            S           1259    90405    points_userId_key    INDEX     Q   CREATE UNIQUE INDEX "points_userId_key" ON public.points USING btree ("userId");
 '   DROP INDEX public."points_userId_key";
       public            postgres    false    224            T           1259    91441    product_groups_group_id_idx    INDEX     Z   CREATE INDEX product_groups_group_id_idx ON public.product_groups USING btree (group_id);
 /   DROP INDEX public.product_groups_group_id_idx;
       public            postgres    false    225            W           1259    91443    product_units_name_idx    INDEX     P   CREATE INDEX product_units_name_idx ON public.product_units USING btree (name);
 *   DROP INDEX public.product_units_name_idx;
       public            postgres    false    227            Z           1259    91442    product_units_store_id_idx    INDEX     X   CREATE INDEX product_units_store_id_idx ON public.product_units USING btree (store_id);
 .   DROP INDEX public.product_units_store_id_idx;
       public            postgres    false    227            [           1259    91447    products_barcode_idx    INDEX     L   CREATE INDEX products_barcode_idx ON public.products USING btree (barcode);
 (   DROP INDEX public.products_barcode_idx;
       public            postgres    false    228            \           1259    91445    products_group_id_idx    INDEX     N   CREATE INDEX products_group_id_idx ON public.products USING btree (group_id);
 )   DROP INDEX public.products_group_id_idx;
       public            postgres    false    228            ]           1259    91449    products_medicine_id_idx    INDEX     T   CREATE INDEX products_medicine_id_idx ON public.products USING btree (medicine_id);
 ,   DROP INDEX public.products_medicine_id_idx;
       public            postgres    false    228            `           1259    91446    products_product_name_idx    INDEX     V   CREATE INDEX products_product_name_idx ON public.products USING btree (product_name);
 -   DROP INDEX public.products_product_name_idx;
       public            postgres    false    228            a           1259    91448    products_product_no_idx    INDEX     R   CREATE INDEX products_product_no_idx ON public.products USING btree (product_no);
 +   DROP INDEX public.products_product_no_idx;
       public            postgres    false    228            b           1259    91444    products_store_id_idx    INDEX     N   CREATE INDEX products_store_id_idx ON public.products USING btree (store_id);
 )   DROP INDEX public.products_store_id_idx;
       public            postgres    false    228            g           1259    90406    store_group_group_name_idx    INDEX     X   CREATE INDEX store_group_group_name_idx ON public.store_group USING btree (group_name);
 .   DROP INDEX public.store_group_group_name_idx;
       public            postgres    false    231            j           1259    90407    store_group_store_id_idx    INDEX     T   CREATE INDEX store_group_store_id_idx ON public.store_group USING btree (store_id);
 ,   DROP INDEX public.store_group_store_id_idx;
       public            postgres    false    231            k           1259    90408    stores_branch_id_idx    INDEX     L   CREATE INDEX stores_branch_id_idx ON public.stores USING btree (branch_id);
 (   DROP INDEX public.stores_branch_id_idx;
       public            postgres    false    232            n           1259    90409    stores_store_name_idx    INDEX     N   CREATE INDEX stores_store_name_idx ON public.stores USING btree (store_name);
 )   DROP INDEX public.stores_store_name_idx;
       public            postgres    false    232            t           1259    91484    subscriptions_branch_id_idx    INDEX     Z   CREATE INDEX subscriptions_branch_id_idx ON public.subscriptions USING btree (branch_id);
 /   DROP INDEX public.subscriptions_branch_id_idx;
       public            postgres    false    234            w           1259    91485    subscriptions_plan_id_idx    INDEX     V   CREATE INDEX subscriptions_plan_id_idx ON public.subscriptions USING btree (plan_id);
 -   DROP INDEX public.subscriptions_plan_id_idx;
       public            postgres    false    234            o           1259    90410    users_email_idx    INDEX     B   CREATE INDEX users_email_idx ON public.users USING btree (email);
 #   DROP INDEX public.users_email_idx;
       public            postgres    false    233            p           1259    90411    users_phone_number_idx    INDEX     P   CREATE INDEX users_phone_number_idx ON public.users USING btree (phone_number);
 *   DROP INDEX public.users_phone_number_idx;
       public            postgres    false    233            s           1259    90412    users_username_idx    INDEX     H   CREATE INDEX users_username_idx ON public.users USING btree (username);
 &   DROP INDEX public.users_username_idx;
       public            postgres    false    233            z           2606    90413 (   admin_to_user admin_to_user_adminId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_adminId_fkey";
       public          postgres    false    3367    210    211            {           2606    90418 '   admin_to_user admin_to_user_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_to_user
    ADD CONSTRAINT "admin_to_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.admin_to_user DROP CONSTRAINT "admin_to_user_userId_fkey";
       public          postgres    false    210    3442    233            |           2606    90423    admins admins_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.admins DROP CONSTRAINT "admins_roleId_fkey";
       public          postgres    false    230    211    3430            }           2606    90428    assets assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_store_id_fkey;
       public          postgres    false    3437    212    232            ~           2606    90433 ,   branch_details branch_details_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_branch_id_fkey;
       public          postgres    false    3375    213    214                       2606    90438    branches branches_owner_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_owner_id_fkey;
       public          postgres    false    3442    214    233            �           2606    90443    clinics clinics_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_store_id_fkey;
       public          postgres    false    3437    215    232            �           2606    90448 "   consumers consumers_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_branch_id_fkey;
       public          postgres    false    3375    216    214            �           2606    90453    doctors doctors_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_store_id_fkey;
       public          postgres    false    232    217    3437            �           2606    90458    groups groups_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_store_id_fkey;
       public          postgres    false    232    218    3437            �           2606    90463 *   invoice_items invoice_items_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_invoiceId_fkey";
       public          postgres    false    219    3397    220            �           2606    91460 *   invoice_items invoice_items_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_productId_fkey";
       public          postgres    false    219    3423    228            �           2606    90473    invoices invoices_branchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_branchId_fkey";
       public          postgres    false    214    220    3375            �           2606    91455 !   invoices invoices_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.consumers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_customerId_fkey";
       public          postgres    false    216    3384    220            �           2606    90483 &   memberships memberships_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_branch_id_fkey;
       public          postgres    false    3375    221    214            �           2606    90488 *   other_charges other_charges_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT "other_charges_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT "other_charges_invoiceId_fkey";
       public          postgres    false    3397    222    220            �           2606    90493 2   point_transactions point_transactions_pointId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT "point_transactions_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES public.points(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT "point_transactions_pointId_fkey";
       public          postgres    false    3410    223    224            �           2606    90498    points points_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_userId_fkey";
       public          postgres    false    3442    224    233            �           2606    90503 +   product_groups product_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_group_id_fkey;
       public          postgres    false    3390    225    218            �           2606    90508 -   product_groups product_groups_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_product_id_fkey;
       public          postgres    false    3423    225    228            �           2606    90513 7   product_unit_labels product_unit_labels_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_id_fkey;
       public          postgres    false    228    226    3423            �           2606    90518 9   product_unit_labels product_unit_labels_product_unit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_unit_fkey;
       public          postgres    false    226    3417    227            �           2606    90523 )   product_units product_units_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);
 S   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_store_id_fkey;
       public          postgres    false    232    227    3437            �           2606    90528    products products_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_group_id_fkey;
       public          postgres    false    3390    228    218            �           2606    90533 "   products products_productUnit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_productUnit_fkey";
       public          postgres    false    3417    228    227            �           2606    91450 %   products products_store_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_group_id_fkey FOREIGN KEY (store_group_id) REFERENCES public.store_group(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_group_id_fkey;
       public          postgres    false    3433    228    231            �           2606    90543    products products_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_id_fkey;
       public          postgres    false    3437    228    232            �           2606    90548     providers providers_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.providers DROP CONSTRAINT "providers_storeId_fkey";
       public          postgres    false    3437    229    232            �           2606    90553 %   store_group store_group_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_store_id_fkey;
       public          postgres    false    3437    231    232            �           2606    90558    stores stores_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_branch_id_fkey;
       public          postgres    false    3375    232    214            �           2606    91486 *   subscriptions subscriptions_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_branch_id_fkey;
       public          postgres    false    3375    214    234            �           2606    91491 (   subscriptions subscriptions_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.branch_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_plan_id_fkey;
       public          postgres    false    234    235    3449            %   �  x���Mo�F��ί���F�|�H@4�n��j@��P� Y�j��A��^J��l`���>x�!��$-se�V���/t�� ,�0��2	��URF]�2I)�d���H���&	%���XkK���q%�ԅ��,����m�5�/�-^!��-j^�};��_��G�JK.�).|0�K�
�*4S�)��\U�Y5N����E�e��N"z���\�ДڠF�+����z����N����.��G��Z��3>}�N��+Z:Yjh�m�|c�4*�4FK�B;:�+yT:9�#�A;�Aa������t��4���)��^����E����8���D����z��PS���5$�%��J�+� �ɡP���� ���h�О�AB^�D��E)�D�	� K.������8��~�cݦz��ah#���}{7��=k��0�i`p8tO�_ܙE��abKW6Èl�!�qF�f6bp$o3��AHl?_�0�Ol7<�%F�C���ʷ9�cfmπ�!��Ŝ`� +���C���c�7��U�z��l�o����z�S�O�b��X�&�2h�'w�ն�����")�s�u���:�D��k�H����)/9����o����NO[/y֗� c�T�xn�=~Z>_in�u�i�t�p�}�9���g���
��P�g_ž=^�]�O��!�s���qG�O�w��Ӊz�����~�G7=^y�<��P�α���ᰉkRԵ��*��E��6�Ÿ\�#ə�~l�]�R7ܭ?��.3�x��~f�G�c�hjղ��y�N���0-��ל�e?�y�~]��>����L���ߑ���E�!���>��:����f��h�KvQ����*�=�)�SI�/����^��bG<
:Q���gm�Xr�7���G��x�/e�s)�ۧuYWI�Q�(��Y������_�Lp�      &   v   x�}��1�v�G���9_-���/!N�V�V�%\���6p�\#��۳t�T���D���Ɲ�ӹl:�-�#A��h�A�ӥa�su�j��=ʗ������j�_b�(*      '     x�}�KN�@���)��&���A���R�� 	 !u3i�v�LfHS�
��2\�%'�&$Q��˲�O�e�aN0�ב�a����ðI�[#[��x�D	3��YB���>JP\"�h�#^��7#����]:]\��x�1y���u:3�m<����~�3}�.d�*���_l�]i��R�F0hW�N��ۏk;�
�	 �@=8i¦dH�a�\��ϼ��x�+^�H�~�FWug��1R`���%�@�X���tx[i�k�ˎv��Q��ֽ�;���t-���ej*      (      x������ � �      )      x������ � �      ?      x������ � �      *   �   x���1�0E��ّ+�q��#;SW�$ME�"��ۓ"$6��f��?w)�a���3|b�a��=u
˪�[X�E��ǲ�5b��UHe�g5S��&
>��v�S��&3�DiǊ�� t�� 8�����/���z��Na{��uɷ�������{W0L������i�'�k[Z      +      x������ � �      ,   �  x���Mk�0��+t/c4��OmJH�%����,��[v���B��+{���%�3HH��a�;���l"�!� Z�,S��Ed[$�	�t�-��	�S9$Ls�P,�rX��| ��[b_ʪ�zM�����4����:v��C ����+����������H�Ƒ:��wӰ��]�~ذ�!����v�f�O�c�RJ��m�h��M�GUҨ��(8	:� ޚɢG�m��a(��2���d:���	�#��W1 ��]���o�aZ�8ü�۞����3���;��M�&M�[�����%G��L4�IPw:K@	��2*�P<Gl�7*����]:�Ik��Б��)�w���*�B�u�����o����է���)�Y[��9FK�X4�s)�NY��ZC�&��K�p)�@S+aO����'���y&�hW��,�h�ͪۺ�������      -      x������ � �      .   �  x��W=�E��~�D$�����vL��9������.��  ��	Y�$X�	�Bk�����;�8N;����jW�ҫ�W���P�!V,�d
P,�h.����N���@s��I'�Lt�-f���G�����<w'����E���G��ퟋn���Be��:�:z��2�c�u�������U���P7����sV{�ڦ�?��˓�ɰ�G��E�c�Y���i>fD!4F��5M�}��������;�y�m�8gP��u���j6�*K����=��%�-�͏�n�ly2R���Z�R��� r	hgb$k��8��հ���<&�;���KK���(���R�
٠2&،~�=�����NX�(�[�<�Qb�V���i��Z��J����E߿-���齋�9��t�AVQ:�X9]�YSMP��T�Y�6?����?c���<�>at��O�Ģ!���J���R���v���|���y�1��m@Ɋ�T-��)B	�([���1�Q�c��7g�W�V-!�P��j	X�
�y�����:Q�<t�W�q��O�Vy5s^�.��C�1�b�!qs`Qܲ���T���������uu{>�%U!t"�(&�	�l+G]R����aŋa�}�}�y��}��fzE�T��-�U��T�:X,I�'z��e�����=�33���0C�B���b+�l��MÉ���.�o��_�|*L��L5��*��dN�o�%�j��#��'�Í�wKq��\��}�y�Gw��f*��b�k�02�9�Ҙ����\��'z�[��ꯞ�Gl��yu(Q���!;L�7G�^<�T�^^X��:^�o_��b{1��!gV#9��]-��%x0Q���� HO�#g�}���F:���_��� v��$�"��#!6�KP��W�s#���>Y�y&��uD�g�ow����yp^-��bެP      /     x���=o\E���_1�D�q�$��%l7^%i�|�ʻ�h���J�D�h@)�P"Q y�������wCA*��-f4��>��y�X
053 ;�L �.DS�m.5Xf�:d��� ���F�JĨ1��lھ%�����ZL7�Փ����\Y����h��޾����A��{4���0B�d@{��0�`�`���*
�\!�K�N6�����ӻw��Ǫf�ͯ�j���:��KR����ɼ�J=�u_�����\��_��9���+���yǷ_���/��%�[�t�gH�s����Xm����F����TOG^���ww?�����x�f�N��{�.�7DOd��̡Ѯ7�VLAk� B 6��%��0�/����,�:��fy��������r��>�����x�~����c�`;��!kߡ6WYc�b���8�n~٨���Q�m�_��Ku2m��{��ku8N�W�Ŵ�]��Bw4�c�R��Ad�x�P
u0-s�ܫ�y�J`��$'��JZ�N��%�\�K��.��Ƚl���c�J�ھR�>��V;��wTiǓ��T�\�l� hr��"Ct��脅��RD�� ��ZDNW3�T�'&�;��P�q�	�D�2i]�|�L	%�C�P�����]Z7��Y(��]�J�$�E-C:!�2��=31�h���@�`��@��VB�)�������2�RO����)�f��ie`})҇���H�f)�j-�Z��w%�(!�&�a/n�����-�8�ف3R�o��Q^ӂ��%�!cJ�9�T?E���=���      0   �  x�����1��ӧ���;��ȁB��$�P�E���qK�+���(�DF���w�r�S��@�dвX��*$�L������:P�
ڴ.iX�vڞb�!ڄ���Ƭf2�?����C9<ׯߟ_�iL���^pY�昞����S�!͈sԝ��5}���1[9rA��0�z�֕)�p'2�dJӻ~���l?��O' ��	yY�p�?2��<#�R^��c�y� Uy�Q��ГG�=�Q�>bI����X/�^�����N���� �VVu�H*�I���P���A�VXGa���b�]��^���@�3�.К���c�M0���#�%��F���6��L����Mq�~7��6d�x�',�����k��bH[���1 ���j*Kow�g	BY�����j�Ou�=�c�U��ݨX�f��ݒ(Uq��U�$��Ub6?�mݚ���w�Ҫ�$��f��'�J�      1   L  x����o�0ǟ�_�o�c;	N��:�kױu)��Tir�ȏ�&�N����S�M�����{'���,S�R��ȋ�@<y��B��pje��PuO�E-�8�"A��J�i�"��s�%=�&��:�T__V�$J���Cm�g����Wt��������buw�U�\_q3@-dI_Ög�lQd	��z}��B�R0�v)s���y�l�]3�]�����Ar��'>�)sE���rnMRu�û��nT�0.���JiL�O�<��Rb� M�4T�����g4>��EW���h�~<���f���Д3��m�z>	Q�؂<ıG������dÂ˦'9��N����L ���T.o����}��k���_:���#ߤS�T�o�b�(�$�p5���%&(͵vB<�^��Ґ�
T��(\VPK��0q\�P�C��ȿ;[�k�y��(r��оYQ<jv,���X����ĳ2�N4�`OH��9+[2�-?������вȏ�'4������tn�.2��Z2����e��ݔ�Z��-u�FݲQGP�>jMl�������c�ہG����:�v����Y�      2      x������ � �      3      x������ � �      4      x������ � �      5      x������ � �      6      x������ � �      7   �  x��Ի�1��y���A>�w:63b��A��5�f�&�)m^!mJ��'�M2,.�$�"t�~��~�G'��g�F�R�cTI��2zL:2@g�L0	0�l�s<X��>p�la�~��˵�wM���D=#	��y) 	��az�̈�!�e�ŠVoBpւ����!&I�<��:�������\����C+�s.���٠z ��7��,}�*n�O����V��&��ڂw)g�P~�u�����t1o��F�b��V8��� �ъƑM���g+�Ǡ!���	���Y�������z�m��w���j�U�kT�١44W����"1��Y�襁��'��X���S� ��?@\�H�5[�*F�cJ���9�q�A/uIZ�:����𥼪f��M�w�:�O&��� y#�k2�Q��������~ʉ%o3'o�_G=�>}�XՊ�f=i�U�Y�k�u��ð��_|��      8   �
  x��YMo�>��[T#���o��F�mU���\fgfIV� �J����(zć��@T#( H (*"聆��Iߙ]�q�Ԓ)ǖHqwg�~<���.��4�y,D�`�����WNn5��hI�Sg#%�����^YO}:]���#�z����z��͋�
c�"JkE���>!�8X-�sh�Z|��hu�����M��!b���������������W���h��(�0;x�u�T[!
Z�_->�7F���aJ�w��#Զ��wD��S�����ְZ|:Guu���c\�pz�|��]~U��o'�ޞ̋sgv\�K���ֳ~�Lfwn���ގ��d��xt{0r�8������f��hPc?����)����ӤWF�#ÄI�*l�s��ࢴ4� ���\+�PU�@J,x��V��Ȥ.��3G�ξ�]�,$9��	
�F�ޡ�3��nT�_>{K�L�(�^B����T�ƒP���K!�� �_�� �_O2���H��*������ZH����;x{����C�qZEߠ���y=��kt !�nу�����{;{��.�	"�q��$E�!�F(\Zka��KWI̅:�R��ڛ `��w�ԭ/� ��?��@4�:��3�A�����}8����{���m@h�e����sy=��q��c<[�-C1�� nX�
HT!P%�;CuB��Ny�-/��;o����N̳G��m�<ͤ',�F3���2cR{Ͽ_-����N\�#���l�)z�5q
(�q8���OG�C��MD�'`^X^�F�)PdAx)��^
�,��:�T��xΗ?N6��ڭ&��d�~[ ӯFh���h��g�Ok�%��W��,��n8�48���ۨ᪍�0E�eXr���2X�E0P.���ocUA�Ƚ,�f$�s�Y8|a��$$�c�bîX��λ�C����$d~�Z|��/%R��x�!�� ������h�<�o��o���_LEC�`Dtw��n�r��D�G`�P�pб�AH ظ�јJ�\e��a�Æ`k���Z�!�0��{����N��!J�Hɫ�ͮ�(����A�����8؋�x�*g��:��oM:)�M����2�
PIT��8���|7�����I���p����;H<�6G��僅��P��5�x`ZV���[��r�cjE4Zz��$e������g�;����A�-N�8��4W�ds"��@�j���њU�UX�[��q�L�A+G��Xs����$���`!���m�,�,BZl$g@h��2TkVƲ����jH� �#��9������uL����B���z8h�hP���{��W'�K��Z��
(�@*0�W��Ӯ���<�L.��P��fi������gI�IP��1[-�x��@� ٗ�����I'>u�-Xɻ�jW��+`��v`�	�=w��(�Mp&�
+�NH��k�N��F2o%��	x��)��(hJ����.;ߍ��A���$G{���FS�7 �r��$�K�*�}��H�1��U适�O�B���b���2��Ǜ�^kR�M
--AΞ�[���'oڎ�����B`�n9 f��#>���L����!�Y��i�P� E��V�a`Ae'<p���T&�����\ �y����� �;zgP5h�+,�c S?��^��V˟_�VD/�%cW巛��C�b���e�|Z���B8���<�qH�_��PW���|\�p�p�@X��_�Zʍ ��.�mH�$ 1��c�M4�h� ��tX�ƣcBcAaK��̞g珰ہ������	z����o�_�|���-�mVx7r��&)ɁwEjH0�UQ�E(	�V���am�G���ls��!�o[I}2j�'���!�9�r���Fx1��W���DR.����PE��! ��WDK��&K�Z���͕P$�-H����'�A�>�a4F\3�h'���ib&����.=W�v��僙���$fM;�Q_aص�d�&�5�
��M	����ߟ�$��O�:��q�����Φ7�t	�t	��4���x���j
<����K��dƓR9�c�o�8\*�+��9JG�끬-��NQ�#�і��פ��z�A�'��"a��Vi�������1���A�w��_��Wt���D~���Q��@"pVi`��@::�4�A���䆠֙�EUv��T��ȬLX��P%��I^��'`@k\�i@ٍ �(Y�"B���V*l��\���|omH}�v2�FJ���� =�͚�ޚ��\1u��n��6������k��-d��KhAb	`�*�1��Zá�[{s�#8��R'��4��I9L�\ē��jwim��j/#7�90ozhI6��G���Ty*��:--��PB���aB'a�e%Q����N?�g�C��ws�� ������A��Җi	\�� �'i?��z봆f��:�.�LRU4Z0��M=�ɶ���G��i6�Mo�����g3�d��Bx�Mf@V���a%��a�E7�k� J*=��V8����,f /��n�LΤ�r���Z��y��N�ӓ��$�CR7j����{��S��]�����t\�2W}V�Z|^�6�XkQ/[�,�&�Y>�kX�~l��"H74�v_@����4�na��a���������фU���C�*�8t����V��$��l���۷n��J-��      9   �  x����n�0���S��*v���	���F �PA�$���Ħ�Ep�q�P��8�R+����!�}�	�J�B{��=�=�5�y���z���p�����z���	��-���y��.^��>�!�"'B�>����Ʒ������~���/Q�}ƙo?Uh���P��M^�)����
k�5��c�w%�Ԉ2$4W���Dji-#�4��5b!�2�$�ꀊ�FRȽ��22��D�q	��"�&��b���`�-椪��_i*)��G����B�A�,C@f����!���1J}��]w}g��-|s]c�vY���U�l�U���ݫǚ�a�+�6�jR���%3�ef��{�67��z
��W�����;r���MC�LR�|�z_��'�7W���CN� _���}���!���>�����KY�VqM��XQ�1Q��r�48A���K      :      x������ � �      ;   ^  x��U�nA�o�bs�V�L��1	�:���J֝-a��8DD��#�'�q!�ܭ���vG-uWMWբ�}��m�@:*Ȟd��3����TV��b�*C�PA3DV�-/^ݿ_������_��x�Q(:����:2d_��WR���YZ�o�����j��n����g'�gL�s/\��;4&^x�\���"�\�dG�B����t��AdA���"��,NǛi�E÷i��4������RPG*.�� Q���29�	Df�����ä��Y�D�+��/��C�\�՘��(&f$U�"�l�!(�++�	q����l��կ����[+�i�~��;6�F��7���ډܱ� �`��P!�R���C��<c����3���r��~�����q�&4��J����[n�se�ۯ�x��U��������@@��F=`���Xf&�=�ѱIkWz�e�.���M5�eRtP]	����g��+92mϛ�\0���8[���@��@q�(Zq���e�um�g��\N�%p��Ts�U��{��N��[��Tk���0hgZ�v(��1�@�Z�˽k�sάs�$O j;�:�?����;w�      <     x��ϿN�0��y�۩#��%�)c��u�MPHx6&c%X�X�{�Mp"�:�H��O��X���:�9�Jhj,�T+V�%3\�K��W��my��yI��|�z��O���p2�˶�X��#Ȧ���0�BL*��ʦ�o�v�����p9EL��3k���=��Gz���֯���7�ғ�Ex�tɜQ̍�2ijSGq.Ƣ��d�Pqڟ!���>:>�E�m�I�� E�����y�B��߭_�ڷ=����gqE߉���      >      x������ � �      =   K  x�M��o�0�����m��k���L3u&;�,�� ��
ٲ�}�.Y�~//�{��aJ<����$�HRv�Hzբԅ��Ҡ#��sc֤��|�k��x_|�#L�?�e۶k�_�l����'���&/'v���I��D����`N���`�[k��(�Vױ�7M�V'�RE�'�L5V�yy�Wa���:��,���{�s�B�,����\b��?��W�{k��xZ����n/Zy���R�y�W�.ʃ4u��A�U*��jP�KmUy������v:V�xfd�?�4��H��8�$�!���, .a1b�p Ag9{�8�/����     