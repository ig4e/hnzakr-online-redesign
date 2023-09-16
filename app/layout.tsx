import "./globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Provider from "@/app/_trpc/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
	title: "Hnzakr Online - هنذاكر اونلاين",
	description:
		"أكبر منصة تعليمية للمراحل الدراسية المصرية تعليم اونلاين مع نخبة من افضل المدرسين شرح دروس اونلاين واسئلة ومراجعات وامتحانات الكترونية أولى ثانوى وثانية ثانوى وثالثة ثانوى",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ar" suppressHydrationWarning dir="rtl">
			<Provider>
				<ThemeProvider attribute="class" key={"theme"} enableSystem>
					<body className={cairo.className}>
						<div className="min-h-screen h-full flex flex-col justify-between">
							<SiteHeader></SiteHeader>
							<main className="h-full flex-grow">{children}</main>
							<SiteFooter></SiteFooter>
						</div>
						<Toaster />
					</body>
				</ThemeProvider>
			</Provider>
		</html>
	);
}
