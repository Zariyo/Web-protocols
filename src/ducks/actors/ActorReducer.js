import { ACTOR_ADD, ACTOR_DELETE, ACTOR_EDIT, ACTORS_UPDATE, ACTOR_COMPLETE } from "./ActorActions";

export const actorReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case ACTOR_ADD:
            return [...state, action.payload];
        case ACTOR_DELETE:
            return [...state.filter(el => el._id !== action.payload._id)];
        case ACTOR_EDIT:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case ACTOR_COMPLETE:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case ACTORS_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}