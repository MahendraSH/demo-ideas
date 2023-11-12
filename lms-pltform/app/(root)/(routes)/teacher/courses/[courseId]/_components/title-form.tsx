"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Course } from "@prisma/client";

interface TitleFormProps {
  initialData: Course;
  courseId: number;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required     ",
  }),
});
const TitleForm: FC<TitleFormProps> = ({ initialData, courseId }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course title updated  . ");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(" Some thing went wrong ");
    }
  };
  return (
    <div className=" mt-6  shadow-md  rounder-lg  p-4  dark:shadow-secondary ">
      <div className=" font-medium  flex items-center  justify-between ">
        Course title
        <Button variant={"ghost"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing && <> Cancel </>}
          {!isEditing && (
            <>
              <Pencil className="h-5 w-5  mr-2" /> Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm  text-primary font-medium">
            {initialData.title}
          </p>
        </>
      )}
      {isEditing && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" eg: web dev course "
                        {...field}
                        disabled={isSubmitting}
                        autoFocus
                      />
                    </FormControl>
                    {/* <FormDescription>Title for the course </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex  items-center gap-x-6">
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  save
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default TitleForm;
