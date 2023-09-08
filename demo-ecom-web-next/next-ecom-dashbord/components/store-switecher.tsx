"use client";

import { FC, useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandList,
} from "@/components/ui/command";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ className, items = [] }) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(params.storeId);
  const onSelectStore = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {params.storeId
            ? formatedItems.find((item) => item.value === value)?.label
            : "Select Stores..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Stores..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Stores">
              {formatedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onSelectStore(item)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />

                  {item.label}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup >
              <CommandItem
              onSelect={ ()=>{
                setOpen(false)
                storeModal.onOpen();
              }}
              >
                <PlusCircle 
                className="h-5 w-5 mr-2 "
                />
                Create Store

              </CommandItem>
            
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
