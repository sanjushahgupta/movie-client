
import React, { useState } from "react";
import { MovieView } from "./movie-view";

export const MovieCard = ({ movie, onMovieClick }) => {

    return <div onClick={() => {
        onMovieClick(movie);
    }}>{movie.title}</div>;

}

