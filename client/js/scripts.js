const URL = "http://localhost:3000/monstruos";
const tiposURL = "http://localhost:3000/tipos";

import { Monstruo} from "./Monstruo.js";
import { actualizarTabla} from "./tabla.js";
import { getTiposAjax,getElementsAjax,createElementAjax, deleteElementAjax,
getElementPorIdAjax,updateElementAjax} from "./ajax.js";
import { getElementsFetch,createElementFetch,updateElementFetch,deleteElementFetch} from "./fetch.js";
import { createElementAxios,getElementsAxios,deleteElementAxios,updateElementAxios} from "./axios.js";
 const $seccionTabla = document.getElementById("tabla");

 //monstruos
// const monstruos =JSON.parse(localStorage.getItem("monstruos")) || [];
let monstruos = await getElementsAjax(URL) || [];

//id global
let id = null;

// const listaDeTipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma","Bruja","Hombre Lobo"];
// localStorage.setItem("tipos", JSON.stringify(listaDeTipos)); 
// const tipos = JSON.parse(localStorage.getItem("tipos")) || [];
const tipos = await getTiposAjax(tiposURL) || [];
const $selectTipo = document.getElementById("tipo");
$selectTipo.appendChild(cargarSelect(tipos));

const $formulario = document.forms[0];
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");
const $spinner = document.getElementById("spinner");

const $chkMiedo= document.getElementById("chkMiedo");
const $chkDefensa= document.getElementById("chkDefensa");
const $chkTipo= document.getElementById("chkTipo");
const $chkNombre= document.getElementById("chkNombre");
const $chkAlias= document.getElementById("chkAlias");
const $chkId= document.getElementById("chkId");
const $selectFiltro = document.getElementById("selectFiltro");
limpiarChecks();

if(monstruos.length) actualizarTabla($seccionTabla,monstruos);


$formulario.addEventListener("submit",(e)=>{
   e.preventDefault();
   
   const {txtId,txtNombre,txtAlias,txtMiedo,rdoDefensa,cmbTipo} = $formulario;
   //validaciones
   if(verificarFormulario())
   {
      if(txtId.value == "")
      {
        const newMonstruo = new Monstruo(Date.now(),txtNombre.value,txtAlias.value,rdoDefensa.value,parseInt(txtMiedo.value),cmbTipo.value);
        handlerCreate(newMonstruo);
      }
      else
      {
         const updatedMonstruo = new Monstruo(parseInt(txtId.value),txtNombre.value,txtAlias.value,rdoDefensa.value,parseInt(txtMiedo.value),cmbTipo.value);
         handlerUpdate(updatedMonstruo);
      }
   }
   limpiarFormulario();
   ocultarBotones();
})


function cargarSelect(lista)
{
 const $fragment = document.createDocumentFragment();
 for(const item of lista)
 {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    $fragment.appendChild(option)
 }
  return $fragment;
}



window.addEventListener("click", (e)=>{
   if(e.target.matches("td"))// si el emisor es un td
   {    
       id = e.target.parentElement.dataset.id;
      //  const selectedMonstruo = getElementPorIdAjax(id);
       getElementPorIdAjax(URL, id)
       .then((selectedMonstruo) => {
        cargarFormItem($formulario, selectedMonstruo);
        mostrarBotones();
       })
       .catch((error) => {
        console.error("Error al obtener el monstruo por ID:", error);
       });
      //  const selectedMonstruo = monstruos.find((monster)=> monster.id == id);
      //  cargarFormItem($formulario,selectedMonstruo);
      //  mostrarBotones();
   }
   else if(e.target.matches("button[value = 'Eliminar']"))
   { 
     handlerDelete(id);
   }
   else if(e.target.matches("button[value = 'Cancelar']"))
   {
     limpiarFormulario();
     ocultarBotones();
   }
})


async function handlerCreate(newObj)
{
   $seccionTabla.classList.add("oculto");

   createElementAjax(URL,newObj).then(() => {
      return handleResponse();
   });

}

async function handlerUpdate(editMonstruo)
{
   $seccionTabla.classList.add("oculto");
   updateElementAjax(URL,editMonstruo)
   .then(() => {
      return handleResponse();
   });
   
}

async function handlerDelete(id)
{
   $seccionTabla.classList.add("oculto");

   deleteElementAxios(URL,id)
   .then(() => {
      return handleResponse();
   });
}

function actualizarStorage(clave,data)
{
    localStorage.setItem(clave,JSON.stringify(data));
}

function cargarFormItem(formulario,Monstruo)
{
    formulario.txtId.value = Monstruo.id
    formulario.txtNombre.value = Monstruo.nombre;
    formulario.txtAlias.value = Monstruo.alias;
    formulario.txtMiedo.value = Monstruo.miedo;
    updateValue(formulario.txtMiedo.value);
    formulario.rdoDefensa.value = Monstruo.defensa;
    formulario.cmbTipo.value = Monstruo.tipo;
}

function ocultarBotones()
{
  $btnCancelar.classList.add("oculto");
  $btnEliminar.classList.add("oculto");
}  

function mostrarBotones()
{
  $btnCancelar.classList.remove("oculto");
  $btnEliminar.classList.remove("oculto");
  $btnCancelar.classList.add("color");
  $btnEliminar.classList.add("color");
}  

function mostrarSpinner() 
{
   $spinner.classList.remove("oculto"); // Muestra el spinner
   $seccionTabla.classList.add("oculto");
   setTimeout(function() 
   {
     $seccionTabla.classList.remove("oculto"); // Después de 3 segundos, actualiza la tabla
     $spinner.classList.add("oculto"); // Oculta el spinner después de actualizar el Local Storage
   }, 3000);
}
 
function limpiarFormulario()
{
   $formulario.reset();
   $formulario.txtId.value="";
   id = null;
   updateValue(0);
}


function verificarFormulario()
{
   let rtn = false;
   const {txtNombre,txtAlias,txtMiedo,rdoDefensa,cmbTipo} = $formulario;

   if(txtNombre.value != "" && txtAlias.value != "" && txtMiedo.value != "" && rdoDefensa.value != "" && cmbTipo.value != "")
   {
      rtn = true;
   }
  return rtn;
}


document.getElementById('rangeInput').addEventListener('input', function() {
   updateValue(this.value);
});

function updateValue(value) {
   document.getElementById('rangeValue').innerText = value;
}

async function handleResponse() {
   const monstruos = await getElementsAjax(URL);
   actualizarTabla($seccionTabla, monstruos);
   $seccionTabla.classList.remove("oculto");
   limpiarFormulario();
   ocultarBotones();
   limpiarChecks();
}
// parcial

$selectFiltro.addEventListener('change', filtrar);


$chkId.addEventListener('change', filtrar);
$chkMiedo.addEventListener('change', filtrar);
$chkTipo.addEventListener('change', filtrar);
$chkNombre.addEventListener('change', filtrar);
$chkAlias.addEventListener('change', filtrar);
$chkDefensa.addEventListener('change', filtrar);


 async function filtrar() {
   
   let monstruos = await getElementsAxios(URL);
   
   let $tablaFiltrada;
   let $tablaFinal;
   
   if($selectFiltro.value == "Vampiro"){
       $tablaFiltrada= monstruos.filter( a => a.tipo=="Vampiro"? true: false)

   }else if($selectFiltro.value == "Hombre Lobo"){
       $tablaFiltrada= monstruos.filter( a => a.tipo=="Hombre Lobo"? true: false)

   }else if($selectFiltro.value == "Fantasma"){
      $tablaFiltrada= monstruos.filter( a => a.tipo=="Fantasma"? true: false)

   }else if($selectFiltro.value == "Esqueleto"){
      $tablaFiltrada= monstruos.filter( a => a.tipo=="Esqueleto"? true: false)

   }else if($selectFiltro.value == "Bruja"){
      $tablaFiltrada= monstruos.filter( a => a.tipo=="Bruja"? true: false)

   }else if($selectFiltro.value == "Zombie"){
      $tablaFiltrada= monstruos.filter( a => a.tipo=="Zombie"? true: false)

   }else if($selectFiltro.value == "TODOS"){
      $tablaFiltrada= monstruos;
   }
  

   const properties = {
       id: $chkId.checked,
       nombre: $chkNombre.checked,
       alias: $chkAlias.checked,
       defensa: $chkDefensa.checked,
       miedo: $chkMiedo.checked,
       tipo: $chkTipo.checked,
     };
     
     $tablaFinal = $tablaFiltrada.map(a => {
       const filteredProps = {};
     
       for (const prop in properties) {
         if (properties[prop]) {
           filteredProps[prop] = a[prop];
         }
       }    filteredProps['id'] = a['id'];
       return filteredProps;
   });

   const sinSeleccion = Object.values(properties).every(value => value === false);
   if(sinSeleccion){
       $tablaFinal=$tablaFiltrada;
   }
  
   const $pPromedio = document.getElementById("pPromedio")

   let total= $tablaFiltrada.reduce((anterior, actual) =>anterior + actual.miedo,0);
   let promedio = total/ $tablaFiltrada.length;
   
   if (isNaN(promedio)) {
      promedio = 0;
   }

   $pPromedio.value= promedio.toFixed(2);

   actualizarTabla($seccionTabla,$tablaFinal); 
}


filtrar();


function limpiarChecks()
{
   $chkAlias.checked=true;
   $chkDefensa.checked=true;
   $chkMiedo.checked=true;
   $chkTipo.checked=true;
   $chkNombre.checked=true;
}

