import { StateCreator } from "zustand";

export type VerifiedState = {
  panVerified: boolean;
  gstVerified: boolean;
  emailVerified: boolean;
  mobileVerified: boolean;
};

export type VerifiedActions = {
  setVerified: (option: Partial<VerifiedState>) => void;
};

export type VerifiedSlice = VerifiedState & VerifiedActions;
export type CreateVerifiedSlice = StateCreator<
  VerifiedSlice,
  [],
  [],
  VerifiedSlice
>;

export const createVerifiedSlice: CreateVerifiedSlice = (set) => ({
  panVerified: false,
  gstVerified: false,
  emailVerified: false,
  mobileVerified: false,
  setVerified(option) {
    return set((state) => ({
      ...state,
      ...option,
    }));
  },
});
