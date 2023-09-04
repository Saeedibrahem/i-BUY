document.addEventListener("DOMContentLoaded", () => {
  if (!JSON.parse(localStorage.getItem("login"))) {
    document.querySelector(
      "body"
    ).innerHTML += `  <div class="error__404 m-auto text-center active" >
<div class="">
  <img src="./assets/images/error404.png" alt="" >
</div>
<h3>لا يمكن العثور على الصفحة</h3>
</div>
`;
    setTimeout(() => {
      location.href = "/";
    }, 3000);
  } else {
    let userName = JSON.parse(localStorage.getItem("login"));

    document.getElementById("userName").textContent = userName?.username
      ? userName.username
      : userName.email.split("@")[0];
  }
});

document.querySelector(".logOut").addEventListener("click", () => {
  if (
    location.pathname.includes("wishlist") ||
    location.pathname.includes("myAccount")
  ) {
    let userName = JSON.parse(localStorage.getItem("login")).email.split("@")[0];
    notyf.success(`هتوحشنا 💔${user.username ? user.username : userName}`);
    setTimeout(() => {
      location.href = "/";
      loggedOut();
    }, 2000);
  }

});
const user = JSON.parse(localStorage.getItem("login")) ?? {};
const userData = JSON.parse(localStorage.getItem("userData")) ?? [];

const accountForm = document.getElementById("accountForm");
let userFormData = { ...user };
accountForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (user.password === e.target.userOldPass.value) {
    if (e.target.firstName.value.length !== 0) {
      userFormData.firstName = e.target.firstName.value;
    }
    if (e.target.lastName.value.length !== 0) {
      userFormData.lastname = e.target.lastName.value;
    }
    if (e.target.userName.value.length !== 0) {
      e.target.userName.value = userFormData.username;
      userFormData.username = e.target.userName.value;
      document.getElementById("userName").textContent = e.target.userName.value
    }
    if (e.target.userEmail.value.length !== 0) {
      userFormData.email = e.target.userEmail.value;
    }
    if (
      e.target.userNewPass.value.length !== 0 ||
      e.target.userNewPass2.value.length !== 0
    ) {
      if (e.target.userNewPass.value === e.target.userNewPass2.value) {
        userFormData.password = e.target.userNewPass.value;
        closePop(e.target);
        loggedOut();
        setTimeout(() => {
          location.href = "/login.html";
        }, 2000);
        return;
      } else {
        notyf.error("كلمة المرور غير متطابقة");
      }
    }
    closePop(e.target);
  } else {
    notyf.error("كلمة المرور الحاليه خاطئه");
  }
});

const loggedOut = () => {
  localStorage.removeItem("login");
  document.querySelector("body").classList.remove("isLogin");
  document.querySelector(".wishlist a").removeAttribute("href", "wishlist.html");
  document.querySelector(".new__wishlist a").removeAttribute("href", "wishlist.html");
  wishlistCounter.textContent = "0";
};
const closePop = (e) => {
  const newUserData = userData.filter((ele) => ele.email !== user.email);
  newUserData.push(userFormData);
  localStorage.setItem("login", JSON.stringify(userFormData));
  localStorage.setItem("userData", JSON.stringify(newUserData));
  notyf.success("تم حفظ التغييرات بنجاح");
  e.firstName.value = "";
  e.lastName.value = "";
  e.userName.value = "";
  e.userEmail.value = "";
  e.userOldPass.value = "";
  e.userNewPass.value = "";
  e.userNewPass2.value = "";
};
