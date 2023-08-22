// const callBack = async (url) => {
//     let data = null;
//     try {
//         let res = await fetch(url);
//         data = await res.json();
//     } catch {
//         data = false;
//     }
//     return await data;
// };
// callBack("https://fakestoreapi.com/products")
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



document.addEventListener('keydown', (event) => {
  const key = event.key; 
  if (key === "Escape") {
    closeModal('menu')
    closeModal('login')
  }
});