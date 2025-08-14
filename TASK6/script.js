const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

function validateName() {
  const name = nameInput.value.trim();
  if (!name) {
    nameError.textContent = "Name is required.";
    return false;
  }
  if (name.length < 2) {
    nameError.textContent = "Name must be at least 2 characters.";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  if (!email) {
    emailError.textContent = "Email is required.";
    return false;
  }
  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email.";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validateMessage() {
  const message = messageInput.value.trim();
  if (!message) {
    messageError.textContent = "Message is required.";
    return false;
  }
  if (message.length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    return false;
  }
  messageError.textContent = "";
  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none"; 
    }, 3000);
    setTimeout(() => {
      form.reset();
    }, 500);
    
  } else {
    successMessage.style.display = "none";
  }
});

form.addEventListener("reset", function () {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
});
