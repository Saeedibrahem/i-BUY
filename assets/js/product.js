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

const route = window.location.search.split("?").join("");
console.log(route);
callBack(`https://fakestoreapi.com/products/${route}`)
  .then((res) => {
    const card__container = document.querySelector(".card__container");
    if (res) {
      card__container.innerHTML = `
            <div class="col p-2">
              <div class="card">
                <img src=${res.image} class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${res.title}</h5>
                  <p class="card-price">$${res.price}</p>
                  <p class="card-category"> ${res.category} </p>
                  <p class="card-text"> ${res.description} </p>
                  <a href="#" class="btn btn-primary">add to cart</a>
                </div>
              </div>
            </div>
            `;
    } else {
      card__container.innerHTML = `
    <h2> can't find this product</h2>
    <a href="/" class="btn btn-primary">back to home</a>  `;
    }
  })
  .finally((_) => {
    const loading = document.querySelector(".loading").classList.add("done");
  });
