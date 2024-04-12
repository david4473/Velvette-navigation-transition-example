async function init() {
  const data = await fetch("products.json");
  const results = await data.json();

  function render() {
    const title = document.getElementById("title");
    const product_list = document.querySelector("#product-list ul");
    product_list.innerHTML = "";

    for (const product of results) {
      const li = document.createElement("li");
      li.id = `product-${product.id}`;
      li.innerHTML = `
      <a href="?product=${product.id}">
      <img class="product-img" src="${product.image}" />
      <span class="title">${product.title}</span>
    </a>
      `;
      product_list.append(li);
    }

    const searchParams = new URL(location.href).searchParams;
    if (searchParams.has("product")) {
      const productId = +searchParams.get("product");
      const product = results.find((product) => product.id === productId);
      if (product) {
        const details = document.querySelector("#product-details");
        details.querySelector(".title").innerText = product.title;
        details.querySelector("img").src = `${product.image}`;
      }
    }

    if (searchParams.has("product")) {
      title.innerText = "Product Details";
    } else {
      title.innerText = "Product List";
    }

    document.documentElement.classList.toggle(
      "details",
      searchParams.has("product")
    );
  }

  render();

  navigation.addEventListener("navigate", (e) => {
    e.intercept({
      handler() {
        document.startViewTransition(() => {
          render();
        });
      },
    });

    //Uncomment to enable Velvette

    /* const velvette = new Velvette({
    routes: {
      details: "?product=:product_id",
      list: "?products",
    },
    rules: [
      {
        with: ["list", "details"],
        class: "morph",
      },
    ],
    captures: {
      ":root.vt-morph.vt-route-details #details-img": "morph-img",
      ":root.vt-morph.vt-route-list #product-$(product_id) img": "morph-img",
    },
  });
  
  navigation.addEventListener("navigate", (e) => {
    const url = new URL(e.destination.url);
    if (location.pathname !== url.pathname) return;
    
    velvette.intercept(e, {
      handler() {
        render();
      },
    });
  }); */
  });
}

init();
