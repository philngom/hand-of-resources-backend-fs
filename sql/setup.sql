-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS jokes;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS albums;

CREATE TABLE jokes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type TEXT NOT NULL,
  question TEXT NOT NULL,
  punch_line TEXT NOT NULL
);

CREATE TABLE movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT NOT NULL,
  main_cast TEXT []
);

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  year BIGINT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL
);

CREATE TABLE albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  artist TEXT NOT NULL,
  album_name TEXT NOT NULL,
  producer TEXT NOT NULL
);