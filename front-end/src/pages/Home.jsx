import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// *API Services Imports*
import FetchMoviePosters from "../api_services/FetchMoviePosters";
import FetchTopMovies from "../api_services/FetchTopMovies";
import FetchMoviesDetails from "../api_services/FetchMovieDetails/FetchMovieDetails";
import FetchMovieDetailsByClick from "../api_services/FetchMovieDetails/FetchMovieDetailsByReset";
import FetchMovieDetailsBySearch from "../api_services/FetchMovieDetails/FetchMovieDetailsBySearch";
import FetchMovieDetailsByExpand from "../api_services/FetchMovieDetails/FetchMovieDetailsByExpand";
import FetchMoviesByGenre from "../api_services/FetchMoviesByGenre";

// *Design Imports*
import HomeSkeleton from "../skeletons/HomeSkeleton";
import "./home.css";

const Home = () => {
  const [poster, loadingContentPosters] = FetchMoviePosters();
  const [topFilm, loadingContentTopFilms] = FetchTopMovies();

  const [movieDetails, loadingContentMovies] = FetchMoviesDetails();
  const [fetchDetailsReset, movieDetailsReset] = FetchMovieDetailsByClick();
  const [fetchDetailsSearch, movieDetailsSearch] = FetchMovieDetailsBySearch();
  const [genreMovies, moviesByGenre] = FetchMoviesByGenre();

  const [fetchDetailsExpand, movieDetailsExpand] = FetchMovieDetailsByExpand();
  const [expandIndex, setExpandIndex] = useState(0);

  const [searchTxt, setSearchTxt] = useState("");
  const searchFormRef = useRef(null);

  // console.log(movieDetails);

  useEffect(() => {
    setTimeout(() => {
      alert(
        "This website was never really finished, I've moved on to bigger and better applications. This is a older application that was used as practice for my very last final sprint at Keyin College. Sorry, Relic Films, maybe I'll come back to you..."
      );
    }, 1000);
  }, []);

  return loadingContentPosters ||
    loadingContentMovies ||
    loadingContentTopFilms ||
    poster.length < 1 ||
    movieDetails.length < 1 ||
    topFilm.length < 1 ? (
    <HomeSkeleton />
  ) : (
    <>
      <div className="flexContainer">
        <div className="contentGridContainer">
          <aside>
            <div>
              <h3>Genres</h3>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Western");
                }}
              >
                Western
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Fantasy");
                }}
              >
                Fantasy
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Drama");
                }}
              >
                Drama
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Crime");
                }}
              >
                Crime
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Adventure");
                }}
              >
                Adventure
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Comedy");
                }}
              >
                Comedy
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Thriller");
                }}
              >
                Thriller
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Action");
                }}
              >
                Action
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Horror");
                }}
              >
                Horror
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Romance");
                }}
              >
                Romance
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Science Fiction");
                }}
              >
                Science Fiction
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Documentary");
                }}
              >
                Documentary
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Animation");
                }}
              >
                Animation
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("History");
                }}
              >
                History
              </a>
              <a
                className="genreLink"
                onClick={() => {
                  genreMovies("Mystery");
                }}
              >
                Mystery
              </a>
            </div>

            <div>
              <h3>Random Great Films</h3>
              <div>
                {topFilm &&
                  topFilm.map((film) => {
                    return (
                      <Link to={`/home/${film.movie_id}`}>
                        {film.original_title}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </aside>

          <div className="titleCard">
            <div>
              {poster &&
                poster.map((img, i) => {
                  // console.log(img.poster_path);
                  if (img === undefined || img === null) {
                    return;
                  }
                  return <img key={`stockImage${i}`} src={img.poster_path} />;
                })}
            </div>
            <div className="titleCardTextCon">
              <p>
                Explore the Relic Film's metadata! This is my first data
                fetching practice with React.
                <br />
                Developer: David Bishop
              </p>
            </div>
          </div>

          <div className="moviesContainer">
            <button onClick={() => fetchDetailsReset()}>Reset</button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchDetailsSearch(searchTxt);
                searchFormRef.current.reset();
              }}
              ref={searchFormRef}
            >
              <input
                type="text"
                name="search"
                placeholder={searchTxt.length ? searchTxt : "Search"}
                autoComplete="off"
                onChange={(e) => setSearchTxt(e.target.value)}
              />
            </form>

            <table className="movieTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Popularity</th>
                </tr>
              </thead>
              <tbody>
                {movieDetailsSearch.length
                  ? movieDetailsSearch.map((detail) => {
                      if (detail === undefined || detail === null) {
                        return;
                      }
                      return (
                        <tr>
                          <td key={detail.movie_id}>
                            <Link
                              className="tableMovieLink"
                              to={`/home/${detail.movie_id}`}
                            >
                              {detail.original_title}
                            </Link>{" "}
                            ({detail.release_date.slice(0, 4)})
                          </td>
                          <td key={detail.genre.id}>{detail.genre.name}</td>
                          <td>{detail.popularity}</td>
                        </tr>
                      );
                    })
                  : moviesByGenre.length
                  ? moviesByGenre.map((detail) => {
                      if (detail === undefined || detail === null) {
                        return;
                      }
                      return (
                        <tr>
                          <td key={detail.movie_id}>
                            <Link
                              className="tableMovieLink"
                              to={`/home/${detail.movie_id}`}
                            >
                              {detail.original_title}
                            </Link>{" "}
                            ({detail.release_date.slice(0, 4)})
                          </td>
                          <td>{detail.genre_name}</td>
                          <td>{detail.popularity}</td>
                        </tr>
                      );
                    })
                  : movieDetailsReset.length
                  ? movieDetailsReset.map((detail) => {
                      if (detail === undefined || detail === null) {
                        return;
                      }
                      return (
                        <tr>
                          <td key={detail.movie_id}>
                            <Link
                              className="tableMovieLink"
                              to={`/home/${detail.movie_id}`}
                            >
                              {detail.original_title}
                            </Link>{" "}
                            ({detail.release_date.slice(0, 4)})
                          </td>
                          <td key={detail.genre.id}>{detail.genre.name}</td>
                          <td>{detail.popularity}</td>
                        </tr>
                      );
                    })
                  : movieDetails.length
                  ? movieDetails.map((detail) => {
                      if (detail === undefined || detail === null) {
                        return;
                      }
                      return (
                        <tr>
                          <td key={detail.movie_id}>
                            <Link
                              className="tableMovieLink"
                              to={`/home/${detail.movie_id}`}
                            >
                              {detail.original_title}
                            </Link>{" "}
                            ({detail.release_date.slice(0, 4)})
                          </td>
                          <td key={detail.genre.id}>{detail.genre.name}</td>
                          <td>{detail.popularity}</td>
                        </tr>
                      );
                    })
                  : undefined}
                {movieDetailsExpand &&
                  movieDetailsExpand.map((detail) => {
                    if (detail === undefined || detail === null) {
                      return;
                    }
                    return (
                      <tr>
                        <td key={detail.movie_id}>
                          <Link
                            className="tableMovieLink"
                            to={`/home/${detail.movie_id}`}
                          >
                            {detail.original_title}
                          </Link>{" "}
                          ({detail.release_date.slice(0, 4)})
                        </td>
                        <td key={detail.genre.id}>{detail.genre.name}</td>
                        <td>{detail.popularity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <button
              onClick={() => {
                fetchDetailsExpand();
              }}
            >
              Expand
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
