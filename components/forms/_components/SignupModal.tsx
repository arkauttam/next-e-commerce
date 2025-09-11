"use client";
import { type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PiCaretLeft } from "react-icons/pi";
import UserEmailSection from "./UserEmailSection";
import EmailOtpForm from "./EmailOtpForm";
import FinalSubmissionForm from "./FinalSubmissionForm";
import { useSignupStore } from "@/providers/SignupProvider";

type Props = {};

const SignupModal: FC<Props> = ({}) => {
  const {
    visibleModal,
    isModalVisble,
    email,
    phoneNumber,
    setIsModalVisible,
    setModalState,
  } = useSignupStore((state) => ({
    email: state.email,
    phoneNumber: state.phone,
    visibleModal: state.visibleModal,
    isModalVisble: state.isModalVisible,
    setIsModalVisible: state.setIsModalVisible,
    setModalState: state.setModalState,
  }));

  const handleGoBackToUserEmailForm = () => {
    setModalState({ isModalVisible: true, visibleModal: "USER_EMAIL" });
  };


  if (visibleModal === "USER_EMAIL") {
    return (
      <Dialog
        open={isModalVisble}
        onOpenChange={(val) => setIsModalVisible(val)}
      >
        <DialogContent className="max-h-[96%] overflow-y-auto bg-white backdrop-blur-none">
          <h5 className="text-sm font-medium">
            Step <span className="text-[#164880]">1</span> of{" "}
            <span className="text-[#164880]">3</span>
          </h5>
          <UserEmailSection />
        </DialogContent>
      </Dialog>
    );
  }
  if (visibleModal === "EMAIL_OTP") {
    return (
      <Dialog
        open={isModalVisble}
        onOpenChange={(val) => setIsModalVisible(val)}
      >
        <DialogContent className="max-h-[96%] overflow-y-auto bg-white backdrop-blur-none">
          <button
            type="button"
            className="inline-flex h-fit w-fit items-center gap-1 text-sm text-[#164880]"
            onClick={handleGoBackToUserEmailForm}
          >
            <span>
              <PiCaretLeft />
            </span>
            Back
          </button>
          <h5 className="text-sm font-medium">
            Step <span className="text-[#164880]">2</span> of{" "}
            <span className="text-[#164880]">3</span>
          </h5>
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-700">Enter OTP</DialogTitle>
            <DialogDescription>OTP has been sent to {email}</DialogDescription>
          </DialogHeader>
          {/** Email Otp form **/}
          <EmailOtpForm />
        </DialogContent>
      </Dialog>
    );
  }
  if (visibleModal === "DETAILS_FORM") {
    return (
      <Dialog
        open={isModalVisble}
        onOpenChange={(val) => setIsModalVisible(val)}
      >
        <DialogContent className="max-h-[96%] overflow-y-auto rounded-lg bg-white backdrop-blur-none">
          <button
            type="button"
            className="inline-flex h-fit w-fit items-center gap-1 text-sm text-[#164880]"
            onClick={handleGoBackToUserEmailForm}
          >
            <span>
              <PiCaretLeft />
            </span>
            Back
          </button>
          <h5 className="text-sm font-medium">
            Step <span className="text-[#164880]">3</span> of{" "}
            <span className="text-[#164880]">3</span>
          </h5>
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-700">Fill your details</DialogTitle>
            <DialogDescription>
              Please let us know some details about you
            </DialogDescription>
          </DialogHeader>
          <FinalSubmissionForm /> 
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};

export default SignupModal;
