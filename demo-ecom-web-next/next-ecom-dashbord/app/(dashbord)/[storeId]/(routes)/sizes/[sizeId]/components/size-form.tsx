"use client";

import { Trash } from "lucide-react";
import { FC, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

interface SizeFormProps {
  intialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(3),
  value: z.string().min(1),
});
type settingFormsValues = z.infer<typeof formSchema>;

const SizeForm: FC<SizeFormProps> = ({ intialData }) => {
  const title = intialData === null ? "Create Size" : "Edit Size";
  const discription = intialData == null ? " Add a new Size " : "Edit a Size ";
  const tostSuccesMessage =
    intialData == null
      ? "Size created succesfull . "
      : " Size updated succesfull . ";
  const action = intialData == null ? "Create" : "Save changes";

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<settingFormsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: intialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: settingFormsValues) => {
    try {
      setLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      router.refresh();
      toast.success(tostSuccesMessage);
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error(
        " Something when wrong . Size  can`t be " + intialData
          ? "updated"
          : "created"
      );
    } finally {
      setLoading(false);
    }
  };

  const onDeleteSize = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      toast.success(" Size deleted .");
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error(
        " Something when wrong . Size can`t be deleted ,   recover all products "
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConform={onDeleteSize}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={discription} />
        {intialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 " />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-8 w-full"
        >
          <div className=" grid grid-cols-3 gap-8 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size Name  "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Value </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
