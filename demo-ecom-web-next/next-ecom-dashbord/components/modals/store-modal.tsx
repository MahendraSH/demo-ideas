"use client";
import { FC } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface StoreModalProps {}

const StoreSchema = z.object({
  name: z.string().min(3),
});

const StoreModal: FC<StoreModalProps> = ({}) => {
  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof StoreSchema>) => {
    console.log(values);
  };

  const storeModalStore = useStoreModal();
  return (
    <Modal
      title={"create store "}
      discription={"Add a new store to mannage products and Categories"}
      isOpen={storeModalStore.isOpen}
      onClose={storeModalStore.onClose}
    >
      <div>
        <div className=" space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button variant={"outline"} onClick={storeModalStore.onClose}>
                  {" "}
                  Cancel{" "}
                </Button>
                <Button type="submit"> Continue </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
