const form = document.querySelector(".form");
const nameError = document.querySelector(".nameError");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");
const confirmPasswordError = document.querySelector(".confirmPasswordError");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset error messages
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  // Get input values
  const fullname = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  // Validate name
  // Fullname ususally contains space. But instruction said "name should contain only letters" means (A-Z, a-z)
  // "regex" is a little different if we want to use " " with "A-Z" & "a-z"
  // So user can't put space between name
  if (fullname === "") {
    nameError.textContent = "Name is required";
  } else if (!isValidName(fullname)) {
    nameError.textContent = "Name should contain only letters";
  }

  // Validate email
  if (email === "") {
    emailError.textContent = "Email is required";
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Invalid email address";
  }

  // Validate password
  if (password === "") {
    passwordError.textContent = "Password is required";
  } else if (!isValidPassword(password)) {
    passwordError.textContent =
      "Password should have a minimum length of 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit";
  }

  // Validate confirm password
  if (confirmPassword === "") {
    confirmPasswordError.textContent = "Confirm Password is required";
  } else if (confirmPassword !== password) {
    confirmPasswordError.textContent =
      "Confirm Password does not match Password";
  }

  if (
    nameError.textContent === "" &&
    emailError.textContent === "" &&
    passwordError.textContent === "" &&
    confirmPasswordError.textContent === ""
  ) {
    alert(
      "Form submitted successfully. Check console to see the submitted data"
    );
    console.log({ fullname, email, password, confirmPassword });
    form.reset();
  }
});

// Validator regex functions
const isValidName = (name) => /^[A-Za-z]+$/.test(name);
// /^[A-Za-z\s]+$/ if we want to use space between name

const isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
const isValidPassword = (password) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
