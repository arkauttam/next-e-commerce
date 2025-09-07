import { createStore } from "zustand";
import { createDetailsSlice, DetailsSlice } from "./detailsSlice";
import { createUtilsSlice, UtilsSlice } from "./utilsSlice";
import { createVerifiedSlice, VerifiedSlice } from "./verifiedSlice";

export type CreateSignupStore = UtilsSlice & VerifiedSlice & DetailsSlice;

export const createSignupStore = () =>
  createStore<CreateSignupStore>()((...args) => ({
    ...createUtilsSlice(...args),
    ...createVerifiedSlice(...args),
    ...createDetailsSlice(...args),
  }));
