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
import { cn } from "@/lib/utils";
import Combobox from "@/components/ui/combobox";

interface CategoryIdFormProps {
  initialData: Course;
  courseId: number;
  options: { label: string; value: number }[];
}

const formSchema = z.object({
  categoryId: z.coerce.number(),
});
const CategoryIdForm: FC<CategoryIdFormProps> = ({ initialData, courseId  ,options}) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      router.push(`/teacher/courses/${res.data.id}`);
      toast.success("Course categoryId updated  . ");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(" Some thing went wrong ");
    }
  };
  return (
    <div className=" mt-6  shadow-md  rounder-lg  p-4  dark:shadow-secondary ">
      <div className=" font-medium  flex items-center  justify-between ">
        Course categoryId
        <Button variant={"ghost"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing && <> Cancel </>}
          {!isEditing && (
            <>
              <Pencil className="h-5 w-5  mr-2" /> Edit categoryId
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p
            className={cn(
              "text-sm  text-primary font-medium",
              !initialData.categoryId && "italic"
            )}
          >
            {initialData.categoryId}
            {!initialData.categoryId && <>no categoryId</>}
          </p>
        </>
      )}
      {isEditing && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>categoryId</FormLabel>
                    <FormControl>
                    <Combobox options={[...options]}  {...field} />
                    </FormControl>
                    {/* <FormDescription>categoryId for the course </FormDescription> */}
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

export default CategoryIdForm;
