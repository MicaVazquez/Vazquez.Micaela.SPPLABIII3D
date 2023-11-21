const crearTabla = (data) =>{

    if(!Array.isArray(data)) return null;//validación 
    
    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));

    tabla.className = "table table-dark table-hover";
    return tabla;
}

const crearCabecera = (elemento) =>{
    const tHead = document.createElement("thead");
    const headRow = document.createElement("tr");

    for (const key in elemento) {
        if(key === "id") continue;
        
        const th = document.createElement("th");
        th.textContent = key;
        headRow.appendChild(th);
    }

    tHead.classList.add("table-danger"),
    // tHead.classList.add("colorCabecera"),
    tHead.appendChild(headRow);
    return tHead;
}

const crearCuerpo = (data) =>{
    if(!Array.isArray(data)) return null;
    const tBody = document.createElement("tbody");

    data.forEach((elemento,index)=>{
       
        const tr = document.createElement("tr");
        if(index % 2 == 0)
        {
            tr.classList.add("rowPar");
        }
        else
        {
          tr.classList.add("rowImpar");
        }

        for (const key in elemento) 
        {   if(key === 'id')
            {
                tr.dataset.id = elemento[key];
            }
            else{
                const td = document.createElement("td");
                td.textContent = elemento[key];
                tr.appendChild(td);
            }
        }

       tBody.appendChild(tr);
    })
    return tBody;
}

export const actualizarTabla = (contenedor,data)=>
{
    const dataOrdenada = data.sort((a, b) => {
        return b.miedo - a.miedo;
    });
   while(contenedor.hasChildNodes())
   {
     contenedor.removeChild(contenedor.firstElementChild);
   }
   contenedor.appendChild(crearTabla(dataOrdenada));
}

