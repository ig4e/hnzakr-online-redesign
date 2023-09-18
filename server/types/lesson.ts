export interface Lesson {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	attachments: LessonAttachments;
}

export interface LessonAttachments {
	videosURLs: { name: string; url: string }[];
	othersURLs: { name: string; url: string }[];
}
