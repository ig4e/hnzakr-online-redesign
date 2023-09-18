import Image from "next/image";
import Link from "next/link";
import { LogoDark, LogoLight } from "./assets";
import { ModeToggle } from "./mode-toggle";

export function SiteFooter() {
	return (
		<div>
			<footer>
				<div className="bg-background z-50 w-full border-t">
					<div className="container flex h-16 items-center justify-between">
						<div className="h-8">
							<Link href="/">
								<Image
									src={LogoLight}
									alt="hnzakr online logo"
									className="w-auto h-full dark:hidden"
									loading="lazy"
								></Image>
								<Image
									src={LogoDark}
									alt="hnzakr online logo"
									className="hidden w-auto h-full dark:block"
									loading="lazy"
								></Image>
							</Link>
						</div>
						<div className="flex items-center gap-2">
							<ModeToggle />
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
