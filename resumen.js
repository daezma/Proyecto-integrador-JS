function eliminarProducto(idProducto) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((producto) => {
    return producto.sku != idProducto;
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function modificarCantidad(idProducto, cantidad) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach((item) => {
    if (item.sku == idProducto) {
      item.cantidad = cantidad;
      item.total = item.price * cantidad;
    }
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para eliminar un ítem de la tabla
function crearFuncionalidadBorrado() {
  document.querySelectorAll(".delete-item").forEach(function (element) {
    element.addEventListener("click", function () {
      var id = element.id;
      var partes = id.split("_");
      var sku = partes[1];
      eliminarProducto(sku);
      actualizarCarrito();
    });
  });
}

function crearFuncionalidadCambioCantidad() {
  document.querySelectorAll(".count-item").forEach(function (element) {
    element.addEventListener("blur", () => {
      var id = element.id;
      var partes = id.split("_");
      var sku = partes[1];

      if (element.value == "") {
        var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter((producto) => {
          return producto.sku == sku;
        });
        element.value = carrito[0].cantidad;
      } else {
        if (element.value != "") {
          const cant = parseInt(element.value);
          if (cant > 0) {
            modificarCantidad(sku, cant);
            actualizarCarrito();
          }
        }
      }
    });
  });
}

function botonFinalizar() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var boton = document.querySelector("#btnFnalizarCompra");
  boton.disabled = carrito.length == 0 ? true : false;

  boton.addEventListener("click", () => {
    var modal = document.querySelector("#modal_gracias");
    modal.style.display = "block";
    // Obtener el elemento <span> que cierra el modal
    var span = document.querySelector("#closeModal_gracias");
    span.onclick = function () {
      modal.style.display = "none";
    };
    //Borrar el carrito
    localStorage.removeItem("carrito");
    actualizarCarrito();
  });
}

function actualizarCarrito() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    var producto = carrito[i];
    var tr = document.createElement("tr");
    var price = producto.price.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    var total = producto.total.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    tr.innerHTML = `
      <td class="tdCenter">${producto.sku}</td>
      <td>${producto.title}</td>
      <td class="tdRight">$${price}</td>
      <td class="tdRight">$${total}</td>
      <td class="tdCenter"><input type="number" value="${producto.cantidad}" min="1" class="count-item" id="count-item_${producto.sku}" ></td>
      <td class="tdCenter"><span id="delete-item_${producto.sku}" class="delete-item">Borrar</span></td>
    `;
    //li.textContent = producto.title + " - $ " + producto.total;
    listaCarrito.appendChild(tr);
  }
  crearFuncionalidadBorrado();
  crearFuncionalidadCambioCantidad();
  botonFinalizar();
}

actualizarCarrito();
