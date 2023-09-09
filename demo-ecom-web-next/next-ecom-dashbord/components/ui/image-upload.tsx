"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <div className="md-4 flex items-center gap-4 ">
        {value.map((item) => (
          <div
            key={item}
            className=" relative w-[200px] h-[200px] rounded-md  overflow-hidden  "
          >
            <div className="z-10 absolute top-2  right-2 ">
              <Button
                variant={"destructive"}
                size={"icon"}
                type="button"
                onClick={() => onRemove(item)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover " alt="image" src={item} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xlt40hzr">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlusIcon className="h-4 w-4  mr-2" />
                upload an image 
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
