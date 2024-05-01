import { useState } from "react";
import { Link } from "react-router-dom";
import arrowleft from "@/assets/images/arrow_back.svg";
import email from "@/assets/icons/addEmail.svg";
import attach from "@/assets/icons/attach.svg";
import send from "@/assets/icons/send.svg";

const SendEmail = () => {
  const [, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
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
      clientEmail: "example@example.com",
      whatsappNumber: "+123456789",
    },
    {
      appNumber: "67890",
      trademarkName: "BrandY",
      class: "Class B",
      clientName: "Jane Smith",
      costInvolved: "$200",
      executionTime: "3 days",
      clientEmail: "example@example.com",
      whatsappNumber: "+987654321",
    },
  ];

  return (
    <div className="px-4 py-6">
      <button onClick={() => window.history.back()} className="rounded-full bg-gray-100 p-2">
        <img src={arrowleft} alt="Go back" />
      </button>

      <h1 className="font-semibold text-16px my-4">Excel Sheet</h1>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-11 bg-[#F3F3F3] font-bold text-center">
          {/* Table Headers */}
          <div className="border p-2">Trademark Application Number</div>
          <div className="border p-2">Trademark Name</div>
          <div className="border p-2">Class</div>
          <div className="border p-2">Client Name</div>
          <div className="border p-2">Cost Involved</div>
          <div className="border p-2">Execution Time</div>
          <div className="border p-2">Client Email</div>
          <div className="border p-2">WhatsApp Number</div>
          <div className="border p-2">Add CC Emails</div>
          <div className="border p-2">Attach Files</div>
          <div className="border p-2">Send Email</div>
        </div>

        {tableData.map((row, index) => (
          <div className="grid grid-cols-11 text-center" key={index}>
            {/* Table Data */}
            <div className="border p-2">{row.appNumber}</div>
            <div className="border p-2">{row.trademarkName}</div>
            <div className="border p-2">{row.class}</div>
            <div className="border p-2">{row.clientName}</div>
            <div className="border p-2">{row.costInvolved}</div>
            <div className="border p-2">{row.executionTime}</div>
            <div className="border p-2">{row.clientEmail}</div>
            <div className="border p-2">{row.whatsappNumber}</div>
            <div className="border p-2"><img src={email} alt="" /></div>
            <div className="border p-2">
              <label htmlFor={`file-upload-${index}`}>
                <img src={attach} alt="Attach file" />
              </label>
              <input
                type="file"
                id={`file-upload-${index}`}
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="border p-2">
              <Link
                to={{
                  pathname: "/send",
                }}
              >
                <img src={send} alt="Send Email" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendEmail;
