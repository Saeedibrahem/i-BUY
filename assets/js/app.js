const callBack = async (url) => {
  let data = null;
  try {
    let res = await fetch(url);
    data = await res.json();
  } catch {
    data = false;
  }
  return await data;
};
// import {  } from "../products.json";
callBack("../products.json")
  .then((res) => {
    const products = document.querySelector(".products-slider");
    products.innerHTML = "";
    res.products.forEach((product) => {
      products.innerHTML += `
    <div class="item">
          <div class="position-relative || imgProduct">
            <img
              src=${product.image[0]}
              alt=""
              class="img1"
            />
            ${
              product.image[1]
                ? ` <img
            src=${product.image[1]}
            alt=""
            class="img2"
          />`
                : ` <img
          src=${product.image[0]}
          alt=""
          class="img2"
        />`
            }
            </div>
          <div class="product__info">
          <div class="position-relative">
          <span class="hint--top hint--medium position-absolute w-100 z-1 hintPos"  aria-label="${product.name.ar}">
          <span class="opacity-0">${
            product.name.ar

          }</span>
          </span>
             <h3 class="overLap">${product.name.ar}</h3>
          </div>
            <p>
            <span class="new__price">$${product.price}</span>
            <span class="old__price">$${product.old_price}</span>
            </p>
            <div class="colors">
            ${product.colors
              .map(
                (color) =>
                  ` <div style="background-color: ${color};" class="black__color"></div>`
              )
              .join("")}
              </div>
          </div>
        </div>
    
    `;
    });
  })
  .then((r) => {
    $(".owl-carousel.products-slider").owlCarousel({
      loop: true,
      rtl: true,
      // autoplay: true,
      margin: 10,
      // autoplayTimeout: 5000,
      // stagePadding:5,
      nav: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>',
      ],
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 4,
        },
        800: {
          items: 4,
        },
        950: {
          items: 5,
        },
        1100: {
          items: 5,
        },
        1150: {
          items: 5,
        },
      },
    });
  });

//     .then((res) => {
//         const card__container = document.querySelector(".card__container");
//         card__container.innerHTML = "";
//         if (res) {
//             res.forEach((product) => {
//                 card__container.innerHTML += `
//             <div class="col-3 p-2">
//             <div class="card">
//                 <img src=${product.image} class="card-img-top"/>
//                 <div class="card-body">
//                 <h5 class="card-title">${product.title}</h5>
//                 <p class="card-price">$${product.price}</p>
//                 <p class="card-text">${product.category}</p>
//                 <a href="/product.html?${product.id}" class="btn btn-primary">show product</a>
//                 </div>
//                 q</div>
//             </div> `;
//             });
//         } else {
//             card__container.innerHTML = `
//         <h2> this page is not found</h2>
//         <button onClick="reloadPage()" class="btn btn-primary">reload page</button>`;
//         }
//     })
//     .finally((_) => {
//         const loading = document.querySelector(".loading").classList.add("done");
//     });

// function reloadPage() {
//     window.location.reload();
// }
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".loading").classList.add("done");
});
// const toggleMenu = document.querySelector(".navbar__toggle-menu");
// const modalContainer = document.querySelector(".modal-container");

// toggleMenu.addEventListener("click", () => {});

const closeModal = (e) => {
  let element = document.getElementById(e);
  element.classList.remove("active");
  document.querySelector("body").style.overflow = "auto";
  document.querySelector("body").style.paddingRight = "0";
};
const popupBtns = document.querySelectorAll(".popup-event");
popupBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let element = document.getElementById(btn.getAttribute("data-id"));
    element.classList.toggle("active");
    if (element.classList.contains("active")) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.paddingRight = "17px";
    } else {
      document.querySelector("body").style.overflow = "auto";
      document.querySelector("body").style.paddingRight = "0";
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Escape") {
    closeModal("menu");
    closeModal("login");
  }
});
