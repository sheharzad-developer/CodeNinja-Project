export const createError = (status, message)=>{
    const error = newError();
    err.status = status;
    err.message = message;
    return err;
}
