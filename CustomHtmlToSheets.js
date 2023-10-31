const jsonData = require("/Users/user/Documents/Projetos/jsonGA4toSheets/riachu.json");
const fs = require("fs");
const XLSX = require("xlsx");

const allTags = jsonData.containerVersion.tag;
const tagsGa4 = allTags.filter((tag) => tag.type === "gaawe"); //gaawe

const arrayDadosGA4 = tagsGa4.map((e)=>{
  let eventValue = null;
  let listParameter = null;
  let userParameters = null;
  let eventParameters = null;
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
      if (parameter.key === "eventSettingsTable") {
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
const transformedDataGA4 = arrayDadosGA4.map(item => {
  const eventParameters = item.eventParameters || []; // Se eventParamenters for null, usamos um array vazio
  const userParameters = item.userParameters || []; // Se eventParamenters for null, usamos um array vazio

  return {
    ...item,
    eventParameters: Array.isArray(eventParameters) ? eventParameters.join('\n') : '',
    userParameters: Array.isArray(userParameters) ? userParameters.join('\n') : ''
  };
});

//-------------------------------------------------------------------------------------------------------------------

const tagsHtml = allTags.filter((tag) => tag.type === "html"); // filtrao array geral para só ter as tags type: 'html'

const arrayDados = tagsHtml.map((e) => {
  let customCod = null;
  const tagName = e.name;
  const paran = e.parameter;

  //essa parte pega o event name do evento de ga4
  for (const parameter of paran) {
    if (parameter.key === "html") {
      customCod = parameter.value;
      break;
    }
  }

  const objeto = {
    tagName: tagName,
    customCod: customCod,
  };
  return objeto;
});

// Convertendo o array eventParamenters em uma string para a coluna na planilha
const transformedData = arrayDados.map((item) => {
  return {
    ...item,
  };
});

//type: awct
// filtrao array geral para só ter as tags type: 'awct'
// precisa verificar todos os types que são atribuidos a Google Ads
const tagsAds = allTags.filter((tag) => tag.type === "awct" || tag.type === "gclidw" || tag.type === "sp" || tag.type === "awud"); 

const arrayDadosAds = tagsAds.map((e) => {
  let conversionLabel = null;
  let conversionId = null;
  const tagName = e.name;
  const paran = e.parameter;

  //essa parte pega o event name do evento de ga4
  for (const parameter of paran) {
    if (parameter.key === "conversionLabel") {
      conversionLabel = parameter.value;
      break;
    }
  }

  //essa parte pega o event name do evento de ga4
  for (const parameter of paran) {
    if (parameter.key === "conversionId") {
      conversionId = parameter.value;
      break;
    }
  }

  const objetoAds = {
    tagName: tagName,
    conversionLabel: conversionLabel,
    conversionId: conversionId,
  };
  return objetoAds;
});

// Convertendo o array eventParamenters em uma string para a coluna na planilha
const transformedDataAds = arrayDadosAds.map((item) => {
  return {
    ...item,
  };
});

const worksheetGA4 = XLSX.utils.json_to_sheet(transformedDataGA4);
const worksheet = XLSX.utils.json_to_sheet(transformedData);
const adsWorksheet = XLSX.utils.json_to_sheet(transformedDataAds);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheetGA4, "Eventos GA4");
XLSX.utils.book_append_sheet(workbook, worksheet, "Eventos Custom");
XLSX.utils.book_append_sheet(workbook, adsWorksheet, "Eventos ADS");

const outputPath = "teste4.xlsx";
XLSX.writeFile(workbook, outputPath);
console.log(`JSON data converted to Excel: ${outputPath}`);