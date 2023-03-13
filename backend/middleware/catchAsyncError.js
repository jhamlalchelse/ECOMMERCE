module.exports =  (errorFunction) => async (req, res, next) => {
    Promise.resolve(errorFunction(req, res, next)).catch(next);
  };