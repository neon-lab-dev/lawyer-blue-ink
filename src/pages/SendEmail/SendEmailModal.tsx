import Button from "@/components/reusable/Button";
import { useEffect, useRef, useState } from "react";
import send from "../../assets/icons/sendwhite.svg"
import attachFile from "../../assets/icons/attach_file.svg";
import closeModal from "../../assets/icons/close_small.svg";
import cancel from "../../assets/icons/cancel.svg";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


const SendEmailModal = ({
    isModalOpen,
    setIsModalOpen,
    filePreview,
    loading
  }: {
    isModalOpen: boolean;
    filePreview: File | null;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
  }): JSX.Element => {

    console.log(filePreview);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): void => {
          const closestDropdown = (event.target as HTMLElement).closest(
            "#closeModal"
          );
          if (isModalOpen && closestDropdown === null) {
            setIsModalOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
    
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [isModalOpen, setIsModalOpen]);



      const fileInputRef = useRef(null);

      const [fileLength, setFileLength] = useState([])

    const handleAttachFileClick = () => {
        // Trigger click event of file input
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        // Handle the file upload logic here
        setFileLength(files)
        console.log('Files uploaded:', files);
    };



    const [emails, setEmails] = useState([])
    const removeEmails = (emailToRemove) => {
      setEmails(emails.filter((_, index) => index != emailToRemove));
    }


    const addEmails = (e) => {
        if(e.key === "Enter" && e.target.value != ""){
          setEmails([...emails, e.target.value])
          e.target.value = ""
        }
    }


    const [CC, setCC] = useState([])
    const removeCC = (CcToRemove) => {
      setCC(CC.filter((_, index) => index != CcToRemove));
    }


    const addCC = (e) => {
        if(e.key === "Enter" && e.target.value != ""){
          setCC([...CC, e.target.value])
          e.target.value = ""
        }
    }

    const docs = [
      { uri: filePreview },
    ];


    return (
        <>
      {isModalOpen && (
        <div className="bg-text bg-opacity-70  fixed inset-0 flex justify-center items-center  z-50 w-full mx-auto">
          {/* Form */}
          <div id="closeModal" className="w-[977px] rounded p-6 h-[464px] mx-auto overflow-y-auto bg-white flex items-center gap-9 relative">

            <div onClick={() => setIsModalOpen(false)} className="absolute top-3 right-5 mb-4">
                <img className="cursor-pointer" src={closeModal} alt="" />
            </div>
            

            <div className="w-[50%] flex flex-col gap-6">
            
          <div className="relative h-11 w-full">
                <input
                  required
                  type="text"
                  className=" border border-border peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border focus:border-border focus:border-t-transparent focus:outline-0"
                  placeholder=" "
                  name="firstName"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
                  From
                </label>
              </div>


          <div className="relative h-11 w-full">
          
                <div className="border border-border h-full w-full rounded flex">

                <div className="flex items-center gap-2 w-auto">
              {CC.slice(0, 2).map((cc, index) =>
                                            <div key={index} className="bg-[#F4F4F4] z-10 w-auto h-[30px] flex items-center gap-2 px-3 py-1 font-lato text-[14px] font-normal text-text rounded-[29px] ml-3">
                                                {cc}
                                                <img onClick={() => removeCC(index)} src={cancel} alt="" />
                                            </div>
                                        )}
                                        {CC.length > 2 && <p className=" z-10 font-lato text-[14px] font-normal text-text ml-3 flex gap-2">
                                            <span>+</span> {CC.length - 2}
                                        </p>}
              </div>


                <input
                onKeyUp={addCC}
                  required
                  type="text"
                  className="peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-t-transparent focus:outline-0"
                  placeholder=" "
                  name="firstName"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
                  To
                </label>
                </div>
              </div>


          <div className="relative h-11 w-full">

              <div className=" border border-border h-full w-full rounded flex">
              <div className="flex items-center gap-2 w-auto">
              {emails.slice(0, 2).map((email, index) =>
                                            <div key={index} className="bg-[#F4F4F4] z-10 w-auto h-[30px] flex items-center gap-2 px-3 py-1 font-lato text-[14px] font-normal text-text rounded-[29px] ml-3">
                                                {email}
                                                <img onClick={() => removeEmails(index)} src={cancel} alt="" />
                                            </div>
                                        )}
                                        {emails.length > 2 && <p className=" z-10 font-lato text-[14px] font-normal text-text ml-3 flex gap-2">
                                            <span>+</span> {emails.length - 2}
                                        </p>}
              </div>
            <input
            onKeyUp={addEmails}
                  required
                  type="text"
                  className="peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-t-transparent focus:outline-0"
                  placeholder=" "
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
                  className="border border-border peer h-full w-full rounded bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border focus:border-border focus:border-t-transparent focus:outline-0"
                  placeholder=" "
                  name="firstName"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-border before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-border after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:!border-border  peer-focus:after:!border-border">
                  Subject
                </label>
              </div>


              <div className="flex items-center gap-9">
              <div className="border rounded border-border w-[50px]  flex flex-col">
                <div className="h-[28px] bg-white text-text text-[14px] font-work-sans font-medium flex justify-center items-center">
                  {fileLength.length}
                </div>
                {/* <div className="h-[28px] w-full px-3 py-2 bg-border flex justify-center items-center">
                <img src={attachFile} alt="" />
                </div> */}

                <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
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

              <Button className="flex items-center justify-center gap-[10px] w-full">
                <img src={send} alt="" />
                Send Email
                </Button>
              </div>

              </div>


              <div className="rounded border-2 border-border border-dashed p-6 bg-[#FBFBFB] w-[50%] h-[376px] overflow-y-auto flex flex-col gap-[10px]">
              <h1 className="text-text text-[14px] font-work-sans font-semibold">Preview</h1>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {filePreview ? (
                    <DocViewer
                    documents={docs}
                      pluginRenderers={DocViewerRenderers}
                    />
                  ) : (
                    <p>No file selected</p> 
                  )}
                </>
              )}
              </div>


          </div>

          
        </div>
      )}
    </>
    );
};

export default SendEmailModal;