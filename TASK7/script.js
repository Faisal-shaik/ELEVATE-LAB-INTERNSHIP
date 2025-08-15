const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userContainer.innerHTML = "Loading...";
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    userContainer.innerHTML = ""; // clear old data

    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(card);
    });

  } catch (error) {
    userContainer.innerHTML = "❌ Failed to load data. Please check your internet connection.";
    console.error("Error fetching data:", error);
  }
}

// Load data when page opens
fetchUsers();

// Reload data when button clicked
reloadBtn.addEventListener('click', fetchUsers);
