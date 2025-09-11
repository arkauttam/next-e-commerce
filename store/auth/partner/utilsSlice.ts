import { StateCreator } from "zustand";

export type AllowedModals =
  | "USER_EMAIL"
  | "EMAIL_FORM"
  | "EMAIL_OTP"
  | "DETAILS_FORM";

export type UtilsState = {
  otp: number;
  isModalVisible: boolean;
  visibleModal: AllowedModals;
};

export type UtilsActions = {
  setOtp: (otp: number) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
  setModalState: ({
    visibleModal,
    isModalVisible,
  }: Pick<UtilsState, "visibleModal" | "isModalVisible">) => void;
};

export type UtilsSlice = UtilsState & UtilsActions;

export type CreateUtilsSlice = StateCreator<UtilsSlice, [], [], UtilsSlice>;

export const createUtilsSlice: CreateUtilsSlice = (set) => ({
  otp: 0,
  isModalVisible: false,
  visibleModal: "USER_EMAIL",
  setOtp(otp) {
    return set((state) => ({
      ...state,
      otp,
    }));
  },
  setIsModalVisible(isModalVisible) {
    return set((state) => ({
      ...state,
      isModalVisible,
    }));
  },
  setModalState({ visibleModal, isModalVisible }) {
    return set((state) => ({
      ...state,
      isModalVisible,
      visibleModal,
    }));
  },
});
