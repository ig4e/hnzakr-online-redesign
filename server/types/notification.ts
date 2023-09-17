import { ParsedIDs } from "../lib/base";

export interface Notification {
	url: string;
	title: string;
	createdAt: string;
	parsedIDs: ParsedIDs;
}
