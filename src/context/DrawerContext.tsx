"use client";
import AssetTokenDrawerContent from "@/components/AssetTokenDrawerContent";
import Drawer from "@/components/ui/Drawer";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AssetPopulated } from "types/models";

type DrawerContextType = {
  isOpen: boolean;
  openDrawer: (asset?: AssetPopulated) => void;
  closeDrawer: () => void;
  asset_token?: AssetPopulated;
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
  const [assetToken, setAssetToken] = useState<AssetPopulated | undefined>();

  const openDrawer = (asset?: AssetPopulated) => {
    setAssetToken(asset);
    setIsOpen(true);
  };
  const closeDrawer = () => setIsOpen(false);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        asset_token: assetToken,
      }}
    >
      {children}
      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        {assetToken && (
          <AssetTokenDrawerContent
            closeDrawer={closeDrawer}
            assetToken={assetToken}
          />
        )}
      </Drawer>
    </DrawerContext.Provider>
  );
}
