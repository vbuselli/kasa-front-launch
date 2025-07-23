import PaymentSuccess from "@/components/PaymentSuccess";
import { UserVerificationProvider } from "context/UserVerificationContext";
import { DrawerProvider } from "context/DrawerContext";
import { CartProvider } from "context/CartContext";

export default function SuccessPage() {
  return (

    <CartProvider>
      <DrawerProvider>
        <UserVerificationProvider>
          <PaymentSuccess />
        </UserVerificationProvider>
      </DrawerProvider>
    </CartProvider>

  );
}
