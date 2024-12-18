function eliminarProducto(idProducto) {
  var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter((producto) => {
    return producto.sku != idProducto;
  });
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar un ítem de la tabla
function crearFuncionalidadBorrado() {
  document.querySelectorAll('.delete-item').forEach(function(element) {
    element.addEventListener('click', function() {
      var id = element.id;
      var partes = id.split("_");
      var sku = partes[1];
      eliminarProducto(sku);
      actualizarCarrito();
    });
  });
}

function actualizarCarrito() {
  var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  var listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    var producto = carrito[i];
    var tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${producto.sku}</td>
      <td>${producto.title}</td>
      <td>$${producto.price}</td>
      <td>$${producto.total}</td>
      <td><input type="number" value="${producto.cantidad}" min="1"></td>
      <td><span id= "delete-item_${producto.sku}" class="delete-item">Borrar</span></td>
    `;
    //li.textContent = producto.title + " - $ " + producto.total;
    listaCarrito.appendChild(tr);
  }
  crearFuncionalidadBorrado();
}

actualizarCarrito();