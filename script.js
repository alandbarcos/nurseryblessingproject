

let opcion;
let descripcionCompra = "";
let subtotal = 0;
let iva = 0;
let resultadosBusqueda = "";
let carrito = [];
let producto;
let busqueda;

const prod1 = new CreaProducto("Maceta de cerámica (Animales)", 1600 , 130);
const prod2 = new CreaProducto("Maceta de barro (Simple)", 700 , 0);
const prod3 = new CreaProducto("Cactus pequeño", 230 , 53);
const prod4 = new CreaProducto("Suculenta pequeña", 200 , 0);
const prod5 = new CreaProducto("Suculenta mediana", 300 , 36);
const prod6 = new CreaProducto("Maceta + suculenta/cactus", 2100 , 42);

const servBodas = new CreaServicio("Bodas", 35000);
const servCumple = new CreaServicio("Cumpleaños", 22000);
const servBautismos = new CreaServicio("Bautismos", 15000);
const servAlmuerzosyCenas = new CreaServicio("Almuerzos y Cenas Privadas", 18000);

const Productos = [prod1, prod2, prod3, prod4, prod5, prod6];

function CreaProducto (nombreProd,precioProd,stockProd){

    this.nombre = nombreProd.toUpperCase();
    this.precio = precioProd;
    this.stock = stockProd;
}

function CreaServicio (nombreServ,precioServ){

    this.nombre = nombreServ.toUpperCase();
    this.precio = precioServ;
}

function validarDato(dato){

    if(dato==null || dato=="" || dato==isNaN)
    {
        do{
            alert("Ingrese una opción válida.");
            dato = (prompt("¡Bienvenido/a a Nursery Blessing Project! Por favor indicanos sobre que prestación te gustaria consultar (Opción 0 para terminar): \n\n1-Productos \n2-Servicios"));
        }while(dato==null || dato=="" || dato==isNaN);
    }
    return dato;
}

function validarRango(ingreso,min,max,corte){

    if((ingreso<min||ingreso>max)&&ingreso!=corte){
        do{
            ingreso = prompt("Ingrese una opción válida.");
        }while((ingreso<min||ingreso>max)&&ingreso!=corte);
    }
    return ingreso;
}

function calcularIva(numero){

    let resultado = numero*0.21;
    return resultado;
}

function mostrarTotal(a,b){

    let mensaje = a + b;
    return alert("El total a pagar es: $" + mensaje + "\n\n¡Muchas gracias por tu visita!");
}



opcion = (prompt("¡Bienvenido/a a Nursery Blessing Project! Por favor indicanos sobre que prestación te gustaria consultar (Opción 0 para terminar): \n\n1-Productos \n2-Servicios"));
opcion = validarDato(opcion);

while(opcion!=0){
    switch(opcion){
        case '1':
            producto = prompt("Ingrese el producto que desea buscar: ").toUpperCase();
            busqueda = Productos.filter((pedido) => pedido.nombre.includes(producto));
            if(busqueda!=""){
                for(let i=0; i<busqueda.length; i++){
                    resultadosBusqueda+= i+1 +"-Producto: " + busqueda[i].nombre + "\nPrecio: $" + busqueda[i].precio + " + IVA\nStock disponible: " + busqueda[i].stock + "\n\n";
                }
                let eleccionCompra = prompt("Resultados relacionados a: '" + producto + "'\n\n" + resultadosBusqueda + "Seleccione el producto que desea agregar al carrito (Escriba NO para volver al menú anterior):").toUpperCase();
                eleccionCompra = validarRango(eleccionCompra,1,busqueda.length,"NO").toUpperCase();
                if(eleccionCompra!="NO"){
                    if(busqueda[eleccionCompra-1].stock!=0){
                        carrito.push(busqueda[eleccionCompra-1]);
                        subtotal+=busqueda[eleccionCompra-1].precio;
                        descripcionCompra+="\n" + busqueda[eleccionCompra-1].nombre + ": $" + busqueda[eleccionCompra-1].precio + " + IVA";
                        iva+=calcularIva(busqueda[eleccionCompra-1].precio);
                        alert("Se agregó " + busqueda[eleccionCompra-1].nombre + " al carrito.");
                    }else{
                        alert("Por el momento no tenemos stock del producto seleccionado.");
                    }
                }else{
                    alert("Bueno, volvamos a empezar.");
                }
            }else{
                alert("No se encontraron resultados relacionados a tu búsqueda.");
            }
            resultadosBusqueda="";
            break;

        case '2':
            alert("Te mostramos la lista de servicios disponibles, si estás interesado/a en alguno de ellos, te invitamos a nuestra sección de Contacto para comunicarte con nosotros.\n\n" + servBodas.nombre + "\nPrecio: $" + servBodas.precio + "\n\n" + servCumple.nombre + "\nPrecio: $" + servCumple.precio + "\n\n" + servBautismos.nombre + "\nPrecio: $" + servBautismos.precio + "\n\n" + servAlmuerzosyCenas.nombre + "\nPrecio: $" + servAlmuerzosyCenas.precio);
            break;
        default:
            alert("Ingrese una opción válida.");
    }
    opcion = (prompt("¡Bienvenido/a a Nursery Blessing Project! Por favor indicanos sobre que prestación te gustaria consultar (Opción 0 para terminar): \n\n1-Productos \n2-Servicios"));
    opcion = validarDato(opcion);
    
}
alert("Productos seleccionados: " + descripcionCompra + "\n\nSubtotal: $" + subtotal + "\nIVA 21%: $" + iva + "\n\nCalculando total, presione ENTER.");
mostrarTotal(subtotal,iva);
