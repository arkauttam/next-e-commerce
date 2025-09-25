import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 mr-3 md:mr-0"
    >
      {/* Logo Image */}
      <Image
        src="/logo.svg"
        width={40}
        height={40}
        alt="brand"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        priority
      />

      {/* Logo Text (hidden on very small screens) */}
      <p
        className="
          hidden xs:block 
          font-bold 
          text-lg sm:text-xl md:text-2xl lg:text-3xl 
          whitespace-nowrap
        "
      >
        e-commerce
      </p>
    </Link>
  );
};

export default Logo;
