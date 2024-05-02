import { useState } from "react";
import SelectTemplate from "./SelectTemplate";
import SelectedTemplate from "./TemplateSelected";
import EmterDetails from "./EnterDetails";
import ExcelSheet from "./ExcelSheet";

const SendEmail = () => {
  const [selectedPage, setSelectedPage] = useState("select-template");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>("");
  //@ts-ignore
  const [excelFileDetails, setExcelFileDetails] = useState<any>([]);

  if (selectedPage === "select-template") {
    return (
      <SelectTemplate
        setSelectedPage={setSelectedPage}
        setSelectedTemplate={setSelectedTemplate}
        setSelectedTemplateName={setSelectedTemplateName}
      />
    );
  }

  if (selectedPage === "template-selected") {
    return (
      <SelectedTemplate
        setSelectedPage={setSelectedPage}
        selectedTemplate={selectedTemplate}
        setExcelFileDetails={setExcelFileDetails}
        selectedTemplateName={selectedTemplateName}
      />
    );
  }
  if (selectedPage === "enter-details") {
    return <EmterDetails />;
  }

  if (selectedPage === "excel-sheet") {
    return (
      <ExcelSheet
        setSelectedPage={setSelectedPage}
        excelFileDetails={excelFileDetails}
        selectedTemplate={selectedTemplate}
      />
    );
  }
};
export default SendEmail;
