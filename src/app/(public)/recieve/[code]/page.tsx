import { recieve } from "@/features/dashboard/data";
import { RecieveView } from "@/features/recieve/ui/views/recieve-view";
import { InvalidCodeView } from "@/features/recieve/ui/views/invalid-code-view";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { code: string };
}) {
  const code = Number(params.code);

  if (!Number.isInteger(code)) {
    notFound();
  }

  const data = await recieve(code)

  if (!data) return <InvalidCodeView />;

  return <RecieveView files={data.files} notes={data.notes} />;
}
