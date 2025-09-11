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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { ImSpinner2 } from "react-icons/im";
import { cn } from "@/lib/utils";
import useAuthStore from "@/hooks/auth/useAuthStore";
import { Button } from "../ui/button";
import { useAxiosAuth } from "@/hooks/api/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import customFetch from "@/services/customFetch";
import { toast } from "sonner";
import QUERY_KEYS from "@/constants/queryKeys";

const AccountPopover = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const axiosProtected = useAxiosAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, setAuthModal, user, setUserLoggedOut, isLoading: isAuthLoading } = useAuthStore();
  console.log("isAuthenticated",isAuthenticated)
  const { mutateAsync: logoutMutation } = useMutation({
    mutationKey: [QUERY_KEYS.AUTH.LOGOUT],
    mutationFn: async (body: any) => {
      const { data, error } = await customFetch<any, any>({
        axiosInstance: axiosProtected,
        url: "/accounts/logout/",
        method: "POST",
        body,
      });
      if (error) throw new Error(error);
      return data;
    },
    onMutate() {
      setIsLoading(true);
    },
  });

  const handleLogout = async () => {
    const refresh = getCookie("refresh");
    logoutMutation(
      {refresh: refresh },
      {
        onSuccess() {
          deleteCookie("refresh");
          setUserLoggedOut();
          toast.success("Logged out successfully");
          router.push("/");
        },
        onError(error) {
          toast.error(error?.message);
        },
        onSettled() {
          setIsLoading(false);
        },
      },
    );
  };
  const userLinks = [
    {
      link: "/my-account",
      label: "My Account",
      icon: <User />,
      isActive: pathname.includes("/my-account"),
    },
    {
      link: "/wishlist",
      label: "Wishlist",
      icon: <Heart />,
      isActive: pathname.includes("/wishlist"),
    },
    {
      link: "/my-orders",
      label: "My Orders",
      icon: <ListOrdered />,
      isActive: pathname.includes("/my-orders"),
    },
    {
      link: "/help",
      label: "Help",
      icon: <HelpCircle />,
      isActive: pathname.includes("/help"),
    },
  ];

  return (
    <div>
      <Popover>
        <PopoverTrigger className="flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 p-2 rounded-md">
          {isAuthenticated ? (
            <span>Hi, {user?.first_name || "Guest"}</span>
          ) : (
            <User size={25} />
          )}
        </PopoverTrigger>
        <PopoverContent className="rounded-2xl">
          {isAuthenticated ? (
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

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-start gap-2 p-2 bg-transparent hover:opacity-50">
                    <LogOut size={16} />
                    Logout
                  </button>
                </DialogTrigger>
                <DialogContent className="hover:bg-gray-200 dark:hover:bg-gray-900 duration-200 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>You will be logged out</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="secondary"
                      onClick={handleLogout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ImSpinner2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Log out"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ul>
          ) : (
            <ul className="space-y-1 text-center">
              {/* Signup */}
              <li>
                <button
                  className="flex items-center justify-center gap-2 p-2 bg-transparent hover:opacity-50"
                  onClick={() =>
                    setAuthModal({
                      openAuthModal: true,
                      authModalType: "SIGNUP",
                    })
                  }
                >
                  <UserPlus size={16} />
                  Sign Up
                </button>
              </li>

              <Separator className="!my-2" />

              {/* Login */}
              <li>
                <button
                  className="flex items-center justify-center gap-2 p-2 bg-transparent hover:opacity-50"
                  onClick={() =>
                    setAuthModal({
                      openAuthModal: true,
                      authModalType: "LOGIN",
                    })
                  }
                >
                  <LogIn size={16} />
                  Log In
                </button>
              </li>
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountPopover;
