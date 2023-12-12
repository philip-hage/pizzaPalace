document.addEventListener("DOMContentLoaded", function () {
  // Select the form with the class "form-signin"
  const form = document.querySelector(".form-signin");

  // Create a div element for displaying the error message
  const errorDiv = document.createElement("div");
  errorDiv.className =
    "bg-accent bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxs";
  errorDiv.innerHTML =
    "<p><strong>Error:</strong> This field cannot be empty</p>";

  // Initialize a variable to track the active input and its timeout
  let activeInput = null;

  // Listen for input events on the form
  form.addEventListener("input", function (event) {
    // Get the current input element that triggered the event
    const inputElement = event.target;

    // If the active input is different, clear its timeout
    if (activeInput !== inputElement) {
      clearTimeout(activeInput?.timeout);
      activeInput = inputElement;
    }

    // Clear the timeout for the active input
    clearTimeout(activeInput.timeout);

    // Set a new timeout to check for empty input after 2 seconds
    activeInput.timeout = setTimeout(function () {
      // Check if the input is empty
      if (inputElement.value.trim() === "") {
        // If empty, set aria-invalid attribute and display error message
        inputElement.setAttribute("aria-invalid", "true");
        if (!inputElement.parentNode.contains(errorDiv)) {
          inputElement.parentNode.appendChild(errorDiv.cloneNode(true));
        }
      } else {
        // If not empty, remove aria-invalid attribute and hide error message
        inputElement.removeAttribute("aria-invalid");
        const existingError =
          inputElement.parentNode.querySelector(".bg-accent");
        if (existingError) {
          inputElement.parentNode.removeChild(existingError);
        }
      }
    }, 2000);
  });
});

function openToastSuccess(title, message) {
  var toast = document.getElementById('toast-1');
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
