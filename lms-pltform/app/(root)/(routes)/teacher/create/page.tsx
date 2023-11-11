"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import toast from "react-hot-toast";

interface CreatePageProps {}

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: " Title  is required ",
    })
    .max(50),
});

const CreatePage: FC<CreatePageProps> = ({}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${res.data.id}`);
      toast.success("Course created . ");
    } catch (error) {
      toast.error(" Some thing went wrong ");
    }
  };
  return (
    <div className="min-h-screen">
      <div className=" max-w-5xl mx-auto flex  md:justify-center md:items-center  p-6 h-full  ">
        <div>
          <h1 className="text-2xl text-primary "> Name your course </h1>
          <p className="text-lg  text-muted-foreground ">
            What would you like to name your course ? Don&apos;t worry you can
            change this later .
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder=" eg: web dev course " {...field} />
                    </FormControl>
                    <FormDescription>Title for the course </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex  items-center gap-x-6">
                <Link href={"/"}>
                  <Button type="button" variant={"ghost"}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
