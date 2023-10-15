const setAuthHeader = (token) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
};

const removeAuthHeader = () => {
  return {
    headers: {
      Authorization: undefined,
    },
  };
};

export const authService = { setAuthHeader, removeAuthHeader };
