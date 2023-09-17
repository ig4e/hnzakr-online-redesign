import { BaseScraper, BaseScraperOptions } from "@/server/lib/base";
import { User } from "../types/user";
import queryString from "query-string";
import { Notification } from "../types/notification";
import { Package } from "../types/package";

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

	async getPackageContents() {}
}
