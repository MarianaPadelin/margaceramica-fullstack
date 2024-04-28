export default class CustomError {
  static createError({ name = "Error", cause, message, code = 1 }) {
    //el message es lo que viene nativo de node
    const error = new Error(message);
    //le agrego las props que quiera al error
    (error.name = name),
      (error.code = code),
      (error.cause = cause ? new Error(cause) : null);
    throw error;
  }
}
