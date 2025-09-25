"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAuthStore from "@/hooks/auth/useAuthStore";
import SignInForm from "@/components/forms/SignInForm";
import ResetForm from "@/components/forms/ResetForm";
import SignUpForm from "@/components/forms/SignUpForm";

const AuthModal = () => {
  const { openAuthModal, authModalType, setAuthModal } = useAuthStore();

  return (
      <Dialog
        open={openAuthModal}
        onOpenChange={(open) =>
          setAuthModal({ openAuthModal: open, authModalType })
        }
      >
        <DialogContent className="sm:max-w-md">
          {authModalType === "SIGNUP" && <SignUpForm />}
          {authModalType === "LOGIN" && <SignInForm />}
          {authModalType === "RESET" && <ResetForm />}
        </DialogContent>
      </Dialog>
  );
};

export default AuthModal;
