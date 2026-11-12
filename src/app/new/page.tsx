import { notFound } from "next/navigation";
import { Suspense } from "react";
import { canCreateGroup } from "@/server/groups";
import { CreateGroupForm } from "./CreateGroupForm";

/** create group (prototype/CreateGroup.dc.html). Only a device that opened the owner link can use it. */
export default function NewGroupPage() {
  return (
    <Suspense>
      <Gate />
    </Suspense>
  );
}

async function Gate() {
  if (!(await canCreateGroup())) notFound();
  return <CreateGroupForm />;
}
