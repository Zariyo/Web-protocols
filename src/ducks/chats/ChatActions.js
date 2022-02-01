export const CHAT_ADD = 'CHAT_ADD';
export const CHAT_DELETE = 'CHAT_DELETE';
export const CHAT_EDIT = 'CHAT_EDIT';
export const CHAT_COMPLETE = 'CHAT_COMPLETE';
export const CHATS_UPDATE = 'CHAT_UPDATE';

export const addChatAction = (payload) => ({
    type: CHAT_ADD,
    payload
});

export const deleteChatAction = (payload) => ({
    type: CHAT_DELETE,
    payload
})

export const editChatAction = (payload) => ({
    type: CHAT_EDIT,
    payload
})

export const completeChatAction = (payload) => ({
    type: CHAT_COMPLETE,
    payload
})

export const updateChatsAction = (payload) => ({
    type: CHATS_UPDATE,
    payload
})
