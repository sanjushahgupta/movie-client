export const MovieView = ({ selectedMovie, onBackButtonClick }) => {

    return (<div>
        <div><img src={selectedMovie.image} /></div>
        <div>Title: {selectedMovie.title}</div>
        <div>Genre: {selectedMovie.genre}</div>
        <button onClick={onBackButtonClick}>Back</button>

    </div>
    )
}