let id = 0
let contPreguntas = 0
let contRespuestas = 0
let typePre = ''
let subPre = ''
$(document).ready(()=>{
    $("#newQuestion").click(()=>{
        newQuestion()
    })      
})

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
    
    let botonAgrMult = $('<button></button>')
    botonAgrMult.attr('id', 'botonAgrMult'+subPre)
    botonAgrMult.attr('type', 'button')
    botonAgrMult.attr('class', 'agregar')
    botonAgrMult.text('Agregar opcion')
    
    let botonElim = $('<button></button>')
    botonElim.attr('id', 'botonElim'+subPre)
    botonElim.attr('type', 'button')
    botonElim.attr('class', 'eliminar')
    botonElim.text('Eliminar Pregunta')
    
    let botonElimOpc = $('<button></button>')
    botonElimOpc.attr('id', 'botonElimOpc'+subPre)
    botonElimOpc.attr('type', 'button')
    botonElimOpc.attr('disabled', true)
    botonElimOpc.attr('class', 'eliminarOpc')
    botonElimOpc.text('Eliminar opcion')
    
    let opcionesCount = 0
    let formOpciones = $('<form></form>')
    formOpciones.attr('id', 'formOpciones'+subPre)
    
    
    botonAgr.click(() => {
        botonElimOpc.attr('disabled', false)
        contRespuestas++
        opcionesCount++;
        if(opcionesCount <= 5){
            let contOpcion = $('<div></div>')
            contOpcion.attr('id', 'contOpcion'+subPre+'-'+opcionesCount)
            
            let opcion = $('<input></input>')
            opcion.attr('id', 'opcion'+opcionesCount)
            opcion.attr('type', 'text')
            opcion.on('change', ()=>{
                respuesta(opcion, contOpcion, subPre)
            })
                       
            contOpcion.append(opcion)
            formOpciones.append(contOpcion)
        }
    });
    
    botonAgrMult.click(() => {
        botonElimOpc.attr('disabled', false)
        opcionesCount++
        contRespuestas++
        if(opcionesCount <= 5){
            let contOpcion = $('<div></div>')
            contOpcion.attr('id', 'contOpcion'+subPre+'-'+opcionesCount)

            let opcion = $('<input></input>')
            opcion.attr('id', 'opcion'+opcionesCount)
            opcion.attr('type', 'text')
            opcion.on('change', ()=>{
                respuestaMult(opcion, contOpcion, subPre)
            })
    
            contOpcion.append(opcion)
            formOpciones.append(contOpcion)
        }
    });

    botonElim.click(()=>{
        contRespuestas = contRespuestas - opcionesCount
        contPreguntas--
        botonElim.parent().parent().remove()
        if(contPreguntas!=0)
            $("#terminar").attr('disabled', false)
        else
            $("#terminar").attr('disabled', true)
        
    })

    botonElimOpc.click(()=>{
        let getId = botonElimOpc.attr('id')
        let noPreg = getId.substring(12, getId.length)
        $("#contOpcion"+noPreg+"-"+opcionesCount).remove()
        opcionesCount--
        contRespuestas--
        if(opcionesCount<=0)
            botonElimOpc.attr("disabled", true)
        
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
            divPregunta.append(botonElimOpc)
            break;
            case "Multi":
                labelPregunta.text("Ingresa la pregunta de seleccion multiple:");
                divPregunta.append(formOpciones)
                divPregunta.append(botonAgrMult)
                divPregunta.append(botonElim)
                divPregunta.append(botonElimOpc)
            break;
        default:
            break;
    }

    $("#pregunta"+subPre).append(divPregunta);
        
}



let respuesta=(elemento, elemento2, numPregunta)=>{
    let idElemento = elemento.attr('id');
    let subPre = idElemento.substring(6, idElemento.length)

    $("#respuesta"+numPregunta+'-'+subPre).remove()
    $("#labRespuesta"+numPregunta+'-'+subPre).remove()
    let respuesta = $('<input></input>')
    respuesta.attr('id', 'respuesta'+numPregunta+'-'+subPre)
    respuesta.attr('type', 'radio')
    respuesta.attr('name', 'opciones'+numPregunta)
    respuesta.attr('value',elemento.val())

    let labResp = $('<label></label>')
    labResp.attr('for', 'respuesta'+numPregunta+'-'+subPre)
    labResp.attr('id', 'labRespuesta'+numPregunta+'-'+subPre)
    labResp.text(elemento.val())

    elemento2.append(labResp)
    elemento2.append(respuesta)

}

let respuestaMult=(elemento, elemento2, numPregunta)=>{
    let idElemento = elemento.attr('id');
    let subPre = idElemento.substring(6, idElemento.length)

    $("#respuesta"+numPregunta+'-'+subPre).remove()
    $("#labRespuesta"+numPregunta+'-'+subPre).remove()
    let respuesta = $('<input></input>')
    respuesta.attr('id', 'respuesta'+numPregunta+'-'+subPre)
    respuesta.attr('type', 'checkbox')
    respuesta.attr('name', 'opciones'+numPregunta)
    respuesta.attr('value',elemento.val())

    let labResp = $('<label></label>')
    labResp.attr('for', 'respuesta'+numPregunta+'-'+subPre)
    labResp.attr('id', 'labRespuesta'+numPregunta+'-'+subPre)
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
        
        $("#terminar").attr('disabled', false)      
        $("#terminar").on('click', ()=>{
            if(generarJson()!= null)
                alert('Success!')
        })      
    }
    

function generarJson(){
    let json = []
    let nombreSurvey = $("#nombreTxt").val()
    let descripcionSurvey = $("#descTxt").val()
    let cantidadPreguntas = contPreguntas

    if(nombreSurvey != '' && descripcionSurvey != ''){
        let preguntasJSON = []

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
                    for(let j = 0; j < contRespuestas; j++){
                        let respuesta = $("#respuesta"+i+"-"+j).val()
                        let isCorrect = $("#respuesta"+i+"-"+j).prop('checked')
                        
                        if(respuesta != ''){
                            respuestasJSON.push({respuesta:respuesta, opcion_correcta:isCorrect})
                        } else {
                            alert("Hacen falta datos en Respuesta " + j + " Pregunta: " + i)
                            return null
                        }
                    }
                }

                preguntasJSON.push({pregunta:pregunta, tipo_pregunta:tipoPregunta, respuestas:respuestasJSON})

            }

            else{
                alert("Datos faltantes: Descripcion de la pregunta: "+(i+1)+ " / Tipo de respuestas")
                return null
            }
        }
        json.push({nombre:nombreSurvey, info:descripcionSurvey, preguntas:preguntasJSON})
        console.log('Se genero el JSON!')
    }
    else{
        alert("Datos faltantes: Nombre del cuestionario o su descripcion")
        return null
    }
}

// function generarJson() {

//         let objJson = [];
    
//         let nombreJ = $("#txtSurveyName").val();
    
//         let descripcionJ = $("#txtSuveyDescription").val();
    
//         let cantidad = $("#questionContainer").find('.card-js').length;
    
    
    
//         if(nombreJ != '' && descripcionJ != '') {
    
//             let preguntasJson = [];
    
    
    
//             for(let i = 0; i < cantidad; i++) {
    
    
    
//                 let pregunta = $("#name" + i).val();
    
//                 let tipo_pregunta = $("#selector" + i).val();
    
//                 let cantidad_respuestas = 0;
    
    
    
//                 if(pregunta != '' && (tipo_pregunta != 1 || tipo_pregunta != 2 || tipo_pregunta != 3)){
    
//                     let respuestasJson = [];
    
    
    
//                     if(tipo_pregunta == 1) {
    
//                         cantidad_respuestas = 1;
    
//                         respuestasJson.push({respuesta:"0",opcion_correcta:true});
    
//                     }
    
//                     else {
    
//                         cantidad_respuestas = $("#answerContent" + i).find('.uk-grid').length;
    
    
    
//                         for(let j = 0; j < cantidad_respuestas; j++){
    
//                             let respuesta = $("#answerI"+ i + "-" + j).val();
    
//                             let correctaBool = $("#answerC" + i + "-" + j).prop('checked');
    
//                             if(respuesta != ''){
    
//                                 respuestasJson.push({respuesta:respuesta,opcion_correcta:correctaBool});
    
//                             }
    
//                             else {
    
//                                 alert("Datos Faltantes: Respuesta " + j + " Pregunta: " + i);
    
//                                 return null;
    
//                             }
    
//                         }
    
//                     }
    
//                     preguntasJson.push({pregunta:pregunta,tipo_pregunta:tipo_pregunta,respuestas:respuestasJson});
    
//                 }
    
//                 else{
    
//                     alert("Datos Faltante: Titulo Pregunta "+ (i + 1) +" / Tipo Respuestas");
    
//                     return null;
    
//                 }
    
//             }
    
//             objJson.push({nombre:nombreJ,descripcion:descripcionJ,preguntas:preguntasJson});
    
//             console.log("JSON Generado")
    
//         }
    
//         else{
    
//             alert("Datos Faltantes: Nombre o Descripción")
    
//             return null;
    
//         }
    
    
    
//         return objJson;
    
//     }

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