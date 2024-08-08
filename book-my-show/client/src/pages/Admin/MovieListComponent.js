import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import MovieForm from "./MovieForm";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movie";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";
import moment from "moment";

function MovieList() {
  const fakeMovies = [
    {
      key: "1",
      poster: "Image1",
      description: "Wolverine Vs Deadpool",
      duration: 120,
      genre: "Action",
      language: "English",
      releaseDate: "2024-08-01",
      name: "Wolverine Vs Deadpool",
    },
    {
      key: "2",
      poster: "Image2",
      description: "Wolverine Vs Deadpool",
      duration: 120,
      genre: "Action",
      language: "English",
      releaseDate: "2024-08-01",
      name: "Wolverine Vs Deadpool 2",
    },
  ];
  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            height="100px"
            style={{ objectFit: "cover" }}
            src={data.poster}
            width={"100px"}
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Mins`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `${item._id}` };
      })
    );
    dispatch(HideLoading());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex justify-content-end">
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
