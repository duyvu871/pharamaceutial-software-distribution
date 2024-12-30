PGDMP                         |            quan_ly_nha_thuoc %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) x    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    quan_ly_nha_thuoc    DATABASE     b   CREATE DATABASE quan_ly_nha_thuoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
 !   DROP DATABASE quan_ly_nha_thuoc;
                postgres    false            �           0    0    DATABASE quan_ly_nha_thuoc    ACL     3   GRANT ALL ON DATABASE quan_ly_nha_thuoc TO adc300;
                   postgres    false    3576            L           1247    70479    UserType    TYPE     H   CREATE TYPE public."UserType" AS ENUM (
    'user',
    'membership'
);
    DROP TYPE public."UserType";
       public          postgres    false            O           1247    70484    enum_branches_branch_status    TYPE     Y   CREATE TYPE public.enum_branches_branch_status AS ENUM (
    'active',
    'inactive'
);
 .   DROP TYPE public.enum_branches_branch_status;
       public          postgres    false            R           1247    70490    enum_branchs_branch_status    TYPE     X   CREATE TYPE public.enum_branchs_branch_status AS ENUM (
    'active',
    'inactive'
);
 -   DROP TYPE public.enum_branchs_branch_status;
       public          postgres    false            U           1247    70496    enum_consumers_gender    TYPE     O   CREATE TYPE public.enum_consumers_gender AS ENUM (
    'male',
    'female'
);
 (   DROP TYPE public.enum_consumers_gender;
       public          postgres    false            X           1247    70502     enum_memberships_employee_status    TYPE     ^   CREATE TYPE public.enum_memberships_employee_status AS ENUM (
    'active',
    'inactive'
);
 3   DROP TYPE public.enum_memberships_employee_status;
       public          postgres    false            [           1247    70508    enum_users_permission    TYPE     �   CREATE TYPE public.enum_users_permission AS ENUM (
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
       public          postgres    false            �            1259    70529    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    70532    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
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
       public         heap    postgres    false            �            1259    70539    assets    TABLE     O  CREATE TABLE public.assets (
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
       public         heap    postgres    false            �            1259    70549    branch_details    TABLE     0  CREATE TABLE public.branch_details (
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
       public         heap    postgres    false            �            1259    70555    branches    TABLE     �  CREATE TABLE public.branches (
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
       public         heap    postgres    false    847            �            1259    70560    clinics    TABLE       CREATE TABLE public.clinics (
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
       public         heap    postgres    false            �            1259    70568 	   consumers    TABLE       CREATE TABLE public.consumers (
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
       public         heap    postgres    false    853            �            1259    70584    doctors    TABLE     �  CREATE TABLE public.doctors (
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
       public         heap    postgres    false            �            1259    70592    groups    TABLE     �  CREATE TABLE public.groups (
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
       public         heap    postgres    false            �            1259    70600    invoice_items    TABLE       CREATE TABLE public.invoice_items (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    "productName" text NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL,
    total double precision NOT NULL,
    unit text NOT NULL,
    note text
);
 !   DROP TABLE public.invoice_items;
       public         heap    postgres    false            �            1259    70605    invoices    TABLE     �  CREATE TABLE public.invoices (
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
       public         heap    postgres    false    844            �            1259    70614    memberships    TABLE     �  CREATE TABLE public.memberships (
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
       public         heap    postgres    false    856            �            1259    70619    other_charges    TABLE     �   CREATE TABLE public.other_charges (
    id uuid NOT NULL,
    "invoiceId" uuid NOT NULL,
    name text NOT NULL,
    value double precision DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.other_charges;
       public         heap    postgres    false            �            1259    70625    point_transactions    TABLE       CREATE TABLE public.point_transactions (
    id uuid NOT NULL,
    "pointId" uuid NOT NULL,
    type character varying(255) NOT NULL,
    amount integer NOT NULL,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public.point_transactions;
       public         heap    postgres    false            �            1259    70631    points    TABLE       CREATE TABLE public.points (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "totalPoints" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.points;
       public         heap    postgres    false            �            1259    70636    product_groups    TABLE     E  CREATE TABLE public.product_groups (
    product_id uuid NOT NULL,
    group_id uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.726+07'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.727+07'::timestamp with time zone NOT NULL
);
 "   DROP TABLE public.product_groups;
       public         heap    postgres    false            �            1259    70641    product_unit_labels    TABLE     �   CREATE TABLE public.product_unit_labels (
    product_id uuid NOT NULL,
    product_unit uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public.product_unit_labels;
       public         heap    postgres    false            �            1259    70644    product_units    TABLE     �  CREATE TABLE public.product_units (
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
       public         heap    postgres    false            �            1259    70649    products    TABLE     �  CREATE TABLE public.products (
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
    store_group_id uuid
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    70657 	   providers    TABLE     �  CREATE TABLE public.providers (
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
       public         heap    postgres    false            �            1259    70663    store_group    TABLE     �  CREATE TABLE public.store_group (
    id uuid NOT NULL,
    store_id uuid NOT NULL,
    group_name character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description character varying(255),
    deleted_at timestamp(6) with time zone,
    deleted_by uuid
);
    DROP TABLE public.store_group;
       public         heap    postgres    false            �            1259    70671    stores    TABLE     !  CREATE TABLE public.stores (
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
       public         heap    postgres    false            �            1259    70679    users    TABLE     �  CREATE TABLE public.users (
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
       public         heap    postgres    false            �          0    70529    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    209   ܹ       �          0    70532    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    210   ��       �          0    70539    assets 
   TABLE DATA              COPY public.assets (id, store_id, path, name, description, url, type, meta_data, "from", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   O�       �          0    70549    branch_details 
   TABLE DATA           �   COPY public.branch_details (id, branch_id, so_dang_ky, ten_nha_thuoc, loai_hinh, tinh, huyen, dia_chi, nguoi_dai_dien, nguoi_chiu_trach_nhiem, nguoi_chiu_trach_nhiem_chuyen_mon, so_chung_chi_hanh_nghe, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   l�       �          0    70555    branches 
   TABLE DATA           �   COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   ��       �          0    70560    clinics 
   TABLE DATA           �   COPY public.clinics (id, store_id, clinic_name, address, phone, email, created_at, updated_at, status, description, deleted_at) FROM stdin;
    public          postgres    false    214   E�       �          0    70568 	   consumers 
   TABLE DATA           �   COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   b�       �          0    70584    doctors 
   TABLE DATA           �   COPY public.doctors (id, store_id, doctor_name, specialization, phone, email, created_at, updated_at, status, deleted_at) FROM stdin;
    public          postgres    false    216   @�       �          0    70592    groups 
   TABLE DATA              COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    217   ]�       �          0    70600    invoice_items 
   TABLE DATA           k   COPY public.invoice_items (id, "invoiceId", "productName", quantity, price, total, unit, note) FROM stdin;
    public          postgres    false    218   +�       �          0    70605    invoices 
   TABLE DATA           $  COPY public.invoices (id, "branchId", "saleDate", "saleTime", "customerName", "priceList", "isPrescriptionSale", "totalPrice", discount, "amountDue", "amountPaid", debit, notes, "autoPrintInvoice", "printBatchNumber", "userType", "userId", "createdAt", "updatedAt", "customerId") FROM stdin;
    public          postgres    false    219   ��       �          0    70614    memberships 
   TABLE DATA           �   COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �       �          0    70619    other_charges 
   TABLE DATA           E   COPY public.other_charges (id, "invoiceId", name, value) FROM stdin;
    public          postgres    false    221   ]�       �          0    70625    point_transactions 
   TABLE DATA           \   COPY public.point_transactions (id, "pointId", type, amount, note, "createdAt") FROM stdin;
    public          postgres    false    222   z�       �          0    70631    points 
   TABLE DATA           W   COPY public.points (id, "userId", "totalPoints", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   ��       �          0    70636    product_groups 
   TABLE DATA           X   COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   ��       �          0    70641    product_unit_labels 
   TABLE DATA           a   COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   ��       �          0    70644    product_units 
   TABLE DATA           �   COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
    public          postgres    false    226   ��       �          0    70649    products 
   TABLE DATA           �  COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity, store_group_id) FROM stdin;
    public          postgres    false    227   ��       �          0    70657 	   providers 
   TABLE DATA           �   COPY public.providers ("companyName", "phoneNumber", email, "taxCode", address, city, district, wards, note, "storeId", "createdAt", "updatedAt", id) FROM stdin;
    public          postgres    false    228   W�       �          0    70663    store_group 
   TABLE DATA           �   COPY public.store_group (id, store_id, group_name, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    229   3�       �          0    70671    stores 
   TABLE DATA           �   COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    230   l�       �          0    70679    users 
   TABLE DATA           �   COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    231   ��       �           2606    70687     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    209            �           2606    70689 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    210                       2606    70691    assets assets_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
       public            postgres    false    211                       2606    70693 "   branch_details branch_details_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_pkey;
       public            postgres    false    212                       2606    70695    branches branches_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);
 @   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pkey;
       public            postgres    false    213            	           2606    70697    clinics clinics_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_pkey;
       public            postgres    false    214                       2606    70699    consumers consumers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_pkey;
       public            postgres    false    215                       2606    70701    doctors doctors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    216                       2606    70703    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    217                       2606    70705     invoice_items invoice_items_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT invoice_items_pkey;
       public            postgres    false    218                       2606    70707    invoices invoices_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.invoices DROP CONSTRAINT invoices_pkey;
       public            postgres    false    219                       2606    70709    memberships memberships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_pkey;
       public            postgres    false    220                       2606    70711     other_charges other_charges_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT other_charges_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT other_charges_pkey;
       public            postgres    false    221                       2606    70713 *   point_transactions point_transactions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT point_transactions_pkey;
       public            postgres    false    222                        2606    70715    points points_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.points DROP CONSTRAINT points_pkey;
       public            postgres    false    223            #           2606    70717 "   product_groups product_groups_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (product_id, group_id);
 L   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_pkey;
       public            postgres    false    224    224            %           2606    70719     product_units product_units_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_pkey;
       public            postgres    false    226            '           2606    70721    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    227            )           2606    70723    providers providers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
       public            postgres    false    228            ,           2606    70725    store_group store_group_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_pkey;
       public            postgres    false    229            0           2606    70727    stores stores_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
       public            postgres    false    230            5           2606    70729    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    231                       1259    70730    branches_branch_name_idx    INDEX     T   CREATE INDEX branches_branch_name_idx ON public.branches USING btree (branch_name);
 ,   DROP INDEX public.branches_branch_name_idx;
       public            postgres    false    213                       1259    70731    branches_owner_id_idx    INDEX     N   CREATE INDEX branches_owner_id_idx ON public.branches USING btree (owner_id);
 )   DROP INDEX public.branches_owner_id_idx;
       public            postgres    false    213            
           1259    70732    clinics_store_id_idx    INDEX     L   CREATE INDEX clinics_store_id_idx ON public.clinics USING btree (store_id);
 (   DROP INDEX public.clinics_store_id_idx;
       public            postgres    false    214                       1259    70733    doctors_store_id_idx    INDEX     L   CREATE INDEX doctors_store_id_idx ON public.doctors USING btree (store_id);
 (   DROP INDEX public.doctors_store_id_idx;
       public            postgres    false    216                       1259    70734    invoices_branchId_idx    INDEX     R   CREATE INDEX "invoices_branchId_idx" ON public.invoices USING btree ("branchId");
 +   DROP INDEX public."invoices_branchId_idx";
       public            postgres    false    219                       1259    70735    invoices_customerName_idx    INDEX     Z   CREATE INDEX "invoices_customerName_idx" ON public.invoices USING btree ("customerName");
 /   DROP INDEX public."invoices_customerName_idx";
       public            postgres    false    219                       1259    70736    invoices_saleDate_idx    INDEX     R   CREATE INDEX "invoices_saleDate_idx" ON public.invoices USING btree ("saleDate");
 +   DROP INDEX public."invoices_saleDate_idx";
       public            postgres    false    219            !           1259    70737    points_userId_key    INDEX     Q   CREATE UNIQUE INDEX "points_userId_key" ON public.points USING btree ("userId");
 '   DROP INDEX public."points_userId_key";
       public            postgres    false    223            *           1259    70738    store_group_group_name_idx    INDEX     X   CREATE INDEX store_group_group_name_idx ON public.store_group USING btree (group_name);
 .   DROP INDEX public.store_group_group_name_idx;
       public            postgres    false    229            -           1259    70739    store_group_store_id_idx    INDEX     T   CREATE INDEX store_group_store_id_idx ON public.store_group USING btree (store_id);
 ,   DROP INDEX public.store_group_store_id_idx;
       public            postgres    false    229            .           1259    70740    stores_branch_id_idx    INDEX     L   CREATE INDEX stores_branch_id_idx ON public.stores USING btree (branch_id);
 (   DROP INDEX public.stores_branch_id_idx;
       public            postgres    false    230            1           1259    70741    stores_store_name_idx    INDEX     N   CREATE INDEX stores_store_name_idx ON public.stores USING btree (store_name);
 )   DROP INDEX public.stores_store_name_idx;
       public            postgres    false    230            2           1259    70742    users_email_idx    INDEX     B   CREATE INDEX users_email_idx ON public.users USING btree (email);
 #   DROP INDEX public.users_email_idx;
       public            postgres    false    231            3           1259    70743    users_phone_number_idx    INDEX     P   CREATE INDEX users_phone_number_idx ON public.users USING btree (phone_number);
 *   DROP INDEX public.users_phone_number_idx;
       public            postgres    false    231            6           1259    70744    users_username_idx    INDEX     H   CREATE INDEX users_username_idx ON public.users USING btree (username);
 &   DROP INDEX public.users_username_idx;
       public            postgres    false    231            7           2606    70745    assets assets_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_store_id_fkey;
       public          postgres    false    211    3376    230            8           2606    70750 ,   branch_details branch_details_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_details
    ADD CONSTRAINT branch_details_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.branch_details DROP CONSTRAINT branch_details_branch_id_fkey;
       public          postgres    false    212    213    3335            9           2606    70755    branches branches_owner_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_owner_id_fkey;
       public          postgres    false    3381    231    213            :           2606    70760    clinics clinics_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.clinics DROP CONSTRAINT clinics_store_id_fkey;
       public          postgres    false    214    230    3376            ;           2606    70765 "   consumers consumers_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_branch_id_fkey;
       public          postgres    false    3335    213    215            <           2606    70770    doctors doctors_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_store_id_fkey;
       public          postgres    false    216    230    3376            =           2606    70775    groups groups_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_store_id_fkey;
       public          postgres    false    3376    230    217            >           2606    70780 *   invoice_items invoice_items_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.invoice_items DROP CONSTRAINT "invoice_items_invoiceId_fkey";
       public          postgres    false    3351    218    219            @           2606    70785    invoices invoices_branchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_branchId_fkey";
       public          postgres    false    219    3335    213            ?           2606    70871 !   invoices invoices_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.consumers(id);
 M   ALTER TABLE ONLY public.invoices DROP CONSTRAINT "invoices_customerId_fkey";
       public          postgres    false    3340    215    219            A           2606    70790 &   memberships memberships_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_branch_id_fkey;
       public          postgres    false    213    3335    220            B           2606    70795 *   other_charges other_charges_invoiceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.other_charges
    ADD CONSTRAINT "other_charges_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.other_charges DROP CONSTRAINT "other_charges_invoiceId_fkey";
       public          postgres    false    221    219    3351            C           2606    70800 2   point_transactions point_transactions_pointId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT "point_transactions_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES public.points(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.point_transactions DROP CONSTRAINT "point_transactions_pointId_fkey";
       public          postgres    false    223    222    3360            D           2606    70805    points points_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.points
    ADD CONSTRAINT "points_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.points DROP CONSTRAINT "points_userId_fkey";
       public          postgres    false    3381    231    223            E           2606    70810 +   product_groups product_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_group_id_fkey;
       public          postgres    false    217    3345    224            F           2606    70815 -   product_groups product_groups_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_product_id_fkey;
       public          postgres    false    224    3367    227            H           2606    70820 7   product_unit_labels product_unit_labels_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_id_fkey;
       public          postgres    false    227    3367    225            G           2606    70825 9   product_unit_labels product_unit_labels_product_unit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_unit_fkey;
       public          postgres    false    226    3365    225            I           2606    70830 )   product_units product_units_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);
 S   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_store_id_fkey;
       public          postgres    false    230    3376    226            J           2606    70835    products products_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_group_id_fkey;
       public          postgres    false    3345    227    217            K           2606    70840 "   products products_productUnit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_productUnit_fkey";
       public          postgres    false    3365    226    227            L           2606    70845 %   products products_store_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_group_id_fkey FOREIGN KEY (store_group_id) REFERENCES public.store_group(id);
 O   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_group_id_fkey;
       public          postgres    false    227    3372    229            M           2606    70850    products products_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_id_fkey;
       public          postgres    false    3376    227    230            N           2606    70855     providers providers_storeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.providers DROP CONSTRAINT "providers_storeId_fkey";
       public          postgres    false    3376    230    228            O           2606    70860 %   store_group store_group_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.store_group
    ADD CONSTRAINT store_group_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.store_group DROP CONSTRAINT store_group_store_id_fkey;
       public          postgres    false    230    229    3376            P           2606    70865    stores stores_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_branch_id_fkey;
       public          postgres    false    213    230    3335            �   �   x�m�M� �=w���w�b3:12ןh�q�]�}}E@���p#�M$s$�>Q���V�@I��������u_r֘����5���@�y��5(}��S���+�@]ԛC�*h��8��%��9=bh��ዻ�?�{���8.��|\�*!�]�n�      �   �  x���Mo�F��ί���F�|�H@4�n��j@��P� Y�j��A��^J��l`���>x�!��$-se�V���/t�� ,�0��2	��URF]�2I)�d���H���&	%���XkK���q%�ԅ��,����m�5�/�-^!��-j^�};��_��G�JK.�).|0�K�
�*4S�)��\U�Y5N����E�e��N"z���\�ДڠF�+����z����N����.��G��Z��3>}�N��+Z:Yjh�m�|c�4*�4FK�B;:�+yT:9�#�A;�Aa������t��4���)��^����E����8���D����z��PS���5$�%��J�+� �ɡP���� ���h�О�AB^�D��E)�D�	� K.������8��~�cݦz��ah#���}{7��=k��0�i`p8tO�_ܙE��abKW6Èl�!�qF�f6bp$o3��AHl?_�0�Ol7<�%F�C���ʷ9�cfmπ�!��Ŝ`� +���C���c�7��U�z��l�o����z�S�O�b��X�&�2h�'w�ն�����")�s�u���:�D��k�H����)/9����o����NO[/y֗� c�T�xn�=~Z>_in�u�i�t�p�}�9���g���
��P�g_ž=^�]�O��!�s���qG�O�w��Ӊz�����~�G7=^y�<��P�α���ᰉkRԵ��*��E��6�Ÿ\�#ə�~l�]�R7ܭ?��.3�x��~f�G�c�hjղ��y�N���0-��ל�e?�y�~]��>����L���ߑ���E�!���>��:����f��h�KvQ����*�=�)�SI�/����^��bG<
:Q���gm�Xr�7���G��x�/e�s)�ۧuYWI�Q�(��Y������_�Lp�      �      x������ � �      �      x������ � �      �   �   x���1�0E��ّ+�q��#;SW�$ME�"��ۓ"$6��f��?w)�a���3|b�a��=u
˪�[X�E��ǲ�5b��UHe�g5S��&
>��v�S��&3�DiǊ�� t�� 8�����/���z��Na{��uɷ�������{W0L������i�'�k[Z      �      x������ � �      �   �  x���Mk�0��+t/c4��OmJH�%����,��[v���B��+{���%�3HH��a�;���l"�!� Z�,S��Ed[$�	�t�-��	�S9$Ls�P,�rX��| ��[b_ʪ�zM�����4����:v��C ����+����������H�Ƒ:��wӰ��]�~ذ�!����v�f�O�c�RJ��m�h��M�GUҨ��(8	:� ޚɢG�m��a(��2���d:���	�#��W1 ��]���o�aZ�8ü�۞����3���;��M�&M�[�����%G��L4�IPw:K@	��2*�P<Gl�7*����]:�Ik��Б��)�w���*�B�u�����o����է���)�Y[��9FK�X4�s)�NY��ZC�&��K�p)�@S+aO����'���y&�hW��,�h�ͪۺ�������      �      x������ � �      �   �  x��W=�E��~�D$�����vL��9������.��  ��	Y�$X�	�Bk�����;�8N;����jW�ҫ�W���P�!V,�d
P,�h.����N���@s��I'�Lt�-f���G�����<w'����E���G��ퟋn���Be��:�:z��2�c�u�������U���P7����sV{�ڦ�?��˓�ɰ�G��E�c�Y���i>fD!4F��5M�}��������;�y�m�8gP��u���j6�*K����=��%�-�͏�n�ly2R���Z�R��� r	hgb$k��8��հ���<&�;���KK���(���R�
٠2&،~�=�����NX�(�[�<�Qb�V���i��Z��J����E߿-���齋�9��t�AVQ:�X9]�YSMP��T�Y�6?����?c���<�>at��O�Ģ!���J���R���v���|���y�1��m@Ɋ�T-��)B	�([���1�Q�c��7g�W�V-!�P��j	X�
�y�����:Q�<t�W�q��O�Vy5s^�.��C�1�b�!qs`Qܲ���T���������uu{>�%U!t"�(&�	�l+G]R����aŋa�}�}�y��}��fzE�T��-�U��T�:X,I�'z��e�����=�33���0C�B���b+�l��MÉ���.�o��_�|*L��L5��*��dN�o�%�j��#��'�Í�wKq��\��}�y�Gw��f*��b�k�02�9�Ҙ����\��'z�[��ꯞ�Gl��yu(Q���!;L�7G�^<�T�^^X��:^�o_��b{1��!gV#9��]-��%x0Q���� HO�#g�}���F:���_��� v��$�"��#!6�KP��W�s#���>Y�y&��uD�g�ow����yp^-��bެP      �   w  x���=kA�z�S<_�	��Rj�	��ɑX�<3;�,ٻ睒�*�`+6J
1 	XY�"��M���;�b�e`�����<'��ȣϨ����I�#�4U4"g-z�*A�k���LyW��5������3�L3:;iZ��ڊW��r��^7��Z����`5*�,zK�f9�L�p[	���Q�ח#E�F�B�D�'���U��7}�1°��z�)��� �O	��-l���pD�4��&��-��&�Ѽ%8:if	�\!��Zw���YQ�,�#r����{�
�ҊH�)wiw�ư������.ޝ	�𤹻��j����������J*�d�Q�҅\!q��P�<�C%�z���%����ɛ�9�zO#ػ����Ϭ�[m�}�������A#�B�G�t�X˘��x�7�V�e���8��_5�)����X�.g��������w0��]R�_e�ZE�	m�2R!G����(r�\���Lf���-D��Z	L��s*���2P�#�mr
��9<-�LJH�>���%��%�-1�QF��h��Q�lPq��6��F撐
�+�*�%�(������]&��7ӡ�	3�U�	����MN��ZG��_?���,-����g�      �   ?  x����JC1��{�b/�C���͹���=�n�sZ��������D�4�����Z���P���d�=�*Z'ϒ]Â5��*�`�<�
8�&N��#OH@�0��!ӐE����f�����<���O�5��-�?'p̬��~W�����aD)�b#_�Wˎȫ��"���K��$5G��D�9)qp7u��{�<���yLȿ�C���i�qD��pI6b�P��=��L�23Afq5�[��S���C�磫������p�L�4z?�dӦ��a��؜R���T$L5Os���/�iM�sM��8F�=_��c�w]�
�ˏ      �   L  x����o�0ǟ�_�o�c;	N��:�kױu)��Tir�ȏ�&�N����S�M�����{'���,S�R��ȋ�@<y��B��pje��PuO�E-�8�"A��J�i�"��s�%=�&��:�T__V�$J���Cm�g����Wt��������buw�U�\_q3@-dI_Ög�lQd	��z}��B�R0�v)s���y�l�]3�]�����Ar��'>�)sE���rnMRu�û��nT�0.���JiL�O�<��Rb� M�4T�����g4>��EW���h�~<���f���Д3��m�z>	Q�؂<ıG������dÂ˦'9��N����L ���T.o����}��k���_:���#ߤS�T�o�b�(�$�p5���%&(͵vB<�^��Ґ�
T��(\VPK��0q\�P�C��ȿ;[�k�y��(r��оYQ<jv,���X����ĳ2�N4�`OH��9+[2�-?������вȏ�'4������tn�.2��Z2����e��ݔ�Z��-u�FݲQGP�>jMl�������c�ہG����:�v����Y�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x��Ի�1��y���A>�w:63b��A��5�f�&�)m^!mJ��'�M2,.�$�"t�~��~�G'��g�F�R�cTI��2zL:2@g�L0	0�l�s<X��>p�la�~��˵�wM���D=#	��y) 	��az�̈�!�e�ŠVoBpւ����!&I�<��:�������\����C+�s.���٠z ��7��,}�*n�O����V��&��ڂw)g�P~�u�����t1o��F�b��V8��� �ъƑM���g+�Ǡ!���	���Y�������z�m��w���j�U�kT�١44W����"1��Y�襁��'��X���S� ��?@\�H�5[�*F�cJ���9�q�A/uIZ�:����𥼪f��M�w�:�O&��� y#�k2�Q��������~ʉ%o3'o�_G=�>}�XՊ�f=i�U�Y�k�u��ð��_|��      �   q
  x��Y�o�>���9��G��?rKd4l�F�8=�2;3KnE.	r�D(z(��� @|�!
D5���p��"�h����7�K9�Ԛ��"Erg��7�����1&8W���c�+��!3Nb�b�Ǣ�%�:L��X���ƛ�i���ԧ����f��z����^}=F�lq�^��)><LJ� �Q���p����w�˿�����-zx� ��`��|�(���"E�)ܭ�e��"���ޒ���ƖX����Nq��1�"\�ʘ�����&0e�D�[\�%Ԟ��WD���(�N�$~�P�8��4�b�����N��!J�H�+R��E��
U0	���Ķ�G&uY��9Rݢ^�F;�T�K$&^9e�e�l�#����Ѡ^_<���"Ek,WDi�S[=$�G�����o�/�٢�غ�!&�xT�������)�/~$)���� ��"`aX���ǎQ�@���{��q5�ĺj��!?�����3�S����K`[��):�����2�}׸��-�2��t�֝;>4{�c7��➟���c7��;�_��iG�O��Qt�<�p�k�w�AA-C�flRUa�Ä��A�5-�/aYE����cS�KB��*.�d7��p�=,��fRb��
�CU&/��1��K�p}�-�����ܡ�qVEߢ���E3��t0x7��A=:�����?���fh�̝�+)* �piS��p�*��0BV�2]�Ҥ\|�K��r
th�h���x� �姾����y��4��O�p�׼�ڨZ��k(��z<�pËS<����p�c����=���` �T'�H�Iϱ�%�Ar獿{6`>��^ƫ�E'��̈́����#Q��n��£c(�3t<sp�QlNz{4B�P83�k����ho=��#�>�mDЌ�LW����n�RTY����Ѐ0 Q`�!�*�+�v@�����Rj�V��js\?R��@�/�h:q��{Ƨ��mh4O�������G	5�M��:��G	5�Q�T�V��3�e�
�`@���Pk��`à�oߟB �O�zK	�����?��ya߸?IF�����($���,л`�8Ia���i���n�^�e�ϐdpݒBʗ�Ag�l۷���@ތ0]D�Ѡ^]LQ�z桇�<�]���� �l��~��kѡ�l�y[��x�x���8�q�O�p§#�fFV�JI�6�}���Hbi+�JK����r�I�����yB�Kk$�VRz���|�nxrB� }�R� e�v���U,��\V� C�zv�2�F1�[S���J�E��z�J�����)fN(_qp�����.�6���>.�6�Q��9M�t6�2�+�P۰b�/���ӈO3�٤�	���w�!-ܞ-�"������,���V7�E������pih��`h��Н�G�w=���>zT�n\7h?M��՗g�+�uΤ3(�MDzSA�X� q��C&�i�!%�#
�1h�f�ːn�����I$����ԃN�` ?V�H��͈�/>q�k.)���L��kH��vq`�7w�{n8�c�,7QH,���Z�0�;�K#�q���i(��ۻ�na�1"9�����E��yrx{V�:x�݋�&��A�GO������+��R��PS�>��Xӵ����b*���s��[ �A�Do1��k�����1x��o��*��F)\Z���I3��<v5���	J�R)���**�F��P3���c��gP�����	!�ҌH��`/=�o�B�c\<����G�z��o����ū��wBэ��e��@��N�t�BD�|�+��%���݌2��?N1��_����N��S�9���x���88��a.a	� (V�2I`����:+���$�p��l{RR���A��j�v��D�|��?\=m�MՃao���3��~X�\9]���T��iY���t�S��;�1�"-�	����s�m~w��s�}��l/a��o�a/Y>��9ɜ�U&�-�d^��qF&�A��Q	�Q���'%.�68��)X�o��I�\�14���h�<�ux���i;�ǊM7`4O'�0�}�7��'�q�'0��1|uֹǣt���h:=CA�~1E�3�p�ϛ�+��K2�s��8�X��8.�d�C�v0�:�A��dG-�'Ŝf?W 9��`���^!��F�y1fx4�B�Cg�}'�逳$��*ðp��(Nx�Ω7���I��/����.��[�#�T`����L``fKyؽt��Ӌ6�/Ձ�mM�.�aY�S�4�i��X�f�:�8��"��� ���`8q�ֱ�M~���AI��Ka��T�N�c�+�1ZqCZt:���x)����K}7x�n�7�	����h?���,Q��i�µ��;�m:ӀfQ�D��s��8�Ї�z�9U01�j��d�[E?\������0I'wg�_���:@9]��:�'`P	����qڽ^�Ѫ@a����S�N5�f�4��,ψ�1�C#���/��$�"0[v=B���f���3`���'��w���|z��|s@���%pU7fv��iք�*�|Nk�>%�B�-�GB0�����s,��q����[����#��UVl�"�sh ��;�r���{�n����X      �   �  x����n�0���S��*v���	���F �PA�$���Ħ�Ep�q�P��8�R+����!�}�	�J�B{��=�=�5�y���z���p�����z���	��-���y��.^��>�!�"'B�>����Ʒ������~���/Q�}ƙo?Uh���P��M^�)����
k�5��c�w%�Ԉ2$4W���Dji-#�4��5b!�2�$�ꀊ�FRȽ��22��D�q	��"�&��b���`�-椪��_i*)��G����B�A�,C@f����!���1J}��]w}g��-|s]c�vY���U�l�U���ݫǚ�a�+�6�jR���%3�ef��{�67��z
��W�����;r���MC�LR�|�z_��'�7W���CN� _���}���!���>�����KY�VqM��XQ�1Q��r�48A���K      �   )  x����n1�뻧�M4��;5�(��c��PNH���'�@�"%�"WP��7a�;$��i��j$����?���T���s ��AD����m�ꦘ���Ԁ�)%60��$F�˫���,Zc��	͹�s4gΦ'��Jfu���v5��'��̷�����|{s5]ν��k�XmʐR����ZH5�Sl�%/�w_�wѧ��?�o_>���Pa_:�0l���9�B��� fo 3�HK-�������~h�0+-���'�mm�Wt�뷐%+z5F.M����y�e�r�M����� э��q��o��Z}���'��@a�PP�ݛ�����G�����j� P?v��678� F��Ȭ&(�s�+Uj�{Thr��Ȼ I�!h!dC��;�a�18?&�5�^{���kR%��K)b3�����0���\C'2�$�j���j�aM!�+]$rˬNf�ۡƾ��묧���$��!(��1��q��q/M�� b	S]��?,������� F
��>J�,��؇�C��_����_qbMA      �     x��ϿN�0��y�۩#��%�)c��u�MPHx6&c%X�X�{�Mp"�:�H��O��X���:�9�Jhj,�T+V�%3\�K��W��my��yI��|�z��O���p2�˶�X��#Ȧ���0�BL*��ʦ�o�v�����p9EL��3k���=��Gz���֯���7�ғ�Ex�tɜQ̍�2ijSGq.Ƣ��d�Pqڟ!���>:>�E�m�I�� E�����y�B��߭_�ڷ=����gqE߉���      �   I  x�M�Mo�@��˯��e�/D8�����`�,�
��i��^@�4y�d2��	�X�)r0��b;�d&��S��d�A�KU��L� o"�[�C��C;g���s@��]w]�S�uI7�m?p�
H�r�Ϳ?O�&�L(��,юFӎ��U��۶-li�dR��t3������_����^��������
!0� �L�mDB��BF�������΋�q/��fĨQ���� �"͓�wQ�B�Y�F�ղ�&�ըMmdy������*�F�x�E��Ӑo�i�PH�|<L��0��"
=���u��e� 
A��     