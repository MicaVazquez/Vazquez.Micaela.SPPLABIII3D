// AXIOS ===========================================================================================================================================
//<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
const $spinner = document.getElementById("spinner");
// GET
export const getElementsAxios = (URL) => 
{
    // $spinner.classList.remove("oculto");
    return new Promise((resolve, reject) =>{
        axios.get(URL)            
        .then((res)=> // ({data})
        {
            const {data} = res;
            resolve(data);
        })
        .catch((err)=>
        {
            reject(err.message);
        })
        .finally(()=>{
            // $spinner.classList.add("oculto");
        });
    });
};

// POST
export const createElementAxios = async (URL,element) => 
{
    $spinner.classList.remove("oculto");
    try 
    {
        let {datos} = await axios.post(URL, element, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        $spinner.classList.add("oculto");
    }
};

// DELETE
export const deleteElementAxios = async (URL,id) => 
{
    $spinner.classList.remove("oculto");
    try
    {
        let {data} = await axios.delete(URL + "/" + id);
    }
    catch(err)
    {
        console.error(err.message);
    }
    finally
    {
        $spinner.classList.add("oculto");
    }
};

// PUT
export const updateElementAxios = async (URL,element) => 
{
    $spinner.classList.remove("oculto");
    try 
    {
        let {datos} = await axios.put(URL + "/" + element.id, element, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        $spinner.classList.add("oculto");
    }
};