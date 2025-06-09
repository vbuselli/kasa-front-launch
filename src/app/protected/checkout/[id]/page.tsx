"use client";
import { useEffect, useState } from "react";
import InvestmentCheckoutCard from "@/components/InvestmentCheckoutCard";
import InvestmentDetails from "@/components/InvestmentDetails";
import { AssetPopulated } from "types/models";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

const schema = yup.object().shape({
  transaction_number: yup.string().required("Transaction Number requerido"),
  voucherImage: yup
    .mixed()
    .required("Voucher requerido")
    .test("fileType", "Solo se permiten imágenes (jpg, jpeg, png)", (value) => {
      if (!value) return false;
      const file = (value as FileList)[0] as File;
      return (
        file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      );
    })
    .test("fileSize", "La imagen debe ser menor a 5MB", (value) => {
      if (!value) return false;
      const file = (value as FileList)[0] as File;
      return file && file.size <= 5 * 1024 * 1024;
    }),
  funds_origin: yup.string().required("Origen de los fondos requerido"),
});

export type InvestmentFormValues = yup.InferType<typeof schema>;

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [assetToken, setAssetToken] = useState<AssetPopulated | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const methods = useForm<InvestmentFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchAssetToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/get-my-asset-tokens`,
          {
            next: {
              revalidate: 60,
            },
          }
        );
        if (!res.ok) {
          setError("Error al cargar el proyecto.");
          return;
        }
        const data = await res.json();
        const asset = data.find((token: AssetPopulated) => token.id === id);
        setAssetToken(asset);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error al cargar el proyecto.");
      }
    };
    fetchAssetToken();
  }, [id]);

  const handleInvestment = async (data: InvestmentFormValues) => {
    if (!assetToken) {
      setToast("No se encontró el proyecto.");
      return;
    }

    setLoading(true);
    setToast(null);
    try {
      const formData = new FormData();
      formData.append("asset_token_id", assetToken.id);
      formData.append("transaction_number", data.transaction_number);
      formData.append("funds_origin", data.funds_origin);
      formData.append(
        "voucherImage",
        (data.voucherImage as FileList)[0] as File
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/create-transaction`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create asset token");
      }

      router.push("/protected/success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setToast(err.message || "Ocurrió un error al invertir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-foreground py-8 px-8 lg:py-20 lg:px-12 rounded-tl-[30px] w-full h-full flex-1 flex justify-center items-center">
      {error ? (
        <p className="text-white">{error}</p>
      ) : !assetToken ? (
        <Loader />
      ) : (
        <FormProvider {...methods}>
          <form
            className="grid gap-3 lg:gap-12"
            onSubmit={methods.handleSubmit(handleInvestment)}
            autoComplete="off"
          >
            <div>
              <InvestmentCheckoutCard
                asset_token={assetToken}
                loading={loading}
                toast={toast}
                isButtonDisabled={!methods.formState.isValid}
              />
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
