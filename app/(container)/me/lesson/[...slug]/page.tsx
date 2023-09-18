"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/utils/api";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import ReactPlayer from "react-player";

export default function LessonPage({ params }: { params: { slug: [string, string, string] } }) {
	const [packageId, lessonId, purchId] = params.slug;
	const { data, isLoading } = trpc.lesson.getLesson.useQuery({
		id: Number(lessonId),
		packageId: Number(packageId),
		purchId: Number(purchId),
	});

	return (
		<div>
			{isLoading && (
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="w-full md:w-1/4 h-[36px] rounded-md" />

						<Skeleton className="w-full h-full aspect-video rounded-md" />
					</div>

					<Skeleton className="w-1/2 md:w-1/3 h-[36px] rounded-full" />

					<Skeleton className="w-full h-[256px] rounded-md" />
				</div>
			)}

			{data && (
				<div className="space-y-4 ">
					<Tabs defaultValue={"video-0"} className="" dir="rtl">
						<TabsList className="w-full gap-2">
							{data.attachments.videosURLs.map((video, index) => (
								<TabsTrigger key={"video-" + index} value={"video-" + index} className="truncate line-clamp-1 text-start">
									{video.name}
								</TabsTrigger>
							))}
						</TabsList>

						{data.attachments.videosURLs.map((video, index) => (
							<TabsContent key={"video-" + index} value={"video-" + index}>
								<div className="rounded-md aspect-video overflow-hidden w-full h-full bg-secondary">
									<ReactPlayer url={video.url} controls width="100%" height="100%" />
								</div>
							</TabsContent>
						))}
					</Tabs>

					<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight pb-2">{data.name}</h2>

					<Card className="bg-secondary">
						<CardHeader className="p-4">
							<p>{data.createdAt}</p>
						</CardHeader>
						<CardContent className="px-4">
							<div className="space-y-4">
								<p>
									{data.description.split(/\n|\r\n/).map((segment, index) => (
										<>
											{index > 0 && <br />}
											{segment}
										</>
									))}
								</p>

								<div className="w-full border-t border-primary rounded-full"></div>

								<div className="grid md:flex grid-cols-2 md:grid-cols-3 gap-4">
									{data.attachments.othersURLs.map((attachment) => (
										<Link key={attachment.name} href={attachment.url} target="_blank" rel="noreferrer">
											<Button className="w-full md:w-fit">
												<ExternalLink className="w-5 h-5 me-2"></ExternalLink>
												{attachment.name}
											</Button>
										</Link>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
