import { MOVIE_ADD, MOVIE_DELETE, MOVIE_EDIT, MOVIES_UPDATE, MOVIE_COMPLETE } from "./MovieActions";

export const movieReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case MOVIE_ADD:
            return [...state, action.payload];
        case MOVIE_DELETE:
            return [...state.filter(el => el._id !== action.payload._id)];
        case MOVIE_EDIT:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case MOVIE_COMPLETE:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case MOVIES_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}