import article from "@/assets/icons/article.svg";
import Button from "@/components/reusable/Button";
import deleteIcon from "@/assets/icons/delete.svg";
import { useEffect, useState } from "react";
import Modal from "@/components/reusable/Modal";
import { templates } from "@/assets/mockData/templates";
import { renderAsync } from "docx-preview";

const ViewTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    templateName: "",
  });

  useEffect(() => {
    if (!selectedTemplate) return;
    const el = document.getElementById("docx-preview-container");
    const binaryString = window.atob(selectedTemplate);
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
  }, [selectedTemplate]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <h2 className="text-text text-base font-semibold">Template List</h2>
        {/* table */}
        <div className="flex flex-col gap-0 min-w-[800px] w-full max-w-7xl scrollbar-md">
          {/* table head */}
          <div className="rounded-t-[4px] bg-table-header text-gray grid grid-cols-4 text-[15px] border-t border-x border-gray/10 font-medium p-[20px] pl-[60px]">
            {["Template ID", "Template Name", "Preview", "Action"].map(
              (item, i) => (
                <span key={i} className="">
                  {item}
                </span>
              )
            )}
          </div>
          {templates.map((item, i) => (
            <div
              key={i}
              className={`rounded-t-[4px] text-gray grid grid-cols-4 border-x text-[14px] border-gray/10 font-medium p-[20px] pl-[60px] ${
                i === templates.length - 1 ? "border-b" : "border-y"
              }`}
            >
              <span className="my-auto">{item._id}</span>
              <span className="my-auto">{item.name}</span>
              <img
                src={article}
                alt={item.name}
                className="h-[100px] my-auto w-[100px] aspect-square object-contain object-center"
              />
              <div className="flex items-center my-auto gap-12">
                <Button
                  onClick={() => {
                    setIsPreviewOpen(true);
                    setSelectedTemplate(item.template ?? "");
                  }}
                  variant="supportive"
                >
                  View
                </Button>
                <button
                  onClick={() => {
                    setDeleteModal({
                      isOpen: true,
                      id: item._id,
                      templateName: item.name,
                    });
                  }}
                >
                  <img src={deleteIcon} className="h-6 w-6" alt="delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* preview image modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={setIsPreviewOpen}
        showCloseButton={true}
      >
        <div className="flex flex-col h-[600px] w-[730px] items-center gap-5">
          <span className="text-text text-[20px] font-semibold">Preview</span>
          <div className="w-full h-full overflow-x-hidden overflow-y-auto scrollbar-md">
            <div id="docx-preview-container"></div>
          </div>
        </div>
      </Modal>
      {/* delete modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          setDeleteModal({
            isOpen: false,
            id: "",
            templateName: "",
          });
          setSelectedTemplate("");
        }}
        showCloseButton={true}
      >
        <div className="flex flex-col items-center gap-5 my-8 mx-12">
          <div className="text-text text-base text-center">
            <span className="font-medium">
              Confirm you want to delete template{" "}
            </span>
            <span className="font-bold">{deleteModal.templateName}?</span>
          </div>
          <div className="flex gap-8">
            <Button
              onClick={() => {
                setDeleteModal({
                  isOpen: false,
                  id: "",
                  templateName: "",
                });
              }}
              variant="secondary"
            >
              No
            </Button>
            <Button
              onClick={() => {
                setDeleteModal({
                  isOpen: false,
                  id: "",
                  templateName: "",
                });
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ViewTemplate;
