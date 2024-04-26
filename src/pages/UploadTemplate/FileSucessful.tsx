import Button from "@/components/reusable/Button";
import task from '@/assets/images/task.svg';
import arrowleft from "@/assets/images/arrow_back.svg";

const FileUploadSuccess = () => {
  const handleGoBack = () => {
    window.history.back(); // Navigate to the previous page in the browser's history
  };

  return (
    <div>
      <div className="py-6">
        {/* Back Button */}
        <button
          className="rounded-[50%] bg-gray-100 p-2"
          onClick={handleGoBack} // Trigger the browser's back navigation
        >
          <img src={arrowleft} alt="Go back" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center h-[400px] w-[390px] border-dashed border border-black gap-10">
          <div className="flex flex-col">
            <img
              src={task}
              alt="Task icon"
              className="w-[64px] h-[80px] mt-[80px] ml-[90px] my-10"
            />
            <span className="text-center">Template Uploaded Successfully</span>
            <div className="flex justify-center py-8">
              <Button>Send Email</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSuccess;
