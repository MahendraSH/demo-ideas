"use client";

import toast from "react-hot-toast";
import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CopyIcon, EditIcon, MoreHorizontal, Trash } from "lucide-react";
import axios from "axios";

import { CategoryColumns } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";

interface CellActonProps {
  data: CategoryColumns;
}

const CellActon: FC<CellActonProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Category id  copied  to clipbord . ");
  };

  const onDeleteCategory = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categorys/${data.id}`);
      router.refresh();
      setOpen(false);
      toast.success(" BillBord deleted .");
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
        onConform={onDeleteCategory}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="p-0 ">
            <span className="sr-only">open menu </span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopy}>
            <CopyIcon className="h-4 w-4 mr-2 " />
            copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${params.storeId}/billbords/${data.id}`);
            }}
          >
            <EditIcon className="h-4 w-4 mr-2 " />
            update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2 " />
            delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActon;
