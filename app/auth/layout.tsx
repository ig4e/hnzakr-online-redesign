import { LogoDark, LogoLight } from "@/components/assets";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container relative  min-h-[calc(100vh-65px)] h-full flex-col  items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-secondary-foreground dark:border-r lg:flex ">
				<div className="absolute inset-0 bg-secondary" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Image src={LogoLight} className="h-12 w-auto dark:hidden" alt="hnzakronlinelogo"></Image>
					<Image src={LogoDark} className="h-12 w-auto hidden dark:block" alt="hnzakronlinelogo"></Image>
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							إن تعليم الناس وتثقيفهم في حدّ ذاته ثروة كبيرة نعتز بها، فالعلم ثروة ونحن نبني المستقبل على أساس علمي.
						</p>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				{children}
			</div>
		</div>
	);
}
