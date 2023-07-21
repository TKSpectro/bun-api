CREATE TABLE `accounts` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(256) NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`fk_account_id` int
);
--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk_account_id_accounts_id_fk` FOREIGN KEY (`fk_account_id`) REFERENCES `accounts`(`id`) ON DELETE no action ON UPDATE no action;