"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/api";
import { Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function PackagesPage() {
	const { data, isLoading } = trpc.package.getPackages.useQuery();
	return (
		<div className="space-y-8">
			<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">حزم الطالب</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{isLoading &&
					Array(2)
						.fill(null)
						.map((_, index) => (
							<Card key={index + "skeleton"}>
								<CardHeader>
									<Skeleton key={"skeleton-" + index} className="w-full h-[20px] rounded-full" />
								</CardHeader>
								<CardContent className="flex flex-col gap-1">
									<Skeleton key={"skeleton-" + index} className="w-full h-[10px] rounded-full" />
									<Skeleton key={"skeleton-" + index} className="w-full h-[10px] rounded-full" />
								</CardContent>
								<CardFooter>
									<Skeleton key={"skeleton-" + index} className="w-full h-[40px] rounded-md" />
								</CardFooter>
							</Card>
						))}

				{data &&
					data.map((item) => (
						<Link href={`/me/packages/${item.id}/${item.parsedIDs.purchId}`} key={item.id}>
							<Card>
								<CardHeader>
									<CardTitle>{item.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{item.startAt}</p>
									<p>{item.endAt}</p>
								</CardContent>
								<CardFooter className="">
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

export default PackagesPage;
