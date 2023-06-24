import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("contact-form");
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let messageInput = document.getElementById("message");
  let nameError = document.getElementById("name-error");
  let emailError = document.getElementById("email-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";

    // Perform validation
    let isValid = true;

    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name";
      nameInput.classList.add("error");
      isValid = false;
    } else if (!isValidName(nameInput.value.trim())) {
      nameError.textContent =
        "Name should not contain numbers or special characters";
      nameInput.classList.add("error");
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email";
      emailInput.classList.add("error");
      isValid = false;
    }

    if (isValid) {
      // Collect form data
      let formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
      };

      // Send form data to the server
      console.log("Form Data:", formData);
      axios
        .post("https://api.byteplex.info/api/test/contact/", formData)
        .then(function (response) {
          // Handle success
          console.log("Form Data:", response.data);

          // Reset form fields
          form.reset();
        })
        .catch(function (error) {
          // Handle error
          form.reset();
          console.error("Error:", error);
        });
    }
  });

  nameInput.addEventListener("input", function () {
    nameError.textContent = "";
    nameInput.classList.remove("error");
  });

  emailInput.addEventListener("input", function () {
    emailError.textContent = "";
    emailInput.classList.remove("error");
  });

  function isValidName(name) {
    let nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ]+$/;
    return nameRegex.test(name);
  }
});
