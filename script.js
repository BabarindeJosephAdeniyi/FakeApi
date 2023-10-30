let results = document.getElementById("all-product");
let filteredProduct = document.getElementById("filtered-product");
let searchBox = document.querySelector(".searchbox");
let showError = document.getElementById("error");
let allProducts = [];

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    displayProducts(data);
  });

function displayProducts(products) {
  let prodInner = "";
  products.map((value) => {
    prodInner += `
      <div class="product-item">
        <div class="product-category"><i class="fas fa-tag rotate-right"></i>${value.category}</div>
        <div class="product-image"><img src="${value.image}" alt="${value.title}"></div>
        <div class="product-title">${value.title}</div>
        <div class="product-description">${value.description.substr(0, 120)}</div>
        <div class="product-price">Price: $${value.price}</div>
      </div>
    `;
  });
  results.innerHTML = prodInner;
}

function filterProductList(searchValue) {
  return allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );
}

searchBox.addEventListener("input", (e) => {
  let searchValue = e.target.value;
  const filteredArray = filterProductList(searchValue);
  filteredProduct.innerHTML = "";
  showError.textContent = "";

  if (searchValue.length > 0 && filteredArray.length > 0) {
    showError.textContent = `Showing ${filteredArray.length} results for "${searchValue}"`;
    displayProducts(filteredArray);
  } else if (searchValue && filteredArray.length === 0) {
    showError.innerHTML = "No record found";
  } else {
    displayProducts(allProducts);
  }
});
