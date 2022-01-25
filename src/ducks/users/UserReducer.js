import { USER_ADD, USER_DELETE, USER_EDIT, USERS_UPDATE } from "./UserActions";

export const userReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case USER_ADD:
            return [...state, action.payload];
        case USER_DELETE:
            return [...state.filter(el => el._id !== action.payload._id)];
        case USER_EDIT:
            return [...state.filter(el => el._id !== action.payload._id), action.payload];
        case USERS_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}