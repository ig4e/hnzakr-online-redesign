import { ParsedIDs } from "../lib/base";

export interface Package {
	id: number;
	imageURL: string;
	name: string;
	startAt: string;
	endAt: string;
	parsedIDs: ParsedIDs;
}
