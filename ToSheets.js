const jsonData = require('/Users/user/Documents/Projetos/jsonGA4toSheets/ga4-fast.json');
const fs = require('fs');
const XLSX = require('xlsx');

const dataClear = jsonData.containerVersion.tag;
let eventValue = null;
let eventParameters = null;
let listParameter = null;
let userParameters = null;

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

    //pegar os parametros do usuario da tag
    for(const parameter of paran){
        if (parameter.key === "userProperties") {
            listParameter = parameter.list;
            // map feito para entrar em cada objeto e montar name: value
            userParameters = listParameter.map((p)=>{
                return p.map[0].value + ": " +p.map[1].value;
            })
            break;
        }
    }

    const objeto = {
        'tagName': tagName,
        'eventName': eventValue,
        'eventParameters': eventParameters,
        'userParameters': userParameters
    }
    return objeto;
});

// Convertendo o array eventParamenters em uma string para a coluna na planilha
const transformedData = arrayDados.map(item => {
    const eventParameters = item.eventParameters || []; // Se eventParamenters for null, usamos um array vazio
    const userParameters = item.userParameters || []; // Se eventParamenters for null, usamos um array vazio

    return {
      ...item,
      eventParameters: Array.isArray(eventParameters) ? eventParameters.join('\n') : '',
      userParameters: Array.isArray(userParameters) ? userParameters.join('\n') : ''
    };
});

const worksheet = XLSX.utils.json_to_sheet(transformedData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const outputPath = 'listaEventosGA4_fromGTM.xlsx';
XLSX.writeFile(workbook, outputPath);

console.log(`JSON data converted to Excel: ${outputPath}`);
