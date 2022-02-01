import { DIRECTOR_ADD, DIRECTOR_DELETE, DIRECTOR_EDIT, DIRECTORS_UPDATE, DIRECTOR_COMPLETE } from "./DirectorActions";

export const directorReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case DIRECTOR_ADD:
            return [...state, action.payload];
        case DIRECTOR_DELETE:
            return [...state.filter(el => el._id !== action.payload._id)];
        case DIRECTOR_EDIT:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case DIRECTOR_COMPLETE:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case DIRECTORS_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}