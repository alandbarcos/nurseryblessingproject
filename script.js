
let subtotal = 0;
let iva = 0;
let carrito = [];
let producto;
let busqueda;
const compras = document.getElementById("productos");
const verCarrito = document.getElementById("verCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");
ventanaCarrito.className = "ventanaCarrito";

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
let img7 = document.createElement("img");
img7.src = "./img/macetas/casa.jpeg";
let img8 = document.createElement("img");
img8.src = "./img/macetas/vaca.jpeg";
let img9 = document.createElement("img");
img9.src = "./img/macetas/elefante.jpg";
let img10 = document.createElement("img");
img10.src = "./img/terminados/mix2.jpeg";

const prod1 = new CreaProducto(img1,"Maceta de cerámica (Erizo)", 1600 , 130);
const prod2 = new CreaProducto(img2,"Maceta de barro (Simples)", 700 , 67);
const prod3 = new CreaProducto(img3,"Cactus pequeño", 230 , 53);
const prod4 = new CreaProducto(img4,"Suculenta pequeña", 200 , 82);
const prod5 = new CreaProducto(img5,"Suculenta mediana", 300 , 36);
const prod6 = new CreaProducto(img6,"Maceta + suculenta/cactus", 2100 , 42);
const prod7 = new CreaProducto(img7,"Maceta de yeso (Casa)", 1200 , 23);
const prod8 = new CreaProducto(img8,"Maceta de yeso (Vaca)", 1400 , 15);
const prod9 = new CreaProducto(img9,"Maceta de cerámica (Elefante)", 900 , 18);
const prod10 = new CreaProducto(img10,"Maceta grande C/Mix de suculentas", 2500 , 59);



const Productos = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10];

// const servBodas = new CreaServicio("Bodas", 35000);
// const servCumple = new CreaServicio("Cumpleaños", 22000);
// const servBautismos = new CreaServicio("Bautismos", 15000);
// const servAlmuerzosyCenas = new CreaServicio("Almuerzos y Cenas Privadas", 18000);

Productos.forEach((producto) => {
    const tarjetaProducto = document.createElement("div");
    
    tarjetaProducto.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <p>Stock: ${producto.stock}</p>
    `;
    tarjetaProducto.append(producto.imagen);
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

    ventanaCarrito.innerHTML = "";

    const encabezadoCarrito = document.createElement("div");
    encabezadoCarrito.className = "encabezadoCarrito";
    encabezadoCarrito.innerHTML = `
    <h2>Carrito de compras</h2>
    <button>X</button>
    `;
    ventanaCarrito.append(encabezadoCarrito);

    carrito.forEach((producto) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenidoCarrito";
        contenidoCarrito.innerHTML = `
        <h3>${producto.nombre}</h3>
        <h3>Precio: $${producto.precio}</h3>
        `;
        contenidoCarrito.append(producto.imagen);
        subtotal+=producto.precio;
        ventanaCarrito.append(contenidoCarrito);
    });

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "totalCarrito";
    totalCarrito.innerHTML = `
    <h3>Subtotal: ${subtotal} IVA 21%: ${iva}</h3>`
    ventanaCarrito.append(totalCarrito);
    
});

function CreaProducto (imagenProd,nombreProd,precioProd,stockProd){

    this.imagen = imagenProd;
    this.nombre = nombreProd;
    this.precio = precioProd;
    this.stock = stockProd;
}

// function CreaServicio (nombreServ,precioServ){

//     this.nombre = nombreServ;
//     this.precio = precioServ;
// }




