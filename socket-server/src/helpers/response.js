const responseSuccess = (message, data) => {
  return { message, data };
};

const responseError = (error) => {
  return { error };
};

module.exports = { responseSuccess, responseError };
