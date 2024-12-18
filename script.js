function aumentarContador() {
  var x = document.getElementById("contador");
  var currentCount = parseInt(x.textContent, 10);
  if (isNaN(currentCount)) {
    currentCount = 0;
  }
  x.textContent = currentCount + 1;
}
// aumentarContador();

function leerItems() {
  var items = document.getElementsByClassName("item");
  console.log(items);
}
// leerItems();

function crearitems(itemJson) {
  //const div = document.querySelector("#items");
  var item = document.createElement("div");
  item.className = "item"
  //div.appendChild(item);
  //alt 96
  item.innerHTML = `
    <img src="${itemJson.image}" alt="${itemJson.description}" class="item-img" />
    <h3>${itemJson.title}</h3>
    <p>
      Descripción Detallada: ${itemJson.description}
    </p>
    <p>Categoría: ${itemJson.category}</p>
    <p>Precio: $${itemJson.price}</p>
    <p>SKU: ${itemJson.id}</p>
    <button class="add-to-cart">Agregar al Carrito</button>
    <div class="reviews">
      <h4>Reseñas:</h4>
      <p>Usuario1: ¡A mi gato le encanta!</p>
      <p>Usuario2: Buena calidad, pero un poco caro.</p>
    </div>
  `;
  document.getElementById("items").appendChild(item);
  //console.log(document.getElementById("items"));
}
//crearitems();

const obtenerItems = async () => {
  try {
    const get = await fetch(`https://fakestoreapi.com/products`);
    const items = await get.json();
    console.log(items);

    items.forEach(item => {
      crearitems(item);
      console.log('Producto:', item);
    });

  } catch (error) {
    console.log("Error al obtener los items de la API");
  }
}

obtenerItems();