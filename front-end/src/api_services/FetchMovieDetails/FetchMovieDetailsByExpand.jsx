import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Gets movie details from the database.
const FetchMovieDetailsByExpand = () => {
  const [movieDetailsExpand, setDetailsExpand] = useState([]);
  const navigate = useNavigate();

  const fetchDetailsExpand = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:4000/movies/api/detailsMovies`,
      });
      if (res && res.status === 200) {
        // console.log(res.data);
        const movieTableLinks = document.querySelectorAll(".tableMovieLink");
        const allMovieIds = Array.from(movieTableLinks).map((element) => {
          const id = element.href.slice(27, -1);
          // console.log(id);
          return id;
        });
        // console.log(allMovieIds);

        res.data.forEach((detail) => {
          // console.log(detail);
          console.log(detail);
          // FIXME: Not sure if this actually works right.
          if (allMovieIds.includes(detail.movie_id)) return;

          setDetailsExpand((movieDetailsExpand) => [
            ...movieDetailsExpand,
            detail,
          ]);
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/error500");
    }
  };
  console.log(movieDetailsExpand);

  return [fetchDetailsExpand, movieDetailsExpand];
};

export default FetchMovieDetailsByExpand;
