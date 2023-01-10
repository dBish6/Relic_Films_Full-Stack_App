CREATE VIEW public."vw_specificGenre"
 AS
SELECT m1.movie_id, m2.genre_name, m1.original_title, m1.release_date, m1.popularity FROM movie m1
JOIN (SELECT movie_id, jsonb_array_elements(genres) ->>'name' AS genre_name FROM movie) 
as m2 ON m1.movie_id = m2.movie_id;

ALTER TABLE public."vw_specificGenre"
    OWNER TO "postgres";
COMMENT ON VIEW public."vw_specificGenre"
    IS 'To get a certain movie by genre with user input at front-end.';