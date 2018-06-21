import { createAction } from 'redux-actions';

export const selectPost = createAction('SELECT_POST');
export const unselectPost = createAction('UNSELECT_POST');
export const clearSelectedPosts = createAction('UNSELECT_ALL_POST');
