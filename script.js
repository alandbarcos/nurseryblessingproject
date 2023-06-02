
let subtotal = 0;
let iva = 0;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let producto;
let busqueda;
const compras = document.getElementById("productos");
const verCarrito = document.getElementById("verCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");
ventanaCarrito.className = "ventanaCarrito";
const contenedorCarrito = document.createElement("div");

const Productos = [{
    codigo: 1,
    nombre: "Maceta de cerámica (Erizo)",
    precio: 1600,
    stock: 130,
    imagen: "./img/terminados/erizo1.jpeg",
},
{
    codigo: 2,
    nombre: "Maceta de barro (Simples)",
    precio: 700,
    stock: 67,
    imagen: "./img/macetas/maceta-de-barro-clasica.jpg",
},
{
    codigo: 3,
    nombre: "Cactus pequeño",
    precio: 230,
    stock: 53,
    imagen: "./img/cactus/cactus1.jpg",
},
{
    codigo: 4,
    nombre: "Suculenta pequeña",
    precio: 200,
    stock: 82,
    imagen: "./img/suculentas/suculenta-pequeña.jpg",
},
{
    codigo: 5,
    nombre: "Suculenta mediana",
    precio: 300,
    stock: 36,
    imagen: "./img/suculentas/suculenta-mediana.jpg",
},
{
    codigo: 6,
    nombre: "Maceta + suculenta/cactus",
    precio: 2100,
    stock: 42,
    imagen: "./img/terminados/suculenta6.jpeg",
},
{
    codigo: 7,
    nombre: "Maceta de yeso (Casa)",
    precio: 1200,
    stock: 23,
    imagen: "./img/macetas/casa.jpeg",
},
{
    codigo: 8,
    nombre: "Maceta de yeso (Vaca)",
    precio: 1400,
    stock: 15,
    imagen: "./img/macetas/vaca.jpeg",
},
{
    codigo: 9,
    nombre: "Maceta de yeso (Elefante)",
    precio: 900,
    stock: 18,
    imagen: "./img/macetas/elefante.jpg",
},
{
    codigo: 10,
    nombre: "Maceta grande C/Mix de suculentas",
    precio: 2500,
    stock: 59,
    imagen: "./img/terminados/mix2.jpeg",
}
];

Productos.forEach((producto) => {
    const tarjetaProducto = document.createElement("div");
    
    tarjetaProducto.innerHTML = `
    <img src="${producto.imagen}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <p>Stock: ${producto.stock}</p>
    `;

    compras.append(tarjetaProducto);
    botonCompra = document.createElement("button");
    botonCompra.innerText = "Añadir al carrito";
    botonCompra.className = "btn btn-primary";
    tarjetaProducto.append(botonCompra);

    botonCompra.addEventListener("click", () =>{
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
        });
        console.log(carrito);
        guardarLocal();
    });
});

verCarrito.addEventListener("click", () =>{

    ventanaCarrito.innerHTML = "";
    ventanaCarrito.style.display = "block";
    contenedorCarrito.innerHTML = "";
    contenedorCarrito.style.display = "block";

    const encabezadoCarrito = document.createElement("div");
    encabezadoCarrito.className = "encabezadoCarrito";
    encabezadoCarrito.innerHTML = `
    <h2>Carrito de compras</h2>
    `;

    const cierreCarrito = document.createElement("button");
    cierreCarrito.innerText = "X";
    cierreCarrito.className = "btn btn-danger";
    cierreCarrito.addEventListener("click",() =>{
        ventanaCarrito.style.display = "none";
    })
    encabezadoCarrito.append(cierreCarrito);
    ventanaCarrito.append(encabezadoCarrito);

    carrito.forEach((producto) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenidoCarrito";
        contenidoCarrito.innerHTML = `
        <h3>${producto.nombre}</h3>
        <h3>Precio: $${producto.precio}</h3>
        <img src="${producto.imagen}">
        `;

        subtotal+=producto.precio;
        iva+=calcularIva(producto.precio);
        contenedorCarrito.append(contenidoCarrito);
        ventanaCarrito.append(contenedorCarrito);
    });

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "totalCarrito";
    totalCarrito.innerHTML = `
    <h3>Subtotal: $${subtotal}</h3>
    <h3>IVA 21%: $${iva}</h3>
    <h3>Total a pagar: $${subtotal+iva}</h3>
    `
    ventanaCarrito.append(totalCarrito);
    subtotal = 0;
    iva = 0;
    
    const operacion = document.createElement("div");
    operacion.className = "operacion";
    botonVaciar = document.createElement("button");
    botonVaciar.className = "btn btn-warning";
    botonVaciar.innerText = "Vaciar carrito";
    operacion.append(botonVaciar);
    ventanaCarrito.append(operacion);
    botonVaciar.addEventListener("click",() =>{
        carrito = [];
        contenedorCarrito.style.display = "none";
        subtotal = 0;
        iva = 0;
        totalCarrito.innerHTML = `
        <h3>Subtotal: $${subtotal}</h3>
        <h3>IVA 21%: $${iva}</h3>
        <h3>Total a pagar: $${subtotal+iva}</h3>
        `
        localStorage.removeItem("carrito");
        console.log(carrito);
    })
});

function calcularIva(numero){

    let resultado = numero*0.21;
    return resultado;
}

const guardarLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};




