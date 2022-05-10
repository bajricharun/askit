export const setUserId = () => {
    let userId = sessionStorage.getItem('id');
    let loggedIn = false;
    if (userId !== null) {
        loggedIn = true;
    }

    return { logged: loggedIn, id: userId }
}

