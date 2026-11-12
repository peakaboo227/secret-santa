import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ChoosePet } from "@/components/ChoosePet";
import { groupInfoLine } from "@/lib/format";
import { getHostPetStep } from "@/server/groups";
import { chooseHostPetAction } from "../../actions";

/** host · choose your pet (prototype/HostChoosePet.dc.html), right after creating a group. */
export default function HostPetPage({ params }: PageProps<"/new/[groupId]/pet">) {
  return (
    <Suspense>
      <Gate params={params} />
    </Suspense>
  );
}

async function Gate({ params }: Pick<PageProps<"/new/[groupId]/pet">, "params">) {
  const { groupId } = await params;
  const step = await getHostPetStep(groupId);
  if (!step) notFound();
  if (step.state === "done") redirect(step.next);
  return (
    <ChoosePet
      group={{ name: step.groupName, info: groupInfoLine(step.budget, step.giftDay) }}
      backHref={`/new?group=${groupId}`}
      action={chooseHostPetAction.bind(null, groupId)}
    />
  );
}
