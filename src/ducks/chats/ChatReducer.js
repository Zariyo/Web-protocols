import { CHAT_ADD, CHAT_DELETE, CHAT_EDIT, CHATS_UPDATE, CHAT_COMPLETE } from "./ChatActions";

export const chatReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case CHAT_ADD:
            return [...state, action.payload];
        case CHAT_DELETE:
            return [...state.filter(el => el.id !== action.payload.id)];
        case CHAT_EDIT:
            return [...state.filter(el => el.id !== action.payload.id), action.payload];
        case CHAT_COMPLETE:
            return [...state.filter(el => el.id !== action.payload.id), action.payload];
        case CHATS_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}