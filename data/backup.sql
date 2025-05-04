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
106	USD	exchange_rates_office_cashless	77.2	86.8	1
107	EUR	exchange_rates_office_cashless	86.7	96.8	1
108	CNY	exchange_rates_office_cashless	10.3	12.5	1
109	GBP	exchange_rates_office_cashless	67	161	1
110	CHF	exchange_rates_office_cashless	57	151	1
111	KZT	exchange_rates_office_cashless	0.13	0.2	1
112	TRY	exchange_rates_office_cashless	1.3	3.4	1
113	HKD	exchange_rates_office_cashless	5.8	16.2	1
114	USD	exchange_rates_office_cashless_premium	77.3	86.7	1
115	EUR	exchange_rates_office_cashless_premium	86.8	96.7	1
116	CNY	exchange_rates_office_cashless_premium	10.4	12.4	1
117	GBP	exchange_rates_office_cashless_premium	67.5	160	1
118	CHF	exchange_rates_office_cashless_premium	57.5	150	1
119	KZT	exchange_rates_office_cashless_premium	0.14	0.2	1
120	TRY	exchange_rates_office_cashless_premium	1.34	3.36	1
121	HKD	exchange_rates_office_cashless_premium	6	16	1
122	USD	exchange_rates_internet_bank	86.5	77.5	1
123	EUR	exchange_rates_internet_bank	96.5	87	1
124	CNY	exchange_rates_internet_bank	12.2	10.6	1
125	GBP	exchange_rates_internet_bank	160	67.5	1
126	CHF	exchange_rates_internet_bank	150	57.5	1
127	XAU	exchange_rates_internet_bank	9303.8	7702.68	1
128	KZT	exchange_rates_internet_bank	0.19	0.13	1
129	TRY	exchange_rates_internet_bank	3.05	1.65	1
130	HKD	exchange_rates_internet_bank	14.1	7.9	1
131	USD	exchange_rates_office_cash	92	80	1
132	EUR	exchange_rates_office_cash	98.5	91.5	1
133	CNY	exchange_rates_office_cash	12.3	10.8	1
134	GBP	exchange_rates_office_cash	157	61.8	1
135	CHF	exchange_rates_office_cash	147	51.8	1
136	USD	exchange_rates_cards	88.75	75.65	1
137	EUR	exchange_rates_cards	99.65	86.55	1
138	CNY	exchange_rates_cards	12.2	10.8	1
139	KZT	exchange_rates_cards	0.17	0.15	1
140	JPY	exchange_rates_cards	0.619	0.534	1
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

SELECT pg_catalog.setval('public.exchange_methods_all_id_seq', 140, true);


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

