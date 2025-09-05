"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Heart,
  HelpCircle,
  ListOrdered,
  LogOut,
  User,
  UserPlus,
  LogIn,
  Globe, // ✅ Globe icon from lucide-react
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";
import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";


import { cn } from "@/lib/utils";

const AccountPopover = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(false);

  const userLinks = [
    {
      link: "/my-account",
      label: "My Account",
      icon: <User size={16} />,
      isActive: pathname.includes("/my-account"),
    },
    {
      link: "/wishlist",
      label: "Wishlist",
      icon: <Heart size={16} />,
      isActive: pathname.includes("/wishlist"),
    },
    {
      link: "/my-orders",
      label: "My Orders",
      icon: <ListOrdered size={16} />,
      isActive: pathname.includes("/my-orders"),
    },
    {
      link: "/help",
      label: "Help",
      icon: <HelpCircle size={16} />,
      isActive: pathname.includes("/help"),
    },
  ];

  return (
    <div className="hidden lg:block">
      <Popover>
        <PopoverTrigger className="flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 p-2 rounded-md">
          <User size={25} />
        </PopoverTrigger>

        <PopoverContent className="relative overflow-hidden rounded-2xl w-64">
          {isLogin ? (
            <ul className="space-y-1 text-center">
              <UserAvatar />
              <Separator className="!my-2" />
              {userLinks.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  className={cn(
                    "flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md",
                    link.isActive && "bg-gray-200 dark:bg-gray-800"
                  )}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
              <Separator className="!my-2" />
              <button className="flex items-center justify-center gap-2 p-2 bg-transparent hover:opacity-50 w-full">
                <LogOut size={16} />
                Logout
              </button>
            </ul>
          ) : (
            <ul className="space-y-1 text-center">
              {/* Signup Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center gap-2 p-2 bg-transparent hover:opacity-50 w-full">
                    <UserPlus size={16} />
                    SignUp
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                  </DialogHeader>
                  <SignUpForm />
                </DialogContent>
              </Dialog>

              <Separator className="!my-2" />

              {/* Login Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center gap-2 p-2 bg-transparent hover:opacity-50 w-full">
                    <LogIn size={16} />
                    LogIn
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                  </DialogHeader>
                  <SignInForm />
                </DialogContent>
              </Dialog>
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountPopover;
