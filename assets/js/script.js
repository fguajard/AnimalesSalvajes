/* Buscar sonidos
hace una primera busqueda de todos los sonidos que coinciden con la palabra a buscar
luego selecciona un elemento y busca ese elemento por su id para devolver el mp3 de ese sonido */
const buscarSonidosEnApi = async (nombreBusqueda) =>{
   const APIKey = "o05mt69oqHCFcfOZMnxyxVZ4kUteUyfI5iIuaVir"
   try{
        const urlSonidos = `https://freesound.org/apiv2/search/text/?query=${nombreBusqueda}&filter=tag:${nombreBusqueda}&sort=downloads_desc&token=${APIKey}` 
        const requestSonidos = await axios(urlSonidos)
        const idSonido = requestSonidos.data.results[0].id
        const urlSonidoUnitario = `https://freesound.org/apiv2/sounds/${idSonido}/?token=${APIKey}`
        const requestSonido = await axios(urlSonidoUnitario)
        const sonido = requestSonido.data.previews
        if(!sonido["preview-lq-mp3"]){
            throw "no hay sonido"
        }
        $("video").attr("src",`${sonido["preview-lq-mp3"]}`)
   }
   catch (err){      
       alert("Sonido no Encontrado")
   }
   
}

//Buscar imagenes usando la API de Unesplash 

const buscarImagenes = async (inputBusqueda) => {
    const accessKeyUnesplash = "hbqzon-DeTtMzRi1szCuMi8gdlEf2d3qBHIghH3-EdI"    
    try{
        const urlUnesplash =  `https://api.unsplash.com/search/photos?page=1&query=${inputBusqueda}&client_id=${accessKeyUnesplash}`
        const requestUnesplash = await axios(urlUnesplash)
        const urlRequestUnesplash = requestUnesplash.data.results[0].urls.full
        $("#image").attr("src", `${urlRequestUnesplash}`)
        console.log(urlRequestUnesplash);
    }
    catch (err){      
        alert("Imagen no Encontrada")
    }
    
}


$("#buscarSonido").click(()=>{
    const sonido = $("#sonido").val()
    $(".card .card-title").html(sonido)
    buscarSonidosEnApi(sonido)
    buscarImagenes(sonido)
})
