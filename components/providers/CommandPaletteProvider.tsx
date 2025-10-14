'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface CommandPaletteContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<
  CommandPaletteContextType | undefined
>(undefined);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      'useCommandPalette must be used within CommandPaletteProvider'
    );
  }
  return context;
}

interface CommandPaletteProviderProps {
  children: ReactNode;
}

export function CommandPaletteProvider({
  children,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}
