// stores.js
import { writable } from 'svelte/store';

export const items = writable([]);

// Fetch initial item data when the application starts
fetch('http://localhost:3000/api/items')
    .then(response => response.json())
    .then(data => {
        items.set(data); // Initialize the store with the fetched data
    })
    .catch(error => {
        console.error("Failed to fetch initial items:", error);
    });