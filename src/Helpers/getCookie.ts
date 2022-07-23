const getCookie = (key: string) => {
    const cookie = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return cookie ? cookie.pop() : "";

}
export default getCookie;