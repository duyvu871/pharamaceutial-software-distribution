PGDMP         7                |            quan_ly_nha_thuoc %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) 7    n           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            o           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            p           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            q           1262    16384    quan_ly_nha_thuoc    DATABASE     b   CREATE DATABASE quan_ly_nha_thuoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
 !   DROP DATABASE quan_ly_nha_thuoc;
                postgres    false            r           0    0    DATABASE quan_ly_nha_thuoc    ACL     3   GRANT ALL ON DATABASE quan_ly_nha_thuoc TO adc300;
                   postgres    false    3441            I           1247    32808    enum_branches_branch_status    TYPE     Y   CREATE TYPE public.enum_branches_branch_status AS ENUM (
    'active',
    'inactive'
);
 .   DROP TYPE public.enum_branches_branch_status;
       public          postgres    false            C           1247    24579    enum_branchs_branch_status    TYPE     X   CREATE TYPE public.enum_branchs_branch_status AS ENUM (
    'active',
    'inactive'
);
 -   DROP TYPE public.enum_branchs_branch_status;
       public          postgres    false            F           1247    32771    enum_consumers_gender    TYPE     O   CREATE TYPE public.enum_consumers_gender AS ENUM (
    'male',
    'female'
);
 (   DROP TYPE public.enum_consumers_gender;
       public          postgres    false            X           1247    40963     enum_memberships_employee_status    TYPE     ^   CREATE TYPE public.enum_memberships_employee_status AS ENUM (
    'active',
    'inactive'
);
 3   DROP TYPE public.enum_memberships_employee_status;
       public          postgres    false            @           1247    16388    enum_users_permission    TYPE     �   CREATE TYPE public.enum_users_permission AS ENUM (
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
       public          postgres    false            �            1259    32939    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    32959    branches    TABLE     }  CREATE TABLE public.branches (
    branch_id uuid NOT NULL,
    branch_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    branch_status public.enum_branches_branch_status NOT NULL,
    owner_id uuid NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.branches;
       public         heap    postgres    false    841            �            1259    32971 	   consumers    TABLE       CREATE TABLE public.consumers (
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
       public         heap    postgres    false    838            �            1259    41175    groups    TABLE     �  CREATE TABLE public.groups (
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
       public         heap    postgres    false            �            1259    40974    memberships    TABLE     �  CREATE TABLE public.memberships (
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
       public         heap    postgres    false    856            �            1259    41297    product_groups    TABLE     E  CREATE TABLE public.product_groups (
    product_id uuid NOT NULL,
    group_id uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.726+07'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-12-10 16:55:24.727+07'::timestamp with time zone NOT NULL
);
 "   DROP TABLE public.product_groups;
       public         heap    postgres    false            �            1259    41314    product_unit_labels    TABLE     �   CREATE TABLE public.product_unit_labels (
    product_id uuid NOT NULL,
    product_unit uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public.product_unit_labels;
       public         heap    postgres    false            �            1259    41260    product_units    TABLE     �  CREATE TABLE public.product_units (
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
       public         heap    postgres    false            �            1259    41272    products    TABLE     �  CREATE TABLE public.products (
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
    quantity json NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    41145    stores    TABLE        CREATE TABLE public.stores (
    id uuid NOT NULL,
    branch_id uuid NOT NULL,
    store_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255),
    email character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description character varying(255),
    deleted_at timestamp with time zone,
    deleted_by uuid
);
    DROP TABLE public.stores;
       public         heap    postgres    false            �            1259    32944    users    TABLE     �  CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) DEFAULT NULL::character varying,
    age integer,
    phone_number character varying(255) DEFAULT NULL::character varying,
    address character varying(255) DEFAULT NULL::character varying,
    avatar character varying(255) DEFAULT NULL::character varying,
    notes character varying(255) DEFAULT NULL::character varying,
    is_active boolean DEFAULT true NOT NULL,
    last_login timestamp with time zone,
    reset_token character varying(255) DEFAULT NULL::character varying,
    permission character varying(255)[] DEFAULT ARRAY['Store.All'::character varying(255), 'Report.All'::character varying(255), 'Supplier.All'::character varying(255), 'Medicine.All'::character varying(255), 'Membership.All'::character varying(255), 'Promotion.All'::character varying(255), 'Customer.All'::character varying(255), 'User.Read'::character varying(255), 'User.Update'::character varying(255), 'User.Create'::character varying(255)] NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            a          0    32939    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    209   �Z       c          0    32959    branches 
   TABLE DATA           �   COPY public.branches (branch_id, branch_name, address, phone_number, branch_status, owner_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   g[       d          0    32971 	   consumers 
   TABLE DATA           �   COPY public.consumers (id, branch_id, revenue, debit, consumer_name, gender, consumer_email, phone_number, tax_code, company_name, date_of_birth, facebook, address, notes, province_city, district, ward, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   #\       g          0    41175    groups 
   TABLE DATA              COPY public.groups (id, store_id, group_name, description, status, created_at, updated_at, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    215   �]       e          0    40974    memberships 
   TABLE DATA           �   COPY public.memberships (id, username, first_name, last_name, hire_date, password, email, phone_number, avatar, notes, employee_status, branch_id, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   �a       j          0    41297    product_groups 
   TABLE DATA           X   COPY public.product_groups (product_id, group_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   'd       k          0    41314    product_unit_labels 
   TABLE DATA           a   COPY public.product_unit_labels (product_id, product_unit, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   Dd       h          0    41260    product_units 
   TABLE DATA           �   COPY public.product_units (id, store_id, name, value, no, is_base, latest_parcel_no, latest_parcel_exp_date, created_at, updated_at) FROM stdin;
    public          postgres    false    216   ad       i          0    41272    products 
   TABLE DATA           �  COPY public.products (id, store_id, product_type, medicine_id, barcode, product_no, product_name, shortcut, original_price, sell_price, weight, quantity_of_stock, group_id, using_id, base_unit, status, created_at, updated_at, min_quantity, max_quantity, description, note, manufacturer, made_in, deleted_at, deleted_by, avg_original_price, default_image, "productUnit", quantity) FROM stdin;
    public          postgres    false    217   If       f          0    41145    stores 
   TABLE DATA           �   COPY public.stores (id, branch_id, store_name, address, phone, email, created_at, updated_at, status, description, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    214   �p       b          0    32944    users 
   TABLE DATA           �   COPY public.users (id, username, password, email, age, phone_number, address, avatar, notes, is_active, last_login, reset_token, permission, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �q       �           2606    32943     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    209            �           2606    32965    branches branches_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);
 @   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pkey;
       public            postgres    false    211            �           2606    32988    consumers consumers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_pkey;
       public            postgres    false    212            �           2606    41184    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    215            �           2606    40980    memberships memberships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_pkey;
       public            postgres    false    213            �           2606    41303 "   product_groups product_groups_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (product_id, group_id);
 L   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_pkey;
       public            postgres    false    218    218            �           2606    41266     product_units product_units_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_pkey;
       public            postgres    false    216            �           2606    41281    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    217            �           2606    41154    stores stores_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
       public            postgres    false    214            �           2606    32958    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            �           2606    32966    branches branches_owner_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_owner_id_fkey;
       public          postgres    false    210    211    3256            �           2606    32989 "   consumers consumers_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumers
    ADD CONSTRAINT consumers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consumers DROP CONSTRAINT consumers_branch_id_fkey;
       public          postgres    false    3258    212    211            �           2606    41185    groups groups_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_store_id_fkey;
       public          postgres    false    214    215    3264            �           2606    40981 &   memberships memberships_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_branch_id_fkey;
       public          postgres    false    211    213    3258            �           2606    41309 +   product_groups product_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_group_id_fkey;
       public          postgres    false    218    215    3266            �           2606    41304 -   product_groups product_groups_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.product_groups DROP CONSTRAINT product_groups_product_id_fkey;
       public          postgres    false    3270    217    218            �           2606    41317 7   product_unit_labels product_unit_labels_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_id_fkey;
       public          postgres    false    3270    219    217            �           2606    41322 9   product_unit_labels product_unit_labels_product_unit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_unit_labels
    ADD CONSTRAINT product_unit_labels_product_unit_fkey FOREIGN KEY (product_unit) REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_unit_labels DROP CONSTRAINT product_unit_labels_product_unit_fkey;
       public          postgres    false    219    3268    216            �           2606    41267 )   product_units product_units_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id);
 S   ALTER TABLE ONLY public.product_units DROP CONSTRAINT product_units_store_id_fkey;
       public          postgres    false    216    3264    214            �           2606    41287    products products_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_group_id_fkey;
       public          postgres    false    3266    217    215            �           2606    41292 "   products products_productUnit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_productUnit_fkey" FOREIGN KEY ("productUnit") REFERENCES public.product_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_productUnit_fkey";
       public          postgres    false    216    217    3268            �           2606    41282    products products_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_store_id_fkey;
       public          postgres    false    214    217    3264            �           2606    41155    stores stores_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_branch_id_fkey;
       public          postgres    false    214    3258    211            a   �   x�m�M� �=w���w�b3:12ןh�q�]�}}E@���p#�M$s$�>Q���V�@I��������u_r֘����5���@�y��5(}��S���+�@]ԛC�*h��8��%��9=bh��ዻ�?�{���8.��|\�*!�]�n�      c   �   x���1�0E��ّ+�q��#;SW�$ME�"��ۓ"$6��f��?w)�a���3|b�a��=u
˪�[X�E��ǲ�5b��UHe�g5S��&
>��v�S��&3�DiǊ�� t�� 8�����/���z��Na{��uɷ�������{W0L������i�'�k[Z      d   �  x���Mk�0��W�^�h�-��&���h���Ҩ�k���_��P�n ��Ú�F~�`���RтM$@�`!�@k_d�	]DV�CrY �@�;��'O�Y��0-1C�>L��q;�ˑ�>�}��&�������5i�3J��u��v)A��Z\�V�Z���}�&��0���
Me�󸧉]�a������=���&�Ԁ��h[-Z��r���&iTBS�]\ oM�dѣ�v/�0G���:��:���	��(������*u3����D_4̼;|_P.n.�e�0O}�9��4��O[�K���P��nw|=�f�J�9b+T�]S=�y�u^���+�d�]���9���aΝ)�F�Z#��	�c��E��Kt*
���6	��^�h�K�eL��=-�mJ�N��DS/]�B����$keT�.��s��
�'�c���7���JδT      g   �  x��W=�E��~�D$�����vL��9������.��  ��	Y�$X�	�Bk�����;�8N;����jW�ҫ�W���P�!V,�d
P,�h.����N���@s��I'�Lt�-f���G�����<w'����E���G��ퟋn���Be��:�:z��2�c�u�������U���P7����sV{�ڦ�?��˓�ɰ�G��E�c�Y���i>fD!4F��5M�}��������;�y�m�8gP��u���j6�*K����=��%�-�͏�n�ly2R���Z�R��� r	hgb$k��8��հ���<&�;���KK���(���R�
٠2&،~�=�����NX�(�[�<�Qb�V���i��Z��J����E߿-���齋�9��t�AVQ:�X9]�YSMP��T�Y�6?����?c���<�>at��O�Ģ!���J���R���v���|���y�1��m@Ɋ�T-��)B	�([���1�Q�c��7g�W�V-!�P��j	X�
�y�����:Q�<t�W�q��O�Vy5s^�.��C�1�b�!qs`Qܲ���T���������uu{>�%U!t"�(&�	�l+G]R����aŋa�}�}�y��}��fzE�T��-�U��T�:X,I�'z��e�����=�33���0C�B���b+�l��MÉ���.�o��_�|*L��L5��*��dN�o�%�j��#��'�Í�wKq��\��}�y�Gw��f*��b�k�02�9�Ҙ����\��'z�[��ꯞ�Gl��yu(Q���!;L�7G�^<�T�^^X��:^�o_��b{1��!gV#9��]-��%x0Q���� HO�#g�}���F:���_��� v��$�"��#!6�KP��W�s#���>Y�y&��uD�g�ow����yp^-��bެP      e   L  x����o�0ǟ�_�o�c;	N��:�kױu)��Tir�ȏ�&�N����S�M�����{'���,S�R��ȋ�@<y��B��pje��PuO�E-�8�"A��J�i�"��s�%=�&��:�T__V�$J���Cm�g����Wt��������buw�U�\_q3@-dI_Ög�lQd	��z}��B�R0�v)s���y�l�]3�]�����Ar��'>�)sE���rnMRu�û��nT�0.���JiL�O�<��Rb� M�4T�����g4>��EW���h�~<���f���Д3��m�z>	Q�؂<ıG������dÂ˦'9��N����L ���T.o����}��k���_:���#ߤS�T�o�b�(�$�p5���%&(͵vB<�^��Ґ�
T��(\VPK��0q\�P�C��ȿ;[�k�y��(r��оYQ<jv,���X����ĳ2�N4�`OH��9+[2�-?������вȏ�'4������tn�.2��Z2����e��ݔ�Z��-u�FݲQGP�>jMl�������c�ہG����:�v����Y�      j      x������ � �      k      x������ � �      h   �  x��Ի�1��y���A>�w:63b��A��5�f�&�)m^!mJ��'�M2,.�$�"t�~��~�G'��g�F�R�cTI��2zL:2@g�L0	0�l�s<X��>p�la�~��˵�wM���D=#	��y) 	��az�̈�!�e�ŠVoBpւ����!&I�<��:�������\����C+�s.���٠z ��7��,}�*n�O����V��&��ڂw)g�P~�u�����t1o��F�b��V8��� �ъƑM���g+�Ǡ!���	���Y�������z�m��w���j�U�kT�١44W����"1��Y�襁��'��X���S� ��?@\�H�5[�*F�cJ���9�q�A/uIZ�:����𥼪f��M�w�:�O&��� y#�k2�Q��������~ʉ%o3'o�_G=�>}�XՊ�f=i�U�Y�k�u��ð��_|��      i   H
  x��XMo�=�~E�M���o6���$F0i9_z�{v'ܝ]��R&�� ��0`r� b#��d F+��?Iu�,e�Lč(�;ܙ�AU��W�:��
�2p,x��3$`�I�T���XT��Q�������x1��������h(����!j��7c�������Ӄ�C��"���z�V߭�!�`��+ڇ���nу������)�h�^~�A'������B�O�J
�R[bK0_�
;���T�p�*c
Z<Lo�+#L`�0%����~O�]M����_�(�Nz'~��6v+Li"��Y�����C����W���nQ/K��C+���%��2�2j���B�Ѡ^�?����"b,WDi�Q[> ����w���o���٢�غ�!&�xT~t��Va�O���_I
���:l�X���cԅ2Pm�� ���1ƗmM	�@�p}�/�\�rv�|��_=�DJ����c�<_���ף�y6l����۷}hv�gn<�]?߮�n�}�bӎ"�����y�����Ma�12L� RUa�Ä��A����;��K�����X�tUq)$����n~=�xb��
�CUƛw���v�>�.�7q>w�A�Uѷ���p���,�����"�_���� !���[ �5p<�E�����P��)݅q�t��\�+U���D>$_|�K��rH�h���\�x� �/|�	~��He�z��މ�a��$̆�z�ޒ.���.nxq�相��Hq�c�V�&�,�ؖ���sly�m��y�K�M�^>^� ���l�q�F3���2��(^}�^~����):�9X�c������}��8���q4�����Ƌ�C��6"��'����l79R^�������p��M�A;@�h��q��ٲq��v�ٮ���d��1�{@�������~E���d�<��n4�$1ÏR� %��᪋~���s�r�p����2X�E0@�A[(�XU t��0B �M��,\	���7�2�����d���~!;dqg}����p�y"��}��ct?�Y�����_��z�)AWm)�|ݫu·�6���K(�w˅΢A�hP�Χ�]���T��Ώ�z)ɉ���09ע7��s�m�����8��Ťš�||�S|:�53��
WJB��
7GK[qVZ��"P�4��R@#BB�8��ti�d�JJ�l������r J�{���.��wct��b����b������h�j$`~՞B�X�@9�+�\V)�đ S5��	�+�-�~Й�f�B�1���y�����I�6_\]�Q�jv�O">I���I�St��r�,BZ���Ty%�fe,K�	��v�7��N��BeA2�1ם&FwM���zX�n\7h/i����i��킲Ntb �]�/��+�t����<�L.�B7
�4e\���ڗJ]?����������_���
1G$=�ܡ��wW��[�C�O:;������;�
vgt�����BK���
�D��4�)o{[��l���w~�`0"� �I1|Ң묭ߟ�q��_}���V��J��cPO��qas}�a,�ЛK��U,!���؂�T2k�&Z{s� N:'�v�]3�t�:C��z{��r}��ԷK{�p1i�%�Ǯ�90[���.��L��^1�J=�C� ��:/M�㾸�40H2"M��^H��B^��?�ѝɣ����A_}�����;�]ywc-��>5e�HD$\���"��z�oF�ol�,�|�m~�Nߺ���u6�2��o+޴�:b��rg)AP�deだ�C{sV0	�=n9�mM���T� N5M����(��{���&��Q=�P�
 �]����B�|�^d���Ӳ8X:�(Vg8�VD��7Ay�%����X��}Ն�� ٳ4��g�;A������"��q~!Α�@Z9*Ayi�Y ��ĥ� 6H�B >m<)�+9���	�o%@����ܖ��!W��g����&�������2.�������N������1��A����O�������t���g������]�$�@U�
@��q�ٞ�G��d����7�^��5�[z	_q���͘��d
v`T�5�t�V� �� *ð��2��s��e�dR��4�3���:i͸j/���$�0+����U��mNB_�4c��b7Y�#�b����Lզ7��Y�C��
�}�����É����n������\j���@�UE�S��"��"���!�i̜���HL+H��`�ۄ�]�O@D��G{��f	e���+��;��;[�Ձ���4i
G}�!����kN�7%�7�����D\��'����q6�ͦCH��+�����&�	�.�6@?�s����2Z(LS�V��=����3*#b;̃C#p�ϯOܓZ���#mQ|�
bo���/!A��<�<�}���ӹ�Wg�3�Ĉol�U݌՝R�A~T	y��Q�"Pl��8*�ׂQ�o��5��{�g�g��Q6��� ��%�/~��=��C������[	�Owoݺ�)kl�      f     x��ϿN�0��y�۩#��%�)c��u�MPHx6&c%X�X�{�Mp"�:�H��O��X���:�9�Jhj,�T+V�%3\�K��W��my��yI��|�z��O���p2�˶�X��#Ȧ���0�BL*��ʦ�o�v�����p9EL��3k���=��Gz���֯���7�ғ�Ex�tɜQ̍�2ijSGq.Ƣ��d�Pqڟ!���>:>�E�m�I�� E�����y�B��߭_�ڷ=����gqE߉���      b   I  x�M�Mo�@��˯��e�/D8�����`�,�
��i��^@�4y�d2��	�X�)r0��b;�d&��S��d�A�KU��L� o"�[�C��C;g���s@��]w]�S�uI7�m?p�
H�r�Ϳ?O�&�L(��,юFӎ��U��۶-li�dR��t3������_����^��������
!0� �L�mDB��BF�������΋�q/��fĨQ���� �"͓�wQ�B�Y�F�ղ�&�ըMmdy������*�F�x�E��Ӑo�i�PH�|<L��0��"
=���u��e� 
A��     