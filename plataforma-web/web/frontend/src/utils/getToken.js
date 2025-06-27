export function getAuthHeader (params = {}){
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  };
};

