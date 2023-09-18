"use client";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/api";
import Link from "next/link";
import React, { useMemo } from "react";

function NotificationsPage() {
	const { data, isLoading } = trpc.user.getNotifications.useQuery();

	return (
		<>
			{data && data.notifications.length === 0 && (
				<div className="min-h-[calc(100vh-200px)] grid place-items-center">
					<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">لا توجد أشعارات</h2>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{isLoading &&
					Array(10)
						.fill(null)
						.map((_, index) => (
							<Card key={index + "skeleton"}>
								<CardHeader>
									<Skeleton key={"skeleton-" + index} className="w-full h-[20px] rounded-full" />
								</CardHeader>
								<CardFooter>
									<Skeleton key={"skeleton-" + index} className="w-[100px] h-[10px] rounded-full" />
								</CardFooter>
							</Card>
						))}

				{data &&
					data.notifications.map((notification, index) => (
						<Link
							key={index + "skeleton"}
							href={`/me/lesson/${notification.parsedIDs.packageId}/${notification.parsedIDs.lessonId}/${notification.parsedIDs.purchId}`}
						>
							<Card className="hover:bg-secondary hover:border-primary transition">
								<CardHeader>{notification.title}</CardHeader>
								<CardFooter>
									<p>التاريخ: {notification.createdAt}</p>
								</CardFooter>
							</Card>
						</Link>
					))}
			</div>
		</>
	);
}

export default NotificationsPage;
