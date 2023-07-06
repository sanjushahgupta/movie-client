
import React from "react";
import { useState } from "react";

import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([{
        id: 1, title: "Baahubali: The Beginning", genre: "Romance",
        image: "https://occ-0-1722-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABYYaWXZ96JkcRnh4H4Neh3oygYJQZSBsqwsVxPskNhZHq-UH79GO38kwyK3rjd6ZsdxlhiP9XKVMr5t9vlDLmTToLRAM.jpg"
    }, {
        id: 2, title: "Mahanti", genre: "Biopic",
        image: "https://chotanews.blob.core.windows.net/filmify-en/2023/05/Pi7_Image_MahanatiL.jpg"
    }, {
        id: 3, title: "Dumdaar Khiladi", genre: "Revenge", image: "https://i.pinimg.com/736x/41/08/0a/41080a1b00633c76f81306e06d2c515a.jpg"
    }

    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    if (selectedMovie) {
        return <MovieView selectedMovie={selectedMovie}
            onBackButtonClick={() => setSelectedMovie(null)} />
    }
    return (
        <div>
            {
                movies.map((movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                )))
            }

        </div>
    )
}




