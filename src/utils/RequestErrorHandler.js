const { REQUEST_RESPONSES } = require('./Constants');

export default function requestErrorsHandler(error) {
  const errorData = {
    status: REQUEST_RESPONSES.FAIL,
    message: '',
    errors: [],
  };
  if (error.response) {
    if (typeof error.response.data.errors !== 'undefined') {
      errorData.errors = error.response.data.errors;
      errorData.message = error.response.data.message;
      return errorData;
    }
    errorData.message = REQUEST_RESPONSES.UNABLE_TO_PROCESS;
    return errorData;
  } if (error.request) {
    errorData.message = REQUEST_RESPONSES.NO_RESPONSE;
    return errorData;
  }
  errorData.message = error.message;
  return errorData;
}
