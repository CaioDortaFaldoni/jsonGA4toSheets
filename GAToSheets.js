const jsonData = require('/Users/user/Documents/Projetos/jsonGA4toSheets/UninterGA.json');
const fs = require('fs');
const XLSX = require('xlsx');

const dataClear = jsonData.containerVersion.tag;

const arrayDados = dataClear.map((e)=>{
    let eventCategory = null;
    let eventAction = null;
    let eventLabel = null;
    const tagName = e.name;
    const paran = e.parameter;
    
    
    //essa parte pega o event name do evento de ga4
    for(const parameter of paran){
        if (parameter.key === "eventCategory") {
            eventCategory = parameter.value;
            break;
        }
    }

    //essa parte pega o event name do evento de ga4
    for(const parameter of paran){
        if (parameter.key === "eventAction") {
            eventAction = parameter.value;
            break;
        }
    }

    //essa parte pega o event name do evento de ga4
    for(const parameter of paran){
        if (parameter.key === "eventLabel") {
            eventLabel = parameter.value;
            break;
        }
    }


    const objeto = {
        'tagName': tagName,
        'eventCategory': eventCategory,
        'eventAction': eventAction,
        'eventLabel': eventLabel
    }
    return objeto;
});

// Convertendo o array eventParamenters em uma string para a coluna na planilha
const transformedData = arrayDados.map(item => {
    //const eventParameters = item.eventParameters || []; // Se eventParamenters for null, usamos um array vazio
    //const userParameters = item.userParameters || []; // Se eventParamenters for null, usamos um array vazio

    return {
      ...item,
      //eventParameters: Array.isArray(eventParameters) ? eventParameters.join('\n') : '',
      //userParameters: Array.isArray(userParameters) ? userParameters.join('\n') : ''
    };
});

const worksheet = XLSX.utils.json_to_sheet(transformedData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const outputPath = 'listaEventosGA4_fromGTM.xlsx';
XLSX.writeFile(workbook, outputPath);

console.log(`JSON data converted to Excel: ${outputPath}`);
