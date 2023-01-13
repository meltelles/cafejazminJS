let productos = [
  {
    nombre: "Café Etiopía 200g",
    precio: 2000,
    descuento: 0,
  },
  {
    nombre: "Café Colombia 200g",
    precio: 1400,
    descuento: 0.15,
  },
  {
    nombre: "Café Ecuador 200g",
    precio: 1900,
    descuento: 0.1,
  },
  {
    nombre: "Café Kenya 200g",
    precio: 2100,
    descuento: 0,
  },
  {
    nombre: "Café Guatemala 200g",
    precio: 1500,
    descuento: 0.2,
  },
];

const dtoEnPorcentaje = (descuento) => `${descuento * 100}%`;
const precioEnPesos = (precio) => `$${precio}`;

function calcularDescuento(precio, descuento) {
  let descuentoNumero = parseFloat(descuento);
  let precioNumero = parseFloat(precio);
  descuentoNumero /= 100;
  return precio - precio * descuentoNumero;
}

function evaluarCerrar(producto) {
  return producto === "cerrar";
}

function calcularPrecios() {
  let producto;
  let precio;
  let descuento;
  alert("Calculadora de precios. Para salir escriba: cerrar");
  let termino = false;

  do {
    producto = prompt("Ingrese el nombre del producto: ");
    if (evaluarCerrar(producto)) {
      break;
    }
    precio = prompt("Ingrese el precio del producto: ");
    if (evaluarCerrar(precio)) {
      break;
    }
    if (isNaN(parseFloat(precio)) || precio < 0) {
      alert("el precio no es valido. Intente devuelta.");
      continue;
    }
    descuento = prompt(
      "Ingrese el descuento del producto en porcentaje (ej: 20%): "
    );

    let descuentoNumero = parseFloat(descuento);
    if (
      isNaN(descuentoNumero) ||
      descuentoNumero < 0 ||
      descuentoNumero > 100
    ) {
      alert("el descuento no es valido. Intente devuelta.");
      continue;
    }
    if (evaluarCerrar(descuento)) {
      break;
    }

    const precioCalculado = calcularDescuento(precio, descuento);

    alert(`El precio de ${producto} es: $${precioCalculado}`);
    termino = true;
  } while (!termino);
}

function crearProducto(producto) {
  const productoElem = document.createElement("li");
  const nombreElem = document.createElement("h4");
  nombreElem.innerHTML = producto.nombre;
  const precioElem = document.createElement("p");
  precioElem.innerHTML = producto.precio;
  const descuentoElem = document.createElement("p");
  descuentoElem.innerHTML = producto.descuento;
  const precioFinalElem = document.createElement("p");
  precioFinalElem.innerHTML = producto.final;

  productoElem.appendChild(nombreElem);
  productoElem.appendChild(precioElem);
  productoElem.appendChild(descuentoElem);
  productoElem.appendChild(precioFinalElem);

  return productoElem;
}

function agregarElementos(filtrar) {
  console.log("funciona");
  const listaProductos = document.getElementById("productos");
  listaProductos.innerHTML = "";
  let productosFiltrados = productos;

  if (filtrar === "sinDescuento") {
    productosFiltrados = productos.filter((p) => p.descuento === 0);
  }

  const productosEnTexto = productosFiltrados.map((producto) => {
    return {
      nombre: producto.nombre,
      precio: `precio: ${precioEnPesos(producto.precio)}`,
      descuento: `descuento: ${dtoEnPorcentaje(producto.descuento)}`,
      final: `precio final: ${precioEnPesos(
        calcularDescuento(producto.precio, dtoEnPorcentaje(producto.descuento))
      )}`,
    };
  });
  console.log(productosEnTexto);

  for (let p of productosEnTexto) {
    const elem = crearProducto(p);
    listaProductos.appendChild(elem);
  }
}

const boton = document.getElementById("mostrar");
const botonSinDescuento = document.getElementById("mostrarSinDescuento");
const botonCalcular = document.getElementById("calcularPrecio");

boton.onclick = agregarElementos;
botonCalcular.onclick = calcularPrecios;
botonSinDescuento.onclick = () => agregarElementos("sinDescuento");
