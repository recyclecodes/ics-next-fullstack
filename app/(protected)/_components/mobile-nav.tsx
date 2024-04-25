import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { PiSlackLogoBold } from 'react-icons/pi';
import { MdDashboard } from 'react-icons/md';
import { PiBuildingsFill } from "react-icons/pi";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AiOutlineMenuUnfold className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="flex items-start">
          <SheetTitle className="flex items-center space-x-4">
            <PiSlackLogoBold className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            Item Tracker
          </SheetTitle>
          <SheetDescription className="text-xs md:text-sm">
            Empowering seamless item transfers.
          </SheetDescription>
        </SheetHeader>
        <SheetClose className='space-y-6 text-lg mt-10 ml-4'>
          <Link className="flex items-center" href="/dashboard">
            <MdDashboard className='h-4 w-4 mr-4 text-primary' />
            Dashboard 
          </Link>
          <Link className="flex items-center" href="/dashboard">
            <PiBuildingsFill className='h-4 w-4 mr-4 text-primary' />
            Company 
          </Link>
          <Link className="flex items-center" href="/dashboard">
            <MdDashboard className='h-4 w-4 mr-4 text-primary' />
            Dashboard 
          </Link>
          <Link className="flex items-center" href="/dashboard">
            <MdDashboard className='h-4 w-4 mr-4 text-primary' />
            Dashboard 
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
