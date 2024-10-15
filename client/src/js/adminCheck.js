export function isAdmin() {
  const token = sessionStorage.getItem("token");
  if (token) {
    const decodedToken = parseJwt(token);
    return decodedToken.userRole === "admin";
  }
  return false;
}

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  return JSON.parse(jsonPayload);
}
