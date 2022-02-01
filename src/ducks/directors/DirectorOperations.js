import axios from "axios";
import { addDirectorAction, deleteDirectorAction} from './DirectorActions';

export const getDirectors = () => {
    //console.log("directors get 1")
    return async dispatch => {
        try{
            console.log("getting directors")
            await axios.post("http://localhost:5000/directors/reload")
            const response = await axios.get("http://localhost:5000/directors/");
            if(response.status === 200){
                console.log("dispatching getDirectors")
                response.data.allDirectors.map((director)=>( dispatch(addDirectorAction(director))))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}

export const deleteDirector = (director) => {
    return async dispatch => {
        try{
            console.log("deleting director")
            const response = await axios.delete(`http://localhost:5000/directors/${director._id}`);
            if(response.status === 200){
                console.log("dispatching deleteDirector")
                dispatch(deleteDirectorAction(director))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}