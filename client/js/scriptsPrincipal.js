const URL = "http://localhost:3000/monstruos";
const tiposURL = "http://localhost:3000/tipos";
import {
    getElementsFetch,
 } from "./fetch.js";

// const monstruos =JSON.parse(localStorage.getItem("monstruos")) || [];
const monstruos = await getElementsFetch(URL);
const $seccionCards = document.getElementById("seccion-cards");

if(monstruos.length)
{
    const $fragment = document.createDocumentFragment();
    monstruos.forEach(element => {
        const card = crearCard(element); 
        $fragment.appendChild(card);
    });
    $seccionCards.appendChild($fragment);
}


function crearCard(element)
{
    const articulo = document.createElement("article");
    articulo.classList.add("card");

    Object.keys(element).forEach((key) => 
    {
        if (key !== "id") 
        {
            //h3
            let clave = document.createElement("h3");
            clave.textContent = key + " : ";
            articulo.appendChild(clave);
            //h3>img
            let img = document.createElement("img");
            setImage(key,img);
            img.classList.add("small-icon");
            clave.appendChild(img);
            //p
            let contenido = document.createElement("p");
            contenido.textContent = element[key];
            articulo.appendChild(contenido);
        }
    });
    return articulo;
}


function setImage(key,img)
{
    switch(key)
    {
        case "alias":
        img.setAttribute("src","./img/antifaz.png");
        break;

        case "tipo":
        img.setAttribute("src","./img/monstruo.png");
        break;

        case "defensa":
        img.setAttribute("src","./img/posion.png");
        break;

        case "miedo":
        img.setAttribute("src","./img/abucheo.png");
        break;

        case "nombre":
        img.setAttribute("src","./img/nombre.png");
        break;
    }
}


