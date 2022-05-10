module.exports = {
    "authentication": {
        "registration": {
            "userExists": (email) => `User with email ${email} already exists.`,
            "passwordNotMatching": "Passwords don't match!",
            "createFailed": "Could not create user.",
        },
        "login": {
            "userDoesNotExist": (email) => `User with email ${email} not found.`,
            "passwordIncorrect": "Password is not correct!"
        },
        "delete": {
            "deleteFailed": "Could not delete user."
        },
        "tokenSign": {
            "failed": "Failed verifying token."
        }
    }
}