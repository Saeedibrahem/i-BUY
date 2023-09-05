/*Start Toast*/
const notyf = new Notyf({
  duration: 2000,
  position: { x: "left", y: "top" },
});
/*End Toast*/
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
    if (location.pathname === "/" || location.pathname.includes("index")) {
      const products = document.querySelector(".products-slider");
      products.innerHTML = "";
      res.products.forEach((product) => {
        products.innerHTML += `<div class="item">
        <div class="addToWishList" onclick="handleWishList(${product.id})">
          <i class="fa-regular fa-heart"></i>
          <span class="addWish d-block" >إضافة للمفضلة</span>
          <span class="removeWish d-none" >حذف من المفضلة</span>
        </div>
        <a href="/product.html?${product.id}">
        <div class="position-relative || imgProduct ||product-image">
        <div class="product-offer">وفر ${parseInt(
          ((product.old_price - product.price) * 100) / product.old_price
        )}%</div>
        
          <img src=${product.image[0]}  alt=""    class="img1"/>
            ${product.image[1] ? `<img src=${product.image[1]} alt="" class="img2"/>` : ` <img src=${product.image[0]} alt="" class="img2"/>`}
          </div>
          <div class="product__info">
          <div class="position-relative">
          <span class="hint--top hint--medium position-absolute w-100 z-1 hintPos"  aria-label="${product.name.ar
          }">
          <span class="opacity-0">${product.name.ar}</span>
          </span>
          <h3 class="overLap">${product.name.ar}</h3>
        </div>
          <p>
          <span class="new__price">${product.price} جنيه</span>
          <span class="old__price">${product.old_price} جنيه</span>
          </p>
          <div class="colors">${product.colors
            .map((color) => `<div style="background-color: ${color};" class="black__color"></div>`).join("")}
          </div>
          </div>
        </a>
          
          </div>
          `;
      });
    }
  })
  .then(() => {
    if (location.pathname.includes("index") || location.pathname === "/") {
      $(document).ready(function () {
        $(".owl-carousel.products-slider").owlCarousel({
          loop: true,
          rtl: true,
          margin: 10,
          // autoplayTimeout: 5000,
          stagePadding: 5,
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
    }
  });




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

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("wishlist")) {
    if (JSON.parse(localStorage.getItem("login"))) {
      document.querySelector(".loading").classList.add("done");
      document.querySelector("body").classList.add("isLogin");
    } else {
      location.href = "/";
      document.querySelector("body").classList.remove("isLogin");
    }
  } else {
    document.querySelector(".wishlist a").setAttribute("href", "login.html");
    document
      .querySelector(".new__wishlist a")
      .setAttribute("href", "login.html");
    document.querySelector(".loading").classList.add("done");
    if (JSON.parse(localStorage.getItem("login"))) {
      document.querySelector("body").classList.add("isLogin");
      wishlistCounter.textContent = userWishlist.length;
      document
        .querySelector(".wishlist a")
        .setAttribute("href", "wishlist.html");
      document
        .querySelector(".new__wishlist a")
        .setAttribute("href", "wishlist.html");
    } else {
      document.querySelector("body").classList.remove("isLogin");
    }
  }
});

const loginBtn = document.querySelector(".login-title button:nth-child(1)");
const registerBtn = document.querySelector(".login-title button:nth-child(2)");
const loginForm = document.querySelector("form  ");
const userData = JSON.parse(localStorage.getItem("userData")) ?? [];
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    loginForm.classList.add("active");
    activeBtn(registerBtn, loginBtn);
  });
  registerBtn.addEventListener("click", () => {
    loginForm.classList.remove("active");
    activeBtn(loginBtn, registerBtn);
  });
}
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("active")) {
      const findme = userData.find((ele) => ele.email === e.target.email.value);
      if (findme) {
        if (findme.password === e.target.password.value) {
          sendDataToLocalStorage("login", findme);

          let element = document.getElementById("login");
          element.classList.remove("active");
          document.querySelector("body").style.overflow = "auto";
          document.querySelector("body").style.paddingRight = "0";
          document
            .querySelector(".new__navList-container")
            .classList.remove("pop");
          document.querySelector("body").classList.add("isLogin");
          document
            .querySelector(".wishlist a")
            .setAttribute("href", "wishlist.html");
          document
            .querySelector(".new__wishlist a")
            .setAttribute("href", "wishlist.html");

          wishlistCounter.textContent = userWishlist.length;
          clearInputValue(e);
          let userName = JSON.parse(localStorage.getItem("login")).email.split(
            "@"
          )[0];
          notyf.success(
            `أهلا بك ${findme.username ? findme.username : userName}`
          );
          if (location.pathname.includes("login")) {
            setTimeout(() => {
              location.href = "/";
            }, 2000);
          }
        } else {
          notyf.error("كلمة المرور خاطئة");
        }
      } else {
        notyf.error(" هذا البريد غير مسجل برجاء إنشاء حساب جديد");
      }
    } else {
      let newUser = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const findme = userData.find((e) => e.email === newUser.email);
      if (findme) {
        notyf.error("هذا البريد مسجل بالفعل يرجي تسجيل الدخول");
      }
      if (!findme) {
        userData.push(newUser);
        sendDataToLocalStorage("userData", userData);
        wishlistCounter.textContent = userWishlist.length;

        loginForm.classList.add("active");
        activeBtn(registerBtn, loginBtn);
        clearInputValue(e);
        notyf.success("تم تسجيل الحساب بنجاح");
      }
    }
  });
}

const clearInputValue = (e) => {
  e.target.email.value = "";
  e.target.password.value = "";
};

const sendDataToLocalStorage = (target, data) => {
  return localStorage.setItem(target, JSON.stringify(data));
};

const activeBtn = (btn1, btn2) => {
  btn1.classList.add("btn-light");
  btn1.classList.remove("btn-dark");
  btn2.classList.add("btn-dark");
};

const clickToClose = document.querySelectorAll(".clickToClose");

clickToClose.forEach((ele) => {
  ele.addEventListener("click", () => {
    let element = document.getElementById(ele.getAttribute("data-id"));
    element.classList.remove("active");
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.paddingRight = "0";
    document.querySelector(".new__navList-container").classList.remove("pop");
  });
});

let userWishlist = JSON.parse(localStorage.getItem("userWishlist")) ?? [];
const wishlistCounter = document.querySelector(".wishlist-counter");
if (document.querySelector("body").classList.contains("isLogin")) {
  wishlistCounter.textContent = userWishlist.length;
}
// 
const handleWishList = (id) => {
  if (document.querySelector("body").classList.contains("isLogin")) {
    const findmy = renderedProduct.find((e) => e.id === id);
    const findProduct = userWishlist.find((e) => e.id === id);

    if (findProduct) {
      userWishlist = userWishlist.filter((e) => e.id !== id);
      sendDataToLocalStorage("userWishlist", userWishlist);
      notyf.error("تم حذف المنتج من المفضلة");
      wishlistCounter.textContent = userWishlist.length;

    } else {
      userWishlist.push(findmy);
      sendDataToLocalStorage("userWishlist", userWishlist);
      notyf.success("تم إضافة المنتج إلى المفضلة");

      wishlistCounter.textContent = userWishlist.length;
    }
  } else {
    notyf.error("يرجي تسجيل الدخول أولاً");
    setTimeout(() => {
      location.href = "/login.html";
    }, 3000);
  }
};


const searchInput = document.getElementById("searchInput");
const searchBar = document.querySelector(".header_searchbar");
const productSearch = document.querySelector(".search__prodcut");
searchInput.addEventListener("keyup", () => {
  if (searchInput.value.trim().length == 0) {
    productSearch.classList.add("hidden");
  } else {
    productSearch.classList.remove("hidden");
  }
  const newData = renderedProduct.filter(
    (asd) =>
      asd.name.ar.includes(searchInput.value) ||
      asd.name.en.includes(searchInput.value)
  );
  productSearch.innerHTML = "";
  if (newData.length === 0) {
    productSearch.innerHTML = `
        <h2>لم يتم العثور علي المنتج</h2>
        `;
  } else {
    newData.forEach((e) => {
      productSearch.innerHTML += `
      <a href="/product.html?${e.id}">
      
      <div class=" d-flex gap-3 hoverMeNowHot align-items-center">
        <div class="img">
        <img src="${e.image[0]}" style="height: 40px;" >
        </div>
        <div class="title flex-grow-1">
        <p>${e.name.ar}</p>
        </div>
        <div class="price">$${e.price}</div>
    </div>
      </a>
    `;
    });
  }
});
window.addEventListener("click", (e) => {
  if (!e.target.closest(".header_searchbar")) {
    productSearch.classList.add("hidden");
  } else {
    if (searchInput.value.trim().length !== 0) {
      productSearch.classList.remove("hidden");
    }
  }
});
const showPassword = document.querySelector(".show-password");
const password = document.getElementById("password");
if (showPassword) {
  showPassword.addEventListener("click", () => {
    if (password.getAttribute("type") === "password") {
      password.setAttribute("type", "text");
      showPassword.classList.add("active");
    } else {
      password.setAttribute("type", "password");
      showPassword.classList.remove("active");
    }
  });
}



// const body = document.querySelector("body")
// body.addEventListener("click",e=>{
//   if(e.target.closest(".addToWishList")){

//     const addWish = e.target.closest(".addToWishList").querySelector(".addWish")
//     const removeWish = e.target.closest(".addToWishList").querySelector(".removeWish")
//     ssad(removeWish ,addWish )
//   }
// })
// function ssad(btn1, btn2) {
//   btn1.classList.add("d-block");
//   btn1.classList.remove("d-none");
//   btn2.classList.add("d-none");
// }




const errorPage = (element) => {
  element.innerHTML = `
  <div class="error__404 m-auto text-center active" >
    <div class="">
           <img src="./assets/images/error404.png" alt="" height="400px">
    </div>
    <h3>لا يمكن العثور على الصفحة</h3>
  </div>
    `;
  setTimeout(() => {
    location.href = "/";
  }, 3000);
}



let cartProducts = JSON.parse(localStorage.getItem("cart-products")) ?? [];
const cartCounter = document.querySelector(".cart-counter");
const cartContainer = document.querySelector(".cart__products");
function displayCart() {
  // cartCounter.textContent = userWishlist.length;
  cartContainer.innerHTML = "";
  cartProducts.map((product) => {
    cartContainer.innerHTML += `
    <li class="my-1">
              <div class="cart__product d-flex justify-content-between gap-1 align-items-center">
                <div class="product__name flex-grow-1 px-1" id="${product.id}">
                  <div class="remove__btn">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                  <a href="/product.html?${product.id}" class="p-0">${product.name.ar} <span class="siz">${product.sizes}</span></a>
                  <div class="color" style="background-color: ${product.colors}"></div>
                  <p class="m-0"><span>${product.quantity}</span> * <span>${product.price} جنيه</span></p>
                </div>
                <div class="product__image">
                  <img src="${product.image[0]}" alt="" height="50px" />
                </div>
              </div>
            </li>



      `;
  });
}
displayCart()


const removeSelect = document.querySelector("body");
removeSelect.addEventListener("click", (e) => {
  if (e.target.closest(".remove__btn")) {

    cartProducts = cartProducts.filter((ele) => ele.id !== +e.target.closest(".remove__btn").id || ele.sizes == e.target.closest(".siz").textContent );
    console.log(cartProducts);
    sendDataToLocalStorage("cart-products", cartProducts);
    displayCart();
    notyf.error("تم حذف المنتج من السلة");
    if (cartProducts.length == 0) {
      wishlistEmpty();
    }
  }
});