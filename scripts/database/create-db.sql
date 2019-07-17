\! echo === start create dbops ===

\! echo === drop database ===
DROP DATABASE IF EXISTS rant;

\! echo === drop user ===
DROP USER IF EXISTS rant;

\! echo === create user ===
CREATE USER rant WITH PASSWORD '123456';

\! echo === create database ===
CREATE DATABASE rant WITH OWNER rant ENCODING = 'UTF8';

\! echo === grant privilege ===
GRANT ALL PRIVILEGES ON DATABASE rant TO rant;
GRANT ALL ON DATABASE rant TO rant;

\c rant postgres;

\! echo === create ltree ===
create extension ltree;

\! echo === create pgcrypto ===
create extension pgcrypto;

\! echo === create tablefunc ===
create extension tablefunc;

\! echo === create uuid-ossp ===
create extension "uuid-ossp";

\q


