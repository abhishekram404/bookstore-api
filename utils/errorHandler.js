const errorHandler = ({ error, status, message, data, res }) => {
  console.log(error);
  return res.status(status || 500).send({
    success: false,
    message: message || "Something went wrong",
    data: data || null,
  });
};

module.exports = errorHandler;
