// function aumentarContador() {
//   var x = document.getElementById('contador');
//   var currentCount = parseInt(x.textContent, 10);
//   if (isNaN(currentCount)) {
//     currentCount = 0;
//   }
//   x.textContent = currentCount + 1;
// }

function establecerContador() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var cantidad = 0;
  carrito.forEach((item) => {
    cantidad += 1;
  });
  var x = document.getElementById("contador");
  x.textContent = cantidad;
}

function AgregarProductos(productoJson) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  //primero verifico si existe, y agrego solo la cantidad
  var existe = false;
  carrito.forEach((item) => {
    if (item.sku == productoJson.id) {
      item.cantidad += 1;
      item.total += item.price;
      existe = true;
    }
  });

  if (!existe) {
    var producto = {
      sku: productoJson.id,
      cantidad: 1,
      price: productoJson.price,
      title: productoJson.title,
      total: productoJson.price
    };

    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  establecerContador();
}

function crearItems(itemJson) {
  var item = document.createElement("div");
  item.className = "item";
  item.id = "item " + itemJson.id;

  // Agregar funcionalidad al hacer clic en el item del producto
  item.addEventListener("click", () => {
    // alert("clic en btn_" + itemJson.id + " el valor de TITLE es " + itemJson.title);
    AgregarProductos(itemJson);
  });

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
    <button class="add-to-cart" id="btn_${itemJson.id}">Agregar al Carrito</button>
    <div class="reviews">
      <h4>Reseñas:</h4>
      <p>Usuario1: ¡A mi gato le encanta!</p>
      <p>Usuario2: Buena calidad, pero un poco caro.</p>
    </div>
  `;
  document.getElementById("items").appendChild(item);
}

const obtenerItems = async () => {
  try {
    const get = await fetch(`https://fakestoreapi.com/products`);
    const items = await get.json();

    items.forEach((item) => {
      crearItems(item);
    });
  } catch (error) {
    console.log("Error al obtener los items de la API");
  }
};

establecerContador();
obtenerItems();