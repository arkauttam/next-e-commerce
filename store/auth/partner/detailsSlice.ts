import { StateCreator } from "zustand";

export type DetailsState = {
  userType: "AGENT" | "CORPORATE";
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agencyName: string;
  panNumber: string;
  GSTIN: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  password: string;
  confirm_password: string;
};

export type DetailsActions = {
  setUserType: (userType: "AGENT" | "CORPORATE") => void;
  updateDetails: (details: Partial<DetailsState>) => void;
};

export type DetailsSlice = DetailsState & DetailsActions;

export type CreateDetailsSlice = StateCreator<
  DetailsSlice,
  [],
  [],
  DetailsSlice
>;

export const createDetailsSlice: CreateDetailsSlice = (set) => ({
  userType: "AGENT",
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  agencyName: "",
  panNumber: "",
  GSTIN: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  password: "",
  confirm_password: "",
  updateDetails(details) {
    return set((state) => ({
      ...state,
      ...details,
    }));
  },
  setUserType(userType) {
    return set((state) => ({
      ...state,
      userType,
    }));
  },
});
