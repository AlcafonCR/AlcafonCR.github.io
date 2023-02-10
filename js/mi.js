const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaArticulos = document.querySelector('#lista-articulos');
const totalCarrito = document.querySelector('#total-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    listaArticulos.addEventListener('click', agregarArticulo)
    carrito.addEventListener('click', eliminarArticulo);
    vaciarCarritoBtn.addEventListener('click', () =>{
      articulosCarrito = [];
      limpiarHTML();
      funTotalCarrito();
  })
}

//Funciones

function agregarArticulo(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const articuloSeleccionado = e.target.parentElement.parentElement;
    leerDatosArticulo(articuloSeleccionado);
    funTotalCarrito();
  }
};

function eliminarArticulo(e) {
  e.preventDefault();
  if(e.target.classList.contains('borrar-articulo')) {
      const articuloId = e.target.getAttribute('data-id');
      articulosCarrito = articulosCarrito.filter( articulo => articulo.id !== articuloId)
      carritoHTML();
      funTotalCarrito();
  }
}

function leerDatosArticulo(articulo) {
  
  const infoArticulo = {
      titulo: articulo.querySelector('h5').textContent,
      precio: articulo.querySelector('.precio span').textContent,
      id: articulo.querySelector('a').getAttribute('data-id'),
      cantidad: 1
  }
  const existe = articulosCarrito.some(articulo => articulo.id === infoArticulo.id);
    if(existe) {
        const articulos = articulosCarrito.map( articulo => {
            if(articulo.id === infoArticulo.id) {
                articulo.cantidad++;
                return articulo;
            }else {
                return articulo;
            }
        })
        articulosCarrito = [...articulos];
    }else {
        articulosCarrito = [...articulosCarrito, infoArticulo];
    }
  carritoHTML();
};

function carritoHTML() { 
  limpiarHTML();
  articulosCarrito.forEach( articulo => {
      const {titulo, precio, cantidad, id} = articulo;
      const row = document.createElement('tr');
      row.classList.add('shoppingCartItem');
      row.innerHTML = `
          <td>
            ${id} 
          </td>
          <td>
              ${titulo}
          </td>
          <td class="shoppingCartItemPrice">
              ${precio}
          </td>
          <td class="shoppingCartItemQuantity">
              ${cantidad}
          </td>
          <td>
              <a href="#" class="borrar-articulo" data-id="${id}"> X </a>
          </td>
      `;
      contenedorCarrito.appendChild(row);
      funTotalCarrito();
  })
}

function limpiarHTML() {
  while(contenedorCarrito.firstChild){
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function funTotalCarrito() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('#total-carrito');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('₡', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.textContent
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    
  });

  shoppingCartTotal.innerHTML = `${total.toFixed(2)}`;
}