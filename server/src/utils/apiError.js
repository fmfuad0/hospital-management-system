class apiError extends Error {
    constructor(
        status,
        data,
        message,
        stack = ""
    ) {
        super();
        this.status = status;
        this.data = data;
        this.message = message;
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError} 