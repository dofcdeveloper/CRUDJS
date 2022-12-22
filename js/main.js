// Este es un CRUD -CREATE READ UDPDATE DELETE


//traemos objetos del DOM 
let idHierba =document.querySelector("#id");
let nombreHierba =document.querySelector("#nombreHierba");
let precioHierba =document.querySelector("#precioHierba");
let formatoHierba=document.querySelector("#formatoHierba");
let bntCU=document.querySelector("#agregar");

idGlobal=null;

//CREATE - UPDATE 

function createUpdate(id){
let validacion=false;
    if (nombreHierba.value =="" || precioHierba.value =="" || formatoHierba.value ==""){
        alert('porfavor completar Nombre de la hierba, precio y formato');
        validacion=true;
    } 
    if (isNaN(parseInt(precioHierba.value))){
        alert('precio de hierba debe ser numerico');
        validacion=true;
    }

    if (validacion){
        
            }else{
        
            let hierbas = read('hierbas');
            if (id ==null){
                const hierba= {
                    id: idAsignar(hierbas),
                    name: nombreHierba.value,
                    pricing: precioHierba.value, 
                    format: formatoHierba.value, 
                }
                hierbas.push(hierba);
            }else {
                let posicion = hierbas.findIndex(hierba => hierba.id == id);
                console.log(posicion);
                hierbas[posicion].name = nombreHierba.value;
                hierbas[posicion].pricing = precioHierba.value;
                hierbas[posicion].format = formatoHierba.value;
                idGlobal=null;

            }
        
            save("hierbas", hierbas);
            readAll();
            clearAll();
            location.reload();
        }
}

//Guardar
function save(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}

//Funcion busca ID Asignar 
function idAsignar(arreglo){
    let cantidad= arreglo.length ;

    let idasign=0;
    let control=true;
    
    // console.log(arreglo[cantidad] + " " + cantidad);
    for (i=0; i<=cantidad; i++){
        if (idasign ==i){
            if (arreglo.map(h =>h.id).indexOf(i) == -1){
                // console.log(arreglo.map(h =>h.id).indexOf(1));
            }else{
                idasign++;
            };
        }else {
            return idasign;
            break;
        }
    }

    return cantidad;
}

//READ 
function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [] ;
}

function readAll(){
    let tbody = document.querySelector("#hierbitas");
    tbody.innerHTML = "";

    let hierbas = read("hierbas");

    hierbas.forEach(element => {
        tbody.innerHTML +=`
        <tr>
            <th>${element.id}</th>
            <td>${element.name}</td>
            <td>${element.pricing}</td>
            <td>${element.format}</td>
            <td><i class="fa-solid fa-pen-to-square" id=edit${element.id}></i></td>
            <td><i class="fa-solid fa-trash" id=del${element.id}></i></td>
        </tr>
        `;
        
    });
}

function readOne(id){
    let hierbas  = read("hierbas");
    let hierba = hierbas[id];
    idGlobal = hierba.id;
    nombreHierba.value = hierba.name;
    precioHierba.value = hierba.pricing;
    formatoHierba.value = hierba.format;
}

//eliminar elemento 
function delHierba(id){
        let hierbas = read("hierbas");
        let filtrado = hierbas.filter(hierba => hierba.id != id);
        console.log(hierbas);
        console.log(filtrado);
        save('hierbas', filtrado);
        readAll();
       location.reload();
    
}

function clearAll(){
    nombreHierba.value = "";
    precioHierba.value = "";
    formatoHierba.value = "";
}

readAll();
bntCU.addEventListener('click', event=> createUpdate(idGlobal) );


let listaBtnEdit=document.querySelectorAll(".fa-pen-to-square");
let listaBtnDel=document.querySelectorAll(".fa-trash");


listaBtnEdit.forEach(element => {
    element.addEventListener('click', (event)=> {
        readOne(element.id.match(/(\d+)/)[0]);
    });
});

listaBtnDel.forEach(element => {
    element.addEventListener('click', (event)=> {
        delHierba(element.id.match(/(\d+)/)[0]);
    });
});