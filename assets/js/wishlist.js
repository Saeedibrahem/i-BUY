let userWishlist = JSON.parse(localStorage.getItem("userWishlist")) ?? [];
const wishlistData = document.querySelector(".wishlist__data");

wishlistData.innerHTML = "";
userWishlist.map((ele) => {
  wishlistData.innerHTML += `
  <div class="wishlist__box-title">
  <div class="product-remove p-3">
    <div class="d-flex align-items-center justify-content-center">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
  <div class="product-thumbnail p-3">
    <img
      src=${ele.image[0]}
      alt=""
      height="68px"
    />
  </div>
  <div class="product-name p-3">
    <a
      href="/product.html?${ele.id}"
      class="text-danger"
      style="text-decoration: underline !important"
      >${ele.name.ar}</a
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
