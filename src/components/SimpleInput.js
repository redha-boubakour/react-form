import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameBlurHandlder,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== "");

    const emailRegex = /\S+@\S+\.\S+/;

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandlder,
        reset: resetEmailInput,
    } = useInput((value) => emailRegex.test(value.trim()));

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        console.log(enteredName, "- enteredName (submitted)");
        console.log(enteredEmail, "- enteredEmail (submitted)");

        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = nameInputHasError
        ? "form-control invalid"
        : "form-control";

    const emailInputClasses = emailInputHasError
        ? "form-control invalid"
        : "form-control";

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandlder}
                    value={enteredName}
                />
                {nameInputHasError && (
                    <p className="error-text">Name is not valid.</p>
                )}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">Your Email</label>
                <input
                    type="email"
                    id="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandlder}
                    value={enteredEmail}
                />
                {emailInputHasError && (
                    <p className="error-text">Email is not valid.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
