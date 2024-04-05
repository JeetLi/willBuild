// import React, { FC, ReactNode, MouseEvent } from "react";

// // Define the component props type
// interface ModalProps {
//   outClick?: () => void;
//   children?: ReactNode;
//   closeModal?: () => void;
// }

// // Define the component using Function Component (FC) type from React
// const Modal: FC<ModalProps> = ({ closeModal, outClick, children }) => {
//   // Handler to call the outClick prop if the click is on the modal background
//   const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       outClick?.();
//     }
//   };

//   return (
//     <div className="modal" onClick={handleBackgroundClick}>
//       <div className="modal__inner">{children}</div>
//     </div>
//   );
// };

// // Export the component
// export default Modal;
import React, { FC, ReactNode, MouseEvent, forwardRef } from "react";

interface ModalProps {
  children?: ReactNode;
  closeModal: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ closeModal, children }, ref) => {
    const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    return (
      <div className="modal" onClick={handleBackgroundClick} ref={ref}>
        <div className="modal__inner">{children}</div>
      </div>
    );
  }
);

export default Modal;
