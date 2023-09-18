"use client";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/utils/api";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
	{
		title: "بنك تدريبات",
		description:
			"تغطي الأسئلة جميع مستويات الصعوبة. تم تصميم بنك أسئلة شامل يضمن استيعاب الطلاب عن طريق أنواع مختلفة من الأسئلة ، يجيب عليها الطلاب من خلال تفاعله مع مقاطع الفيديو",
	},
	{
		title: "التعليم بالخرائط الذهنية",
		description: "طريقة مبتكرة للتعليم في الوطن العربي وهي التعليم بالخرائط الذهنية مما يؤدي الي زيادة الاستيعاب وتحسين الذاكرة.",
	},
	{
		title: "الفيديوهات التفاعلية",
		description:
			"تم تصميم مقاطع الفيديو المتوفرة على منصة هنذاكر اونلاين لتكون غير تقليدية وقصيرة و سهلة الاستيعاب لضمان فهم الطلاب لكل موضوع على حدة أولاً وبذلك تسهيل استيعاب المناهج الأكبر...",
	},
	{
		title: "تدريبات وواجبات",
		description: "تم تجهيز تدريبات وواجبات شاملة على كل أجزاء المنهج ليتمكن الطالب من التدريب على أكبر قدر من الأسئلة بالنظام الحديث",
	},
];

export default function Home() {
	//const testQuery = trpc.subject.getLessons.useQuery({ id: 16395, packageId: 65, purchId: 16395 });

	return (
		<main className="flex items-center flex-col mt-16 gap-16">
			<div className="fixed -z-10 inset-0 bg-gradient-to-b from-background to-green-300 dark:to-green-950"></div>

			<div className="text-center space-y-4">
				<Badge variant={"outline"} className="text-base">
					منصة تعليمية للمرحلة الثانوية
				</Badge>
				<div className="space-y-6">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
						أهلآ بكم فى هنذاكر{" "}
						<span className="text-green-500 z-20 relative">
							أونلاين
							<div className="h-8 w-8 bg-green-400 dark:bg-green-900 rounded-full absolute -end-2 bottom-0 -z-10"></div>
						</span>
					</h1>
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight [text-wrap:_balance;] max-w-xl">
						إن تعليم الناس وتثقيفهم في حدّ ذاته ثروة كبيرة نعتز بها، فالعلم ثروة ونحن نبني المستقبل على أساس علمي.
					</h3>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4 w-full max-w-5xl">
				{cards.map((card) => (
					<Card key={card.title} className="bg-card/25">
						<CardHeader>
							<CardTitle>{card.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{card.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</main>
	);
}
