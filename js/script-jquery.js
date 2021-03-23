let id = 0
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

let agregarDatos = (element)=>{
    console.log('agrega')
    _tipoPregunta = element.val()
    
}              

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
    
    let opcionesCount = 0
    let formOpciones = $('<form></form>')
    formOpciones.attr('id', 'formOpciones'+subPre)
    
    botonAgr.click(() => {
        opcionesCount++;
        if(opcionesCount <= 5){
            let opcion = $('<input></input>')
            opcion.attr('id', 'opcion'+opcionesCount)
            opcion.attr('type', 'text')
    
            let respuesta = $('<input></input>')
            respuesta.attr('id', 'respuesta'+opcionesCount)
            respuesta.attr('type', 'radio')
            respuesta.attr('name', 'opciones'+subPre)
            respuesta.text(opcion.val())
    
            formOpciones.append(opcion)
            formOpciones.append(respuesta)
        }
    });

    
    switch(seleccionado){
        case "Abierta":
            labelPregunta.text("Ingresa la pregunta abierta:");                  
            break;
            case "OpcMultiple":
                labelPregunta.text("Ingresa la pregunta de opcion multiple:");
                divPregunta.append(formOpciones)
            divPregunta.append(botonAgr)
            break;
        case "Multi":
            labelPregunta.text("Ingresa la pregunta de seleccion multiple:");
            divPregunta.append(formOpciones)
            divPregunta.append(botonAgr)
            break;
        default:
            break;
    }

    $("#pregunta"+subPre).append(divPregunta);
        
}

    function newQuestion() {
        id++
        // $("#preguntas")
        //     .append("<div id='pregunta"+id+"'><h2>Pregunta "+id+"</h2><select name='tipoPregunta' id='tipoPregunta"+id+"'><option value='Abierta'>Abierta</option><option value='OpcMultiple'>Opcion multiple</option><option value='Multi'>Multiseleccion</option></select></div><br>")
        
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

    // function agregarDatos(params) {
    //     console.log('agrega')
    //         _tipoPregunta = element.val()
    //         switch(_tipoPregunta){
    //             case "Abierta":
    //                 $("#pregTxt"+subPre)
    //                     .remove()
    //                 $("#pregunta"+subPre)
    //                     .append("<label for='pregTxt"+id+"'>Ingresa la pregunta:</label><br><input type='text' id='pregTxt"+id+"' required>")                    
    //                 break;
    //             case "OpcMultiple":
    //                 $("#pregTxt"+subPre)
    //                     .remove()
    //                 $("#pregunta"+subPre)
    //                     .append("<label for='pregTxt"+id+"'>Ingresa la pregunta de opcion multiple:</label><br><input type='text' id='pregTxt"+id+"' required>")
    //                 break;
    //             case "Multi":
    //                 $("#pregTxt"+id)
    //                     .remove()
    //                 $("#pregunta"+id)
    //                     .append("<label for='pregTxt"+id+"'>Ingresa la pregunta de multiple seleccion:</label><br><input type='text' id='pregTxt"+id+"' required>")
    //                 break;
    //             default:
    //                 break;
    //         }
    // }
// $("#newQuestion").click(()=>{            

//     id++
//     $("#preguntas")
//         .append("<div id='pregunta"+id+"'><h2>Pregunta "+id+"</h2><select name='tipoPregunta' id='tipoPregunta"+id+"'><option value='Abierta'>Abierta</option><option value='OpcMultiple'>Opcion multiple</option><option value='Multi'>Multiseleccion</option></select></div><br>")
//     typePre = $("#tipoPregunta"+id).attr('id')
//     subPre = typePre.substring(12, typePre.length)
//     //alert(subPre)        
//     agregarDatos($("#tipoPregunta"+id))
// })