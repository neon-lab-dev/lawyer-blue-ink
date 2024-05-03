import Modal from "@/components/reusable/Modal";
import task from "@/assets/icons/task.svg";

const EmailSentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={true}
      className="rounded-md h-[450px] w-[450px] p-[24px] pt-[64px]"
    >
      <div className="flex flex-col items-center justify-center w-full h-full border border-dashed border-[#C9C9C9]">
        <img src={task} alt="" />
        <h3 className="text-text/60 text-base font-work-sans font-semibold">
          Email Send to all Successfully!
        </h3>
      </div>
    </Modal>
  );
};
export default EmailSentModal;
