import { create } from "zustand";
import { persist } from "zustand/middleware";
const useRequestStore = create(
  persist(
    (set) => ({
      requests: [],
      addRequest: (request) =>
        set((state) => ({
          requests: [...state.requests, request],
        })),
      removeAllRequests: () =>
        set(() => ({
          requests: [],
        })),
    }),
    {
      name: "request-store",
      getStorage: () => localStorage,
      partialize: (state) => ({ r: state.requests }),
    }
  )
);
export default useRequestStore;
