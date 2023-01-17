export const SuccessResponse = ({ res, data = {}, message = '', statusCode = 200 }) => {
  res.status(statusCode).send({
    statusCode,
    error: false,
    message,
    data
  })
}

export const ErrorResponse = ({ res, message, statusCode = 500, data = {} }) => {
  res.status(statusCode).send({
    statusCode,
    error: true,
    message,
    data
  })
}
