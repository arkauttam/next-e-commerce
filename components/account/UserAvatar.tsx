import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/hooks/auth/useAuthStore";

const UserAvatar = () => {
  const { user} = useAuthStore();
console.log("user",user)
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-lg">Welcome,</h2>
        <p className="font-semibold">{user?.first_name}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
