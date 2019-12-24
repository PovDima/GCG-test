export function setToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (err) {
        console.error(err);
    }
}

export function getFromLocalStorage(key) {
    try {
        return localStorage.getItem(key);

    } catch (err) {
        console.log(err);
    }
}
