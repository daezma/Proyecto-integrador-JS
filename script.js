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
      total: productoJson.price,
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
    AgregarProductos(itemJson);
  });

  var numero = itemJson.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  //alt 96 -__-
  item.innerHTML = `
    <img src="${itemJson.image}" alt="${itemJson.description}" class="item-img" id="img_${itemJson.id}"/>
    <h3>${itemJson.title}</h3>
    <p>Categoría: ${itemJson.category}</p>
    <p>Precio: $${numero}</p>
    <p>Código: ${itemJson.id}</p>
    <button class="add-to-cart" id="btn_${itemJson.id}">Agregar al Carrito</button>
    <div class="reviews">
      <h4>Reseñas:</h4>
      <p>Usuario1: ¡A mi gato le encanta!</p>
      <p>Usuario2: Buena calidad, pero un poco caro.</p>
    </div>
    <div id="modal_${itemJson.id}" class="modal">
      <div class="modal-content">
          <span class="close" id="closeModal_${itemJson.id}">&times;</span>
          <p>${itemJson.description}</p>
      </div>
    </div>
  `;
  document.getElementById("items").appendChild(item);

  //Implementar un evento click que muestra la descripción ampliada del producto que clickeamos.
  var modal = document.getElementById("modal_"+itemJson.id);
  // Obtener la imagen y asignarle un evento de clic
  var img = document.getElementById("img_"+itemJson.id);
  img.onclick = function() {
      modal.style.display = "block";
  }
  // Obtener el elemento <span> que cierra el modal
  var span = document.getElementById("closeModal_"+itemJson.id);
  // Cuando el usuario hace clic en <span> (x), cierra el modal
  span.onclick = function() {
      modal.style.display = "none";
  }
}

const obtenerItems = async () => {
  try {
    const get = await fetch("./productos.json");
    const items = await get.json();

    //Crear un ciclo que genere dinámicamente una lista de productos disponibles y los muestre en la consola
    items.forEach((item) => {
      crearItems(item);
      console.log("Artículo %s Precio $ %s", item.title, item.price);
    });
  } catch (error) {
    console.log("Error al obtener los items de la API");
  }
};

//Implementar una función que verifique si todos los campos del formulario de contacto están completos, mostrando un mensaje en la consola.
function validarFrmContacto() {
  const submit = document.getElementById("submitFormspree");
  submit.addEventListener("click", () => {
    if (
      document.getElementById("name").value.trim() === "" ||
      document.getElementById("email").value.trim() === "" ||
      document.getElementById("message").value.trim() === ""
    )
      console.log("El campo nombre debe contener un valor");
  });
}

establecerContador();
obtenerItems();
validarFrmContacto();