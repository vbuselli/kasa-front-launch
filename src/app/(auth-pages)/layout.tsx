export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-center py-20 flex-1 bg-foreground text-white p-8 rounded-tl-[30px]">
      {children}
    </div>
  );
}
