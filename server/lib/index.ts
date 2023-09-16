import { BaseScraper, BaseScraperOptions } from "@/server/lib/base";
import { User } from "../types/user";

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
			username: $(`input#name`).attr("value")!,
			email: $(`input#email`).attr("value")!,
			mobile: $(`input#mobile`).attr("value")!,
			grade: $(`input#subject`).attr("value")!,
		};

		return userData;
	}
}
