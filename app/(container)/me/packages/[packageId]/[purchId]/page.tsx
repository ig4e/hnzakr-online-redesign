"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/api";
import { Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function PackagePage({ params }: { params: { packageId: string; purchId: string } }) {
	const { data, isLoading } = trpc.package.getSubjects.useQuery({ id: Number(params.packageId), purchId: Number(params.purchId) });

	return (
		<div className="space-y-8">
			<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">محتوى الحزمة</h2>

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
					data.map((item) => (
						<Link href={`/me/subject/${params.packageId}/${item.id}/${item.parsedIDs.purchId}`} key={item.id}>
							<Card>
								<CardHeader>
									<CardTitle>{item.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{item.description}</p>
								</CardContent>
								<CardFooter>
									<Button className="w-full">
										<Video className="me-2"></Video>
										<span>مشاهدة الدروس</span>
									</Button>
								</CardFooter>
							</Card>
						</Link>
					))}
			</div>
		</div>
	);
}

export default PackagePage;
