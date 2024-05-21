import toast from "react-hot-toast";
import * as XLSX from "xlsx";

export default function jsonToXlsx(data: string[], name: string) {
  /**
   * Error handling
   */

  if (!Array.isArray(data)) return toast.error("Data is invalid!");
  if (data.length === 0) return toast.error("Data is empty!");

  const uniqueData = [...new Set(data)];
  const dataWithTwoConstants = [...uniqueData, "CC EMAILS", "CLIENT EMAIL ID"];

  try {
    const obj: Record<string, string> = {};
    dataWithTwoConstants.forEach((item) => {
      obj[item] = "";
    });
    const ws = XLSX.utils.json_to_sheet([obj]);

    // Set the column widths
    ws["!cols"] = dataWithTwoConstants.map((str) => ({ wch: str.length + 10 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${name} Excel Sheet.xlsx`);
  } catch (error) {
    console.error(error);
    toast.error("Error converting data to xlsx");
  }
}
