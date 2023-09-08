"use client";

import { FC, useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConform: () => void;
  loading: boolean;
}

const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConform,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title=" Are you sure ? "
      discription="This action cannot be undone ."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className=" pt-6 space-x-6 flex items-center w-full justify-end ">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConform}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
