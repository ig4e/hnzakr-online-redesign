"use client";

import { trpc } from "@/utils/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link2, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SubjectLessonsPage({ params }: { params: { slug: [string, string, string] } }) {
	const [packageId, subjectId, purchId] = params.slug;
	const { data, isLoading } = trpc.subject.getLessons.useQuery({
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
									<Skeleton key={"skeleton-" + index} className="w-full h-[40px] rounded-full" />
								</CardHeader>
								<CardContent className="flex flex-col gap-1">
									{Array(3)
										.fill(null)
										.map((_, index) => (
											<Skeleton key={"skeleton-" + index} className="w-full h-[30px] rounded-md" />
										))}
								</CardContent>
							</Card>
						))}

				{data &&
					data.map((item) => {
						return (
							<Card key={item.categoryName}>
								<CardHeader>
									<CardTitle>{item.categoryName}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-col gap-2">
										{item.lessons.map((lesson) => {
											return (
												<Link
													key={lesson.id}
													href={`/me/lesson/${lesson.parsedIDs.packageId}/${lesson.parsedIDs.lessonId}/${lesson.parsedIDs.purchId}`}
												>
													<Button className="flex gap-2 group w-full justify-start" variant={"outline"}>
														<Badge variant={lesson.available ? "default" : "destructive"}>
															{lesson.number}
														</Badge>

														<p className="group-hover:opacity-100">{lesson.name}</p>
													</Button>
												</Link>
											);
										})}
									</div>
								</CardContent>
							</Card>
						);
					})}
			</div>
		</div>
	);
}
