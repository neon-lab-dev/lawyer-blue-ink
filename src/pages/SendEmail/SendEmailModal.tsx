import Button from "@/components/reusable/Button";
import send from "../../assets/icons/sendwhite.svg";
import attachFile from "../../assets/icons/attach_file.svg";
import Modal from "@/components/reusable/Modal";
import { useEffect, useRef, useState } from "react";
import DocxWithReplacedText from "./DocxWithReplacedText";
import { useMutation } from "@tanstack/react-query";
import { handleSendEmail } from "@/api/email";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import getReplacedTextFromDocx from "@/utils/getReplacedTextFromDocx";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setExcelData } from "@/store/slices/templates";
import { templateFooter } from "@/assets/footer";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataToSent: any;
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsSentEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
};

const SendEmailModal = ({
  isModalOpen,
  setIsModalOpen,
  handleFileInputChange,
  dataToSent,
  setIsSentEmailModalOpen,
  index,
}: Props): JSX.Element => {
  const [from, setFrom] = useState("mayank.goel@blueinkk.com");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    attachedFiles,
    selectedTemplateId,
    availableTemplates,
    excelData,
    templateSubject,
  } = useAppSelector((state) => state.templates);

  const handleAttachFileClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSendEmail,
    onError: (error) => {
      console.log(error);
      if (typeof error === "string") toast.error(error);
      else toast.error("Error sending email");
    },
    onSuccess: () => {
      setIsSentEmailModalOpen(true);
      setIsModalOpen(false);
      setSubject(templateSubject);
      handleExcelDataChange("isSent", true);
    },
  });

  const onSubmit = async () => {
    if (
      !dataToSent["CLIENT EMAIL ID"] ||
      !dataToSent["CC EMAILS"] ||
      !subject
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const selectedTemplate = availableTemplates.find(
      (template) => template._id === selectedTemplateId
    )!;
    const body = await getReplacedTextFromDocx(
      selectedTemplate.data,
      dataToSent
    );
    const data = {
      to: dataToSent["CLIENT EMAIL ID"],
      cc: dataToSent["CC EMAILS"],
      subject,
      body: `${body}${templateFooter}`,
      attachments: attachedFiles?.find(
        (file) => file.indexOfExcelSheet === index
      )?.files as File[],
    };
    mutate(data);
  };

  const handleExcelDataChange = (key: string, value: string | boolean) => {
    const newData = { ...dataToSent, [key]: value };
    const newExcelData = [...excelData];
    newExcelData[index] = newData;
    dispatch(setExcelData(newExcelData));
  };

  useEffect(() => {
    if (templateSubject) {
      // find placeholder in form of {placeholder} and replace it with the value from dataToSent
      const replacedSubject = templateSubject.replace(/{[^{}]+}/g, (match) => {
        const key = match.slice(1, -1);
        return dataToSent[key];
      });
      setSubject(replacedSubject);
    }
  }, [templateSubject, dataToSent, isModalOpen, index]);

  return (
    <Modal
      showCloseButton={true}
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setSubject(templateSubject);
      }}
    >
      <div className="w-[977px] rounded p-6 h-[464px] mx-auto overflow-y-auto bg-white flex items-center gap-9 relative">
        <div className="w-[50%] flex flex-col gap-6">
          <div className="relative h-11 w-full">
            <input
              required
              type="text"
              placeholder="   "
              disabled
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-border peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border focus:border-border focus:border-t-transparent focus:outline-0"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
              From
            </label>
          </div>

          <div className="relative h-11 w-full">
            <div className="border border-border h-full w-full rounded flex">
              <input
                required
                placeholder="     "
                type="text"
                value={dataToSent ? dataToSent["CLIENT EMAIL ID"] : ""}
                onChange={(e) => {
                  handleExcelDataChange("CLIENT EMAIL ID", e.target.value);
                }}
                className="peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-t-transparent focus:outline-0"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
                To
              </label>
            </div>
          </div>

          <div className="relative h-11 w-full">
            <div className=" border border-border h-full w-full rounded flex">
              <input
                required
                type="text"
                placeholder="     "
                value={dataToSent ? dataToSent["CC EMAILS"] : ""}
                onChange={(e) => {
                  handleExcelDataChange("CC EMAILS", e.target.value);
                }}
                className="peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-t-transparent focus:outline-0"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
                CC
              </label>
            </div>
          </div>

          <div className="relative h-11 w-full">
            <input
              required
              type="text"
              placeholder="     "
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border border-border peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border focus:border-border focus:border-t-transparent focus:outline-0"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
              Subject
            </label>
          </div>

          <div className="flex items-center gap-9">
            <div className="border rounded border-border w-[50px]  flex flex-col">
              <div className="h-[28px] bg-white text-text text-[14px] font-work-sans font-medium flex justify-center items-center">
                {(() => {
                  let len = 0;
                  const files = attachedFiles?.find(
                    (file) => file.indexOfExcelSheet === index
                  )?.files;
                  len = files ? files.length : 0;
                  return len;
                })()}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                multiple
              />
              <img
                className="cursor-pointer h-[28px] w-full px-3 py-2 bg-border flex justify-center items-center"
                src={attachFile}
                alt=""
                onClick={handleAttachFileClick}
              />
            </div>

            <Button
              disabled={isPending}
              onClick={() => {
                onSubmit();
              }}
              className="flex items-center justify-center gap-[10px] w-full"
            >
              {isPending ? (
                <PulseLoader color="#cdcfd1" size={6} />
              ) : (
                <>
                  <img src={send} alt="" />
                  Send Email
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="rounded border-2 border-border border-dashed p-6 bg-[#FBFBFB] w-[50%] h-[376px] overflow-y-auto scrollbar-md flex flex-col gap-[10px]">
          <h1 className="text-text text-[14px] font-work-sans font-semibold">
            Preview
          </h1>
          <DocxWithReplacedText
            data={dataToSent}
            showFooter={true}
            selectedTemplate={
              availableTemplates.find(
                (template) => template._id === selectedTemplateId
              )?.data
            }
            id={`docx-preview-${index}`}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SendEmailModal;
