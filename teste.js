/*const fs = require('fs');
const XLSX = require('xlsx');

const jsonData = [
  {
    tagName: 'Cursos de Extensão - Custom Event - GA4 -- Refund',
    eventName: 'refund',
    eventParameters: [
      'page_event: Cursos de Extensão',
      'items: {{Payload for Refund - JS}}',
      'refund_id: {{Event.ecommerce.refund.actionField.id - DL}}'
    ]
  },
  {
    tagName: 'Home - Click - GA4 -- Banner dica de amigo',
    eventName: 'select_promotion',
    eventParameters: [
      'creative_name: Banner Dica de amigo - Grad. ead',
      'page_event: {{Verifica variante - Custom JS}}'
    ]
  },
  {
    tagName: 'Home - Click - GA4 -- Button header',
    eventName: 'click',
    eventParameters: [
      'button_label: {{Click Text}}',
      'page_event: {{Verifica variante - Custom JS}}'
    ]
  }
];

// Convertendo a matriz de eventParameters em uma única string por objeto
const jsonDataWithFlattenedParameters = jsonData.map(item => ({
  ...item,
  eventParameters: item.eventParameters.join('\n')
}));

const worksheet = XLSX.utils.json_to_sheet(jsonDataWithFlattenedParameters);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const outputPath = 'output2.xlsx';
XLSX.writeFile(workbook, outputPath);

console.log(`JSON data converted to Excel: ${outputPath}`);
*/

const fs = require('fs');
const XLSX = require('xlsx');

let jsonData = null;
jsonData = [{"tagName":"All Pages - GA4 -- Configuração","eventName":null,"eventParamenters":null},{"tagName":"[GA4] - EEC Events","eventName":"{{Event}}","eventParamenters":["items: {{[GA4] - Ecommerce Items}}","transaction_id: {{transactionId}}","value: {{transactionValue}}"]},{"tagName":"All Pages - Click - GA4 -- Interagir com o Chat","eventName":"chat_click","eventParamenters":["button_label: {{where - DL}}"]},{"tagName":"All Pages - Click - GA4 -- Abrir ou Fechar o Chat","eventName":"open_close_chat","eventParamenters":["open: {{Chat Opened - JS}}"]},{"tagName":"Cursos de Saúde - Click - GA4","eventName":"click","eventParamenters":["page_event: Novos Cursos de Saúde","course: {{Cursos de Saúde - GA4 - Label}}"]},{"tagName":"Cursos Livres Gratuitos - Form Submission - GA4","eventName":"form_submission","eventParamenters":["course: {{Cursos Livres Gratuitos - Cursos escolhidos -- Temporário Isolamento Social Coronavírus}}","form_name: Cursos Livres"]},{"tagName":"[GA4] - abra_um_polo","eventName":"abra_um_polo","eventParamenters":["custom_event_category: Abra um Polo","custom_event_action: {{Page Path}}"]},{"tagName":"[GA4] - resultados_busca","eventName":"resultados_busca","eventParamenters":["custom_event_category: {{Search Tag Category}}","custom_event_action: {{Search Tag Action}}","custom_event_label: {{Search Tag Label}}"]},{"tagName":"[GA4] - pre_enem","eventName":"pre_enem","eventParamenters":["custom_event_category: Pré Enem","custom_event_action: {{Form Pre-Enem - Cookie}}"]},{"tagName":"[GA4] - fluxo_enem","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"[GA4 - DL] - Add to Cart","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"[GA4 - DL] - View Item","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"[GA4 - DL] - Begin Checkout","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"[GA4 - DL] - Checkout Shipping","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"[GA4 - DL] - Checkout Payment","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"GA4 - Click - Infra -- Purchase","eventName":"fluxo_enem","eventParamenters":["custom_event_category: Pré ENEM","custom_event_action: {{Enem Step}}","custom_event_label: {{Enem Step Name}}"]},{"tagName":"Form de Inscrição - Form Submission - GA4 -- Thank You Page","eventName":"inscricao","eventParamenters":["form_name: {{Nome do Formulário - Thank You Page}}","entry: {{Forma de Ingresso}}","page_path: {{Page Path}}","modality: {{Modalidade de Ensino}}","register_id: {{ID do Cadastro}}","course: {{Nome do Curso Form de Inscrição - JS}}"]},{"tagName":"AVA Pages - Pageview - GA4 -- Bloqueio","eventName":"ava_bloqueio","eventParamenters":["form_name: {{Nome do Formulário - Thank You Page}}","entry: {{Forma de Ingresso}}","page_path: {{Page Path}}","modality: {{Modalidade de Ensino}}","register_id: {{ID do Cadastro}}","course: {{Nome do Curso Form de Inscrição - JS}}"]},{"tagName":"Formulário de Inscrição - History Change - GA4 -- Funil de Inscricao","eventName":"funil_de_inscricao","eventParamenters":["step: {{step - DL}}"]},{"tagName":"Cursos de Extensão - Custom Event - GA4 EE -- Purchase","eventName":"purchase","eventParamenters":["items: {{[GA4] - Ecommerce Items}}","course: {{ecommerce.purchase.products.0.name - DL}}","payment_option: {{paymentOption}}","transactionId: {{transactionId}}","transaction_value: {{transactionValue}}"]},{"tagName":"Cursos de Extensão - Click - GA4 EE -- Add to Cart","eventName":"add_to_cart","eventParamenters":["items: {{[GA4] - Ecommerce Items}}","course: {{Cursos de Extensão - Nome do curso}}"]},{"tagName":"Cursos de Extensão - Click - GA4 EE -- View Item","eventName":"view_item","eventParamenters":["items: {{[GA4] - Ecommerce Items}}","course: {{Cursos de Extensão - Nome do curso}}"]},{"tagName":"Etapas - Click - GA4 -- Banner Cybba","eventName":"click_banner_cybba","eventParamenters":["items: {{[GA4] - Ecommerce Items}}","course: {{Cursos de Extensão - Nome do curso}}"]},{"tagName":"Form ProUni - Visibility - GA4 -- Steps","eventName":"prouni_steps","eventParamenters":["form_name: ProUni","step: {{Visible Element Name}}"]},{"tagName":"LP Lançamento Direito EAD - Form Submission - GA4","eventName":"form_submission","eventParamenters":["form_name: Lançamento Direito EAD RD form"]},{"tagName":"LP Lançamento Psicologia EAD - Form Submission - GA4","eventName":"form_submission","eventParamenters":["form_name: Lançamento Psicologia EAD RD form"]},{"tagName":"LP Pre-Enem - Form Submission - GA4 -- Thank You Page","eventName":"form_submission","eventParamenters":["form_name: Pre-Enem","formation_degree: {{Form Pre-Enem - Cookie}}"]},{"tagName":"LP Seja Parceiro - DOM Ready - GA4 -- Cadastro | Abra um Polo","eventName":"form_submission","eventParamenters":["form_name: {{Cadastro / Abra um Polo}}"]},{"tagName":"LP Seja Parceiro - Click - GA4 -- Clique no Botão Abra um Polo","eventName":"click","eventParamenters":["button_label: Abra um Polo"]},{"tagName":"LP Transferência Externa - Click - GA4","eventName":"click","eventParamenters":["button_label: {{Click Text -- Lower Case}}","page_event: Transferencia Externa"]},{"tagName":"Form de Inscrição - Subscribe - GA4 -- Thank You Page Inscrição pelo Banner Cybba","eventName":"inscrição_cybba","eventParamenters":["button_label: {{Click Text -- Lower Case}}","page_event: Transferencia Externa"]},{"tagName":"Product - Click - GA4 -- Add To Cart","eventName":"add_to_cart","eventParamenters":["page_event: Página de Curso","course: {{item_brand Sanitized - JS}} {{item_name Sanitized - JS}}","items: {{[GA4] - Ecommerce Items}}","course_id: {{ecommerce.items.0.item_id - DL}}"]},{"tagName":"Cursos - Load - GA4 -- View Item","eventName":"view_item","eventParamenters":["event_page: Página de Curso","course: {{item_brand Sanitized - JS}} {{item_name Sanitized - JS}}","course_id: {{ecommerce.items.0.item_id - DL}}","items: {{[GA4] - Ecommerce Items}}"]},{"tagName":"Cursos de Extensão - Custom Event - GA4 -- Refund","eventName":"refund","eventParamenters":["page_event: Cursos de Extensão","items: {{Payload for Refund - JS}}","refund_id: {{Event.ecommerce.refund.actionField.id - DL}}"]},{"tagName":"Home - Click - GA4 -- Banner dica de amigo","eventName":"select_promotion","eventParamenters":["creative_name: Banner Dica de amigo - Grad. ead","page_event: {{Verifica variante - Custom JS}}"]},{"tagName":"Home - Click - GA4 -- Button header","eventName":"click","eventParamenters":["button_label: {{Click Text}}","page_event: {{Verifica variante - Custom JS}}"]}];

// Convertendo o array eventParamenters em uma string para a coluna na planilha
const transformedData = jsonData.map(item => ({
  ...item,
  eventParamenters: item.eventParamenters.join('\n')
}));

const worksheet = XLSX.utils.json_to_sheet(transformedData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const outputPath = 'teste.xlsx';
XLSX.writeFile(workbook, outputPath);

console.log(`JSON data converted to Excel: ${outputPath}`);


