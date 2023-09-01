let userWishlist = JSON.parse(localStorage.getItem("userWishlist")) ?? [];
const wishlistData = document.querySelector(".wishlist__data");

wishlistData.innerHTML = "";
userWishlist.map((ele) => {
  wishlistData.innerHTML += `
  <div class="wishlist__box-title">
  <div class="product-remove">
    <div class="d-flex align-items-center justify-content-center p-3 remove"  >
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
  <a href="/product.html?${ele.id}" class="product-thumbnail p-3">
    <img
      src=${ele.image[0]}
      alt=""
      height="68px"
    />
  </a>
  <div class="product-name p-3">
    <a href="/product.html?${ele.id}">${ele.name.ar}</a
    >
  </div>
  <div class="product-price p-3">
    <span class="old__price ">${ele.old_price} جنيه</span>
    <span class="new__price">${ele.price} جنيه</span>
  </div>
  <div class="product-date p-3"><span>أغسطس 29, 2023</span></div>
  <div class="product-stock p-3">
    <i class="fa-solid fa-check"></i> <span>متوفر بالمخزون</span>
  </div>
</div>
    `;
});
const select = document.querySelector("body");
select.addEventListener("click", (e) => {
  if (e.target.closest(".product-remove")) {
    if (e.target.closest(".product-remove .remove")) {
let newuserWishlist = 
      console.log("123");
    }
    // const removeBtn = e.target
    //   .closest(".product-remove")
    //   .querySelector(".remove");
    // console.log(removeBtn);
  } else {
    console.log("sss");
  }
});

// taskTable.addEventListener('click', function(e){
//   if(e.target.classList.contains('btn-delete')){
//       let item = e.target;
//       let id = item.getAttribute('data-id')
//       let storageData = getDataFromLocalStorage();
//       let newData = storageData.filter(function(item){
//           return item.id != id ;
//       });
//       addDataToLocalStorage(newData);
//       item.parentElement.parentElement.remove();

//   }
//   if(e.target.classList.contains('btn-edit')){
//       let item = e.target;
//       let taskTdTitle = item.parentElement.previousElementSibling.textContent;
//       taskTitle.value = taskTdTitle;
//       btnAddToUpdate();
//       status = item.getAttribute('data-id')
//   }
// });





// const monthes = ["","يناير","فبراير","مارس","إبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]
// setInterval(() => {

// }, 1000);
// const day = new Date().getDate();
// const month = new Date().getMonth().toPrecision();
// // console.log(day, monthes);
// const find = monthes.find(i => i == month )
// console.log(find);
