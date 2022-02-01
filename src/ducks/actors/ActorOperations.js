import axios from "axios";
import { addActorAction, deleteActorAction} from './ActorActions';

export const getActors = () => {
    //console.log("actors get 1")
    return async dispatch => {
        try{
            console.log("getting actors")
            await axios.post("http://localhost:5000/actors/reload")
            const response = await axios.get("http://localhost:5000/actors/");
            if(response.status === 200){
                console.log("dispatching getActors")
                response.data.allActors.map((actor)=>( dispatch(addActorAction(actor))))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}

export const deleteActor = (actor) => {
    return async dispatch => {
        try{
            console.log("deleting actor")
            const response = await axios.delete(`http://localhost:5000/actors/${actor._id}`);
            if(response.status === 200){
                console.log("dispatching deleteActor")
                dispatch(deleteActorAction(actor))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}