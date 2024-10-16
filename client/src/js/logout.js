export function isLoggedIn() {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");

  return token ? { token, username } : null;
}

export async function handleLogout() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {
      document.body.style.cursor = "wait";
      setTimeout(() => {
        window.location.href = "/"; //redirect user to homepage after succesful logout
      }, 2000);

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
    } else if (response.status === 401) {
      // Token expired / invalid
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      console.error("Token expired or invalid. Redirecting to login.");
      window.location.href = "/login"; // Redirect to login page
    } else {
      const errorData = await response.json();
      console.error("Logout failed:", errorData.message);
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
