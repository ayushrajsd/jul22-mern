import { axiosInstance } from "./index";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addMovie = async (value) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/movies/delete-movie/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/movies/movie/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
