import { BaseScraper, BaseScraperOptions } from "@/server/lib/base";
import { User } from "../types/user";
import queryString from "query-string";
import { Notification } from "../types/notification";
import { Package, PackageSubject } from "../types/package";
import { LessonInSubjectLessons, PackageSubjectPack, SubjectLessons } from "../types/subject";
import { Lesson } from "../types/lesson";

export class Scraper extends BaseScraper {
	constructor(args: BaseScraperOptions) {
		super(args);
	}

	async getUser() {
		const { data } = await this.client.get("/EditProfile");
		const $ = this.loadHtml(data);

		const userData: User = {
			id: this.parseNumber($(`div.nav > div:nth-child(4) > div > div > div.scomview > h4`).text()),
			balance: this.parseNumber($(`div.nav > div:nth-child(4) > div > div > div.scomview > span`).text()),
			imageURL: "https://hnzakronline.com/" + $(`#body > div.nav > div:nth-child(4) > div > div > div.hides > img`).attr("src")!,
			username: this.cleanString($(`input#name`).attr("value")!),
			email: this.cleanString($(`input#email`).attr("value")!),
			mobile: this.cleanString($(`input#mobile`).attr("value")!),
			grade: this.cleanString($(`input#subject`).attr("value")!),
		};

		return userData;
	}

	async getNotifications() {
		const { data } = await this.client.get("/Notification");
		const $ = this.loadHtml(data);
		const notifications: Notification[] = [];

		const newNotificationsCount = this.parseNumber(
			$(`#body > div.nav > div:nth-child(4) > div > div > div.scomview > div > a:nth-child(2) > span`).text(),
		);

		$("#body > main > a").each((i, el) => {
			const $$ = this.loadHtml(el);
			const createdAt = $$("div >span").text();
			const url = $$("a").attr("href")!;

			notifications.push({
				url: url,
				title: this.cleanString($$("div").text()?.replaceAll(createdAt, "")),
				createdAt: this.cleanString(createdAt),
				parsedIDs: this.parseUrl(url),
			});
		});

		return {
			newNotificationsCount,
			notifications,
		};
	}

	async getPackages() {
		const { data } = await this.client.get("/Account");
		const $ = this.loadHtml(data);
		const packages: Package[] = [];

		$(`#body > main > section:nth-child(1) > a`).each((i, el) => {
			const $$ = this.loadHtml(el);
			const url = $$("a").attr("href")!;
			const urlSearchParams = queryString.parse(url.split("?")[1]!);

			packages.push({
				id: Number(urlSearchParams["package"]),
				imageURL: "https://hnzakronline.com/" + $$("img").attr("src")!,
				name: this.cleanString($$("h2").text()),
				startAt: this.cleanString($$("a > h4:nth-child(3)").text()),
				endAt: this.cleanString($$("a > h4:nth-child(4)").text()),
				parsedIDs: this.parseUrl(url),
			});
		});

		return packages;
	}

	async getPackageSubjects({ id, purchId }: { id: number; purchId: number }) {
		const { data } = await this.client.get(`/Package?package=${id}&purch=${purchId}`);
		const $ = this.loadHtml(data);
		const subjects: PackageSubject[] = [];

		$("#body > main > section > a").each((i, el) => {
			const $$ = this.loadHtml(el);
			const url = $$("a").attr("href")!;
			const urlSearchParams = queryString.parse(url.split("?")[1]!);

			subjects.push({
				id: Number(urlSearchParams["subject"]),
				imageURL: "https://hnzakronline.com/" + this.cleanString($$("img").attr("src")!),
				name: this.cleanString($$("h2").text()),
				description: this.cleanString($$("span").text()),
				parsedIDs: this.parseUrl(url),
			});
		});

		return subjects;
	}

	async getSubjectPackContents({ id, packageId, purchId }: { id: number; packageId: number; purchId: number }) {
		const { data } = await this.client.get(`/Insidepack?package=${packageId}&subject=${id}&purch=${purchId}`);
		const $ = this.loadHtml(data);
		const packContents: PackageSubjectPack[] = [];

		$("#body > main > section > a").each((i, el) => {
			const $$ = this.loadHtml(el);
			const url = $$("a").attr("href")!;
			const { query } = queryString.parseUrl(url);

			packContents.push({
				id: Number(query["subject"]),
				imageURL: "https://hnzakronline.com/" + this.cleanString($$("img").attr("src")!),
				name: this.cleanString($$("h5").text()),
				description: this.cleanString($$("span").text()),
				parsedIDs: this.parseUrl(url),
			});
		});

		return packContents;
	}

	async getSubjectLessons({ id, packageId, purchId }: { id: number; packageId: number; purchId: number }) {
		const { data } = await this.client.get(`/Subject?package=${packageId}&subject=${id}&purch=${purchId}`);
		const $ = this.loadHtml(data);
		const lessons: SubjectLessons[] = [];

		$("div.categorycon > div.lessoncat").each((i, el) => {
			const $$ = this.loadHtml(el);
			const categoryName = this.cleanString($$("h3").text());
			const lessonsInCategory: LessonInSubjectLessons[] = [];

			$$("a").each((i, el) => {
				const $$$ = this.loadHtml(el);
				const parsedUrl = this.parseUrl($$$("a").attr("href")!);
				lessonsInCategory.push({
					id: this.parseNumber(parsedUrl.lessonId!),
					name: this.cleanString($$$(`span:nth-child(4)`).text()),
					number: this.parseNumber($$$(`span:nth-child(2) > text`).text()),
					parsedIDs: parsedUrl,
				});
			});

			lessons.push({
				categoryName,
				lessons: lessonsInCategory,
			});
		});

		return lessons;
	}

	async getLesson({ id, packageId, purchId }: { id: number; packageId: number; purchId: number }) {
		const generatedUrl = `/Lesson?package=${packageId}&lesson=${id}&purch=${purchId}`;
		const { data } = await this.client.get(generatedUrl);
		const $ = this.loadHtml(data);
		const parsedUrl = this.parseUrl(generatedUrl);

		const lesson: Lesson = {
			id: this.parseNumber(parsedUrl.lessonId!),
			name: this.cleanString($(`#body > main > section > h2`).text()),
			createdAt: this.cleanString($(`#body > main > section > h3`).text().replaceAll("تاريخ نشر الدرس :", "")),
			description: "",
			attachments: {
				videosURLs: [],
				othersURLs: [],
			},
		};

		$("#body > main > section > ul > li").each((i, el) => {
			const $$ = this.loadHtml(el);
			lesson.description += this.cleanString($$(`li`).text()) + "\n";
		});

		$("#body > main > section > div > iframe").each((i, el) => {
			const $$ = this.loadHtml(el);
			const videoURL = $$(`iframe`).attr("src")!;

			lesson.attachments.videosURLs.push({ url: videoURL } as any);
		});

		$("#body > main > section > div.lesscontent > a").each((i, el) => {
			const $$ = this.loadHtml(el);
			const attachmentA = $$(`a`);

			lesson.attachments.othersURLs.push({
				name: this.cleanString(attachmentA.text()),
				url: attachmentA.attr("href")!,
			});
		});

		const whatsappTeacherElement = $(`div.teacherwhats > a.whatsappteacher`);

		const whatsappTeacher = {
			name: this.cleanString(whatsappTeacherElement.text()),
			url: whatsappTeacherElement.attr("href")!,
		};

		lesson.attachments.othersURLs.push(whatsappTeacher);
		
		lesson.attachments.videosURLs = await Promise.all(
			lesson.attachments.videosURLs.map(async (video) => {
				const videoInfo = await this.getYoutubeVideoInfo(video.url);
				return {
					name: videoInfo.title,
					url: video.url,
				};
			}),
		);

		return lesson;
	}
}
