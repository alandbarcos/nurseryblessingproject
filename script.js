
let producto = (prompt("¡Bienvenido/a a Nursery Blessing Project! Te mostramos nuestra lista de productos, ingresá la opción deseada para verificar stock (Opción 0 para terminar): \n\n1-Maceta de cerámica (Animales)\n2-Maceta de barro (Simple)\n3-Cactus pequeño\n4-Suculenta pequeña\n5-Suculenta mediana\n6-Maceta + suculenta/cactus"));
let opcion;
let descripcionCompra = "";
let subtotal = 0;
let total;
const precioProd1 = 1600;
const precioProd2 = 700;
const precioProd3 = 230;
const precioProd4 = 200;
const precioProd5 = 300;
const precioProd6 = 2100;
let iva = 0;
function calcularIva(numero){
    let resultado = numero*0.21;
    return resultado;
}
function mostrarTotal(a,b){
    let mensaje = a + b;
    return alert("El total a pagar es: $" + mensaje + "\n\n¡Muchas gracias por tu visita!");
}
while(producto==null || producto=="" || producto==isNaN){
    alert("Ingrese una opción válida.");
    producto = (prompt("¡Bienvenido/a a Nursery Blessing Project! Te mostramos nuestra lista de productos, ingresá la opción deseada para verificar stock (Opción 0 para terminar): \n\n1-Maceta de cerámica (Animales)\n2-Maceta de barro (Simple)\n3-Cactus pequeño\n4-Suculenta pequeña\n5-Suculenta mediana\n6-Maceta + suculenta/cactus"));
}
while(producto!=0){
    switch(producto){
        case '1':
            opcion = prompt("Hay stock de 'Maceta de cerámica (Animales)', su precio es de $1600 + IVA. ¿Desea agregar al carrito? (Escriba SI o NO):");
            if(opcion=="SI" || opcion=="si"){
                subtotal+=precioProd1;
                descripcionCompra+="\nMaceta de cerámica: $1600 + IVA";
                iva+=calcularIva(precioProd1);
                alert("Agregaste 'Maceta de cerámica (Animales)' a tu compra.");
            }
            break;

        case '2':
            alert("No hay stock de 'Maceta de barro (Simple)'");
            break;
        
        case '3':
            opcion = prompt("Hay stock de 'Cactus pequeño', su precio es de $230 + IVA. ¿Desea agregar al carrito? (Escriba SI o NO):");
            if(opcion=="SI" || opcion=="si"){
                subtotal+=precioProd3;
                descripcionCompra+="\nCactus pequeño: $230 + IVA";
                iva+=calcularIva(precioProd3);
                alert("Agregaste 'Cactus pequeño' a tu compra.");
            }
            break;

        case '4':
            alert("No hay stock de 'Suculenta pequeña'");
            break;

        case '5':
            opcion = prompt("Hay stock de 'Suculenta mediana', su precio es de $300 + IVA. ¿Desea agregar al carrito? (Escriba SI o NO):");
            if(opcion=="SI" || opcion=="si"){
                subtotal+=precioProd5;
                iva+=calcularIva(precioProd5);
                descripcionCompra+="\nSuculenta mediana: $300 + IVA";
                alert("Agregaste 'Suculenta mediana' a tu compra.");
            }
            break;
            
        case '6':
            opcion = prompt("Hay stock de 'Maceta + suculenta/cactus', su precio es de $2100 + IVA. ¿Desea agregar al carrito? (Escriba SI o NO):");
            if(opcion=="SI" || opcion=="si"){
                subtotal+=precioProd6;
                iva+=calcularIva(precioProd6);
                descripcionCompra+="\nMaceta + suculenta/cactus: $2100 + IVA";
                alert("Agregaste 'Maceta + suculenta/cactus' a tu compra.");
            }
            break;

        default:
            alert("Por favor, ingresá una opción válida.");
    }
    producto = (prompt("Ingresá la opción deseada para verificar stock (Opción 0 para terminar): \n\n1-Maceta de cerámica (Animales)\n2-Maceta de barro (Simple)\n3-Cactus pequeño\n4-Suculenta pequeña\n5-Suculenta mediana\n6-Maceta + suculenta/cactus"));
}
alert("Productos seleccionados: " + descripcionCompra + "\n\nSubtotal: $" + subtotal + "\nIVA 21%: $" + iva + "\n\nCalculando total, presione ENTER.");
mostrarTotal(subtotal,iva);
