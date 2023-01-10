import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Gets movie details from the database.
const FetchMoviesDetails = () => {
  const [movieDetails, setDetails] = useState([]);
  const [loadingContent, toggleContentLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        toggleContentLoading(true);
        const res = await axios({
          method: "GET",
          url: "http://localhost:4000/movies/api/detailsMovies",
        });
        // console.log(res.data);
        toggleContentLoading(false);
        if (!loadingContent) {
          setDetails(res.data);
        }
      } catch (error) {
        console.error(error);
        navigate("/error500");
      }
    };
    fetchDetails();
  }, []);
  // console.log(movieDetails);

  return [movieDetails, loadingContent];
};

export default FetchMoviesDetails;
