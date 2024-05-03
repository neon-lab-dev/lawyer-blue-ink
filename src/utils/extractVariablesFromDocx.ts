import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const extractVariablesFromDocx = async (base64: string) => {
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

  // Get the full text of the document, including placeholders
  const fullText = doc.getFullText();

  // Use a regular expression to extract the placeholders like {text}
  const placeholders = fullText.match(/{[^{}]+}/g);

  // Remove the {} from the placeholders
  const variables =
    placeholders?.map((placeholder) => placeholder.slice(1, -1)) ?? [];

  return variables;
};

export default extractVariablesFromDocx;
