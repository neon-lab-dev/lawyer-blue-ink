import Button from "@/components/reusable/Button";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import arrowleft from "@/assets/images/arrow_back.svg"


// FilePreview Component
const FilePreview = ({ pdfFile, templateName, setTemplateName, onSaveAndUpload }) => {
    return (
        <div className="">
            <div className="py-6">
                <button className=" rounded-[50%] bg-gray-100 p-2">
                    <img src={arrowleft} alt=""/>
                </button>
                <h1 className="pt-8 font-bold text-[16px]">Preview Uploaded Files</h1>
            </div>
            <div className="flex gap-10">
                <div className="p-4 h-[387px] w-[500px] border-gray-600 border-dashed border">
                    <h2>Preview</h2>
                    <div className="h-[300px] w-[420px] p-4 m-4">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js">
                            <Viewer fileUrl={URL.createObjectURL(pdfFile)} />
                        </Worker>
                    </div>
                </div>
                <div className="border-l border-[#3F32CC99] px-10">
                    <div className="flex flex-col gap-6">
                        <span className="text-[16px] font-semibold">Set The Template Name</span>
                        <input
                            type="text"
                            value={templateName}
                            placeholder="Enter to set a File Name"
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="w-[360px] h-[16px] border-gray-800 border-5 rounded-lg p-6"
                        />
                        <div className="flex justify-end">
                            <Button onClick={onSaveAndUpload}>Save and Upload</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilePreview