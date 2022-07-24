import { Box, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ setExercises, bodyPart, exercises }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const indexOfLastEx = currentPage * exercisesPerPage;
  const indexOfFirstEx = indexOfLastEx - exercisesPerPage;
  const currentEx = exercises.slice(indexOfFirstEx, indexOfLastEx);

  const paginate = (e, value) => {
    setcurrentPage(value);

    window.scrollTo({ tope: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box
      id="exercises"
      mt="50px"
      p="20px"
      sx={{
        mt: { lg: "11p0x" },
      }}
    >
      <Typography variant="h5" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          gap: { lg: "11p0x", xs: "50px" },
        }}
      >
        {currentEx.map((item, index) => (
          <ExerciseCard key={index} exercise={item} />
        ))}
      </Stack>

      <Stack mt="100px" alignItems="center">
        {exercises.length > 0 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
