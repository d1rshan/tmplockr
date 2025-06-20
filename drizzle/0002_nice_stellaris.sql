ALTER TABLE "files" DROP CONSTRAINT "files_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "clerk_user_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "clerk_user_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "user_id";