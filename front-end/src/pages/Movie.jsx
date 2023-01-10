import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// *API Services Imports*
import FetchMovieDetailsById from "../api_services/FetchMovieDetails/FetchMovieDetailsById";

const Movie = () => {
  const { id } = useParams();
  console.log(id);
  const [movieDetails, loading] = FetchMovieDetailsById(id);
  console.log(movieDetails);

  useEffect(() => {
    setTimeout(() => {
      alert(
        "This page was never finished because I couldn't get the actors and crew, etc. So this is all:("
      );
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/home">Back Home</Link>
          <div className="movieContainer">
            {movieDetails.map((detail) => {
              return (
                <>
                  <h1>
                    {detail.original_title}
                    <span>({detail.release_date.slice(0, 4)})</span>
                  </h1>
                  <p>{detail.overview}</p>
                  <small>Quote: {detail.tagline}</small>
                  <h2>Details</h2>
                  <p key={detail.genre.id}>Genre: {detail.genre.name}</p>
                  <p>Popularity: {detail.popularity}</p>
                  <p>Popularity: {detail.runtime}</p>
                  <h3>Languages</h3>
                  <div>
                    {detail.spoken_languages.map((lang) => {
                      return (
                        <ul>
                          <li key={lang.iso_639_1}>{lang.name}</li>
                        </ul>
                      );
                    })}
                  </div>
                  <h3>Production</h3>
                  <div>
                    <b>Companies</b>
                    {detail.production_companies.map((comp) => {
                      return (
                        <ul>
                          <li key={comp.id}>{comp.name}</li>
                        </ul>
                      );
                    })}
                    <b>Countries</b>
                    {detail.production_countries.map((country) => {
                      return (
                        <ul>
                          <li key={country.iso_3166_1}>{country.name}</li>
                        </ul>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Movie;
