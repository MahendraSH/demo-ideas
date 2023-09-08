"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

interface ModalProps {
  title: string;
  discription: string;
  onClose: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

const Modal: FC<ModalProps> = ({
  title,
  discription,
  isOpen,
  onClose,
  children,
}) => {
  const onChage = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChage}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {title} </DialogTitle>
          <DialogDescription> {discription} </DialogDescription>
        </DialogHeader>
        <div className="">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
