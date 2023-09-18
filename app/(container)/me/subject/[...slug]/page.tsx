"use client";

import { trpc } from "@/utils/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Link2, Video } from "lucide-react";

export default function SubjectPage({ params }: { params: { slug: [string, string, string] } }) {
	const [packageId, subjectId, purchId] = params.slug;
	const { data, isLoading } = trpc.subject.getPackContents.useQuery({
		id: Number(subjectId),
		packageId: Number(packageId),
		purchId: Number(purchId),
	});

	return (
		<div className="space-y-8">
			<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">محتوى المادة</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{isLoading &&
					Array(10)
						.fill(null)
						.map((_, index) => (
							<Card key={index + "skeleton"}>
								<CardHeader>
									<Skeleton key={"skeleton-" + index} className="w-full h-[20px] rounded-full" />
								</CardHeader>
								<CardContent className="flex flex-col gap-1">
									<Skeleton key={"skeleton-" + index} className="w-full h-[10px] rounded-full" />
								</CardContent>
								<CardFooter>
									<Skeleton key={"skeleton-" + index} className="w-full h-[40px] rounded-md" />
								</CardFooter>
							</Card>
						))}

				{data &&
					data.map((item) => {
						const isLessons = item.parsedIDs.path === "Subject";
						if (!isLessons) return;
						return (
							<Link
								href={`/me/subject/lessons/${item.parsedIDs.packageId}/${item.parsedIDs.subjectId}/${item.parsedIDs.purchId}`}
								key={item.id}
							>
								<Card>
									<CardHeader>
										<CardTitle>{item.name}</CardTitle>
									</CardHeader>
									<CardContent>
										<p>{item.description}</p>
									</CardContent>
									<CardFooter>
										<Button className="w-full">
											<ChevronLeft className="me-2"></ChevronLeft>
											<span>أذهب</span>
										</Button>
									</CardFooter>
								</Card>
							</Link>
						);
					})}
			</div>
		</div>
	);
}
