"use client";

import { useCallback, useState } from "react";
import EmailVerifyForm from "./EmailVerifyForm";


const UserEmailSection = () => {
  return (
    <div className="space-y-5">
      <EmailVerifyForm />
    </div>
  );
};

export default UserEmailSection;
