const $spinner = document.getElementById("spinner");
// FETCH =====================================================================================================================================
// GET
export const getElementsFetch = (URL) => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(URL) 
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
    });
};

// GET ASYNC
// export const getElementsFetch = async () => 
// {
//     try 
//     {
//         $spinner.classList.remove("oculto");
//         let respuesta = await fetch(miURL);
//         if(!respuesta.ok) throw Error(`Error: ${respuesta.status} - ${respuesta.statusText}`);

//         let data = await respuesta.json();
//         return data;
//     } 
//     catch(error) 
//     {
//         console.error(error.message);
//     }
//     finally
//     {
//         $spinner.classList.add("oculto");
//     }
// };

// POST
export const createElementFetch = (URL,element) => 
{
    $spinner.classList.remove("oculto");
     return fetch(URL, {    // Objeto como segundo parametro.
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(element)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        $spinner.classList.add("oculto");
    })
};

// DELETE
export const deleteElementFetch = (URL,id) => 
{
    $spinner.classList.remove("oculto");
    return fetch(URL + "/" + id, {
        method: "DELETE"
    })
    .then((respuesta)=>{
        if(!respuesta.ok) return Promise.reject(respuesta);
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        $spinner.classList.add("oculto");
    })
};

// PUT
export const updateElementFetch = (URL,element) => 
{
    $spinner.classList.remove("oculto");
    return fetch(URL + "/" + element.id, {    // Objeto como segundo parametro.
        method: "PUT",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(element)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        $spinner.classList.add("oculto");
    })
};