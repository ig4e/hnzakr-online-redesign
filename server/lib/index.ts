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
			username: this.cleanString($(`input#name`).attr("value")!),
			email: this.cleanString($(`input#email`).attr("value")!),
			mobile: this.cleanString($(`input#mobile`).attr("value")!),
			grade: this.cleanString($(`input#subject`).attr("value")!),
		};

		return userData;
	}

	async getPackages() {
		const { data } = await this.client.get("/Account");
		const $ = this.loadHtml(data);
		const packages: Package[] = [];

		$(`#body > main > section:nth-child(1) > a`).each((i, el) => {
			const $$ = this.loadHtml(el);
			const url = $$("a").attr("href")!;
			const urlSearchParams = new URLSearchParams(url);

			packages.push({
				id: Number(urlSearchParams.get("package")),
				imageURL: $$("img").attr("src")!,
				name: this.cleanString($$("h2").text()),
				startAt: this.cleanString($$("a > h4:nth-child(3)").text()),
				endAt: this.cleanString($$("a > h4:nth-child(4)").text()),
			});
		});

		return packages;
	}
}
