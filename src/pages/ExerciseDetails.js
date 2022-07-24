import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import ExercicesVideos from "../components/ExercicesVideos";
import SimilarExercicess from "../components/SimilarExercicess";
import { exerciseOptions, fetchData, videoOptions } from "../utils/fetchData";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exerciseDetail, setexerciseDetail] = useState({});
  const [youtubeVids, setyoutubeVids] = useState([]);
  const [targetMuscleExercises, settargetMuscleExercises] = useState([]);
  const [equipmentExercises, setequipmentExercises] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exercisesData = await fetchData(
        `${exUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setexerciseDetail(exercisesData);

      const exerciseVideos = await fetchData(
        `${youtubeSearchUrl}/search?query=${exercisesData.name}`,
        videoOptions
      );
      setyoutubeVids(exerciseVideos);

      const targetMuscleExercisesData = await fetchData(
        `${exUrl}/exercises/target/${exercisesData.target}`,
        exerciseOptions
      );
      settargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(
        `${exUrl}/exercises/equipment/${exercisesData.equipment}`,
        exerciseOptions
      );
      setequipmentExercises(equipmentExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExercicesVideos
        youtubeVids={youtubeVids?.contents}
        name={exerciseDetail.name}
      />
      <SimilarExercicess
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetails;
