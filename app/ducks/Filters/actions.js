import * as actions from './actionTypes';

export const updateField = (field, value) => ({
  type: actions.UPDATE_FILTER,
  field,
  value,
});

export const resetFilters = () => ({
  type: actions.RESET_FILTER,
});
