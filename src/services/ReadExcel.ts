import { read, utils, readFile } from "xlsx";

const NOMI = "Alimenti generici";

function processExcelFile(data: any, customAliments: any, setList: any) {
  const workbook = read(data, { type: "binary" });

  let worksheets: any = {};
  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = utils.sheet_to_json(workbook.Sheets[sheetName]);
  }

  setList([...worksheets[NOMI], ...customAliments]);
}

// function selectFile(event: any, setList: any) {
//   var file = event.target.files[0];
//   if (typeof FileReader != "undefined") {
//     var reader = new FileReader();
//     reader.onload = (e) => {
//       processExcelFile(e.target?.result,  setList);
//     };
//     try {
//       reader.readAsBinaryString(file);
//     } catch (error) {
//       return false;
//     }
//     return true;
//   }
//   return false;
// }

function addCustomAliment(aliment: any, setList: any) {
  const localAliments = JSON.parse(localStorage.getItem("aliments") || "[]");
  localAliments.push(aliment);
  localStorage.setItem("aliments", JSON.stringify(localAliments));
  getFile(setList);
}

async function getFile(setList: any) {
  let localAliments = JSON.parse(localStorage.getItem("aliments") || "[]");
  const workbook = await fetch("/valori.xlsx")
    .then((resp) => resp.arrayBuffer())
    .then((buff) => processExcelFile(buff, localAliments, setList))
    .catch((err) => console.error(err));
}

export { getFile, addCustomAliment };
