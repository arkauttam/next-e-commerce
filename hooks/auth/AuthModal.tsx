"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAuthStore from "@/hooks/auth/useAuthStore";
import SignUpForm from "@/components/forms/SignUpForm";
import SignInForm from "@/components/forms/SignInForm";
import SignupProvider from "@/providers/SignupProvider";
import ResetForm from "@/components/forms/ResetForm";

const AuthModal = () => {
  const { openAuthModal, authModalType, setAuthModal } = useAuthStore();

  return (
    <SignupProvider>

      <Dialog
        open={openAuthModal}
        onOpenChange={(open) => {
          setAuthModal({ openAuthModal: open, authModalType });
        }}
      >
        <DialogContent className="sm:max-w-md">
          {authModalType === "SIGNUP" && <SignUpForm />}
          {authModalType === "LOGIN" && <SignInForm />}
          {authModalType === "RESET" && <ResetForm />}

        </DialogContent>
      </Dialog>
    </SignupProvider>

  );
};

export default AuthModal;
