'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

const Navbar = () => {
  const pathName = usePathname();
  const [showMobileNav, setMobileNav] = useState<boolean>(false);
  return (
    <>
      <nav className="h-[79px] w-full flex items-center justify-between sm:px-[70px] px-[40px]">
        <Image src="/logo.svg" width={70} height={24} alt="Logo" />
        <Menu className="block sm:hidden cursor-pointer" onClick={() => setMobileNav(true)} />
        <div className="items-center gap-[64px] hidden sm:flex">
          <div
            className={`cursor-pointer border-b-transparent border-b-2 flex items-center justify-center h-[23px] hover:border-b-2 transition-all duration-150 ease-in-out hover:border-b-[#61BFAD] ${pathName === '/' && 'border-b-[#61BFAD] '}`}
          >
            Movies
          </div>
          <div className="cursor-pointer border-b-transparent border-b-2 flex items-center justify-center h-[23px] hover:border-b-2 transition-all duration-150 ease-in-out hover:border-b-[#61BFAD]">
            Tv Shows
          </div>
          <Avatar>
            <AvatarImage className="h-[48px] w-[48px]" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <div
        className={`w-[100vw] h-[100%] fixed top-0 left-0 z-50 bg-white flex flex-col px-5 py-5 gap-8 transform ${showMobileNav ? 'translate-x-[0%]' : 'translate-x-[-100%]'} duration-700 ease-in-out`}
      >
        <div className="flex items-center justify-between">
          <Avatar>
            <AvatarImage className="h-[48px] w-[48px]" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <X onClick={() => setMobileNav(false)} />
        </div>
        <div
          onClick={() => setMobileNav(false)}
          className={`cursor-pointer border-b-transparent border-b-2 flex items-center text-2xl  mt-8 h-[23px] hover:border-b-2 transition-all duration-150 ease-in-out]`}
        >
          Movies
        </div>
        <div
          onClick={() => setMobileNav(false)}
          className="cursor-pointer border-b-transparent border-b-2 flex items-center text-2xl  h-[23px] hover:border-b-2 transition-all duration-150 ease-in-out"
        >
          Tv Shows
        </div>
      </div>
    </>
  );
};

export default Navbar;
