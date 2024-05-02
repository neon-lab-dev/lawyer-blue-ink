import replaceWordsInDocx from "@/utils/replaceWordsInDocx";
import { renderAsync } from "docx-preview";
import { useEffect, useState } from "react";

const DocxWithReplacedText = ({
  selectedTemplate,
  data,
}: {
  selectedTemplate: string;
  data: {
    [key: string]: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const replaced = await replaceWordsInDocx(selectedTemplate, data);
      setIsLoading(false);
      const el = document.getElementById("docx-preview-container");
      const binaryString = window.atob(replaced);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let j = 0; j < binaryLen; j++) {
        const ascii = binaryString.charCodeAt(j);
        bytes[j] = ascii;
      }
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      if (el) {
        renderAsync(blob, el)
          .catch((err) => {
            console.error("Error rendering document:", err);
          })
          .then(() => {
            const wrapper = el.querySelector(".docx-wrapper");
            if (wrapper) {
              wrapper.setAttribute(
                "style",
                "background: white;padding: 0;box-shadow: none;"
              );
              const docx = wrapper.querySelector(".docx");
              if (docx) {
                docx.setAttribute("style", "box-shadow: none;padding: 1rem;");
              }
            }
          });
      } else {
        console.error("Preview element not found.");
      }
    })();
  }, [selectedTemplate, data]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div id="docx-preview-container"></div>
    </div>
  );
};
export default DocxWithReplacedText;
