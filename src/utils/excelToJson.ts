import exJ from "convert-excel-to-json";

const excelToJson = (file: File) => {
  try {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      const data = event.target?.result as string;
      try {
        const workbook = exJ({
          source: data,
          header: {
            rows: 1,
          },
        });
        console.log(workbook);
      } catch (err) {
        console.log(err);
      }
    };
  } catch (err) {
    console.log(err);
  }
};

export default excelToJson;
