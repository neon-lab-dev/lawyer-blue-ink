import { useEffect, useRef, useState } from "react";
import attachFile from "../../assets/icons/attach_file.svg";
import send from "../../assets/icons/send.svg";
import SendEmailModal from "./SendEmailModal";
import leftArrow from "../../assets/icons/left-arrow.svg";
import EmailSentModal from "./EmailSentModal";

const ExcelSheet = ({
  setSelectedPage,
  excelFileDetails,
  selectedTemplate,
}: {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  excelFileDetails: any[];
  selectedTemplate: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSentEmailModalOpen, setIsSentEmailModalOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeData, setActiveData] = useState<any>(null);

  const handleAttachFileClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    console.log(filePreview);
  }, [filePreview]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as any);
    };
    reader.readAsDataURL(file);
  };

  // Modal functionality
  const handleModal = (i: number): void => {
    setIsModalOpen(!isModalOpen);
    setActiveData(excelFileDetails[i]);
  };

  console.log(excelFileDetails);

  return (
    <>
      <EmailSentModal
        isOpen={isSentEmailModalOpen}
        onClose={() => setIsSentEmailModalOpen(false)}
      />
      <div className="flex flex-col gap-6">
        <button onClick={() => setSelectedPage("template-selected")}>
          <img className="w-[44px]" src={leftArrow} alt="" />
        </button>
        <h1 className="text-text text-base font-work-sans font-semibold">
          Excel Sheet
        </h1>
        {excelFileDetails && excelFileDetails.length > 0 ? (
          <div className="overflow-x-auto hide-scrollbar">
            <table className="table-auto border-collapse">
              <thead>
                <tr className="text-text text-[14px] font-work-sans font-medium">
                  {Object.keys(excelFileDetails[0]).map(
                    (key: string, i: number) => (
                      <th key={i} className="border px-3 py-4 min-w-fit">
                        {key}
                      </th>
                    )
                  )}
                  <th className="border px-3 py-4">Attach Files</th>
                  <th className="border px-3 py-4">Send Email</th>
                </tr>
              </thead>
              <tbody>
                {excelFileDetails
                  ?.filter((item) => item)
                  ?.map((item: any, i: number) => (
                    <tr
                      key={i}
                      className="text-gray text-[15px] font-work-sans font-normal"
                    >
                      {Object.keys(item).map((key: string, i: number) => (
                        <td
                          key={i}
                          className="border px-3 py-4 max-w-[280px] truncate"
                        >
                          {item[key]}
                        </td>
                      ))}
                      <td className="border px-3 py-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileInputChange}
                        />
                        <button onClick={handleAttachFileClick}>
                          <img
                            className="cursor-pointer"
                            src={attachFile}
                            alt=""
                          />
                        </button>
                      </td>
                      <td
                        onClick={() => handleModal(i)}
                        className="border px-3 py-4"
                      >
                        <img className="cursor-pointer" src={send} alt="" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <SendEmailModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsSentEmailModalOpen={setIsSentEmailModalOpen}
              selectedTemplate={selectedTemplate}
              activeData={activeData}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <span className="text-text text-[20px] font-semibold">
              No data available
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ExcelSheet;
