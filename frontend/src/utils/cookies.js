const setCookie = (cname, cvalue, exdays) => {
    console.log("Esto es el setcookie")
    console.log(cname)
    // cookie name, value, expiration in days
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/;domain=";SameSite=None`;
    console.log("document")
    console.log(document.cookie)
}

const getCookie = (cname) => {
    // cookie name
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export {
    setCookie,
    getCookie,
    deleteCookie
}