"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { File, ImageIcon, Pencil, PlusCircle, Trash2Icon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";
import LoaderSpiner from "@/components/ui/loader-spiner";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: number;
}

const formSchema = z.object({
  url: z.string().min(1),
});
const AttachmentForm: FC<AttachmentFormProps> = ({ initialData, courseId }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeletId, setIsDeleId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        `/api/courses/${courseId}/attachments`,
        values
      );
      toast.success("Course  attachements  updated  . ");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(" Some thing went wrong ");
    }
  };

  const deleteAttachment = async (id: number) => {
    try {
      setIsDeleId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      router.refresh();
      toast.success("Course  attachement deleted  . ");
    } catch (error) {
      toast.error("some thing went worng ");
    } finally {
      setIsDeleId(null);
    }
  };

  return (
    <div className=" mt-6  shadow-md  rounder-lg  p-4  dark:shadow-secondary ">
      <div className=" font-medium  flex items-center  justify-between ">
        Course attachments
        <Button variant={"ghost"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing && <> Cancel </>}
          {!isEditing && (
            <>
              <PlusCircle className="h-5 w-5  mr-2" /> Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm  text-primary font-medium italic">
              No attachments
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="spce-y-2 ">
              {initialData.attachments.map((item) => (
                <div
                  className=" flex items-center p-2 w-full bg-primary/10 shadow-md rounded-md gap-y-2 mt-1"
                  key={item.id}
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />{" "}
                  <p className=" line-clamp-1 text-sm">{item.name}</p>
                  <div className=" ml-auto ">
                    {isDeletId === item.id && <LoaderSpiner size={"default"} />}
                    {isDeletId !== item.id && (
                      <Button
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => deleteAttachment(item.id)}
                      >
                        <Trash2Icon className="h-4 w-4   " />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint={"courseAttachment"}
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4 ">
            Added any resource that students might need durinng course .
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
