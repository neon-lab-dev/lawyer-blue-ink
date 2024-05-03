import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const replaceWordsInDocx = async (
  base64: string,
  replacements: {
    [oldWord: string]: string;
  }
) => {
  // Convert the base64 string to a Uint8Array
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Load the .docx file with PizZip
  const zip = new PizZip(bytes);

  // Create a docxtemplater instance
  const doc = new Docxtemplater().loadZip(zip);

  // Perform the replacements

  const replacedData = Object.entries(replacements).reduce(
    (data, [oldWord, newWord]) => {
      //@ts-ignore
      data[oldWord] = newWord;
      return data;
    },
    {}
  );

  // Set the replaced text as the new content of the .docx file
  doc.setData(replacedData);

  // Render the document (replace all occurences of `{text}`)
  doc.render();

  // Generate the .docx file
  const zipDoc = doc.getZip();

  const output = await zipDoc.generate({ type: "base64" });

  // Here you can return the base64 string, etc.
  return output;
};

export default replaceWordsInDocx;
