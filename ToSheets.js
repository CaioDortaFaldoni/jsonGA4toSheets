const jsonData = require('/Users/user/Documents/Projetos/UninterListaEventosGA4/jsonGA4toSheets/GA4-Uninter.json');
const fs = require('fs');
const XLSX = require('xlsx');

const dataClear = jsonData.containerVersion.tag;
let eventValue = null;
let eventParameters = null;
let listParameter = null;

const arrayDados = dataClear.map((e)=>{
    const tagName = e.name;
    const paran = e.parameter;
    
    
    //essa parte pega o event name do evento de ga4
    for(const parameter of paran){
        if (parameter.key === "eventName") {
            eventValue = parameter.value;
            break;
        }
    }

    //pegar os parametros da tag
    for(const parameter of paran){
        if (parameter.key === "eventParameters") {
            listParameter = parameter.list;
            // map feito para entrar em cada objeto e montar name: value
            eventParameters = listParameter.map((p)=>{
                return p.map[0].value + ": " +p.map[1].value;
            })
            break;
        }
    }

    const objeto = {
        'tagName': tagName,
        'eventName': eventValue,
        'eventParamenters': eventParameters
    }
    return objeto;
});

// Convertendo o array eventParamenters em uma string para a coluna na planilha
const transformedData = arrayDados.map(item => {
    const eventParameters = item.eventParamenters || []; // Se eventParamenters for null, usamos um array vazio
    return {
      ...item,
      eventParamenters: Array.isArray(eventParameters) ? eventParameters.join('\n') : ''
    };
});

const worksheet = XLSX.utils.json_to_sheet(transformedData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const outputPath = 'listaEventosGA4_fromGTM.xlsx';
XLSX.writeFile(workbook, outputPath);

console.log(`JSON data converted to Excel: ${outputPath}`);
