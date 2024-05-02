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

          //filter the objects if more than or equal to  length- 1 falsy values
          const truthy = Object.values(obj).filter((value) => value);
          if (truthy.length < Object.keys(obj).length - 1) {
            return null;
          }
          return obj;
        });
        resolve(result.filter((item) => item));
      });
    };
    fileReader.onerror = (e) => {
      reject(e);
    };
    fileReader.readAsArrayBuffer(file as any);
  });
};

export default excelToJson;
