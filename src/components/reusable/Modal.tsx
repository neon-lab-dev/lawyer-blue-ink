import React, { useEffect } from "react";
import close from "@/assets/icons/close.svg";
import { twMerge } from "tailwind-merge";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  children: React.ReactNode;
  showCloseButton?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  showCloseButton = false,
  className,
  ...props
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <>
      <div
        style={{
          display: isOpen ? "block" : "none",
        }}
        className="fixed inset-0 bg-black backdrop-blur-md opacity-40 z-40 bg-opacity-50 w-screen h-screen"
        onClick={() => onClose(false)}
      />
      <div
        style={{
          display: isOpen ? "block" : "none",
        }}
        className={twMerge(
          "fixed top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 bg-background px-9 py-5 rounded-xl",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            className="absolute top-4 right-4"
            onClick={() => onClose(false)}
          >
            <img src={close} className="h-5 w-5" alt="close" />
          </button>
        )}
      </div>
    </>
  );
};
export default Modal;
