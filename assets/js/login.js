document.addEventListener("DOMContentLoaded", () => {
  if (JSON.parse(localStorage.getItem("login"))) {
    document.querySelector(
      "body"
    ).innerHTML += ` 
    <div class="error__404 m-auto text-center active" >
      <div class="">
             <img src="./assets/images/error404.png" alt="" >
      </div>
      <h3>لا يمكن العثور على الصفحة</h3>
    </div>
      `;
    setTimeout(() => {
      location.href = "/";
    }, 3000);
  }
});
