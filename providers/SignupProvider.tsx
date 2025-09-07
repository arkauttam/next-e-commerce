"use client";


import { CreateSignupStore, createSignupStore } from "@/store/auth/partner/signupStore";
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useRef,
  useContext,
} from "react";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

type Props = PropsWithChildren;

export type CreateSignupStoreApi = ReturnType<typeof createSignupStore>;
export const CreateSignupStoreContext = createContext<
  CreateSignupStoreApi | undefined
>(undefined);

const SignupProvider: FC<Props> = ({ children }) => {
  const storeRef = useRef<CreateSignupStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSignupStore();
  }
  return (
    <CreateSignupStoreContext.Provider value={storeRef.current}>
      {children}
    </CreateSignupStoreContext.Provider>
  );
};

export const useSignupStore = <T,>(
  selector: (store: CreateSignupStore) => T,
): T => {
  const context = useContext(CreateSignupStoreContext);

  if (!context) {
    throw new Error(
      `useCreateSignupStore must be used within CreateSignupStoreProvider`,
    );
  }

  return useStoreWithEqualityFn(context, selector, shallow);
};

export default SignupProvider;
