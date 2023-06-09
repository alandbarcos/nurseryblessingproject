
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

const obtenerProductos = async () =>{
    const response = await fetch("/productos.json");
    const data = await response.json();

    data.forEach((producto) =>{
        const tarjetaProducto = document.createElement("div");
    
    tarjetaProducto.innerHTML = `
    <img src="${producto.imagen}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    `;

    compras.append(tarjetaProducto);
    botonCompra = document.createElement("button");
    botonCompra.innerText = "Añadir al carrito";
    botonCompra.className = "btn btn-primary";
    tarjetaProducto.append(botonCompra);

    botonCompra.addEventListener("click", () =>{
        const encontrado = carrito.some((el) => el.codigo === producto.codigo);
        if(encontrado){
            carrito.map((prod) => {
                if(prod.codigo === producto.codigo){
                    prod.cantidad++;
                }
            });
        }else{
            carrito.push({
                codigo: producto.codigo,
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                imagen: producto.imagen,
                cantidad: producto.cantidad,
            });
            Swal.fire({
                icon: 'success',
                title: 'Entendido',
                text: 'Agregaste "' + producto.nombre + '" al carrito',
                showConfirmButton: false,
                timer: 1500,
            })
        }
        console.log(carrito);
        guardarLocal();
    });
    })
}
obtenerProductos();


const abrirCarrito = () =>{

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
            <h3>Precio unitario: $${producto.precio}</h3>
            <h3>Cantidad: <div><button class="btn btn-secondary restaCantidad">-</button></div> ${producto.cantidad} <div><button class="btn btn-secondary sumaCantidad">+</button></div></h3>
            <h3>Total: $${producto.cantidad*producto.precio}</h3>
            <img src="${producto.imagen}">
            `;
            
            let botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            botonEliminar.className = "btn btn-outline-danger botonEliminar";
            contenidoCarrito.append(botonEliminar);
            botonEliminar.addEventListener("click", () =>{
                Swal.fire({
                    title: 'Eliminar',
                    text: '¿Desea quitar "' + producto.nombre + '" del carrito?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Solucionado!',
                        text: 'Eliminaste "'+ producto.nombre +'"',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    const foundId = carrito.find((el) => el.codigo)
                    carrito = carrito.filter((cod) => {
                        return cod !== foundId;
                    });
                    console.log(carrito);
                    guardarLocal();
                    abrirCarrito();
                    }
                })
            })
    
            subtotal+=producto.precio*producto.cantidad;
            iva+=calcularIva(producto.precio,producto.cantidad);
            contenedorCarrito.append(contenidoCarrito);
            ventanaCarrito.append(contenedorCarrito);
            
            const restaCantidad = contenidoCarrito.querySelector(".restaCantidad");
            restaCantidad.addEventListener("click", () =>{
                if(producto.cantidad > 1){
                    producto.cantidad--;
                    guardarLocal();
                    abrirCarrito();
                }
            });
            const sumaCantidad = contenidoCarrito.querySelector(".sumaCantidad");
            sumaCantidad.addEventListener("click", () =>{
                producto.cantidad++;
                guardarLocal();
                abrirCarrito();
            })
        });
    
        const totalCarrito = document.createElement("div");
        totalCarrito.className = "totalCarrito";
        totalCarrito.innerHTML = `
        <h3>Subtotal: $${subtotal}</h3>
        <h3>IVA 21%: $${iva}</h3>
        <h3>Total a pagar: $${subtotal+iva}</h3>
        `
        let total = subtotal + iva;
        ventanaCarrito.append(totalCarrito);
        subtotal = 0;
        iva = 0;
        
        const operacion = document.createElement("div");
        operacion.className = "operacion";
        botonVaciar = document.createElement("button");
        botonVaciar.className = "btn btn-warning";
        botonVaciar.innerText = "Vaciar carrito";
        botonFinalizar = document.createElement("button");
        botonFinalizar.className = "btn btn-success";
        botonFinalizar.innerText = "Finalizar compra";
        operacion.append(botonVaciar);
        operacion.append(botonFinalizar);
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
        botonFinalizar.addEventListener("click",() =>{
            console.log(carrito)
            console.log
            if(carrito.length!==0){
                Swal.fire({
                    title: '¿Deseas finalizar tu compra?',
                    text: 'El total a pagar es de $'+ total,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: '¡Muchas gracias por tu compra!',
                            text: 'Se ha enviado una factura a tu dirección de e-mail.',
                            imageUrl: './img/comprarealizada.jpg',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                        })
                        localStorage.setItem("compra", JSON.stringify(carrito))
                        carrito = [];
                        ventanaCarrito.style.display = "none";
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El carrito está vacío.',
                })
            }
                
        })
    }

    verCarrito.addEventListener("click",abrirCarrito);

function calcularIva(numero,cantidad){

    let resultado = numero*cantidad*0.21;
    return resultado;
}

const guardarLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};




