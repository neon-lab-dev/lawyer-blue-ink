//@ts-nocheck

import { useEffect, useRef, useState } from "react";
import attachEmail from "../../assets/icons/attach_email.svg";
import attachFile from "../../assets/icons/attach_file.svg";
import send from "../../assets/icons/send.svg";
import SendEmailModal from "./SendEmailModal";

const ExcelSheet = () => {
    const fileInputRef = useRef(null);
    const [filePreview, setFilePreview] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    console.log(filePreview);

    const handleAttachFileClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        console.log(filePreview);
    }, [filePreview])

    // const handleFileInputChange = (e) => {
    //     const files = e.target.files[0];
    //     // console.log(files);
    //     setLoading(true);
    //     // console.log('Files uploaded:', files);

    //     if (files.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    //         setFilePreview(files);
    //     } else {
    //         setFilePreview(null);
    //         console.log("file not available");
    //     }

    //     setLoading(false); 
    // };



    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };
    

    // Modal functionality
    const handleModal = (): void => {
      setIsModalOpen(!isModalOpen)
    }


    

    
    return (
        <div className='overflow-x-scroll'>

            
            <table className="table-auto border-collapse">
            <thead>
                <tr className="text-text text-[14px] font-work-sans font-medium">
                    <th className="border px-3 py-4">Trademark Application Number</th>
                    <th className="border px-3 py-4">Trademark Name</th>
                    <th className="border px-3 py-4">Class</th>
                    <th className="border px-3 py-4">Client Name</th>
                    <th className="border px-3 py-4">Cost Involved</th>
                    <th className="border px-3 py-4">Time for Execution of work</th>
                    <th className="border px-3 py-4">Email Id of Client</th>
                    <th className="border px-3 py-4">Whatsapp Number</th>
                    <th className="border px-3 py-4">Add CC Emails</th>
                    <th className="border px-3 py-4">Attach Files</th>
                    <th className="border px-3 py-4">Send Email</th>
                </tr>
            </thead>
            <tbody>
                <tr className="text-gray text-[15px] font-work-sans font-normal">
                    <td className="border px-3 py-4">123456</td>
                    <td className="border px-3 py-4">Trademark Name</td>
                    <td className="border px-3 py-4">20</td>
                    <td className="border px-3 py-4">Shri Jawahar Lal Lamba</td>
                    <td className="border px-3 py-4">25,00,000</td>
                    <td className="border px-3 py-4">2 years</td>
                    <td className="border px-3 py-4">Shrijawahar  lamba@gmail.com</td>
                    <td className="border px-3 py-4">+91 98888 55825</td>
                    <td className="border px-3 py-4"><img className="cursor-pointer" src={attachEmail} alt="" /></td>
                    
                    <td className="border px-3 py-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileInputChange}
                            />
                            <img
                                className="cursor-pointer"
                                src={attachFile}
                                alt=""
                                onClick={handleAttachFileClick}
                            />
                        </td>
                    <td onClick={handleModal} className="border px-3 py-4"><img className="cursor-pointer" src={send} alt="" /></td>
                </tr>
            </tbody>
        </table>

        <SendEmailModal loading={loading} filePreview={filePreview} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
    );
};

export default ExcelSheet;
