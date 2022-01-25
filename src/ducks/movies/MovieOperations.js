import axios from "axios";
import { addMovieAction, deleteMovieAction} from './MovieActions';

export const getMovies = () => {
    //console.log("movies get 1")
    return async dispatch => {
        try{
            console.log("getting movies")
            await axios.post("http://localhost:5000/movies/reload")
            const response = await axios.get("http://localhost:5000/movies/");
            if(response.status === 200){
                console.log("dispatching getMovies")
                response.data.allMovies.map((movie)=>( dispatch(addMovieAction(movie))))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}

export const deleteMovie = (movie) => {
    return async dispatch => {
        try{
            console.log("deleting movie")
            const response = await axios.delete(`http://localhost:5000/movies/${movie._id}`);
            if(response.status === 200){
                console.log("dispatching deleteMovie")
                dispatch(deleteMovieAction(movie))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}