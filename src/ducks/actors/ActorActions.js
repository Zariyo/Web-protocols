export const ACTOR_ADD = 'ACTOR_ADD';
export const ACTOR_DELETE = 'ACTOR_DELETE';
export const ACTOR_EDIT = 'ACTOR_EDIT';
export const ACTOR_COMPLETE = 'ACTOR_COMPLETE';
export const ACTORS_UPDATE = 'ACTOR_UPDATE';

export const addActorAction = (payload) => ({
    type: ACTOR_ADD,
    payload
});

export const deleteActorAction = (payload) => ({
    type: ACTOR_DELETE,
    payload
})

export const editActorAction = (payload) => ({
    type: ACTOR_EDIT,
    payload
})

export const completeActorAction = (payload) => ({
    type: ACTOR_COMPLETE,
    payload
})

export const updateActorsAction = (payload) => ({
    type: ACTORS_UPDATE,
    payload
})
