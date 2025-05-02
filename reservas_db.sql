--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-02 16:07:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 16389)
-- Name: tatamis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tatamis (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    capacidad integer NOT NULL
);


ALTER TABLE public.tatamis OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16388)
-- Name: mesas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mesas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesas_id_seq OWNER TO postgres;

--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 217
-- Name: mesas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesas_id_seq OWNED BY public.tatamis.id;


--
-- TOC entry 220 (class 1259 OID 16396)
-- Name: reservas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservas (
    id integer NOT NULL,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    numero_personas integer NOT NULL,
    tatami_id integer,
    estado character varying(20) DEFAULT 'pendiente'::character varying,
    usuario_id integer
);


ALTER TABLE public.reservas OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16395)
-- Name: reservas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservas_id_seq OWNER TO postgres;

--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 219
-- Name: reservas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservas_id_seq OWNED BY public.reservas.id;


--
-- TOC entry 222 (class 1259 OID 16418)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'cliente'::character varying,
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['cliente'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16417)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4753 (class 2604 OID 16399)
-- Name: reservas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas ALTER COLUMN id SET DEFAULT nextval('public.reservas_id_seq'::regclass);


--
-- TOC entry 4752 (class 2604 OID 16392)
-- Name: tatamis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tatamis ALTER COLUMN id SET DEFAULT nextval('public.mesas_id_seq'::regclass);


--
-- TOC entry 4755 (class 2604 OID 16421)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4916 (class 0 OID 16396)
-- Dependencies: 220
-- Data for Name: reservas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservas (id, fecha, hora, numero_personas, tatami_id, estado, usuario_id) FROM stdin;
19	2025-04-30	19:00:00	2	11	pendiente	3
12	2025-04-25	20:00:00	3	7	confirmada	\N
\.


--
-- TOC entry 4914 (class 0 OID 16389)
-- Dependencies: 218
-- Data for Name: tatamis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tatamis (id, nombre, capacidad) FROM stdin;
7	Tatami Nyan 3	3
8	Tatami Nyan 4	4
9	Tatami Nyan 5	10
10	Tatami Nyan 10	6
11	Tatami Sakura	4
\.


--
-- TOC entry 4918 (class 0 OID 16418)
-- Dependencies: 222
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, rol) FROM stdin;
1	NekoAdmin	admin@neko.com	$2b$10$WX.L4ky8kjOa5dWCrqkYteCGbx/K0gmKIg8ueIP.KUFt.bLEaiY/2	admin
3	Laura Gato	laura@neko.com	$2b$10$d/lStUZGNusLS8VuHxoiQ.mSeIQyqJhvH1vbszJhs0njtKEjgPQXK	cliente
4	Cliente Ejemplo	cliente@neko.com	$2b$10$ykmlG0kjIsqj.G6xbJOxhuYzvwgWBLniyEigHqqKWsxeI/kvrgy76	cliente
5	Sebas	sebas@neko.com	$2b$10$jJQUbJcWBUUt1zMeTsmpveXZE88f3.IRwO16iuD1JXxRZV8WtsVzG	admin
\.


--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 217
-- Name: mesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mesas_id_seq', 11, true);


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 219
-- Name: reservas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservas_id_seq', 19, true);


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);


--
-- TOC entry 4759 (class 2606 OID 16394)
-- Name: tatamis mesas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tatamis
    ADD CONSTRAINT mesas_pkey PRIMARY KEY (id);


--
-- TOC entry 4761 (class 2606 OID 16402)
-- Name: reservas reservas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 16427)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4765 (class 2606 OID 16425)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 16428)
-- Name: reservas fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE SET NULL;


--
-- TOC entry 4767 (class 2606 OID 16408)
-- Name: reservas reservas_tatami_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_tatami_id_fkey FOREIGN KEY (tatami_id) REFERENCES public.tatamis(id);


-- Completed on 2025-05-02 16:07:53

--
-- PostgreSQL database dump complete
--

