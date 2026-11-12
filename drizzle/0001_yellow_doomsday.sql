DROP INDEX "members_group_pet_uq";--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "pin" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "members_group_pet_name_uq" ON "members" USING btree ("group_id","pet_name");