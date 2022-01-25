export const MOVIE_ADD = 'MOVIE_ADD';
export const MOVIE_DELETE = 'MOVIE_DELETE';
export const MOVIE_EDIT = 'MOVIE_EDIT';
export const MOVIE_COMPLETE = 'MOVIE_COMPLETE';
export const MOVIES_UPDATE = 'MOVIE_UPDATE';

export const addMovieAction = (payload) => ({
    type: MOVIE_ADD,
    payload
});

export const deleteMovieAction = (payload) => ({
    type: MOVIE_DELETE,
    payload
})

export const editMovieAction = (payload) => ({
    type: MOVIE_EDIT,
    payload
})

export const completeMovieAction = (payload) => ({
    type: MOVIE_COMPLETE,
    payload
})

export const updateMoviesAction = (payload) => ({
    type: MOVIES_UPDATE,
    payload
})
