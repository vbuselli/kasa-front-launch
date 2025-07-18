import PaymentSuccess from "@/components/PaymentSuccess";
import { UserVerificationProvider } from "context/UserVerificationContext";

export default function SuccessPage() {
  return (
    <>
    <UserVerificationProvider>
      <PaymentSuccess />
    </UserVerificationProvider>
      
    </>
  );
}
