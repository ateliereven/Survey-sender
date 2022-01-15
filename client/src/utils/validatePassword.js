
const reChars = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/

const validatePassword = (pass) => {
    if (pass.length < 8) {
        return 'Password must contain at least 8 characters'
    }
    if (reChars.test(pass) === false) {
        return 'Password should contain at least 1 digit, 1 uppercase letter & 1 lowercase letter'
    }
}

export default validatePassword;