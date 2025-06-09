"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  document_type: yup.string().required("Tipo de documento requerido"),
  document_number: yup.string().required("Número de documento requerido"),
  names_first: yup.string().required("Nombres requeridos"),
  names_last: yup.string().required("Apellidos requeridos"),
  gender: yup.string().oneOf(["male", "female"]).required("Género requerido"),
  nationality: yup.string().required("Nacionalidad requerida"),
  address: yup.string().required("Dirección requerida"),
  country: yup.string().required("País requerido"),
  region: yup.string().required("Región requerida"),
  cci: yup.string().required("CCI requerido"),
  account_number: yup.string().required("Número de cuenta requerido"),
  front: yup
    .mixed()
    .required("Imagen frontal requerida")
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
  back: yup
    .mixed()
    .required("Imagen posterior requerida")
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
  phone_number: yup.string().required("Celular requerido"),
});

type FormValues = yup.InferType<typeof schema>;

export default function ValidateIdentityPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "front" || key === "back") {
          if (value && (value as FileList).length > 0) {
            formData.append(key, (value as FileList)[0]);
          }
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/validate-identity`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Error enviando datos");
      router.push("/protected/portfolio");
      reset();
    } catch (e) {
      setResult("Error enviando datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto py-10 bg-foreground px-8 rounded-tl-[30px] flex-1 flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl font-bold mb-6 text-white">Validar Identidad</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 bg-background p-6 rounded-lg shadow max-w-3xl flex flex-col justify-center items-center w-full"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 w-full">
            <div>
              <label htmlFor="document_type" className="block mb-1 font-medium">
                Tipo de documento
              </label>
              <select
                id="document_type"
                {...register("document_type")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Selecciona</option>
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
              {errors.document_type && (
                <span className="text-red-500 text-xs">
                  {errors.document_type.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="document_number"
                className="block mb-1 font-medium"
              >
                Número de documento
              </label>
              <input
                id="document_number"
                type="text"
                {...register("document_number")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.document_number && (
                <span className="text-red-500 text-xs">
                  {errors.document_number.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="names_first" className="block mb-1 font-medium">
                Nombres
              </label>
              <input
                id="names_first"
                type="text"
                {...register("names_first")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.names_first && (
                <span className="text-red-500 text-xs">
                  {errors.names_first.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="names_last" className="block mb-1 font-medium">
                Apellidos
              </label>
              <input
                id="names_last"
                type="text"
                {...register("names_last")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.names_last && (
                <span className="text-red-500 text-xs">
                  {errors.names_last.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="block mb-1 font-medium">
                Género
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Selecciona</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-xs">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="phone_number" className="block mb-1 font-medium">
                Celular
              </label>
              <input
                id="phone_number"
                type="text"
                {...register("phone_number")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.phone_number && (
                <span className="text-red-500 text-xs">
                  {errors.phone_number.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="address" className="block mb-1 font-medium">
                Dirección
              </label>
              <input
                id="address"
                type="text"
                {...register("address")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="nationality" className="block mb-1 font-medium">
                Nacionalidad
              </label>
              <input
                id="nationality"
                type="text"
                {...register("nationality")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.nationality && (
                <span className="text-red-500 text-xs">
                  {errors.nationality.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="country" className="block mb-1 font-medium">
                País
              </label>
              <input
                id="country"
                type="text"
                {...register("country")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.country && (
                <span className="text-red-500 text-xs">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="region" className="block mb-1 font-medium">
                Región
              </label>
              <input
                id="region"
                type="text"
                {...register("region")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.region && (
                <span className="text-red-500 text-xs">
                  {errors.region.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="front" className="block mb-1 font-medium">
                Foto frontal del documento
              </label>
              <input
                id="front"
                type="file"
                accept="image/*"
                {...register("front")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.front && (
                <span className="text-red-500 text-xs">
                  {errors.front.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="back" className="block mb-1 font-medium">
                Foto posterior del documento
              </label>
              <input
                id="back"
                type="file"
                accept="image/*"
                {...register("back")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.back && (
                <span className="text-red-500 text-xs">
                  {errors.back.message}
                </span>
              )}
            </div>
          </div>

          {/* Banking Information Section */}
          <div className="w-full pt-6 mt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Información Bancaria
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 w-full">
              <div>
                <label
                  htmlFor="account_number"
                  className="block mb-1 font-medium"
                >
                  Número de cuenta
                </label>
                <input
                  id="account_number"
                  type="text"
                  {...register("account_number")}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.account_number && (
                  <span className="text-red-500 text-xs">
                    {errors.account_number.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="cci" className="block mb-1 font-medium">
                  CCI
                </label>
                <input
                  id="cci"
                  type="text"
                  {...register("cci")}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.cci && (
                  <span className="text-red-500 text-xs">
                    {errors.cci.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-1/2 bg-primary text-white font-bold py-2 rounded mt-4 disabled:opacity-60 cursor-pointer transition-colors"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {result && (
            <div className="text-center mt-2 text-sm text-red-500">
              {result}
            </div>
          )}
        </form>
      </FormProvider>
    </section>
  );
}