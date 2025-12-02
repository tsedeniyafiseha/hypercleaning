"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";
import { SessionProvider, useSession } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/features/carts/cartsSlice";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const { store, persistor } = makeStore();

  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate
          loading={
            <div className="flex items-center justify-center h-96">
              <SpinnerbLoader className="w-10 border-2 border-gray-300 border-r-gray-600" />
            </div>
          }
          persistor={persistor}
        >
          <CartSyncWrapper />
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

// Wrapper component to use hooks inside Provider
function CartSyncWrapper() {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear cart when user logs out
    if (status === "unauthenticated") {
      dispatch(clearCart());
    }
  }, [status, dispatch]);

  return null;
}

export default Providers;
