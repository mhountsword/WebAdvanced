import ItemModal from "../components/items/ItemModal.svelte";
import { items } from "./itemStore.js";

export function openEditModal(item) {
  const modal = new ItemModal({
    target: document.body,
    props: {
      formData: { ...item },
      title: "Edit Item",
      message: "",
      messageType: "",
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
            const updatedItemFromServer = await response.json();
            items.update((existingItems) =>
              existingItems.map((i) =>
                i.id === updatedItemFromServer.item.id
                  ? updatedItemFromServer.item
                  : i,
              ),
            );

            modal.$set({
              message: "Item updated successfully!",
              messageType: "success",
            });
            setTimeout(() => modal.$destroy(), 1000);
          } else {
            const errorData = await response.json();
            modal.$set({ message: errorData.message, messageType: "error" });
          }
        } catch (error) {
          modal.$set({
            message: "Failed to update item",
            messageType: "error",
          });
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
        // Update the store by removing the deleted item
        items.update((existingItems) =>
          existingItems.filter((i) => i.id !== item.id),
        );

        // Show a success message via alert
        alert("Item deleted successfully!");
      } else {
        const errorData = await response.json();
        // Show error message via alert
        alert(errorData.message);
      }
    } catch (error) {
      // Show failure message via alert
      alert("Failed to delete item");
    }
  }
}
