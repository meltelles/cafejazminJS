// URL del API
const URL = "https://jsonplaceholder.typicode.com/comments";

// Lista inicial de productos
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

// Transforma descuento decimal a string con %
const dtoEnPorcentaje = (descuento) => `${descuento * 100}%`;

// Transforma numero a string con $
const precioEnPesos = (precio) => `$${precio}`;

// Calcula descuento dado un precio y un descuento
const calcularDescuento = (precio, descuento) => {
  let descuentoNumero = parseFloat(descuento);
  let precioNumero = parseFloat(precio);
  descuentoNumero /= 100;
  return precio - precio * descuentoNumero;
};

// Procesa formulario y agrega un producto
function cargarProducto(elementos) {
  event.preventDefault();

  let error = false;
  const nombre = elementos.nombre.value;
  const precio = parseFloat(elementos.precio.value);
  let dto = parseFloat(elementos.descuento.value) / 100;

  // validacion de parametros
  if (isNaN(precio) || precio <= 0) {
    error = true;
  }

  if (isNaN(dto)) {
    dto = 0;
  }

  if (dto > 1 || dto < 0) {
    error = true;
  }

  // En caso de error muestra notificacion al usuario
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor verifica los datos",
    });
    return;
  }

  const producto = {
    nombre: nombre,
    precio: precio,
    descuento: dto,
  };

  // Muestra notificacion exitosa si pudo agregar elemento
  Swal.fire({
    icon: "success",
    title: "Exito!",
    text: "Tu producto fue creado exitosamente",
  });

  productos.push(producto);
  elementos.reset();
  agregarElementos();
  guardarProductos();
}

// Crea card con estilo de bootstrap
function crearCard({ nombre, precio, descuento, final }) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card text-center cardProducto";
  const titleHeader = document.createElement("h4");
  titleHeader.className = "card-header";
  titleHeader.innerText = nombre;
  const bodyDiv = document.createElement("div");
  bodyDiv.className = "card-body";

  const precioP = document.createElement("p");
  precioP.className = "card-text";
  precioP.innerText = precio;
  const dtoP = document.createElement("p");
  dtoP.className = "card-text";
  dtoP.innerText = descuento;
  const finalP = document.createElement("p");
  finalP.className = "card-text";
  finalP.innerText = final;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-block";
  deleteBtn.innerText = "Borrar producto";
  deleteBtn.onclick = () => {
    productos = productos.filter((e) => e.nombre != nombre);
    agregarElementos();
  };

  bodyDiv.appendChild(precioP);
  bodyDiv.appendChild(dtoP);
  bodyDiv.appendChild(finalP);
  bodyDiv.appendChild(deleteBtn);

  cardDiv.appendChild(titleHeader);
  cardDiv.appendChild(bodyDiv);

  return cardDiv;
}

// Crea el elemento de la lista
function crearProducto(producto) {
  const productoElem = document.createElement("li");
  productoElem.appendChild(crearCard(producto));

  return productoElem;
}

// Itera la lista de productos y por cada uno crea un elemento
function agregarElementos(filtrar) {
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
  for (let p of productosEnTexto) {
    const elem = crearProducto(p);
    listaProductos.appendChild(elem);
  }
}

// Popula la lista de productos desde un JSON guardado en localStorage
function cargarProductos() {
  const prod = localStorage.getItem("productos");
  if (prod != null) {
    productos = JSON.parse(prod);
  }
  agregarElementos();
}


// Guarda la lista de productos en localStorage
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Borra los productos y los elimina de localStorage
function borrarProductos() {
  localStorage.removeItem("productos");
  productos = [];
  agregarElementos();
}

// Carga una lista de comentarios desde el API
async function cargarComentarios() {
  const cargando = document.getElementById("cargando");
  cargando.style.display = "block";
  const resp = await fetch(URL, { method: "GET" });
  const comentarios = await resp.json();
  const lista = document.getElementById("resenas");
  cargando.remove();
  botonCargarResenas.remove();

  for (let i = 0; i < comentarios.length && i < 10; i++) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = comentarios[i].name;
    lista.appendChild(li);
  }
}

const boton = document.getElementById("mostrar");
const botonSinDescuento = document.getElementById("mostrarSinDescuento");
const botonBorrar = document.getElementById("borrar");
const botonCargarResenas = document.getElementById("cargar");

boton.onclick = agregarElementos;
botonBorrar.onclick = borrarProductos;
botonSinDescuento.onclick = () => agregarElementos("sinDescuento");
botonCargarResenas.onclick = cargarComentarios;

// Los productos arrancan cargados cuando arranca la pagina
cargarProductos();
