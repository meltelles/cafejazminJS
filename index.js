alert("Calculadora de precios. Para salir escriba cerrar!");

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

  while (true) {
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
  }
}

calcularPrecios();
