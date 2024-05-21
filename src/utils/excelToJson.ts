import toast from "react-hot-toast";
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
        const truthyResult = result.filter((item) => Boolean(item));

        if (truthyResult.length < result.length) {
          toast.error(
            `${
              result.length - truthyResult.length
            } rows are ignored because of missing values in the row!`
          );
        }

        // convert every value to string according to the requirement
        const finalResult = truthyResult.map((item) => {
          const obj: any = {};
          Object.keys(item).forEach((key) => {
            const val = item[key];
            if (val === null || val === undefined) return (obj[key] = "");
            if (typeof val === "object") {
              // if the value is an date, convert it to string like "jan 1, 2020"

              if (val instanceof Date) {
                obj[key] = val.toDateString();
              } else {
                obj[key] = val.toString();
              }
            } else if (Array.isArray(val)) {
              obj[key] = val.join(",");
            } else {
              obj[key] = String(val);
            }
          });
          return obj;
        });
        resolve(finalResult);
      });
    };
    fileReader.onerror = (e) => {
      reject(e);
    };
    fileReader.readAsArrayBuffer(file as any);
  });
};

export default excelToJson;
