function openToastSuccess(title, message) {
  var toast = document.getElementById("toast-1");
  var toastTitle = document.querySelector(".toast__title");
  var toastP = document.querySelector(".toast__p");

  toastTitle.textContent = title;
  message = message.replace(/\+/g, " ");
  toastP.textContent = message;

  var openToastEvent = new CustomEvent("openToast");
  toast.dispatchEvent(openToastEvent);
}

function openToastFailed(title, message) {
  var toast2 = document.querySelector(".toast2");
  var toastTitle2 = document.querySelector(".title2");
  var toastP2 = document.querySelector(".p2");

  toastTitle2.textContent = title;
  message = message.replace(/\+/g, " ");
  toastP2.textContent = message;

  var openToastEvent = new CustomEvent("openToast");
  toast2.dispatchEvent(openToastEvent);
}

// Extract toast parameters from the URL path
const urlPath = window.location.pathname;

console.log(urlPath);

// Decode the URL path
const decodedUrlPath = decodeURIComponent(urlPath);

// Use a regular expression to extract content inside curly braces, handling URL-encoded semicolons
const match = decodedUrlPath.match(/\{([^{}]+)\}/);

console.log(match);

if (match) {
  // Extract the content inside curly braces and decode each component
  const toastContent = decodeURIComponent(match[1]);

  // Split the content into individual parameters
  const params = toastContent.split(";").map((param) => param.trim());

  // Create an object to hold the parameters
  const toastParams = {};
  params.forEach((param) => {
    const [key, value] = param.split(":");
    toastParams[key] = value;
  });

  console.log("Decoded Parameters:", toastParams);

  // Check if 'toast' parameter is present and has a value of 'true'
  if (
    toastParams.toast === "true" &&
    toastParams.toasttitle &&
    toastParams.toastmessage
  ) {
    console.log("Triggering openToastSuccess function");
    openToastSuccess(toastParams.toasttitle, toastParams.toastmessage);
  } else if (
    toastParams.toast === "false" &&
    toastParams.toasttitle &&
    toastParams.toastmessage
  ) {
    console.log("Triggering openToastFailed function");
    openToastSuccess(toastParams.toasttitle, toastParams.toastmessage);
  } else {
    console.log("Invalid or missing parameters for toast.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded before executing the code
});

async function signUp(event) {
  event.preventDefault();
  // Get the form element
  const form = document.querySelector("form");

  // Remove existing error messages
  const existingErrors = form.querySelectorAll(".bg-accent");
  existingErrors.forEach((error) => error.remove());

  // Create an object to store the form data
  const formData = new FormData(form);

  // Make a POST request using the fetch API
  const ajaxFetch = await fetch(
    "http://localhost/pizzapalace/user/userSignin/",
    {
      method: "POST",
      body: formData,
    }
  );

  const response = await ajaxFetch.json();

  if (response.success) {
    console.log(response.success.message);
    window.location.href = "http://localhost/pizzapalace/user/edit/";
  } else {
    // Loop through the response and append error messages to the corresponding input fields
    Object.keys(response).forEach((fieldName) => {
      const inputField = form.querySelector(`[name="${fieldName}"]`);
      const errorMessage = response[fieldName].message;

      if (inputField) {
        // Create and append error element
        const errorElement = document.createElement("div");
        errorElement.className =
          "bg-accent bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxs";
        errorElement.textContent = errorMessage;

        // Append error element after the input field
        inputField.parentNode.insertBefore(
          errorElement,
          inputField.nextSibling
        );
      }
    });
  }
}

async function login(event) {
  event.preventDefault();
  // Get the form element
  const form = document.querySelector("form");

  // Remove existing error messages
  const existingErrors = form.querySelectorAll(".bg-accent");
  existingErrors.forEach((error) => error.remove());

  // Create an object to store the form data
  const formData = new FormData(form);

  // Make a POST request using the fetch API
  const ajaxFetch = await fetch("http://localhost/pizzapalace/user/login/", {
    method: "POST",
    body: formData,
  });

  const response = await ajaxFetch.json();

  if (response.success) {
    console.log(response.success.message);
    window.location.href = "http://localhost/pizzapalace/pizza/overview/";
  } else {
    // Loop through the response and append error messages to the corresponding input fields
    Object.keys(response).forEach((fieldName) => {
      const inputField = form.querySelector(`[name="${fieldName}"]`);
      const errorMessage = response[fieldName].message;

      console.log(inputField);

      if (inputField) {
        // Create and append error element
        const errorElement = document.createElement("div");
        errorElement.className =
          "bg-accent bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxs";
        errorElement.textContent = errorMessage;

        // Append error element after the input field
        inputField.parentNode.insertBefore(
          errorElement,
          inputField.nextSibling
        );
      }
    });
  }
}

async function editPassword(event) {
  event.preventDefault();
  // Get the form element
  const form = document.querySelector("form");

  // Remove existing error messages
  const existingErrors = form.querySelectorAll(".bg-accent");
  existingErrors.forEach((error) => error.remove());

  // Create an object to store the form data
  const formData = new FormData(form);

  // Make a POST request using the fetch API
  const ajaxFetch = await fetch(
    "http://localhost/pizzapalace/user/editPassword/",
    {
      method: "POST",
      body: formData,
    }
  );

  const response = await ajaxFetch.json();

  if (response.success) {
    console.log(response.success.message);
    window.location.href = "http://localhost/pizzapalace/user/editPassword/";
  } else {
    // Loop through the response and append error messages to the corresponding input fields
    Object.keys(response).forEach((fieldName) => {
      const inputField = form.querySelector(`[name="${fieldName}"]`);
      const errorMessage = response[fieldName].message;

      if (inputField) {
        // Create and append error element
        const errorElement = document.createElement("div");
        errorElement.className =
          "bg-accent bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxs";
        errorElement.textContent = errorMessage;

        // Append error element after the input field
        inputField.parentNode.insertBefore(
          errorElement,
          inputField.nextSibling
        );
      }
    });
  }
}

async function editProfile(event) {
  event.preventDefault();
  // Get the form element
  const form = document.querySelector("form");

  // Remove existing error messages
  const existingErrors = form.querySelectorAll(".bg-accent");
  existingErrors.forEach((error) => error.remove());

  // Create an object to store the form data
  const formData = new FormData(form);

  // Make a POST request using the fetch API
  const ajaxFetch = await fetch("http://localhost/pizzapalace/user/edit/", {
    method: "POST",
    body: formData,
  });

  const response = await ajaxFetch.json();

  if (response.success) {
    console.log(response.success.message);
    window.location.href = "http://localhost/pizzapalace/user/edit/";
  } else {
    // Loop through the response and append error messages to the corresponding input fields
    Object.keys(response).forEach((fieldName) => {
      const inputField = form.querySelector(`[name="${fieldName}"]`);
      const errorMessage = response[fieldName].message;

      if (inputField) {
        // Create and append error element
        const errorElement = document.createElement("div");
        errorElement.className =
          "bg-accent bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxs";
        errorElement.textContent = errorMessage;

        // Append error element after the input field
        inputField.parentNode.insertBefore(
          errorElement,
          inputField.nextSibling
        );
      }
    });
  }
}
