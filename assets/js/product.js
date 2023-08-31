const productId = window.location.search.split("?").join("");
callBack("../products.json").then((res) => {
  const product__container = document.querySelector(".product__container");
  if (res) {
    product__container.innerHTML = "";

    const findpro = res.products.find((ele) => ele.id == productId);
    if (findpro) {
      product__container.innerHTML = `
      <div class="row g-0 gap-5 || product-box">
      <div class="col-12 col-md-6 d-flex gap-1 || images__Con">
        <div class="d-flex flex-column gap-1 || small__image-con">
        ${findpro.image
          .map(
            (image) =>
              `<img class="sm-img" src=${image} alt="" height="100px" />`
          )
          .join("")}
          
        </div>
        <div class="product__image flex-grow-1">
          <img src=${findpro.image[0]} alt="" />
        </div>
      </div>
      <div class="col">
        <div class="product__info " >
         <div class="product__title my-2">
          <h4>${findpro.name.ar}</h4>
          <p class="price ">
            <span class="old__price">${findpro.old_price} جنيه</span>
            <span class="new__price">${findpro.price} جنيه</span>
          </p>
         </div>
          <div class="product__color my-2">
            <p>اللون</p>
            <div class="d-flex gap-2">
            ${findpro.colors
              .map(
                (color) =>
                  `<div style="background-color: ${color}; " class="color"></div>`
              )
              .join("")}
              
              
              
            </div>
          </div>
          <div class="product__size my-2">
            <p>المقاس</p>
            <div class="d-flex gap-2">
              <div class="size  ">${findpro.sizes[0]}</div>
              <div class="size  ">${findpro.sizes[1]}</div>
              <div class="size  ">${findpro.sizes[2]}</div>
            </div>
          </div>
          <div class="addToCart my-2">
            <div class="d-flex gap-2 align-items-center">
              <div class="quantity d-flex gap-2 p-1 align-items-center ">
                <button class=" border-0 decreaseBtn">-</button>
                <p class="m-0 quantity-counter">1</p>
                <button class=" border-0 increaseBtn">+</button>
              </div>
              <div class="addToCartBtn flex-grow-1 p-2">
                <button class=" w-100"> إضافة إلي السلة </button>
              </div>
            </div>
            <div class="my-3" >
              <span class="p-2 addProdToWishList"onclick="handleWishList(${
                findpro.id
              })" >
                <i class="fa-regular fa-heart"></i> إضافة إلى المفضلة 
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="porduct__description my-4">
        <div class="my-2">
          <p class="des-title"><strong>الوصف</strong></p>
          <p class="des-content">${findpro.description.ar}</p>
        </div>
      </div>
    </div>
      `;
    } else {
      console.log("product not found");
    }
  }
});
let product = {};
const btnsSelector = document.querySelector("body");
btnsSelector.addEventListener("click", (e) => {
  const counter = document.querySelector(".quantity-counter");
  if (e.target.closest(".decreaseBtn")) {
    if (counter.textContent > 1) {
      counter.textContent -= 1;
    }
  }
  if (e.target.closest(".increaseBtn")) {
    counter.textContent = +counter.textContent + 1;
  }
  if (e.target.closest(".product__size")) {
    if (e.target.closest(".product__size .size")) {
      const sizeBtn = e.target
        .closest(".product__size")
        .querySelectorAll(".size");
      if (
        e.target.closest(".product__size .size").classList.contains("active")
      ) {
        return e.target
          .closest(".product__size .size")
          .classList.remove("active");
      }
      sizeBtn.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.target.closest(".product__size .size").classList.add("active");
      product.size = e.target.closest(".product__size .size").textContent;
    }
    return product;
  }
  if (e.target.closest(".product__color")) {
    if (e.target.closest(".product__color .color")) {
      const colorBtn = e.target
        .closest(".product__color")
        .querySelectorAll(".color");
      if (
        e.target.closest(".product__color .color").classList.contains("active")
      ) {
        return e.target
          .closest(".product__color .color")
          .classList.remove("active");
      }
      colorBtn.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.target.closest(".product__color .color").classList.add("active");
      const color = e.target.closest(".product__color .color").style[
        "background-color"
      ];
      product.color = color;
    }
    return product;
  }
  if (e.target.closest(".small__image-con")) {
    if (e.target.closest(".small__image-con .sm-img")) {
      const product__image = document.querySelector(".product__image img");

      product__image.src = e.target.closest(".small__image-con .sm-img").src;
    }
  }
});
