import ItemModal from "../components/items/ItemModal.svelte";
import { items } from "./stores.js";

export function openEditModal(item) {
  const modal = new ItemModal({
    target: document.body,
    props: {
      item: item,
      title: "Edit Item",
      saveItem: async (updatedItem) => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/items/${item.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
              body: JSON.stringify(updatedItem),
            },
          );

          if (response.ok) {
            // After a successful update, refetch the updated item from the server
            const updatedItemFromServer = await response.json();

            // Update the item in the store
            items.update((existingItems) => {
              return existingItems.map((i) =>
                i.id === updatedItemFromServer.item.id
                  ? updatedItemFromServer.item
                  : i,
              );
            });

            modal.showMessage("Item updated successfully!", "success");
            setTimeout(() => modal.$destroy(), 1000);
          } else {
            const errorData = await response.json();
            modal.showMessage(errorData.message, "error");
          }
        } catch (error) {
          modal.showMessage("Failed to update item", "error");
        }
      },
      onClose: () => {
        modal.$destroy();
      },
    },
  });
}

export async function deleteItem(item) {
  if (confirm(`Are you sure you want to delete ${item.title}?`)) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );

      if (response.ok) {
        // Remove the deleted item from the store
        items.update((existingItems) =>
          existingItems.filter((i) => i.id !== item.id),
        );
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Using an alert for delete errors
      }
    } catch (error) {
      alert("Failed to delete item"); // Using an alert for delete errors
    }
  }
}
