export const requestTable = () => {
  return { type: 'REQUESTED_TABLE' };
};

export const requestTableSuccess = (data) => {
  return { type: 'REQUESTED_TABLE_SUCCEEDED', dataTable: data.resources };
};

export const requestTableError = () => {
  return { type: 'REQUESTED_TABLE_FAILED' };
};

export const fetchTable = () => {
  return { type: 'FETCHED_TABLE' };
};
