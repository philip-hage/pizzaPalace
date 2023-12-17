const buttons = document.querySelectorAll(".js-filter-nav__btn");
const cards = document.querySelectorAll(".card");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-filter");

    cards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (category === cardCategory || category === "all") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

function openToast(productName) {
  var toast = document.querySelector(".js-toast");
  toast.querySelector(".toast__p").innerHTML = productName + " added to cart";
  openToastEvent = new CustomEvent("openToast"); // custom event
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

document.addEventListener("DOMContentLoaded", function () {
  const productCart = JSON.parse(localStorage.getItem("productCart")) || [];
  const selectedPizzasContainer = document.getElementById(
    "selectedPizzasContainer"
  );

  // Add event listeners to the "Add To Cart" buttons
  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.parentElement;
      const productId = card.querySelector(".productId").value;
      const productName = card.querySelector(".productName").value;
      const productPrice = card.querySelector(".productPrice").value;
      const imagePath = card.querySelector(".imagePath").value;

      openToast(productName);

      addToCart(productId, productName, productPrice, imagePath);
      updateSelectedProducts();
    });
  });

  function addToCart(productId, productName, productPrice, imagePath) {
    const existingProduct = productCart.find((item) => item.id === productId);
    if (existingProduct) {
      // If it's in the cart, increase its quantity
      existingProduct.quantity++;
    } else {
      // If it's not in the cart, add it as a new item
      productCart.push({
        id: productId,
        name: productName,
        price: productPrice,
        path: imagePath,
        quantity: 1,
      });
    }
    saveCartToLocalStorage();

    updateCartCount();
  }

  function saveCartToLocalStorage() {
    localStorage.setItem("productCart", JSON.stringify(productCart));
  }

  function updateCartCount() {
    const totalProductsInCart = productCart.reduce(
      (total, product) => total + product.quantity,
      0
    );

    // Select the <h1> element by its id
    const cartTitle = document.getElementById("cartcount");

    // Update the content of the <h1> element
    cartTitle.textContent = `Your Cart (${totalProductsInCart})`;
  }

  // Function to update and display selected pizzas
  function updateSelectedProducts() {
    const selectedPizzasContainer = document.getElementById(
      "selectedPizzasContainer"
    );
    const selectedProductsList = document.getElementById(
      "selectedProductsList"
    );
    const totalPriceElement = document.getElementById("totalPrice");
    let totalPrice = 0;
    let totalCartPrice = 0;

    selectedProductsList.innerHTML = "";

    if (productCart.length > 0) {
      productCart.forEach(function (product, index) {
        // Create a new list item for each pizza
        const listItem = document.createElement("li");
        listItem.classList.add("dr-cart__product");

        // Create an <img> element for pizza image
        const imageUrl = product.path;
        const productImage = document.createElement("img");
        productImage.classList.add("dr-cart__img");
        productImage.src = imageUrl;

        // Create an <h2> element for pizza name
        const productName = document.createElement("h2");
        productName.classList.add("text-sm");
        productName.textContent = product.name;

        // Create an <h2> element for pizza name
        const productAmount = document.createElement("h2");
        productAmount.classList.add("text-sm");
        productAmount.textContent = product.quantity + "x";

        const textDiv = document.createElement("div");
        textDiv.appendChild(productName);
        textDiv.appendChild(productAmount);

        // Calculate the total price for this type of pizza
        const totalProductPrice = parseFloat(product.price) * product.quantity;

        // Create a <p> element for the total price of this type of pizza
        const productTotalPrice = document.createElement("p");
        productTotalPrice.classList.add("text-sm", "color-contrast-higher");
        productTotalPrice.textContent = `Total: €${totalProductPrice.toFixed(
          2
        )}`;

        // Create a button for removing the pizza
        const removeButton = document.createElement("button");
        removeButton.classList.add("dr-cart__remove-btn", "margin-top-xxxs");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
          if (product.quantity > 1) {
            // If the quantity is greater than 1, decrement the quantity
            product.quantity--;
          } else {
            // If the quantity is 1, remove the entire entry from the cart
            productCart.splice(index, 1);
          }
          // Update the local storage after removing an item
          saveCartToLocalStorage();
          // Update the selected pizzas display
          updateSelectedProducts();

          updateCartCount();
        });

        const textRightDiv = document.createElement("div");
        textRightDiv.classList.add("text-right");
        textRightDiv.appendChild(productTotalPrice);
        textRightDiv.appendChild(removeButton);

        listItem.appendChild(productImage);
        listItem.appendChild(textDiv);
        listItem.appendChild(textRightDiv);

        selectedProductsList.appendChild(listItem);

        totalCartPrice += totalProductPrice;

        totalPrice += parseFloat(product.price) * product.quantity;
      });

      totalPriceElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
    } else {
      const listItem = document.createElement("li");
      listItem.classList.add("dr-cart__product");

      const emptyCart = document.createElement("h2");
      emptyCart.classList.add("text-lg", "text-center");
      emptyCart.textContent = "Your cart is empty!!!";

      listItem.appendChild(emptyCart);

      selectedProductsList.appendChild(listItem);

      totalPriceElement.textContent = "Total Price: €0.00";
    }
  }

  updateSelectedProducts();

  updateCartCount();

  function updateActiveFilters() {
    const selectedIngredients = Array.from(
      document.querySelectorAll('input[name="ingredients"]:checked')
    ).map((checkbox) => checkbox.value);
    const activeFiltersElement = document.querySelector(
      ".js-adv-filter__selection"
    );
    activeFiltersElement.textContent =
      selectedIngredients.length > 0
        ? `${selectedIngredients.length} selected`
        : "All";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the selectedStore data from localStorage
  var selectedStore = JSON.parse(localStorage.getItem("selectedStore"));

  // Check if selectedStore exists and has the necessary data
  if (selectedStore && selectedStore.storeName) {
    // Set the store name in the specified div
    var storeName = decodeHTMLEntities(selectedStore.storeName);
    document.querySelector(".storeName").textContent = storeName;
  }
});

function decodeHTMLEntities(input) {
  // Check if the input string contains the HTML entity &#039;
  if (input.includes("&#039;")) {
    // Replace &#039; with an apostrophe
    return input.replace(/&#039;/g, "'");
  } else {
    // Return the original string if no replacement is needed
    return input;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const modalButtons = document.querySelectorAll(
    '[aria-controls^="modal-name-"]'
  );
  const modal = document.querySelector(".modal");
  const productImage = document.getElementById("product-image");
  const productName = document.getElementById("modal-title-2");
  const productDescription = document.getElementById("product-description");
  const modalPrice = document.getElementById("modal-price"); // Update to the correct ID
  const plusButton = document.querySelector(".plusButton"); // Update to the correct class
  const minusButton = document.querySelector(".minButton"); // Update to the correct class
  const quantityInput = document.getElementById("index-value"); // Update to the correct ID

  let basePrice = 0;

  modalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productId = button.getAttribute("id").replace("modal-name-", "");

      const productCard = document.getElementById("product-card-" + productId);

      if (productCard) {
        const productData = {
          imagePath: productCard.querySelector(".imagePath").value,
          productName: productCard.querySelector(".productName").value,
          productDescription: productCard.querySelector(".productDescription")
            .value,
          productPrice: parseFloat(
            productCard.querySelector(".productPrice").value
          ),
        };

        productImage.src = productData.imagePath;
        productName.textContent = productData.productName;
        productDescription.textContent = productData.productDescription;
        basePrice = productData.productPrice;

        modalPrice.innerHTML = "€ " + basePrice;

        modal.classList.add("js-modal--visible");
      } else {
        console.error("Product card not found for productId:", productId);
      }
    });
  });

  modal.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("js-modal__close")
    ) {
      modal.classList.remove("js-modal--visible");
    }
  });

  if (quantityInput && plusButton && minusButton) {
    minusButton.addEventListener("click", function () {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity;
        updateModalPriceMin();
      }
    });

    plusButton.addEventListener("click", function () {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = quantity;
      updateModalPlusPrice();
    });

    quantityInput.addEventListener("input", function () {
      updateModalPrice();
    });
  }

  function updateModalPrice() {
    let quantity = parseInt(quantityInput.value);
    const totalPrice = basePrice * quantity;
    modalPrice.textContent = "€ " + totalPrice.toFixed(2);
  }

  function updateModalPriceMin() {
    let quantity = parseInt(quantityInput.value);
    quantity--;
    const totalPrice = basePrice * quantity;
    modalPrice.textContent = "€ " + totalPrice.toFixed(2);
  }

  function updateModalPlusPrice() {
    let quantity = parseInt(quantityInput.value);
    quantity++;
    const totalPrice = basePrice * quantity;
    modalPrice.textContent = "€ " + totalPrice.toFixed(2);
  }
});
