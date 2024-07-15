import { create } from 'zustand'
import { type User } from '../types/user.type';
import { persist, createJSONStorage } from 'zustand/middleware'


interface State {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useUserStore  = create<State>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
