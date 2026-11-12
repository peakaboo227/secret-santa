import { notFound } from "next/navigation";
import { Suspense } from "react";
import { canCreateGroup, getGroupDraft } from "@/server/groups";
import { CreateGroupForm } from "./CreateGroupForm";

/**
 * create group (prototype/CreateGroup.dc.html). Only a device that opened the owner link can use it.
 * /new?group=<id> reopens the creator's unfinished group at "your pin" (back from choose your pet).
 */
export default function NewGroupPage({ searchParams }: PageProps<"/new">) {
  return (
    <Suspense>
      <Gate searchParams={searchParams} />
    </Suspense>
  );
}

async function Gate({ searchParams }: Pick<PageProps<"/new">, "searchParams">) {
  if (!(await canCreateGroup())) notFound();
  const { group } = await searchParams;
  const draft = typeof group === "string" ? await getGroupDraft(group) : null;
  return <CreateGroupForm key={draft?.groupId} initial={draft ?? undefined} />;
}
