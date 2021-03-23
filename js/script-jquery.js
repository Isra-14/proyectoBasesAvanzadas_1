let id = 0
let contPreguntas = 0
let typePre = ''
let subPre = ''
$(document).ready(()=>{
    $("#newQuestion").click(()=>{
        newQuestion()
    })
    // $("#newQuestion").click(()=>{            
    //     id++
    //     $("#preguntas")
    //         .append("<div id='pregunta"+id+"'><h2>Pregunta "+id+"</h2><select name='tipoPregunta' id='tipoPregunta"+id+"'><option value='Abierta'>Abierta</option><option value='OpcMultiple'>Opcion multiple</option><option value='Multi'>Multiseleccion</option></select></div><br>")
    //     typePre = $("#tipoPregunta"+id).attr('id')
    //     subPre = typePre.substring(12, typePre.length)
    //     //alert(subPre)        
    //     agregarDatos($("#tipoPregunta"+id))
    // })

      
})

// let agregarDatos = (element)=>{
//     console.log('agrega')
//     _tipoPregunta = element.val()
    
// }              

let onChangeTipo = (elemento) =>{
    let seleccionado = elemento.children("option:selected").val();
    let idElemento = elemento.attr('id');
    let subPre = idElemento.substring(12, idElemento.length)

    let divPregunta = $('<div></div>')
    divPregunta.attr('id', 'datosPregunta'+subPre)

    let labelPregunta = $('<label></label>')
    labelPregunta.attr('id','labelTxt'+subPre);
    labelPregunta.attr('for', 'pregTxt'+subPre)
    
    let inputPregunta = $('<input></input>')
    inputPregunta.attr('type', 'text')
    inputPregunta.attr('id', 'pregTxt'+subPre)
    inputPregunta.attr('required', 'true')

    $('#datosPregunta'+subPre).remove();
    divPregunta.append(labelPregunta);
    divPregunta.append(inputPregunta);

    let botonAgr = $('<button></button>')
    botonAgr.attr('id', 'botonAgr'+subPre)
    botonAgr.attr('type', 'button')
    botonAgr.attr('class', 'agregar')
    botonAgr.text('Agregar opcion')
    
    let botonElim = $('<button></button>')
    botonElim.attr('id', 'botonElim'+subPre)
    botonElim.attr('type', 'button')
    botonElim.attr('class', 'eliminar')
    botonElim.text('Eliminar Pregunta')
    
    let opcionesCount = 0
    let formOpciones = $('<form></form>')
    formOpciones.attr('id', 'formOpciones'+subPre)
    
    
    botonAgr.click(() => {
        opcionesCount++;
        if(opcionesCount <= 5){
            let contOpcion = $('<div></div>')
            contOpcion.attr('id', 'contOpcion'+opcionesCount)

            let opcion = $('<input></input>')
            opcion.attr('id', 'opcion'+opcionesCount)
            opcion.attr('type', 'text')
            opcion.on('change', ()=>{
                respuesta(opcion, contOpcion, subPre)
            })
            
            // let respuesta = $('<input></input>')
            // respuesta.attr('id', 'respuesta'+opcionesCount)
            // respuesta.attr('type', 'radio')
            // respuesta.attr('name', 'opciones'+subPre)
            // respuesta.text(opcion.val())
    
            contOpcion.append(opcion)
            formOpciones.append(contOpcion)
            //formOpciones.append(respuesta)
        }
    });

    botonElim.click(()=>{
        contPreguntas--
        botonElim.parent().parent().remove()
        console.log(contPreguntas)
        if(contPreguntas!=0)
            $("#terminar").attr('disabled', false)
        else
            $("#terminar").attr('disabled', true)
        
    })

    

    
    switch(seleccionado){
        case "Abierta":
            labelPregunta.text("Ingresa la pregunta abierta:");                  
            divPregunta.append(botonElim)
            break;
        case "OpcMultiple":
            labelPregunta.text("Ingresa la pregunta de opcion multiple:");
            divPregunta.append(formOpciones)
            divPregunta.append(botonAgr)
            divPregunta.append(botonElim)
            break;
        case "Multi":
            labelPregunta.text("Ingresa la pregunta de seleccion multiple:");
            divPregunta.append(formOpciones)
            divPregunta.append(botonAgr)
            divPregunta.append(botonElim)
            break;
        default:
            break;
    }

    $("#pregunta"+subPre).append(divPregunta);
        
}

let respuesta=(elemento, elemento2, numPregunta)=>{
    let idElemento = elemento.attr('id');
    let subPre = idElemento.substring(6, idElemento.length)

    console.log(subPre)
    $("#respuesta"+subPre).remove()
    $("#labRespuesta"+subPre).remove()
    let respuesta = $('<input></input>')
    respuesta.attr('id', 'respuesta'+subPre)
    respuesta.attr('type', 'radio')
    respuesta.attr('name', 'opciones'+numPregunta)
    respuesta.attr('value',elemento.val())

    let labResp = $('<label></label>')
    labResp.attr('for', 'respuesta'+subPre)
    labResp.attr('id', 'labRespuesta'+subPre)
    labResp.text(elemento.val())

    elemento2.append(labResp)
    elemento2.append(respuesta)

}

    function newQuestion() {
        id++
        contPreguntas++
        
        let divPregunta = $('<div></div>');
        divPregunta.attr('id','pregunta' + id);
        
        let h2Titulo = $('<h2></h2>');
        h2Titulo.text(`Pregunta ${id}`) ;    

        let selectPregunta = $('<select></select>');
        selectPregunta.attr('name', 'tipoPregunta')
        selectPregunta.attr('id', 'tipoPregunta'+id)
        selectPregunta.on('change',() => {
            onChangeTipo(selectPregunta)
        });
        
        let opcion1 = $('<option></option>')
        opcion1.attr('value', 'Abierta')
        opcion1.text('Pregunta abierta');

        let opcion2 = $('<option></option>')
        opcion2.attr('value', 'Multi')
        opcion2.text('Seleccion multiple');
        
        let opcion3 = $('<option></option>')
        opcion3.attr('value', 'OpcMultiple')
        opcion3.text('Opcion multiple');

        selectPregunta.append(opcion1);
        selectPregunta.append(opcion2);
        selectPregunta.append(opcion3);

        divPregunta.append(h2Titulo);
        divPregunta.append(selectPregunta);

        $('#preguntas').append(divPregunta)
        
        // typePre = $("#tipoPregunta"+id).attr('id')
        // subPre = typePre.substring(12, typePre.length)
        
        $("#terminar").attr('disabled', false)
        //alert(subPre)        
        //agregarDatos($("#tipoPregunta"+id))
        
    }
    

function generarJson(){
    let json = []
    let nombreSurvey = $("#nombreTxt").val()
    let descripcionSurvey = $("#descTxt").val()
    let cantidadPreguntas = contPreguntas

    if(nombreSurvey != '' && descripcionSurvey != ''){
        let preguntas = []

        for(let i = 0; i < cantidadPreguntas; i++){
            let pregunta = $("#pregTxt"+i).val()
            let tipoPregunta = $("#tipoPregunta"+i).val()
            let respuestasTotales = 0

            if(pregunta != '' && (tipoPregunta != 'Abierta' || tipoPregunta != 'Multi' || tipoPregunta != 'OpcMultiple')){
                let respuestasJSON = []
                if(tipoPregunta == 'Abierta'){
                    respuestasTotales = 1
                    respuestasJSON.push({respuesta:"0", opcion_correcta:true})
                } else {

                }
            }
        }
    }
}


let insertar=(json)=>{
    fetch('localhost:3000/cuestionario', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json()).catch(error=>console.error(error)).then(res=>console.log('SUCCESS: '+res))
}