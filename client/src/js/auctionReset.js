export async function resetAuctionOnServer(auctionId) {
    try {
        const response = await fetch(`http://localhost:3000/api/items`, {
            method: 'POST', // Assuming you want to reset the auction with a POST request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for authentication
            },
            body: JSON.stringify({}) // Send any required data if necessary
        });

        if (!response.ok) {
            throw new Error('Failed to reset auction');
        }

        const updatedAuction = await response.json(); // Parse the JSON response
        return updatedAuction; // Return the updated auction data

    } catch (error) {
        console.error('Error resetting auction:', error);
        throw error; // Rethrow error for further handling in the calling function
    }
}