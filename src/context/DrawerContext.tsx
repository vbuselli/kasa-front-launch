"use client";
import Drawer from "@/components/ui/Drawer";
import React, { createContext, useContext, useState, ReactNode } from "react";

type DrawerContextType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context)
    throw new Error("useDrawer must be used within a DrawerProvider");
  return context;
}

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
      <Drawer isOpen={isOpen} onClose={closeDrawer} />
    </DrawerContext.Provider>
  );
}
