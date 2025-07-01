const USER_KEY = "usuario";

export const setSessionUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getSessionUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const removeSessionUser = () => {
    localStorage.removeItem(USER_KEY);
};