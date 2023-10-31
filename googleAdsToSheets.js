const jsonData = require('/Users/user/Documents/Projetos/jsonGA4toSheets/adsUni.json');
const fs = require('fs');
const XLSX = require('xlsx');

const dataClear = jsonData.containerVersion.tag;
//let eventLabel = null;

const arrayDados = dataClear.map((e)=>{
    let conversionLabel = null;
    let conversionId = null;
    const tagName = e.name;
    const paran = e.parameter;
    
    
    //essa parte pega o event name do evento de ga4
    for(const parameter of paran){
        if (parameter.key === "conversionLabel") {
            conversionLabel = parameter.value;
            break;
        }
    }

    //essa parte pega o event name do evento de ga4
    for(const parameter of paran){
        if (parameter.key === "conversionId") {
            conversionId = parameter.value;
            break;
        }
    }

    
    const objeto = {
        'tagName': tagName,
        'conversionLabel': conversionLabel,
        'conversionId': conversionId,
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

const outputPath = 'listaEventosADS_fromGTM.xlsx';
XLSX.writeFile(workbook, outputPath);

console.log(`JSON data converted to Excel: ${outputPath}`);
