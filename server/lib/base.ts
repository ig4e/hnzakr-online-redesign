import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { AnyNode, load } from "cheerio";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import queryString from "query-string";

export interface BaseScraperOptions {
	namehnzakr: string;
	password: string;
	cookie?: string;
}

export interface ParsedIDs {
	packageId?: string;
	subjectId?: string;
	lessonId?: string;
	purchId?: string;
	raw: string;
}

export class BaseScraper {
	jar: CookieJar;
	client: AxiosInstance;
	cookie: string;
	namehnzakr: string;
	password: string;

	constructor({ namehnzakr, password, cookie }: BaseScraperOptions) {
		this.jar = new CookieJar();
		this.client = wrapper(axios.create({ jar: this.jar, baseURL: "https://hnzakronline.com" }));
		this.cookie = cookie ?? "";
		this.namehnzakr = namehnzakr;
		this.password = password;

		this.cookie
			.split(" ")
			.forEach((cookie) => cookie && this.jar.setCookie(cookie, "https://hnzakronline.com/").catch((err) => console.error(err)));
	}

	async getCookie(): Promise<string> {
		await this.client({
			url: "/Login",
			method: "POST",
			data: qs.stringify({
				namehnzakr: this.namehnzakr,
				password: this.password,
				remmberme: "remmberme",
			}),
		});

		console.log("LOGIN REQUEST");

		this.cookie = await this.jar.getCookieString("https://hnzakronline.com/");

		if (!this.cookie.includes("PHPSESSID")) throw new Error("Could not get cookie");

		return this.cookie;
	}

	loadHtml(html: string | AnyNode | AnyNode[]) {
		return load(html);
	}

	cleanString(string: string) {
		return string.trim();
	}

	parseNumber(number: string) {
		return Number(this.cleanString(number.replace(/[^0-9]/g, "")));
	}

	parseUrl(url: string) {
		const { query } = queryString.parseUrl(url);

		return {
			packageId: query["package"],
			subjectId: query["subject"],
			lessonId: query["lesson"],
			purchId: query["purch"],
			raw: url,
		} as ParsedIDs;
	}
}
