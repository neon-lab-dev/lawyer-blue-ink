import { useRef, useState } from 'react';
import Button from '@/components/reusable/Button';
import leftArrow from '../../assets/icons/left-arrow.svg';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const SelectedTemplate = (): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Check if the selected file is an Excel file
        if (file && file.type === 'application/vnd.ms-excel' || file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setSelectedFile(file);
        } else {
            // Reset the file input if the file type is not supported
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setSelectedFile(null);
            alert('Only Excel files are supported.');
        }
    };

    const handleUploadButtonClick = () => {
        // Trigger click event of file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <img className="w-[44px]" src={leftArrow} alt="" />
            <h1 className="text-text text-base font-work-sans font-semibold">Selected Template Preview</h1>

            <div className="flex items-center gap-8">
                <div className="rounded border-2 border-border border-dashed p-6 bg-[#FBFBFB] w-[50%] h-[376px] overflow-y-auto scrollbar-md flex flex-col gap-[10px]">
                    <h1 className="text-text text-[14px] font-work-sans font-semibold">Template_Name</h1>
                    {/* Render the uploaded Excel file using react-doc-viewer */}
                    {selectedFile && (
                        <DocViewer documents={[{ uri: URL.createObjectURL(selectedFile) }]} pluginRenderers={DocViewerRenderers} />
                    )}
                </div>

                <div className="w-[50%] h-[376px] px-10 flex flex-col gap-6 border-l border-[#3F32CC]">
                    <h1 className="text-text text-[14px] font-work-sans font-medium">
                        Continue to upload the selected template for sending the email?
                    </h1>

                    <div className="flex items-center gap-6">
                        <Button variant="secondary" className="text-primary text-base font-work-sans font-medium px-8 py-4">
                            Enter Details
                        </Button>

                        <Button
                            variant="primary"
                            className="text-white text-base font-work-sans font-medium px-8 py-4 border-primary border-[3px]"
                            onClick={handleUploadButtonClick}
                        >
                            Upload
                        </Button>
                    </div>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectedTemplate;
