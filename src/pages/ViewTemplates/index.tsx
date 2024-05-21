import article from "@/assets/icons/article.svg";
import Button from "@/components/reusable/Button";
import deleteIcon from "@/assets/icons/delete.svg";
import { useEffect, useState } from "react";
import Modal from "@/components/reusable/Modal";
import DocxPreview from "@/components/reusable/DocxPreview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleDeleteTemplate, handleGetTemplates } from "@/api/template";
import { ITemplate } from "@/types/template.type";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import Loading from "@/components/reusable/Loading";
import downloadIcon from "@/assets/icons/download-svgrepo-com.svg";
import downloadFile from "@/assets/icons/file-download-svgrepo-com.svg";
import jsonToXlsx from "@/utils/jstonToXlsx";
import extractVariablesFromDocx from "@/utils/extractVariablesFromDocx";

const ViewTemplate = () => {
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    templateName: "",
  });

  const { data, isLoading, isError } = useQuery<ITemplate[]>({
    queryFn: handleGetTemplates,
    queryKey: ["templates"],
  });

  useEffect(() => {
    if (data) {
      setTemplates(data);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["templates"],
      });
      toast.success("Template deleted successfully");
      setDeleteModal({
        isOpen: false,
        id: "",
        templateName: "",
      });
      setSelectedTemplate("");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching templates</div>;

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
          {templates.length > 0 ? (
            templates.map((item, i) => (
              <div
                key={i}
                className={`rounded-t-[4px] text-gray grid grid-cols-4 border-x text-[14px] border-gray/10 font-medium p-[20px] pl-[60px] ${
                  i === templates.length - 1 ? "border-b" : "border-y"
                }`}
              >
                <span className="my-auto truncate">{item._id}</span>
                <span className="my-auto truncate">{item.file_name}</span>
                <img
                  src={article}
                  alt={item.file_name}
                  className="h-[100px] my-auto w-[100px] aspect-square object-contain object-center"
                />
                <div className="flex items-center my-auto gap-6">
                  <Button
                    onClick={() => {
                      setIsPreviewOpen(true);
                      setSelectedTemplate(item.data ?? "");
                    }}
                    variant="supportive"
                  >
                    View
                  </Button>

                  {/* download btn */}
                  <a
                    title="Download template in .docx format"
                    href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${item.data}`}
                    download={`${item.file_name} template.docx`}
                  >
                    <img
                      src={downloadIcon}
                      className="h-6 w-6"
                      alt="download"
                    />
                  </a>

                  {/* download file btn */}

                  <button
                    onClick={async () => {
                      extractVariablesFromDocx(item.data ?? "").then((vars) => {
                        jsonToXlsx(vars, item.file_name);
                      });
                    }}
                    title="Download excel file for this template!"
                  >
                    <img
                      src={downloadFile}
                      className="h-6 w-6"
                      alt="download"
                    />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteModal({
                        isOpen: true,
                        id: item._id,
                        templateName: item.file_name,
                      });
                    }}
                  >
                    <img src={deleteIcon} className="h-6 w-6" alt="delete" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-text text-[16px] mt-12">
              No templates found
            </div>
          )}
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
            <DocxPreview selectedTemplate={selectedTemplate} />
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
                setSelectedTemplate("");
              }}
              variant="secondary"
              className="px-3 py-2 min-w-16"
            >
              No
            </Button>
            <Button
              onClick={() => {
                mutate(deleteModal.id);
              }}
              className="px-3 py-2 min-w-24"
            >
              {isPending ? <PulseLoader color="#cdcfd1" size={6} /> : "Confirm"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ViewTemplate;
