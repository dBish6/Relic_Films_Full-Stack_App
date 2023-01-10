import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FetchMoviePosters = () => {
  const [poster, setPoster] = useState([]);
  const [loadingContent, toggleContentLoading] = useState(false);
  const navigate = useNavigate();

  // Gets images from database.
  useEffect(() => {
    const fetchPoster = async () => {
      try {
        toggleContentLoading(true);
        const res = await axios({
          method: "GET",
          url: "http://localhost:4000/movies/api/poster_path",
        });
        // console.log(res.data.poster);
        toggleContentLoading(false);

        if (!loadingContent) {
          setPoster(res.data.poster);
        }
      } catch (error) {
        console.error(error);
        navigate("/error500");
      }
    };
    // console.log(poster);
    fetchPoster();
  }, []);

  return [poster, loadingContent];
};

export default FetchMoviePosters;
