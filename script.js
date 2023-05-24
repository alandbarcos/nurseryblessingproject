

let opcion;
let descripcionCompra = "";
let subtotal = 0;
let iva = 0;
let resultadosBusqueda = "";
let carrito = [];
let producto;
let busqueda;
const compras = document.getElementById("compras");
const verCarrito = document.getElementById("verCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");

let img1 = document.createElement("img");
img1.src = "./img/terminados/erizo1.jpeg";

let img2 = document.createElement("img");
img2.src = "./img/macetas/maceta-de-barro-clasica.jpg";

let img3 = document.createElement("img");
img3.src = "./img/cactus/cactus4.jpg";

let img4 = document.createElement("img");
img4.src = "./img/suculentas/suculenta-pequeña.jpg";

let img5 = document.createElement("img");
img5.src = "./img/suculentas/suculenta-mediana.jpg";

let img6 = document.createElement("img");
img6.src = "./img/terminados/suculenta6.jpeg";

const prod1 = new CreaProducto(img1,"Macetas de cerámica (Animales)", 1600 , 130);
const prod2 = new CreaProducto(img2,"Macetas de barro (Simples)", 700 , 67);
const prod3 = new CreaProducto(img3,"Cactus pequeño", 230 , 53);
const prod4 = new CreaProducto(img4,"Suculenta pequeña", 200 , 82);
const prod5 = new CreaProducto(img5,"Suculenta mediana", 300 , 36);
const prod6 = new CreaProducto(img6,"Macetas + suculentas/cactus", 2100 , 42);

const servBodas = new CreaServicio("Bodas", 35000);
const servCumple = new CreaServicio("Cumpleaños", 22000);
const servBautismos = new CreaServicio("Bautismos", 15000);
const servAlmuerzosyCenas = new CreaServicio("Almuerzos y Cenas Privadas", 18000);

const Productos = [prod1, prod2, prod3, prod4, prod5, prod6];

Productos.forEach(producto => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.innerHTML = `
    <h3>Producto: ${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <p>Stock: ${producto.stock}</p>
    `;
    tarjetaProducto.appendChild(producto.imagen);
    compras.append(tarjetaProducto);
    botonCompra = document.createElement("button");
    botonCompra.innerText = "Añadir al carrito";
    tarjetaProducto.append(botonCompra);

    botonCompra.addEventListener("click", () =>{
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
        });
        console.log(carrito);
    });
});

verCarrito.addEventListener("click", () =>{
    let encabezadoCarrito = document.createElement("div");
    encabezadoCarrito.innerHTML = `
    <h3>Carrito de compras</h3>
    <button>X</button>
    `;
    ventanaCarrito.append(encabezadoCarrito);

    carrito.forEach((producto) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.innerHTML = `
        <h3>Producto: ${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>`;
        contenidoCarrito.appendChild(producto.imagen);
    })
    
})

function CreaProducto (imagenProd,nombreProd,precioProd,stockProd){

    this.imagen = imagenProd;
    this.nombre = nombreProd;
    this.precio = precioProd;
    this.stock = stockProd;
}

function CreaServicio (nombreServ,precioServ){

    this.nombre = nombreServ;
    this.precio = precioServ;
}




