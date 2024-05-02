import Button from "@/components/reusable/Button";
import send from "../../assets/icons/sendwhite.svg";
import attachFile from "../../assets/icons/attach_file.svg";
import Modal from "@/components/reusable/Modal";
import { useEffect, useRef, useState } from "react";

const SendEmailModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsSentEmailModalOpen,
  activeData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSentEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeData: any;
  selectedTemplate: string;
}): JSX.Element => {
  const [dataToSent, setDataToSent] = useState(activeData);
  const [from, setFrom] = useState("tilak@gmail.com");
  const [subject, setSubject] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      //convert to base64 and store in state
      setFiles([...files, file]);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setDataToSent(activeData);
  }, [activeData]);

  return (
    <Modal
      showCloseButton={true}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <div className="w-[977px] rounded p-6 h-[464px] mx-auto overflow-y-auto bg-white flex items-center gap-9 relative">
        <div className="w-[50%] flex flex-col gap-6">
          <div className="relative h-11 w-full">
            <input
              required
              type="text"
              placeholder="   "
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
                value={dataToSent ? dataToSent["CLIENT'S EMAIL ID"] : ""}
                onChange={(e) => {
                  setDataToSent({
                    ...dataToSent,
                    "CLIENT'S EMAIL ID": e.target.value,
                  });
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
                  setDataToSent({
                    ...dataToSent,
                    "CC EMAILS": e.target.value,
                  });
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
                {files.length}
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
              onClick={() => {
                setIsSentEmailModalOpen(true);
                setIsModalOpen(false);
              }}
              className="flex items-center justify-center gap-[10px] w-full"
            >
              <img src={send} alt="" />
              Send Email
            </Button>
          </div>
        </div>

        <div className="rounded border-2 border-border border-dashed p-6 bg-[#FBFBFB] w-[50%] h-[376px] overflow-y-auto flex flex-col gap-[10px]">
          <h1 className="text-text text-[14px] font-work-sans font-semibold">
            Preview
          </h1>
        </div>
      </div>
    </Modal>
  );
};

export default SendEmailModal;
