//Crear Tabla
const root = document.querySelector("#resultados");
const table  =document.createElement("table");
table.className ="table";
root.appendChild(table);
const thead=document.createElement("thead");
table.appendChild(thead);

//menu principal
const tr = document.createElement("tr");
thead.appendChild(tr);
const th1 =document.createElement("th");
const th2 =document.createElement("th");
const th3 =document.createElement("th");
const th4 =document.createElement("th");
const th5 =document.createElement("th");

th1.scope="col";
th2.scope="col";
th3.scope="col";
th4.scope="col";
th5.scope="col";

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);


th1.innerHTML="name";
th2.innerHTML="Precio";
th3.innerHTML="Formato";
th4.innerHTML="Editar";
th5.innerHTML="Eliminar";

const tbody =document.createElement("tbody");
table.appendChild(tbody);

// extrayendo valores de HTML
const nombreHierba= document.querySelector("#nombreHierba");
const precioHierba=document.querySelector("#precioHierba");
const formatoHierba=document.querySelector("#formatoHierba");
const btn =document.querySelector("#agregar");


//conectamos con local storage
const almacenamiento =window.localStorage;

const hierba = 
    {
    }
;
let contador = 0;

//function agregar y actualizar

function agregaHierba(name,price, formato, obj){
    //agregamos las variables al objeto
    obj.nombreHierba = name.value
    obj.precioHierba = price.value
    obj.formatoHierba = formato.value

    // creamos el key con el nombre y guardamos en el archivo

        if (name.value === ""){
            console.log('vacio');
        }else {
            window.localStorage.setItem(name.value, JSON.stringify(obj));
        };
        mostrartabla();
}

function mostrartabla(){

    for (x=0; x<=almacenamiento.length-1; x++)
        {
            clave = almacenamiento.key(x);
            if (contador>almacenamiento.length-1){
                console.log("existe");
            }else {
            objetoJson = JSON.parse(window.localStorage.getItem(clave));

            let dinatr = document.createElement("tr");
            tbody.appendChild(dinatr);

            let dinath1 = document.createElement("th");
            dinatr.appendChild(dinath1);
            dinath1.id=x;
            dinath1.scope="row";
            dinath1.innerHTML=objetoJson.nombreHierba;

            let dinatd1 = document.createElement("td");
            dinatr.appendChild(dinatd1);
            dinatd1.innerHTML=objetoJson.precioHierba;

            let dinatd2 = document.createElement("td");
            dinatr.appendChild(dinatd2);
            dinatd2.innerHTML=objetoJson.formatoHierba;

            let dinatd3 = document.createElement("td");
            dinatr.appendChild(dinatd3);
            const editar = document.createElement("img");
            dinatd3.appendChild(editar);
            editar.src="icons/edit.png";
            editar.width="25";
            editar.height="25";

            let dinatd4 = document.createElement("td");
            dinatr.appendChild(dinatd4);
            dinatd4.scope="row";
            const borrar = document.createElement("img");
            dinatd4.appendChild(borrar);
            borrar.src="icons/delete.png";
            borrar.width="25";
            borrar.height="25";
                contador ++;
            }
            

        }

    // storage= window.localStorage;

    // console.log(aaaa.formatoHierba);
    // console.log(aaaa.nombreHierba);
    // console.log(aaaa.precioHierba);
    // console.log(window.localStorage.getItem(1));
    


}



//crear Evento de click

window.addEventListener('load', event=> mostrartabla());
btn.addEventListener('click', event => agregaHierba(nombreHierba,precioHierba,formatoHierba,hierba));
