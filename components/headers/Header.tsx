"use client";
import React, { Suspense } from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import SearchBox from "./SearchBox";
import Cart from "../carts/Cart";
import { ThemeToggle } from "../theme/ThemeToggle";
import AccountPopover from "../account/AccountPopover";
import { Search } from "lucide-react";
import MobileHeader from "./MobileHeader";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMobileSearchModal } from "@/store/mobileSearchStore";

const Header = () => {
  const pathname = usePathname();
  const links = [
    {
      label: "Home",
      link: "/",
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      link: "/shop",
      isActive: pathname.startsWith("/shop"),
    },
  ];

  const { openModal } = useMobileSearchModal();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-3 py-3 sm:px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Navigation (Desktop only) */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-base font-medium">
          {links.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className={cn(
                "px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition",
                link.isActive && "bg-gray-200 dark:bg-gray-800"
              )}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Mobile Search */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={openModal}
          >
            <Search size={22} />
          </button>

          {/* Mobile Account */}
          <div className="lg:hidden">
            <AccountPopover />
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block w-48 xl:w-64">
            <Suspense fallback={<p>Loading...</p>}>
              <SearchBox />
            </Suspense>
          </div>

          {/* Desktop Theme + Account */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <AccountPopover />
          </div>

          {/* Cart (always visible) */}
          <Cart />

          {/* Mobile Hamburger Menu */}
          <MobileHeader />
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
