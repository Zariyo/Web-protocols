export const DIRECTOR_ADD = 'DIRECTOR_ADD';
export const DIRECTOR_DELETE = 'DIRECTOR_DELETE';
export const DIRECTOR_EDIT = 'DIRECTOR_EDIT';
export const DIRECTOR_COMPLETE = 'DIRECTOR_COMPLETE';
export const DIRECTORS_UPDATE = 'DIRECTOR_UPDATE';

export const addDirectorAction = (payload) => ({
    type: DIRECTOR_ADD,
    payload
});

export const deleteDirectorAction = (payload) => ({
    type: DIRECTOR_DELETE,
    payload
})

export const editDirectorAction = (payload) => ({
    type: DIRECTOR_EDIT,
    payload
})

export const completeDirectorAction = (payload) => ({
    type: DIRECTOR_COMPLETE,
    payload
})

export const updateDirectorsAction = (payload) => ({
    type: DIRECTORS_UPDATE,
    payload
})
