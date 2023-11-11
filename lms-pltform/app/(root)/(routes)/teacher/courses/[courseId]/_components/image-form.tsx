"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";

interface ImageFormProps {
  initialData: Course;
  courseId: number;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "image is required     ",
  }),
});
const ImageForm: FC<ImageFormProps> = ({ initialData, courseId }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      router.push(`/teacher/courses/${res.data.id}`);
      toast.success("Course image updated  . ");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(" Some thing went wrong ");
    }
  };
  return (
    <div className=" mt-6  shadow-md  rounder-lg  p-4  dark:shadow-secondary ">
      <div className=" font-medium  flex items-center  justify-between ">
        Course image
        <Button variant={"ghost"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing && <> Cancel </>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-5 w-5  mr-2" /> Add image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-5 w-5  mr-2" /> Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {!initialData.imageUrl && (
            <div className=" flex items-center justify-center h-60  bg-primary/20  rounded-md ">
              <ImageIcon className="h-10 w-10  text-primary" />
            </div>
          )}
          {initialData.imageUrl && (
            <div className="aspect-video relative mt-2 ">
              <Image
                src={initialData.imageUrl}
                alt={initialData.title}
                fill
                className=" object-cover rounded-md"
              />
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint={"courseImage"}
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4 ">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
