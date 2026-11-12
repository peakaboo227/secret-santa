CREATE TYPE "public"."board_outcome" AS ENUM('waiting', 'handed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."group_stage" AS ENUM('setup', 'joining', 'drawn', 'exchange', 'revealed');--> statement-breakpoint
CREATE TYPE "public"."santa_status" AS ENUM('not_viewed', 'viewed', 'preparing');--> statement-breakpoint
CREATE TABLE "device_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone,
	CONSTRAINT "device_sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "exchange_board" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"outcome" "board_outcome" DEFAULT 'waiting' NOT NULL,
	"guess_member_id" uuid,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exclusions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"giver_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "exclusions_not_self" CHECK ("exclusions"."giver_id" <> "exclusions"."receiver_id")
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"game_code" text NOT NULL,
	"budget" text,
	"gift_day" date,
	"stage" "group_stage" DEFAULT 'setup' NOT NULL,
	"exchange_started_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "groups_game_code_unique" UNIQUE("game_code")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"real_name" text NOT NULL,
	"pin_hash" text,
	"pet" text,
	"pet_name" text,
	"is_host" boolean DEFAULT false NOT NULL,
	"playing" boolean DEFAULT true NOT NULL,
	"joined_at" timestamp with time zone,
	"failed_pin_attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pairings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"giver_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"santa_status" "santa_status" DEFAULT 'not_viewed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pairings_not_self" CHECK ("pairings"."giver_id" <> "pairings"."receiver_id")
);
--> statement-breakpoint
CREATE TABLE "reveal_progress" (
	"group_id" uuid PRIMARY KEY NOT NULL,
	"revealed_count" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wishes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"link" text,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "device_sessions" ADD CONSTRAINT "device_sessions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device_sessions" ADD CONSTRAINT "device_sessions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_board" ADD CONSTRAINT "exchange_board_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_board" ADD CONSTRAINT "exchange_board_receiver_id_members_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_board" ADD CONSTRAINT "exchange_board_guess_member_id_members_id_fk" FOREIGN KEY ("guess_member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exclusions" ADD CONSTRAINT "exclusions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exclusions" ADD CONSTRAINT "exclusions_giver_id_members_id_fk" FOREIGN KEY ("giver_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exclusions" ADD CONSTRAINT "exclusions_receiver_id_members_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pairings" ADD CONSTRAINT "pairings_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pairings" ADD CONSTRAINT "pairings_giver_id_members_id_fk" FOREIGN KEY ("giver_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pairings" ADD CONSTRAINT "pairings_receiver_id_members_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reveal_progress" ADD CONSTRAINT "reveal_progress_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishes" ADD CONSTRAINT "wishes_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishes" ADD CONSTRAINT "wishes_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "device_sessions_member_idx" ON "device_sessions" USING btree ("member_id");--> statement-breakpoint
CREATE UNIQUE INDEX "exchange_board_group_receiver_uq" ON "exchange_board" USING btree ("group_id","receiver_id");--> statement-breakpoint
CREATE UNIQUE INDEX "exchange_board_group_position_uq" ON "exchange_board" USING btree ("group_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "exclusions_pair_uq" ON "exclusions" USING btree ("giver_id","receiver_id");--> statement-breakpoint
CREATE UNIQUE INDEX "members_group_real_name_uq" ON "members" USING btree ("group_id","real_name");--> statement-breakpoint
CREATE UNIQUE INDEX "members_group_pet_uq" ON "members" USING btree ("group_id","pet");--> statement-breakpoint
CREATE INDEX "members_group_idx" ON "members" USING btree ("group_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pairings_group_giver_uq" ON "pairings" USING btree ("group_id","giver_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pairings_group_receiver_uq" ON "pairings" USING btree ("group_id","receiver_id");--> statement-breakpoint
CREATE INDEX "wishes_member_idx" ON "wishes" USING btree ("member_id");