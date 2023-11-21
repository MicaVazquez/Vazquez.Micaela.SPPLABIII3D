const $spinner = document.getElementById("spinner");

export const getTiposAjax = (URL) => 
{
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
        }
    });
    xhr.open("GET", URL);
    xhr.send();
    });
};

// AJAX ===================================================================     
// GET
export const getElementsAjax = (URL) => 
{
    $spinner.classList.remove("oculto");
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            $spinner.classList.add("oculto");;
        }
    });
    xhr.open("GET", URL);
    xhr.send();
    });
};

// GET por ID
export const getElementPorIdAjax = (URL,id) => 
{
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
    xhr.open("GET", URL + "/" + id);
    xhr.send();
});
};

// POST
export const createElementAjax = (URL,element) => 
{
    $spinner.classList.remove("oculto");
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            $spinner.classList.add("oculto");
        }
    });
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(element));
 });
};

// DELETE
export const deleteElementAjax = (URL,id) => 
{
    $spinner.classList.remove("oculto");
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
    
            if (xhr.readyState === 4) {
    
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
    
                } else {
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
                $spinner.classList.add("oculto");
            }
        });
        xhr.open('DELETE', URL + '/' + id);
        xhr.send();
    });
   
};

// PUT
export const updateElementAjax = (URL,data) => 
{
    $spinner.classList.remove("oculto");
    
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                resolve(JSON.parse(xhr.responseText));
            }
            else
            {
                reject(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            $spinner.classList.add("oculto");
        }
        });
        xhr.open("PUT", URL + "/" + data.id);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.send(JSON.stringify(data));
        });
};

