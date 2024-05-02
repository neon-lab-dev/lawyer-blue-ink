import readXlsxFile from "read-excel-file";

const excelToJson = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      readXlsxFile(arrayBuffer).then((rows) => {
        const headers = rows[0];
        const data = rows.slice(1);
        const result = data.map((row) => {
          const obj: any = {};
          headers.forEach((header, i) => {
            obj[String(header).toUpperCase()] = row[i];
          });
          return obj;
        });
        console.log(result);
        resolve(result);
      });
    };
    fileReader.onerror = (e) => {
      reject(e);
    };
    fileReader.readAsArrayBuffer(file as any);
  });
};

export default excelToJson;
