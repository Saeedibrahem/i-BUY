let renderedProduct = [];

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
callBack("../products.json")
  .then((res) => {
    renderedProduct = res.products;
    const products = document.querySelector(".products-slider");
    products.innerHTML = "";
    res.products.forEach((product) => {
      products.innerHTML += `<div class="item">
          <div class="position-relative || imgProduct">
            <img src=${product.image[0]}  alt=""    class="img1"/>
              ${
                product.image[1]
                  ? `<img src=${product.image[1]} alt="" class="img2"/>`
                  : ` <img src=${product.image[0]} alt="" class="img2"/>`
              }
            </div>
            <div class="product__info">
            <div class="position-relative">
            <span class="hint--top hint--medium position-absolute w-100 z-1 hintPos"  aria-label="${
              product.name.ar
            }">
            <span class="opacity-0">${product.name.ar}</span>
            </span>
            <h3 class="overLap">${product.name.ar}</h3>
          </div>
            <p>
            <span class="new__price">$${product.price}</span>
            <span class="old__price">$${product.old_price}</span>
            </p>
            <div class="colors">${product.colors
              .map(
                (color) =>
                  ` <div style="background-color: ${color};" class="black__color"></div>`
              )
              .join("")}</div></div>
        </div>
        `;
    });
  })
  .then(() => {
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".loading").classList.add("done");
  if (JSON.parse(localStorage.getItem("login"))) {
    document.querySelector("body").classList.add("isLogin");
  } else {
    document.querySelector("body").classList.remove("isLogin");
  }
});

const closeModal = (e) => {
  let element = document.getElementById(e);
  element.classList.remove("active");
  document.querySelector("body").style.overflow = "auto";
  document.querySelector("body").style.paddingRight = "0";
  document.querySelector(".new__navList-container").classList.remove("pop");
};

const popupBtns = document.querySelectorAll(".popup-event");
popupBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let element = document.getElementById(btn.getAttribute("data-id"));
    element.classList.toggle("active");
    if (element.classList.contains("active")) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.paddingRight = "17px";
      document.querySelector(".new__navList-container").classList.add("pop");
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Escape") {
    closeModal("category__menu");
    closeModal("cart__menu");
    closeModal("login");
  }
});
const loginBtn = document.querySelector(".login-title button:nth-child(1)");
const registerBtn = document.querySelector(".login-title button:nth-child(2)");
const loginForm = document.querySelector(".box__container form");
const userData = JSON.parse(localStorage.getItem("userData")) ?? [];

loginBtn.addEventListener("click", () => {
  loginForm.classList.add("active");
  activeBtn(registerBtn, loginBtn);
});
registerBtn.addEventListener("click", () => {
  loginForm.classList.remove("active");
  activeBtn(loginBtn, registerBtn);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("active")) {
    const findme = userData.find((ele) => ele.email === e.target.email.value);
    if (findme) {
      if (findme.password === e.target.password.value) {
        sendDataToLocalStotage("login", findme);
        closeModal("login");
        document.querySelector("body").classList.add("isLogin");
        clearInputValue(e);
      }
    }
  } else {
    let newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const findme = userData.find((e) => e.email === newUser.email);
    if (!findme) {
      userData.push(newUser);
      sendDataToLocalStotage("userData", userData);

      loginForm.classList.add("active");
      activeBtn(registerBtn, loginBtn);

      clearInputValue(e);
    }
  }
});
document.querySelector(".logOut").addEventListener("click", () => {
  localStorage.removeItem("login");
  document.querySelector("body").classList.remove("isLogin");
});

const clearInputValue = (e) => {
  e.target.email.value = "";
  e.target.password.value = "";
};

const sendDataToLocalStotage = (target, data) => {
  return localStorage.setItem(target, JSON.stringify(data));
};
// const getDataFromLocalStotage = (data) => {
//   return JSON.parse(localStorage.getItem(data))
// };
const activeBtn = (btn1, btn2) => {
  btn1.classList.add("btn-light");
  btn1.classList.remove("btn-dark");
  btn2.classList.add("btn-dark");
};

setInterval(() => {
  const now = new Date("Aug 30,2023").getTime();
  const now2 = new Date().getTime();
  const timedays = now - now2;
  const hoursnow = Math.floor(
    (timedays % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000)
  );
  const minnow = Math.floor((timedays % (60 * 60 * 1000)) / (60 * 1000));
  const secnow = Math.floor((timedays % (60 * 1000)) / 1000);
  const timerCont = document.querySelector(".timer");
  timerCont.innerHTML = `
  <div class="hours d-flex flex-column ">
            <span>${
              hoursnow === 0 ? "00" : hoursnow >= 10 ? hoursnow : "0" + hoursnow
            }</span>
            <span>ساعات</span>
          </div>
          <div class="span">
            <span>:</span>
          </div>
          <div class="minutes d-flex flex-column">
            <span>${
              minnow === 0 ? "00" : minnow >= 10 ? minnow : "0" + minnow
            }</span>
            <span>دقائق</span>
          </div>
          <div class="span">
            <span>:</span>
          </div>
          <div class="seconds d-flex flex-column">
            <span>${
              secnow === 0 ? "00" : secnow >= 10 ? secnow : "0" + secnow
            }</span>
            <span>ثواني</span>
          </div>`;
}, 1000);

const searchInput = document.getElementById("searchInput");
const searchBar = document.querySelector(".header_searchbar");
const productSearch = document.querySelector(".search__prodcut");
searchInput.addEventListener("keyup", () => {
  console.log(searchInput.value);
  if (searchInput.value.trim().length == 0) {
    productSearch.classList.add("hidden");
  } else {
    productSearch.classList.remove("hidden");
  }
 const newData= renderedProduct.filter(
    (asd) =>
      asd.name.ar.includes(searchInput.value) ||
      asd.name.en.includes(searchInput.value)
      );
      productSearch.innerHTML= ""
      if(newData.length === 0){
        productSearch.innerHTML= `
        <h2>لا يوجد</h2>
        `

      }else{

        newData.forEach(e=>{
      productSearch.innerHTML+=`
      <div class=" d-flex gap-3 hoverMeNowHot align-items-center">
      <div class="img">
        <img src="${e.image[0]}" style="height: 40px;" >
      </div>
      <div class="title flex-grow-1">
        <p>${e.name.ar}</p>
      </div>
      <div class="price">$${e.price}</div>
    </div>`  })
      }
});
window.addEventListener("click", (e) => {
  console.log();
  if (!e.target.closest(".header_searchbar")) {
    productSearch.classList.add("hidden");
  } else {
    if (searchInput.value.trim().length !== 0) {
      productSearch.classList.remove("hidden");
      console.log("s");
    }
  }
});
