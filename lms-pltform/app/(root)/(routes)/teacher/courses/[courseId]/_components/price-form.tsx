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
import { formatPrice } from "@/lib/formates";

interface PriceFormProps {
  initialData: Course;
  courseId: number;
}

const formSchema = z.object({
  price: z.coerce.number(),
});
const PriceForm: FC<PriceFormProps> = ({ initialData, courseId }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course price updated  . ");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(" Some thing went wrong ");
    }
  };
  return (
    <div className=" mt-6  shadow-md  rounder-lg  p-4  dark:shadow-secondary ">
      <div className=" font-medium  flex items-center  justify-between ">
        Course price
        <Button variant={"ghost"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing && <> Cancel </>}
          {!isEditing && (
            <>
              <Pencil className="h-5 w-5  mr-2" /> Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p
            className={cn(
              "text-sm  text-primary font-medium",
              !initialData.price && "italic"
            )}
          >
            {initialData.price && formatPrice(initialData.price)}
            {!initialData.price && <>no price</>}
          </p>
        </>
      )}
      {isEditing && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" eg: web dev course "
                        {...field}
                        disabled={isSubmitting}
                        autoFocus
                      />
                    </FormControl>
                    {/* <FormDescription>price for the course </FormDescription> */}
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

export default PriceForm;
