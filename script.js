// Get elements
const createBtn = document.getElementById('create-btn');
const itemNameInput = document.getElementById('item-name');
const itemDescriptionInput = document.getElementById('item-description');
const itemList = document.getElementById('item-list');

// Check if there are any items in localStorage
function loadItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    itemList.innerHTML = ''; // Clear the current list
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${item.name}</strong>: ${item.description}</span>
            <button class="update-btn" onclick="editItem(${item.id})">Edit</button>
            <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        `;
        itemList.appendChild(li);
    });
}

// Save items to localStorage
function saveItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

// Create new item
createBtn.addEventListener('click', () => {
    const name = itemNameInput.value.trim();
    const description = itemDescriptionInput.value.trim();

    if (name && description) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = {
            id: Date.now(), // Unique ID based on timestamp
            name,
            description
        };
        items.push(newItem);
        saveItems(items);
        loadItems(); // Reload items
        itemNameInput.value = ''; // Clear input fields
        itemDescriptionInput.value = '';
    } else {
        alert('Please fill in both fields.');
    }
});

// Edit item
function editItem(id) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemToEdit = items.find(item => item.id === id);

    if (itemToEdit) {
        itemNameInput.value = itemToEdit.name;
        itemDescriptionInput.value = itemToEdit.description;

        // Remove the item for editing, we'll add the updated one later
        const updatedItems = items.filter(item => item.id !== id);
        saveItems(updatedItems);
        loadItems();
    }
}

// Delete item
function deleteItem(id) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const updatedItems = items.filter(item => item.id !== id);
    saveItems(updatedItems);
    loadItems(); // Reload items
}

// Initial load
loadItems();
