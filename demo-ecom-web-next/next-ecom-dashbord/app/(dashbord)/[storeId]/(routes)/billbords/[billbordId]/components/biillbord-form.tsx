"use client";

import { Trash } from "lucide-react";
import { FC, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billbord } from "@prisma/client";
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

interface BillbordFormProps {
  intialData: Billbord | null;
}

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().min(3),
});
type settingFormsValues = z.infer<typeof formSchema>;

const BillbordForm: FC<BillbordFormProps> = ({ intialData }) => {
  const title = intialData === null ? "Create Billbord" : "Edit Billbord";
  const discription =
    intialData == null ? " Add a new billbord " : "Edit a billbord ";
  const tostSuccesMessage =
    intialData == null
      ? "billbord created succesfull . "
      : " billbord updated succesfull . ";
  const action = intialData == null ? "Create" : "Save changes";

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<settingFormsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: intialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: settingFormsValues) => {
    try {
      setLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/${params.storeId}/billbords/${params.billbordId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billbords`, data);
      }
      router.refresh();
      toast.success(tostSuccesMessage);
      router.push(`/${params.storeId}/billbords`);
    } catch (error) {
      toast.error(
        " Something when wrong . Billbord  can`t be " + intialData
          ? "updated"
          : "created"
      );
    } finally {
      setLoading(false);
    }
  };

  const onDeleteBillbord = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billbords/${params.billbordId}`
      );
      router.refresh();
      toast.success(" BillBord deleted .");
      router.push(`/${params.storeId}/billbords`);
    } catch (error) {
      toast.error(
        " Something when wrong . billbord can`t be deleted ,   recover all catagorys "
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
        onConform={onDeleteBillbord}
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Background Image </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange("")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className=" grid grid-cols-3 gap-8 ">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Label </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billbord label "
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

export default BillbordForm;
