import  { useState } from "react";
import arrowleft from "@/assets/images/arrow_back.svg";
import email from "@/assets/icons/addEmail.svg";
import attach from "@/assets/icons/attach.svg";
import send from "@/assets/icons/send.svg";
import { Link } from "react-router-dom";

const SendEmail = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);


  const handleGoBack = () => {
    window.history.back(); // Navigate to the previous page in the browser's history
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { // Check if there are files selected
      const files = Array.from(e.target.files); // Convert FileList to an array
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Add files to state
    }
  };

  const tableData = [
    {
      appNumber: "12345",
      trademarkName: "BrandX",
      class: "Class A",
      clientName: "John Doe",
      costInvolved: "$100",
      executionTime: "2 days",
      clientEmail: "example.com",
      whatsappNumber: "+123456789",
      attachFiles: "",
      sendEmail: "Send",
    },
    {
      appNumber: "67890",
      trademarkName: "BrandY",
      class: "Class B",
      clientName: "Jane Smith",
      costInvolved: "$200",
      executionTime: "3 days",
      clientEmail: "example.com",
      whatsappNumber: "+987654321",
      attachFiles: "",
      sendEmail: "Send",
    },
  ];

  return (
    <div className="px-4 py-6">
      <button className="rounded-full bg-gray-100 p-2" onClick={handleGoBack}>
        <img src={arrowleft} alt="Go back" />
      </button>

      <h1 className="font-work-sans text-[#000000DE] font-semibold text-[16px] my-4">Excel Sheet</h1>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-11 bg-[#F3F3F3] font-work-sans text-center text-[14px] font-bold">
          <div className="border border-[#0000001A] p-2">Trademark Application Number</div>
          <div className="border border-[#0000001A] p-2">Trademark Name</div>
          <div className="border border-[#0000001A] p-2">Class</div>
          <div className="border border-[#0000001A] p-2">Client Name</div>
          <div className="border border-[#0000001A] p-2">Cost Involved</div>
          <div className="border border-[#0000001A] p-2">Execution Time</div>
          <div className="border border-[#0000001A] p-2">Client Email</div>
          <div className="border border-[#0000001A] p-2">WhatsApp Number</div>
          <div className="border border-[#0000001A] p-2">Add CC Emails</div>
          <div className="border border-[#0000001A] p-2">Attach Files</div>
          <div className="border border-[#0000001A] p-2">Send Email</div>
        </div>

        {tableData.map((row, index) => (
          <div className="grid grid-cols-11 font-work-sans text-[14px] text-center" key={index}>
            <div className="border border-[#0000001A] p-2">{row.appNumber}</div>
            <div className="border border-[#0000001A] p-2">{row.trademarkName}</div>
            <div className="border border-[#0000001A] p-2">{row.class}</div>
            <div className="border border-[#0000001A] p-2">{row.clientName}</div>
            <div className="border border-[#0000001A] p-2">{row.costInvolved}</div>
            <div className="border border-[#0000001A] p-2">{row.executionTime}</div>
            <div className="border border-[#0000001A] p-2">{row.clientEmail}</div>
            <div className="border border-[#0000001A] p-2">{row.whatsappNumber}</div>
            <div className="border border-[#0000001A] p-2"><img src={email} alt="" /></div>
            <div className="border border-[#0000001A] p-2">
              <label htmlFor={`file-upload-${index}`}>
                <img src={attach} alt="Attach file" />
              </label>
              <input
                type="file"
                id={`file-upload-${index}`}
                multiple // Allows multiple file uploads
                className="hidden" // Hides the default file input UI
                onChange={handleFileChange}
              />
            </div>
            <div className="border border-[#0000001A] p-2"><Link to="/"><img src={send} alt="" /></Link></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendEmail;
