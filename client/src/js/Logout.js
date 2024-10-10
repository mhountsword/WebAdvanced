export function isLoggedIn() {
    return sessionStorage.getItem('token');
}

export async function handleLogout() {
    try {
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        if (response.ok) {
            setTimeout(() => {
                window.location.href = '/'; //redirect user to homepage after succesful logout
            }, 2000);
            sessionStorage.removeItem('token');
        } else {
            const errorData = await response.json();
            console.error("Logout failed:", errorData.message);
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
}