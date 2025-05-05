--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-2.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-2.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bank_sistem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_sistem (
    id uuid NOT NULL,
    bank character varying(50) NOT NULL,
    country character varying(50) NOT NULL,
    method character varying(50) NOT NULL,
    currency character varying(50) NOT NULL,
    commission numeric(14,2) NOT NULL,
    limit_min numeric(14,2) NOT NULL,
    limit_max numeric(14,2) NOT NULL,
    comments character varying(150)
);


ALTER TABLE public.bank_sistem OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    country character varying NOT NULL,
    picture character varying NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: exchange_methods_all; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exchange_methods_all (
    id integer NOT NULL,
    currency character varying(100) NOT NULL,
    category character varying(100) NOT NULL,
    buy double precision NOT NULL,
    sell double precision NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.exchange_methods_all OWNER TO postgres;

--
-- Name: exchange_methods_all_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exchange_methods_all_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exchange_methods_all_id_seq OWNER TO postgres;

--
-- Name: exchange_methods_all_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exchange_methods_all_id_seq OWNED BY public.exchange_methods_all.id;


--
-- Name: servis_fitbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servis_fitbacks (
    id integer NOT NULL,
    score integer,
    comments character varying(250)
);


ALTER TABLE public.servis_fitbacks OWNER TO postgres;

--
-- Name: servis_fitbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servis_fitbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servis_fitbacks_id_seq OWNER TO postgres;

--
-- Name: servis_fitbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servis_fitbacks_id_seq OWNED BY public.servis_fitbacks.id;


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: exchange_methods_all id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchange_methods_all ALTER COLUMN id SET DEFAULT nextval('public.exchange_methods_all_id_seq'::regclass);


--
-- Name: servis_fitbacks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servis_fitbacks ALTER COLUMN id SET DEFAULT nextval('public.servis_fitbacks_id_seq'::regclass);


--
-- Data for Name: bank_sistem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank_sistem (id, bank, country, method, currency, commission, limit_min, limit_max, comments) FROM stdin;
55741431-9efd-4343-ac72-1b81452cae66	ВТБ	Узбекистан	mobile	RUB	0.00	0.00	20000000.00	\N
3f16e26c-c778-4862-b899-50273b49ecee	ВТБ	Узбекистан	bank_card	RUB	0.50	50.00	350000.00	\N
b6a2bd2f-2dd6-47dd-bec8-134fa431f611	ВТБ	Узбекистан	cash	RUB	0.00	0.00	350000.00	\N
eb4b266d-db2b-4f8a-a87e-5fd21ec4e91d	ВТБ	Узбекистан	account_number	UZS	1.00	0.00	20.00	\N
ccab94d3-611c-4d91-bd50-df9695a679cc	ВТБ	Таджикистан	mobile	RUB	0.50	30.00	1000000.00	\N
0dda76bb-f139-493d-afac-e39cc926b0a0	ВТБ	Таджикистан	bank_card	RUB	0.50	50.00	350000.00	\N
2888c212-64e7-4fad-b37f-4617ec659e75	ВТБ	Таджикистан	cash	RUB	1.50	100.00	350000.00	\N
3105a3cb-be60-4a49-92eb-0f582fb5388c	ВТБ	Таджикистан	account_number	TJS	1.00	0.00	20000000.00	\N
608aae66-6dc6-4573-989d-48c4727376c4	ВТБ	Кыргызстан	mobile	RUB	0.50	0.00	1000000.00	\N
1c42c656-35f9-4124-8387-0ae4199044f6	ВТБ	Кыргызстан	bank_card	RUB	0.50	0.00	350000.00	\N
1f1bdd03-7cdb-4111-9e4f-d0260787f600	ВТБ	Кыргызстан	cash	RUB	0.50	100.00	350000.00	\N
4059a4fb-6c80-4028-af20-c2af405191e0	ВТБ	Кыргызстан	account_number	KGS	1.00	150.00	2000.00	\N
dc69a9ed-5f72-4c84-ae0c-c6e6b70577b6	ВТБ	Азербайджан	bank_card	RUB	0.50	50.00	350000.00	\N
b62fa61f-f1f5-41bf-bd0f-a57ca41b7f4f	ВТБ	Азербайджан	cash	RUB	1.50	100.00	350000.00	\N
6703f8a2-169d-4a6d-849e-dfcfd50b2e6a	ВТБ	Азербайджан	account_number	RUB	1.00	0.00	20000000.00	\N
62d10d1d-5575-4fb3-81fc-903946ad09a2	ВТБ	Армения	mobile	RUB	0.50	30.00	1000000.00	\N
73d79302-dce5-48be-8a37-6e2ee7690315	ВТБ	Армения	bank_card	RUB	0.50	0.00	350000.00	\N
a5ada5c8-9e12-4633-8748-bb2aa6991dae	ВТБ	Армения	bank_card	AMD	0.50	1500.00	20000.00	\N
5fe0d348-384a-4cef-a554-c11ddb6a74f1	ВТБ	Армения	cash	RUB	1.50	100.00	350000.00	\N
20e2b448-c0ee-4e02-b2fd-52ca4f6bd021	ВТБ	Армения	account_number	RUB	1.00	0.00	20000000.00	\N
7a40927c-566f-4da0-9997-5a82ed8fbb6e	ВТБ	Армения	account_number	AMD	1.00	1500.00	20000.00	\N
95a1b09c-2900-4915-ad02-865785c85020	ВТБ	Беларусь	mobile	RUB	0.50	30.00	1000000.00	\N
3be04a9e-0871-4760-92f2-951483562f71	ВТБ	Беларусь	bank_card	RUB	0.50	50.00	350000.00	\N
f74525d2-934d-4cee-a022-35b2cbdc90c1	ВТБ	Беларусь	cash	RUB	1.50	100.00	350000.00	\N
5db19f5a-0771-4d20-90ea-45b7f49fd053	ВТБ	Беларусь	account_number	BYN	1.00	15.00	200.00	\N
22b5e252-a6dc-4f1e-80ea-4f49fe57aeb2	ВТБ	Беларусь	account_number	RUB	1.00	0.00	20000000.00	\N
c09d7ec6-ac22-4cf9-a7ac-27b475bfc621	ВТБ	Вьетнам	account_number	VND	1.00	0.00	20000.00	\N
30c46d71-81c1-468e-a256-56912f9f5a2a	ВТБ	Абхазия	bank_card	RUB	1.00	0.00	150000.00	\N
abe05678-9529-4afb-a067-25bd20c5d01c	ВТБ	Иран	account_number	IRR	1.00	0.00	200000.00	\N
9e6ddbd3-6cf4-4bad-b97a-77c6bd161185	ВТБ	Иран	account_number	RUB	1.00	0.00	2000000.00	\N
041088fb-8e23-45c8-828d-5a8f2ab6c8b7	ВТБ	Южная Осетия	bank_card	RUB	1.00	0.00	150000.00	\N
ffea1470-e8aa-4e11-aecd-ce0e783cc97a	ВТБ	Сербия	bank_card	RUB	0.50	50.00	0.00	\N
2aa27ec9-303d-4d6b-8586-fc4fc92a44d1	ВТБ	Сербия	cash	RUB	1.00	100.00	0.00	\N
7b60d6a2-a1f3-4672-8100-71830e5e1f3b	T-Банк	Абхазия	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
c1e685a1-074a-4788-9417-6bc684362b1a	T-Банк	Армения	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
887812ca-1ba6-4077-87bd-2229d9b27fab	T-Банк	Армения	bank_card	RUB	0.00	30.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1,5%
2f744850-5206-4ed7-939a-76140c7b02da	T-Банк	Беларусь	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
98131fe1-3811-49cd-a619-737d4388d4b7	T-Банк	Казахстан	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
106b5278-ca0f-4e86-b0c2-c7ed5f52a631	T-Банк	Казахстан	bank_card	RUB	0.00	30.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1,5%
82f85ad4-182f-4550-8235-85f262f0bd0f	T-Банк	Киргизстан	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
1ec80e5a-aea1-4a6d-a5ea-9a5ff5b0e6d5	T-Банк	Киргизстан	bank_card	RUB	0.00	30.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1,5%
715324d5-f0e6-441e-9405-07e8b71434b2	T-Банк	Приднестровье	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
26981686-d0d9-4d77-b87c-410e800a33b7	T-Банк	Таджикистан	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
bcdcb0c0-3da9-477c-b7a7-a93c18b62a80	T-Банк	Таджикистан	bank_card	RUB	0.00	30.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1,5%
f1a07b2e-26a2-4993-a455-389539d8426a	T-Банк	Узбекистан	mobile	RUB	0.00	0.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1%
981ce813-2925-4e10-9f7c-af3283becc1a	T-Банк	Узбекистан	bank_card	RUB	0.00	30.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1,5%
e347d22a-79c6-454a-ac3b-6503b37b5293	T-Банк	Южная Осетия	bank_card	RUB	0.00	30.00	100000.00	Если больше 20000 ₽ в месяц, то комиссия будет 1,5%
fed982bd-ab73-4e00-8b12-fd475d2c69c6	OzonBank	Таджикистан	KoronaPay	USD	1.00	0.00	5000.00	\N
127ebce2-1031-468a-97cc-e37f8193cb55	OzonBank	Таджикистан	KoronaPay	RUB	1.00	0.00	600000.00	\N
368faae7-5e2b-40c0-8760-d6efa8931378	OzonBank	Узбекистан	KoronaPay	USD	1.00	0.00	5000.00	\N
1c8a61b9-c473-456b-a280-207b803b5855	OzonBank	Кыргызстан	KoronaPay	USD	1.00	0.00	5000.00	\N
8d03b80b-0669-4bf3-bece-c26724c279b4	OzonBank	Кыргызстан	KoronaPay	RUB	1.00	0.00	600000.00	\N
3560b9bd-2a26-48be-8312-751a09710b98	OzonBank	Азербайджан	KoronaPay	USD	1.00	0.00	5000.00	\N
01149a79-a24b-448e-b79e-6d61ce6f7c1c	OzonBank	Азербайджан	KoronaPay	AZN	1.00	0.00	8500.00	\N
d78e375f-b463-4c3f-9fcc-4240385bb858	OzonBank	Турция	KoronaPay	USD	1.00	0.00	5000.00	\N
5da270ad-c8c2-424f-a186-018f9fa3ad9c	OzonBank	Турция	KoronaPay	TRY	1.00	0.00	200000.00	\N
b10c39ba-a266-4906-86f6-503ca550d93d	OzonBank	Турция	KoronaPay	EUR	1.00	0.00	3000.00	\N
7233e335-55d7-47e6-9d41-31e678a76c6d	OzonBank	Казахстан	KoronaPay	KZT	1.00	0.00	260000.00	\N
fa6cbf07-e0ed-4f5d-a68b-d7a76a955175	OzonBank	Казахстан	KoronaPay	USD	1.00	0.00	5000.00	\N
00c295af-682d-4bc0-819d-c28698280b02	OzonBank	Казахстан	KoronaPay	RUB	1.00	0.00	600000.00	\N
efe4b8cb-719f-4d87-abfe-527baafab400	OzonBank	Грузия	KoronaPay	GEL	1.00	0.00	13700.00	\N
059e4b6d-3a29-417c-958a-56b4ea9face4	OzonBank	Грузия	KoronaPay	USD	1.00	0.00	5000.00	\N
138aa79a-e813-44c5-8e61-33ea92d510a6	OzonBank	Грузия	KoronaPay	EUR	1.00	0.00	3000.00	\N
c0629313-9884-42b6-a761-8f8fb86aa7e5	OzonBank	Беларусь	KoronaPay	BYN	1.00	0.00	15150.00	\N
5fad94f6-7eca-4c45-b70e-fac8bae3ccbc	OzonBank	Беларусь	KoronaPay	RUB	1.00	0.00	600000.00	\N
99c77e92-f273-498f-9539-a46dccc677e4	OzonBank	Армения	KoronaPay	RUB	1.00	0.00	600000.00	\N
70cae476-5dc2-4e6d-af17-824f15690179	OzonBank	Армения	KoronaPay	USD	1.00	0.00	5000.00	\N
c78fe553-12fe-4336-a23d-f22417a6a155	OzonBank	Вьетнам	KoronaPay	USD	1.00	0.00	5000.00	\N
b9f7875d-7d98-4114-aeab-38073084b07e	OzonBank	Греция	KoronaPay	EUR	1.00	0.00	3000.00	\N
79223ba3-c920-4228-a41a-c4676be1e735	OzonBank	Израиль	KoronaPay	USD	1.00	0.00	5000.00	\N
b2489d9f-9811-4962-86f4-294cab66da53	OzonBank	Кипр	KoronaPay	EUR	1.00	0.00	3000.00	\N
6ec78a03-d57c-4026-ac48-03263cc211c3	OzonBank	Корея (Республика)	KoronaPay	USD	1.00	0.00	5000.00	\N
1c95e40b-fe1f-4fda-9121-f408606154a5	OzonBank	Сербия	KoronaPay	EUR	1.00	0.00	3000.00	\N
e5bb6415-9b25-4c26-849f-6cc2cee615ab	Россельхозбанк	Абхазия	mobile	RUB	1.50	0.00	1000000.00	\N
0041c652-afde-4b2d-86fb-b2e39eb77e51	Россельхозбанк	Абхазия	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
be4cc300-bc5b-4437-a27a-acc673a1be70	Россельхозбанк	Армения	mobile	RUB	1.50	0.00	1000000.00	\N
3e80b7ab-3144-425c-8711-7442b1965618	Россельхозбанк	Армения	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
42b328a3-5cf2-4159-bd26-c950c9c159e3	Россельхозбанк	Беларусь	mobile	RUB	1.50	0.00	1000000.00	\N
fa02fa28-84b7-4468-8205-7160dfddf2b3	Россельхозбанк	Беларусь	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
e6a20049-a949-4cd3-be1c-321f692fe68d	Россельхозбанк	Казахстан	mobile	RUB	1.50	0.00	1000000.00	\N
3bbced9d-76f9-4555-a03e-7cb5c58ca2d0	Россельхозбанк	Казахстан	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
8371b4c0-ceb5-4f87-9c89-eca2cda80808	Россельхозбанк	Киргизия	mobile	RUB	1.50	0.00	1000000.00	\N
21be65d1-3596-4226-9849-dc6b8c77db9f	Россельхозбанк	Киргизия	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
81fc0dac-5573-42c8-b29f-9dfe64ed4b06	Россельхозбанк	Таджикистан	mobile	RUB	1.50	0.00	1000000.00	\N
66280e14-70fd-4837-92d5-07cd6049dad5	Россельхозбанк	Таджикистан	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
0013f19b-76dd-415f-867c-2ff3bdf9f6b4	Россельхозбанк	Южная Осетия	mobile	RUB	1.50	0.00	1000000.00	\N
b4cab95c-a2b9-4cb5-b9df-94655717db47	Россельхозбанк	Южная Осетия	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
55fccf3f-5344-48ae-b1dd-7cd5a12093e7	Россельхозбанк	Узбекистан	mobile	RUB	1.50	0.00	1000000.00	\N
aa076db0-c491-4c25-9e10-1684942c275f	Россельхозбанк	Узбекистан	bank_card	RUB	1.50	50.00	150000.00	150 тыс ₽ в сутки, 500 тыс ₽ в месяц
91f84a49-6286-49e3-9042-b4ba2a0c3fab	ПочтаБанк	Абхазия	unistream	RUB	0.00	5.00	435000.00	\N
34306fad-9b35-4472-a456-017a010a7ecb	ПочтаБанк	Абхазия	unistream	EUR	0.00	5.00	3500.00	\N
86bda3a6-b9d3-4be6-b4ba-47655cb5d951	ПочтаБанк	Абхазия	unistream	USD	0.00	0.00	999999.00	\N
8b160e6d-b558-42eb-9b23-33fb4d3cb845	ПочтаБанк	Молдова	unistream	RUB	1.00	100.00	435000.00	\N
152d2c83-1a17-4182-b9d0-572eaf889e54	ПочтаБанк	Молдова	unistream	EUR	0.00	5.00	3500.00	\N
57d2d391-35e7-4b8e-9f1c-6a8bcaef4cd1	ПочтаБанк	Молдова	unistream	USD	0.00	5.00	4500.00	\N
ce15a685-5ed5-41c9-9457-e79c8be9a3b5	ПочтаБанк	Таджикистан	unistream	RUB	1.00	100.00	435000.00	\N
7d4813c3-0ed9-431f-ac74-5a63fc5016c7	ПочтаБанк	Армения	unistream	RUB	1.40	100.00	435000.00	\N
f1ec9397-d270-49a0-802f-abbc84f0585b	ПочтаБанк	Беларусь	unistream	RUB	1.00	100.00	435000.00	\N
a9640011-7b56-4410-8928-166c2b8fdbbe	ПочтаБанк	Киргизстан	unistream	RUB	1.00	100.00	435000.00	\N
41b51caa-50ba-4b5d-8bfc-6bb45404de5d	ПочтаБанк	Монголия	unistream	RUB	1.50	100.00	435000.00	\N
c7bb4f2c-eb2f-4ac9-88a9-2cc68317489e	ПочтаБанк	Сербия	unistream	EUR	0.50	5.00	3500.00	\N
dad9d74c-8dce-4251-9dae-e76d4359d044	Альфа-Банк	Узбекистан	bank_card	RUB	1.95	30.00	999999.00	\N
3452ea51-5983-4afd-821c-50593245a007	Альфа-Банк	Киргизия	bank_card	RUB	1.95	30.00	999999.00	\N
98c1802a-c22d-43f7-90d3-60515ae4542b	Альфа-Банк	Беларусь	bank_card	RUB	1.95	30.00	999999.00	\N
0264c065-a79c-4a37-968a-683995735d42	Альфа-Банк	Таджикистан	bank_card	RUB	1.95	30.00	999999.00	\N
cbf4c689-bcd0-4889-85f6-7135fb176de5	Альфа-Банк	Абхазия	bank_card	RUB	1.95	30.00	999999.00	\N
e646720b-d611-41b8-8a23-ef668331e36b	Альфа-Банк	Армения	bank_card	RUB	1.95	30.00	999999.00	\N
4feb0442-f925-4751-a5a5-84db2bc18fb9	Альфа-Банк	Южная Осетия	bank_card	RUB	1.95	30.00	999999.00	\N
b686d0b1-0afa-455b-bc23-e03f0eab66d8	Альфа-Банк	Казахстан	bank_card	RUB	1.95	30.00	999999.00	\N
44020bc1-2f66-45b5-8ade-be074e9744f5	ЮMoney	Армения	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
58004e49-5062-483d-9e88-e3186274a67a	ЮMoney	Узбекистан	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
fc835e78-05e5-4cfe-9139-9a6fd6824df7	ЮMoney	Киргизстан	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
b193b343-e997-45fd-83db-395970dc0e14	ЮMoney	Таджикистан	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
406e516c-5a12-4a7f-82b8-0ce7ec3a1e63	ЮMoney	Беларусь	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
62cecf09-5983-4e23-b26b-b01553738538	ЮMoney	Южная Осетия	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
bd539798-9991-4a15-b6b6-8bee2217f40b	ЮMoney	Азербайджан	bank_card	RUB	3.00	100.00	150000.00	150 тыс ₽ в сутки. 500 тыс ₽ в месяц.
1a4138c9-68f9-45c1-b54f-3f2bdea17e79	Газпромбанк	Абхазия	bank_card	RUB	1.50	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
24b0d0ed-81d2-40b8-a8fc-180071b19613	Газпромбанк	Азербайджан	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
ad10f960-2e2b-46ab-8e39-492979af22e0	Газпромбанк	Армения	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
ba8165b9-290e-43b5-b5e9-6539bf1c2b55	Сбербанк	Абхазия	mobile	RUB	1.00	0.00	1500000.00	150 тыс ₽ в сутки. 1,5 млн ₽ в месяц.
6f3d0f96-b4c2-4657-a26d-0a415fb3ceb1	Сбербанк	Азербайджан	mobile	RUB	0.00	0.00	150000.00	\N
79d6dc62-333e-433e-96f0-aa94ee4fbf58	Сбербанк	Азербайджан	bank_card	RUB	0.00	0.00	300000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
930eef81-ef92-4775-9786-8769a253b258	Сбербанк	Армения	account number	RUB	2.00	0.00	999999.00	перевод за рубеж по номеру счёта в офисе Сбербанка
6cff129d-809a-4b45-9efd-9520830f336e	Сбербанк	Армения	mobile	RUB	1.00	0.00	75000.00	150 тыс ₽ в сутки, 1,5 млн ₽ в месяц
6bc16497-8777-4820-9d31-507c017f7e39	Сбербанк	Армения	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
3bd8c9bd-d1bc-4149-91c3-ece10411ae08	Сбербанк	Беларусь	mobile	RUB	1.00	0.00	50000.00	50 тыс ₽ в сутки, 1,5 млн ₽ в месяц
8bf09f4e-41b7-4bf9-b729-453bf81e74c3	Сбербанк	Беларусь	bank_card	RUB	0.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
c56d8038-1f53-4490-833a-42b8e4aceee7	Сбербанк	Грузия	account number	RUB	1.00	0.00	75000.00	\N
2f6c917c-d138-43ea-aad6-84e48086dfe8	Сбербанк	Грузия	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
122a7e3b-dc1c-4180-a396-57721bd1e039	Сбербанк	Индия	account number	RUB	1.00	0.00	75000.00	\N
43f04a06-54ea-41ee-8417-11f70c01eb1a	Сбербанк	Индонезия	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
b7ffe6e0-a0b8-4b29-b779-34203d6d8d45	Сбербанк	Иран	account number	RUB	2.00	0.00	999999.00	Перевод за рубеж по номеру счёта в офисе Сбербанка
ca9c7482-ed22-40e5-b1e7-f0011f6034d6	Сбербанк	Казахстан	account number	RUB	2.00	0.00	999999.00	Перевод за рубеж по номеру счёта в офисе Сбербанка
13e597c7-9d03-461b-bdb6-aeb75f7394eb	Сбербанк	Казахстан	bank_card	RUB	0.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
4e9e3587-9eb8-418a-93e0-7dfc116f8ee3	Сбербанк	Киргизия	account number	RUB	2.00	0.00	999999.00	Перевод за рубеж по номеру счёта в офисе Сбербанка
225e9d58-4ede-4f2f-8541-d8f56eadf9f9	Сбербанк	Киргизия	bank_card	RUB	0.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
47b495bd-05ac-440d-9022-d37a0a6fc265	Сбербанк	Киргизия	cash	RUB	1.50	0.00	200000.00	500 тыс ₽ на одну операцию и в сутки, 600 тыс ₽ в месяц
73344ddd-5b41-44f9-9ed2-26d3e9304efb	Сбербанк	Китай	bank_card	RUB	0.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
9000a8e1-a6cc-48b4-8021-0512b9ba5574	Сбербанк	Кыргызстан	account number	RUB	2.00	0.00	999999.00	Перевод за рубеж по номеру счёта в офисе Сбербанка
1583a866-55ed-4837-8b1e-4b9b90cde015	Сбербанк	Кыргызстан	bank_card	RUB	0.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
74d8ebdf-0eac-4a12-ba1f-d05da8860cb8	Сбербанк	Кыргызстан	cash	RUB	1.50	0.00	200000.00	200 тыс ₽ на одну операцию и в сутки, 600 тыс ₽ в месяц
943125a6-1418-405b-a78a-6f4ee8cba22b	Сбербанк	Молдова	mobile	RUB	1.00	0.00	150000.00	150 тыс ₽ в сутки 1,5 млн ₽ в месяц
8dc5423f-6220-4309-86bc-ba2010cb33d0	Сбербанк	Монголия	cash	RUB	1.50	0.00	200000.00	200 тыс ₽ на одну операцию и в сутки, 600 тыс ₽ в месяц
d8fd5665-9c90-46ef-86b4-07e5e098db0d	Сбербанк	ОАЭ	cash	RUB	2.00	0.00	999999.00	\N
4ad3d964-498a-4a46-8713-252fc3dbb42a	Сбербанк	ОАЭ	account number	RUB	1.00	0.00	75000.00	\N
5fee52fd-7e31-4d4f-8915-b5f57b4161a1	Сбербанк	ОАЭ	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
3921e716-bc75-4428-9788-560fa2053822	Сбербанк	Сербия	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
9035665d-9338-47e5-aae3-1ba10434d37c	Сбербанк	Таджикистан	account number	RUB	2.00	0.00	999999.00	Перевод за рубеж по номеру счёта в офисе Сбербанка
e5868e5d-ca6a-48a4-b6c7-a614fdf2616c	Сбербанк	Таджикистан	mobile	RUB	1.00	0.00	150000.00	150 тыс ₽ в сутки 1,5 млн ₽ в месяц для резидентов, 600 тыс ₽ в месяц для нерезидентов
78e3c1f5-e7d0-46f9-88aa-7661f86c5f32	Сбербанк	Таджикистан	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
7d10bafe-96a5-4297-90d0-a9623a5d328c	Сбербанк	Таджикистан	cash	RUB	1.50	0.00	200000.00	200 тыс ₽ на одну операцию и в сутки, 600 тыс ₽ в месяц
2967f284-c0e4-4ad6-a6a7-0c47cb7492d0	Сбербанк	Тайланд	account number	RUB	1.00	0.00	75000.00	\N
2ab504b7-7b11-4a49-89cc-b12fc4493309	Сбербанк	Тайланд	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
2442d421-c406-48c0-81a3-78471997241a	Сбербанк	Турция	account number	RUB	1.00	0.00	75000.00	\N
4c2ed44a-005f-4678-83f4-0b65af9609ea	Сбербанк	Турция	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
50796029-03d8-4746-8377-c5f98090d0d3	Сбербанк	Узбекистан	account number	RUB	2.00	0.00	999999.00	Перевод за рубеж по номеру счёта в офисе Сбербанка
36901f10-71d5-47db-98da-86acd2a84a58	Сбербанк	Узбекистан	account number	RUB	1.00	0.00	75000.00	150 тыс ₽ в сутки 600 тыс ₽ в месяц
80eecab5-9a8e-42b7-a287-c1f29b97f33c	Сбербанк	Узбекистан	mobile	RUB	0.00	0.00	150000.00	150 тыс ₽ в сутки 600 тыс ₽ в месяц
73821852-bd35-4c26-91f7-088bd29b21c8	Сбербанк	Узбекистан	cash	RUB	1.50	0.00	200000.00	200 тыс ₽ на одну операцию и в сутки, 600 тыс ₽ в месяц
6a650759-36c7-46e8-af05-507f77a48027	Сбербанк	Филиппины	mobile	RUB	1.00	0.00	80000.00	80 тыс ₽ в сутки 150 тыс ₽ в месяц
ef47512f-88ff-41a3-942c-faf071d013d6	Сбербанк	Южная Осетия	bank_card	RUB	1.00	0.00	500000.00	500 тыс ₽ в сутки 3 млн ₽ в месяц
b60f1ae9-d74c-4b25-b8ee-34a20e43c1a5	ВТБ	Казахстан	account_number	KZT	1.00	300.00	20000000.00	\N
bd6b71d4-bcac-4b33-896f-c9e89a6e27da	ВТБ	Казахстан	bank_card	RUB	0.50	50.00	20000000.00	\N
eb06f5d0-1d60-4dab-92c6-e3e578a2c0ba	Газпромбанк	Армения	mobile	RUB	1.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
dbac71a2-6fd7-428f-82c4-4ac40703c856	Газпромбанк	Беларусь	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
0e66da8d-a266-4894-bdab-5d054c25018f	Газпромбанк	Беларусь	mobile	RUB	1.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
f3ef8e60-c83c-4fb4-a941-36f59c05802f	Газпромбанк	Грузия	IBAN	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
24beb4cf-6200-44aa-ad8b-e19185216bd2	Газпромбанк	Грузия	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
117eecaf-58bf-4316-9bbd-9914b056fe80	Газпромбанк	Казахстан	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
f9ebca6d-16e4-44f9-9499-38f097fd48f1	Газпромбанк	Казахстан	bank_card	KZT	1.50	0.00	999999.00	\N
ab81657c-668f-44c3-bb92-e2ced73ed123	Газпромбанк	Киргизстан	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
0f5adf68-fd81-4ef6-b58f-159ebe3a711d	Газпромбанк	Киргизстан	mobile	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
3b0b4dfe-5528-4949-82bf-fd3260dcee61	Газпромбанк	Киргизстан	bank_card	KGS	1.50	0.00	999999.00	\N
7814b99c-671d-4422-ad0a-73937228e541	Газпромбанк	Приднестровье	mobile	RUB	1.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
19b8813b-b2a6-47ec-8aa5-b9cb79448634	Газпромбанк	Таджикистан	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
2c7d595f-6ff1-4f72-996d-a91bd13648a2	Газпромбанк	Таджикистан	mobile	RUB	1.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
b1adaff6-24dc-49c2-9afe-082b94a07d6f	Газпромбанк	Таджикистан	bank_card	TJS	1.50	0.00	999999.00	\N
ddad6525-1e9c-48a5-9f96-14e88345d0d2	Газпромбанк	Узбекистан	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
17be6daa-3032-45c4-9cf8-0029b714d346	Газпромбанк	Узбекистан	mobile	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
f8590730-7475-4307-87f5-a7621f2dd3cc	Газпромбанк	Южная Осетия	bank_card	RUB	1.50	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
6eb9fe72-2826-433c-9f85-22a13673c974	Газпромбанк	ОАЭ	IBAN	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
0e98fd02-d7ca-4b46-8ec5-d2cca9f70057	Газпромбанк	Китай	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
1858dc9b-0841-4d34-9109-326c4dbf1ba2	Газпромбанк	Вьетнам	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
8e7d73f7-717d-47bc-81c3-6a6ee029d3b6	Газпромбанк	Сербия	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
9107a430-0d8c-4482-b1e6-7cec67bb86de	Газпромбанк	Таиланд	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
8913d96d-cc83-4070-8ff1-054775f7e8fb	Газпромбанк	Турция	bank_card	RUB	0.00	0.00	300000.00	300 тыс ₽ в сутки. 3 млн ₽ в месяц.
b969f3c9-074a-420f-8c4e-60ed9cc075f2	MTC Банк	Казахстан	bank_card	RUB	0.00	200.00	400000.00	\N
bef24263-09b3-46f3-bbf4-9ea12372ad69	MTC Банк	Азербайджан	bank_card	RUB	0.00	200.00	400000.00	\N
5eec9b25-c9df-4967-aa6d-806380765799	MTC Банк	Узбекистан	FN	RUB	0.00	100.00	450000.00	\N
93f07de8-6a9d-4c5c-b499-9e707120af63	MTC Банк	Кыргызстан	bank_card	RUB	0.00	200.00	400000.00	\N
6f1de130-77e4-4400-87bf-1a9b0584249c	MTC Банк	Узбекистан	bank_card	RUB	0.00	200.00	400000.00	\N
a50320f2-4e44-49db-9213-c1c6ef3130a3	MTC Банк	Таджикистан	bank_card	RUB	0.00	200.00	400000.00	\N
f791210f-3fc0-47cd-9f62-994fc191a8bc	MTC Банк	Армения	bank_card	RUB	0.00	200.00	400000.00	\N
40199039-fdb0-43f5-8394-b4f185b5347a	MTC Банк	Турция	bank_card	RUB	0.00	200.00	400000.00	\N
bfe8acbb-2de6-4054-8f13-fc051158d207	MTC Банк	Кыргызстан	FN	RUB	0.00	100.00	450000.00	\N
78a6ba6b-2a5e-4522-ac49-8f3158793bd6	MTC Банк	Узбекистан	FN	RUB	0.00	100.00	50000.00	\N
421cbaf3-5dcd-4673-9969-b6d61a729ed4	MTC Банк	Таджикистан	FN	RUB	0.00	50.00	295500.00	\N
9a70c3a4-9dc2-43af-8fe5-e979dc3df536	MTC Банк	Армения	FN	RUB	0.00	100.00	435000.00	\N
c4e0bbb3-cff8-4655-9815-c403eefd2fa7	Банк УРАЛСИБ	Австралия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
85aceb9a-53c9-4492-993b-8089e1fc0f17	Банк УРАЛСИБ	Австрия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
b4b4b290-55b3-4c5f-806c-78a388de9375	Банк УРАЛСИБ	Азербайджан	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
834239f3-3cfd-4ee1-a851-293bbca0b9b6	Банк УРАЛСИБ	Албания	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
820d2164-6fed-4765-bd03-2928f3b861cc	Банк УРАЛСИБ	Алжир	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
c616377c-f058-4be6-9165-0f4a07e4a9d3	Банк УРАЛСИБ	Андорра	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
a94aab59-538b-4e98-8589-0e5a838163e7	Банк УРАЛСИБ	Аргентина	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3db0640d-969f-449a-8f0f-76578a4a8f34	Банк УРАЛСИБ	Армения	mobile	RUB	1.00	1.00	150000.00	150 тыс ₽ в сутки. 1.5 млн ₽ в месяц
bfe9e2b9-4ec7-4efd-82c2-4d34fc0ed30f	Банк УРАЛСИБ	Армения	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
110b1238-ef02-46e6-8bc2-55bf1d1641d9	Банк УРАЛСИБ	Бахрейн	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
a82c9ed2-7d96-4773-8ec5-ae49e2470615	Банк УРАЛСИБ	Беларусь	mobile	RUB	1.00	10.00	600000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
6b9f2130-29e8-4eb6-a567-3dae4f53bce5	Банк УРАЛСИБ	Беларусь	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
0e099725-c2d4-4087-a9b3-3824ec262baf	Банк УРАЛСИБ	Бельгия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
cb3c6a13-fad1-4a7b-a0c6-9b4985b6dfd8	Банк УРАЛСИБ	Болгария	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
d6e73690-9b26-4506-9dc4-f661a6686770	Банк УРАЛСИБ	Босния и Герцеговина	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
0d09c864-3a96-4fe5-94cb-3603e68a5045	Банк УРАЛСИБ	Бразилия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3473dfab-7aac-4451-ad1f-932fe2243645	Банк УРАЛСИБ	Великобритания	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
b4a555bc-6e26-439b-8723-170dc9885b53	Банк УРАЛСИБ	Венгрия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
ac095750-cd7f-420a-85b1-b34df6e276c7	Банк УРАЛСИБ	Вьетнам	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
1c0a0dfc-6873-49a8-816e-1e8cf2e0b0ba	Банк УРАЛСИБ	Германия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
fee7e172-b6ae-4e4f-8aaf-7a395b7a671a	Банк УРАЛСИБ	Гонконг	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
7247d707-fb9a-4df8-a739-1c7dcb59bfb6	Банк УРАЛСИБ	Греция	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
b7892b29-e0f7-4faf-8dc2-dd0f88f06bdd	Банк УРАЛСИБ	Грузия	IBAN	RUB	1.00	1000.00	400000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
bbaf41cc-730d-4fec-9448-bff20edde5a4	Банк УРАЛСИБ	Грузия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3ad612ec-5ef4-4f94-8fc8-11be31e29cd1	Банк УРАЛСИБ	Дания	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
23eaa3b0-aa2f-439d-9303-0718cc1fceaf	Банк УРАЛСИБ	Египет	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
11667de2-b42c-4ac6-bd21-30fe50b0d0a3	Банк УРАЛСИБ	Израиль	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
71304b80-537f-43d5-b5bd-716c41f188ec	Банк УРАЛСИБ	Индия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
67352043-fc9f-4d00-ba88-6528909384a9	Банк УРАЛСИБ	Индонезия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
89a20752-903e-4101-948c-42ee0dad4c98	Банк УРАЛСИБ	Иордания	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
48409f4a-dcfa-4163-8348-83e590ad86f4	Банк УРАЛСИБ	Ирландия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
60faa994-5faf-4856-bfc2-4b7b0d0e3aed	Банк УРАЛСИБ	Исландия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
f4c3c2bf-1928-48c4-90e1-09e7f5424df9	Банк УРАЛСИБ	Испания	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
94cacdaa-8369-4c85-be0e-620d6509fb38	Банк УРАЛСИБ	Италия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
e173179c-3488-4222-8f44-ccd2e859e43a	Банк УРАЛСИБ	Казахстан	bank_card	RUB	1.00	2000.00	180000.00	180 тыс ₽ в сутки. 3 млн ₽ в месяц
86afc56f-6945-49e3-9d72-ffdc2253f243	Банк УРАЛСИБ	Казахстан	mobile	RUB	1.00	10.00	600000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
cfdf64c9-8f55-40f9-84ae-6b9e63e35762	Банк УРАЛСИБ	Камбоджа	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
61f7e6ac-1ae2-4b15-bfb6-a5bc6fe8d4e7	Банк УРАЛСИБ	Камерун	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
7976669e-bb35-41cc-a616-d2f5fd765397	Банк УРАЛСИБ	Канада	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
6e2a4ed7-5ed3-45cd-bee4-40e4f9ebcf3e	Банк УРАЛСИБ	Кипр	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
9ead8a5c-4216-4d4f-b5f5-c02b93e39883	Банк УРАЛСИБ	Китай	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
1b0f9765-10ba-41cf-916b-78c1bc2b82c1	Банк УРАЛСИБ	Киргизстан	account_number	RUB	1.00	100.00	400000.00	400 тыс ₽ в сут
0d95b4e7-9589-4b0f-af63-af30ab791128	Банк УРАЛСИБ	Киргизстан	bank_card	RUB	1.00	100.00	500000.00	500 тыс ₽ в сутки. 3 млн ₽ в месяц
52fc5bd0-e5fa-4be1-a515-4f38d0b4dce1	Банк УРАЛСИБ	Киргизстан	mobile	RUB	1.00	100.00	80000.00	\N
82f91b4b-0658-4298-b8f3-46edfef7b268	Банк УРАЛСИБ	Лаос	mobile	RUB	1.00	10.00	700000.00	\N
989baea3-d99c-42a7-ba25-999a7fdcbb15	Банк УРАЛСИБ	Лаос	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3f2f697a-e6ff-408c-9a13-6ab59051c7c1	Банк УРАЛСИБ	Латвия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
f6d95ffe-2845-459c-a472-b192ce031eb9	Банк УРАЛСИБ	Ливан	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
266d9567-210c-4c94-b910-0225a3b4f498	Банк УРАЛСИБ	Литва	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
e8f519c8-93cf-4b76-9618-05d4c46f4336	Банк УРАЛСИБ	Люксембург	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
906b17f7-3dcc-4be9-8208-34cbb61fd5b3	Банк УРАЛСИБ	Малайзия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
c437eb3b-a6e8-4c0e-8477-e7148e5b84e2	Банк УРАЛСИБ	Мальдивы	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3880b2b4-3bc4-4a3b-89e3-93ceb8da6e1e	Банк УРАЛСИБ	Марокко	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
079deaf0-b79c-450c-b4d4-f40b30aa6992	Банк УРАЛСИБ	Мексика	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
841a2118-c13a-4b91-96c9-9576f57abcfc	Банк УРАЛСИБ	Монако	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
a6e72025-cbcd-4140-a94b-af33bd73b4ea	Банк УРАЛСИБ	Монголия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
ebf674d4-4e8c-4b61-9440-2d883b62b1d0	Банк УРАЛСИБ	Непал	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
c8b79a86-7b94-4858-8706-b44b04783223	Банк УРАЛСИБ	Нидерланды	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
7ac2f09e-8ebd-4318-9d66-1130aa07024e	Банк УРАЛСИБ	Новая Зеландия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
a61837cc-9224-4844-a0b5-43b4efa83a89	Банк УРАЛСИБ	Норвегия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
b04956d7-fc34-4fba-9284-84055678ebb4	Банк УРАЛСИБ	ОАЭ	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
153a238e-c7f5-4eb5-9a93-e47ec5024232	Банк УРАЛСИБ	Оман	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
13358799-5943-4dfc-9d4b-8115b838811a	Банк УРАЛСИБ	Палестина	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
46b2fd86-70ab-4c30-bfea-ca95d0158033	Банк УРАЛСИБ	Панама	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
d1f0f1f1-d185-4d57-866a-a66411cfe4c0	Банк УРАЛСИБ	Парагвай	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
c860da62-3fd0-4970-8c10-86d9c80aa77d	Банк УРАЛСИБ	Перу	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
60b2dbfd-2aba-41eb-98c9-43eee86c35cc	Банк УРАЛСИБ	Польша	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
d588dca8-da36-409e-af33-02db472a55ee	Банк УРАЛСИБ	Португалия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
7c6a1dd3-f60a-487b-90f2-c99fc882ea0b	Банк УРАЛСИБ	Приднестровье	mobile	RUB	1.00	1.00	150000.00	150 тыс ₽ в сутки. 1.5 млн ₽ в месяц
bbfa2440-1687-4eb4-aba8-37509b3f450e	Банк УРАЛСИБ	Республика Доминикана	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
37471e97-4730-4789-bec9-007e7a5d8e94	Банк УРАЛСИБ	Республика Македония	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
a39f2b39-e26d-4295-a309-9388d901b9b5	Банк УРАЛСИБ	Румыния	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
2d5184d9-dec1-412b-8028-a81678ebd9ac	Банк УРАЛСИБ	Саудовская Аравия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
51f88d8e-439a-4185-8bcb-8a9c8fc9fc1c	Банк УРАЛСИБ	Сейшелы	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
cbcee4a9-1924-4bb6-ba3b-6b47d7fea83e	Банк УРАЛСИБ	Словакия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
28c05f7a-1e44-45db-8843-91f36e5112d3	Банк УРАЛСИБ	Словения	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
a79c0efe-b6d7-40ab-acbd-d90d78e70bc5	Банк УРАЛСИБ	Таджикистан	mobile	RUB	1.00	1.00	100000.00	100 тыс ₽ в сутки. 600 тыс ₽ в месяц
efd968cb-15c8-484e-9d06-6742307a45a9	Банк УРАЛСИБ	Узбекистан	mobile	RUB	1.00	1.00	100000.00	100 тыс ₽ в сутки. 600 тыс ₽ в месяц
041be6b2-4244-497c-94e2-15cff0656d88	Банк УРАЛСИБ	Узбекистан	bank_card	RUB	1.00	100.00	120000.00	500 тыс ₽ в сутки. 3 млн ₽ в месяц
19e96dbf-03de-4184-800e-76f151e680ad	Банк УРАЛСИБ	Уругвай	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
6af4ca3e-cfcd-4932-957a-76e9d842c9f3	Банк УРАЛСИБ	Филиппины	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
080f8640-14c0-49ff-ba9c-ff6ef630814f	Банк УРАЛСИБ	Финляндия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
642f1385-33c6-448c-8bed-6e4cde6eb21d	Банк УРАЛСИБ	Франция	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
42f7ac3c-1da3-46af-98b5-fca99c08f5ca	Банк УРАЛСИБ	Хорватия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3d816f85-86f1-4cf7-8e96-4ab8420d98f5	Банк УРАЛСИБ	ЦАР	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
bf184bda-6c55-4b36-ad65-21349ef2fb29	Банк УРАЛСИБ	Черногория	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
ed7ff919-db28-4825-90ea-1efcd1c46725	Банк УРАЛСИБ	Чехия	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
e5e34c34-2cc4-466d-8eca-fd73cff21b1a	Банк УРАЛСИБ	Чили	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
c2d08b03-aa9c-4172-bb41-bb775ec21044	Банк УРАЛСИБ	Швейцария	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
e321e0d5-e29a-402d-ad81-1df96bc1b6af	Банк УРАЛСИБ	Швеция	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
9f89b701-fb15-404c-9309-0076a6a6e4d7	Банк УРАЛСИБ	Шри-Ланка	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
3bd6f2ee-0bf2-4912-8424-1c3f924a7e70	Банк УРАЛСИБ	Эквадор	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
4fa66ef4-5bb8-47b2-985a-7cb5fec56962	Банк УРАЛСИБ	Эстония	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
d0e286d6-1465-49f5-8410-0dbe4d40c19e	Банк УРАЛСИБ	Южная Африка	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
51db7fec-f70c-42a6-8d97-ff4305ab67d1	Банк УРАЛСИБ	Южная Корея	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
6f81b244-857b-4c65-bc28-c307449754a4	Банк УРАЛСИБ	Япония	bank_card	RUB	1.00	3000.00	700000.00	700 тыс ₽ в сутки. 5 млн ₽ в месяц
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, country, picture) FROM stdin;
\.


--
-- Data for Name: exchange_methods_all; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exchange_methods_all (id, currency, category, buy, sell, quantity) FROM stdin;
18496	USD	exchange_rates_office_cashless	77.2	86.8	1
18497	EUR	exchange_rates_office_cashless	86.7	96.8	1
18498	CNY	exchange_rates_office_cashless	10.3	12.5	1
18499	GBP	exchange_rates_office_cashless	67	161	1
18500	CHF	exchange_rates_office_cashless	57	151	1
18501	KZT	exchange_rates_office_cashless	0.13	0.2	1
18502	TRY	exchange_rates_office_cashless	1.3	3.4	1
18503	HKD	exchange_rates_office_cashless	5.8	16.2	1
18504	USD	exchange_rates_office_cashless_premium	77.3	86.7	1
18505	EUR	exchange_rates_office_cashless_premium	86.8	96.7	1
18506	CNY	exchange_rates_office_cashless_premium	10.4	12.4	1
18507	GBP	exchange_rates_office_cashless_premium	67.5	160	1
18508	CHF	exchange_rates_office_cashless_premium	57.5	150	1
18509	KZT	exchange_rates_office_cashless_premium	0.14	0.2	1
18510	TRY	exchange_rates_office_cashless_premium	1.34	3.36	1
18511	HKD	exchange_rates_office_cashless_premium	6	16	1
18512	USD	exchange_rates_internet_bank	86.5	77.5	1
18513	EUR	exchange_rates_internet_bank	96.5	87	1
18514	CNY	exchange_rates_internet_bank	12.2	10.6	1
18515	GBP	exchange_rates_internet_bank	160	67.5	1
18516	CHF	exchange_rates_internet_bank	150	57.5	1
18517	XAU	exchange_rates_internet_bank	9303.8	7702.68	1
18518	KZT	exchange_rates_internet_bank	0.19	0.13	1
18519	TRY	exchange_rates_internet_bank	3.05	1.65	1
18520	HKD	exchange_rates_internet_bank	14.1	7.9	1
18521	USD	exchange_rates_office_cash	92	80	1
18522	EUR	exchange_rates_office_cash	98.5	91.5	1
18523	CNY	exchange_rates_office_cash	12.3	10.8	1
18524	GBP	exchange_rates_office_cash	157	61.8	1
18525	CHF	exchange_rates_office_cash	147	51.8	1
18526	USD	exchange_rates_cards	88.75	75.65	1
18527	EUR	exchange_rates_cards	99.65	86.55	1
18528	CNY	exchange_rates_cards	12.2	10.8	1
18529	KZT	exchange_rates_cards	0.17	0.15	1
18530	JPY	exchange_rates_cards	0.619	0.534	1
\.


--
-- Data for Name: servis_fitbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servis_fitbacks (id, score, comments) FROM stdin;
\.


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, false);


--
-- Name: exchange_methods_all_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exchange_methods_all_id_seq', 18561, true);


--
-- Name: servis_fitbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servis_fitbacks_id_seq', 1, false);


--
-- Name: bank_sistem bank_sistem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_sistem
    ADD CONSTRAINT bank_sistem_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: exchange_methods_all exchange_methods_all_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchange_methods_all
    ADD CONSTRAINT exchange_methods_all_pkey PRIMARY KEY (id);


--
-- Name: servis_fitbacks servis_fitbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servis_fitbacks
    ADD CONSTRAINT servis_fitbacks_pkey PRIMARY KEY (id);


--
-- Name: ix_bs_bank_country_method_curr; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_bs_bank_country_method_curr ON public.bank_sistem USING btree (bank, country, method, currency);


--
-- Name: ix_countries_country; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_countries_country ON public.countries USING btree (country);


--
-- Name: ix_countries_picture; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_countries_picture ON public.countries USING btree (picture);


--
-- Name: ix_exchange_methods_all_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_exchange_methods_all_category ON public.exchange_methods_all USING btree (category);


--
-- Name: ix_exchange_methods_all_currency; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_exchange_methods_all_currency ON public.exchange_methods_all USING btree (currency);


--
-- Name: ix_exchange_rates_currency_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_exchange_rates_currency_category ON public.exchange_methods_all USING btree (currency, category);


--
-- PostgreSQL database dump complete
--

