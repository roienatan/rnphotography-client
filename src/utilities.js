
/**
 * Checks whether the current browser is Internet Explorer
 * @returns {boolean}
 */
export function isIE() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

    return is_ie;
}

/**
 * Checks whether to show admin controls
 * @returns {boolean}
 */
export function isAdmin() {
    return sessionStorage.getItem('admin') === 'true';
}