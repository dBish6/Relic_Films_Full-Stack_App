CREATE OR REPLACE VIEW public."vw_popularMovies"
 AS
 SELECT movie.movie_id,
    movie.original_title,
    movie.popularity
   FROM movie
  WHERE movie.popularity > 15::double precision;

ALTER TABLE public."vw_popularMovies"
    OWNER TO "postgres";
COMMENT ON VIEW public."vw_popularMovies"
    IS 'Movies with a popularity of 15 or greater.';
