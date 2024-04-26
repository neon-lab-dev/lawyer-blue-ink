import { useDropzone } from 'react-dropzone';
import '@react-pdf-viewer/core/lib/styles/index.css';
import uploadIcon from "@/assets/images/cloud_upload.svg";

// FileDrop Component
const FileDrop = ({ onFilesUpload }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
        },
        onDrop: (acceptedFiles) => {
            onFilesUpload(acceptedFiles);
        },
    });

    const dropzoneStyle = `
    border-2 
    border-dashed 
    rounded-md 
    p-4 
    transition-all 
    bg-[#FBFBFB] 
    border-[#C9C9C9] 
    ${isDragActive ? 'bg-blue-100 border-blue-500' : ''}
    flex 
    flex-col 
    items-center 
    justify-center
    h-[300px]
    m-4
    w-[847px]
  `;

    return (
        <div {...getRootProps()} className={dropzoneStyle}>
            <input {...getInputProps()} />
            <div className="text-center text-black">
                {isDragActive ? (
                    <p>Drop files here...</p>
                ) : (
                    <div>
                        <h1 className="text-[18px] font-work-sans font-semibold mb-4">Preview Upload File</h1>
                        <div className='flex flex-col gap-6'>
                            <div className='flex justify-center'>
                                <img src={uploadIcon} alt="Upload Icon" />
                            </div>
                            <p>Drag & drop PDF files here, or click to upload.</p>
                            <span className='text-center text-[#0098EA] font-semibold text-[16px]'>
                                Select a file
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default FileDrop

