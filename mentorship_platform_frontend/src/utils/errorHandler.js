export const handleError = (error) => {

  console.error(error);

  alert(
    error.response?.data?.detail ||
    error.message ||
    "Something went wrong"
  );

};