"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAuthStore from "@/hooks/auth/useAuthStore";
import SignUpForm from "@/components/forms/SignUpForm";
import SignInForm from "@/components/forms/SignInForm";

const AuthModal = () => {
  const { openAuthModal, authModalType, setAuthModal } = useAuthStore();

  return (
    <Dialog
      open={openAuthModal}
      onOpenChange={(open) => {
        setAuthModal({ openAuthModal: open, authModalType });
      }}
    >
      <DialogContent className="sm:max-w-md">
        {authModalType === "SIGNUP" && <SignUpForm />}
        {authModalType === "LOGIN" && <SignInForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
