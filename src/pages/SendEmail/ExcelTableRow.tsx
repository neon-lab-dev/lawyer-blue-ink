import { useRef, useState } from "react";
import attachFile from "../../assets/icons/attach_file.svg";
import send from "../../assets/icons/send.svg";
import SendEmailModal from "./SendEmailModal";
import EmailSentModal from "./EmailSentModal";
import { useDispatch } from "react-redux";
import { addAttachedFiles } from "@/store/slices/templates";
import { useAppSelector } from "@/store";

type Props = {
  item: Record<string, string | boolean>;
  index: number;
};

const ExcelTableRow = ({ item, index }: Props) => {
  const [isSentEmailModalOpen, setIsSentEmailModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { attachedFiles } = useAppSelector((state) => state.templates);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    dispatch(
      addAttachedFiles({
        files: [...files],
        indexOfExcelSheet: index,
      })
    );
  };

  return (
    <>
      <EmailSentModal
        isOpen={isSentEmailModalOpen}
        onClose={() => setIsSentEmailModalOpen(false)}
      />
      <SendEmailModal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        handleFileInputChange={handleFileInputChange}
        dataToSent={item}
        setIsSentEmailModalOpen={setIsSentEmailModalOpen}
        index={index}
      />
      <tr
        className={`text-gray text-[15px] font-work-sans font-normal ${
          item.isSent ? "bg-[#EEFFE5]" : ""
        }`}
      >
        {Object.keys(item).map((key: string, i: number) => {
          if (key === "isSent") return null;
          return (
            <td key={i} className="border px-3 py-4 max-w-[280px] truncate">
              {item[key]}
            </td>
          );
        })}
        <td className="border px-3 py-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
            multiple
          />
          <button
            onClick={handleAttachFileClick}
            className="flex items-center gap-1 cursor-pointer"
          >
            <img className="cursor-pointer" src={attachFile} alt="" />
            <span className="text-[15px] font-work-sans font-medium text-gray-500">
              {(() => {
                let len = 0;
                const files = attachedFiles?.find(
                  (file) => file.indexOfExcelSheet === index
                )?.files;

                len = files ? files.length : 0;

                return len === 0 ? "" : `(${len})`;
              })()}
            </span>
          </button>
        </td>
        <td onClick={() => setIsOpen(true)} className="border px-3 py-4">
          <img className="cursor-pointer" src={send} alt="" />
        </td>
      </tr>
    </>
  );
};
export default ExcelTableRow;
