import { ParsedIDs } from "../lib/base";

export interface PackageSubjectPack {
	id: number;
	imageURL: string;
	name: string;
	description: string;
	parsedIDs: ParsedIDs;
}

export interface SubjectLessons {
	categoryName: string;
	lessons: LessonInSubjectLessons[];
}

export interface LessonInSubjectLessons {
	id: number;
	number: number;
	name: string;
	available: boolean;
	parsedIDs: ParsedIDs;
}
