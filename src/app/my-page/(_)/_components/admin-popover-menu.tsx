import Link from "next/link";

import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CircleEllipsis, Copy, Pencil } from "lucide-react";

const AdminPopoverMenu = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <CircleEllipsis size={20} />
        </PopoverTrigger>
        <PopoverContent align="end" className="p-2">
          <Command className="w-full">
            <CommandList>
              <CommandItem>
                <Link href={"/my-page/edit"} className="flex">
                  <Pencil size={16} className="mr-2 h-4 w-4" />
                  <span>プロフィールを編集する</span>
                </Link>
              </CommandItem>
              <CommandItem>
                {/* // TODO: URLをコピーする */}
                <Copy className="mr-2 h-4 w-4" />
                <span>URLをコピーする</span>
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AdminPopoverMenu;
