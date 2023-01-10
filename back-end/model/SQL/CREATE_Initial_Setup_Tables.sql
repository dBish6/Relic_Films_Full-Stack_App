CREATE DATABASE Movies;

CREATE TABLE movie (
	movie_id serial NOT NULL,
	adult boolean,
	belongs_to_collection jsonb,
	budget integer,
	genres jsonb,
	homepage text,
	imdb_id character varying(12),
	original_language character varying(3),
	original_title text,
	overview text,
	popularity float,
	poster_path text,
	production_companies jsonb,
	production_countries jsonb,
	release_date date,
	revenue BIGINT,
	runtime integer,
	spoken_languages jsonb,
	status character varying(15),
	tagline text,
	title text,
	video text,
	vote_average float,
	vote_count integer,
	PRIMARY KEY (movie_id)
);

CREATE TABLE user (
    user_id serial NOT NULL,
    username character varying(28)  NOT NULL,
    email text COLLATE NOT NULL,
    password character varying(24) NOT NULL,
    phone_number character varying(10),
    fav_genre character varying(24),
    PRIMARY KEY (user_id)
)