import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { LogoDark, LogoLight } from "./assets";
import { UserMenu } from "./user-menu";
import NotificatiosButton from "./notificatios-button";

export function SiteHeader() {
	return (
		<header className="bg-background/50 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<div className="h-8">
					<Link href="/">
						<Image src={LogoLight} alt="hnzakr online logo" className="w-auto h-full dark:hidden" loading="lazy"></Image>
						<Image src={LogoDark} alt="hnzakr online logo" className="hidden w-auto h-full dark:block" loading="lazy"></Image>
					</Link>
				</div>
				<div className="flex items-center gap-2">
					<NotificatiosButton />
					<UserMenu />
				</div>
			</div>
		</header>
	);
}
