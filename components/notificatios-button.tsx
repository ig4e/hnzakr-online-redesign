"use client";
import { trpc } from "@/utils/api";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { BellIcon } from "lucide-react";
import { Badge } from "./ui/badge";

function NotificatiosButton() {
	const userQuery = trpc.user.getUser.useQuery(undefined, {
		retry(failureCount, error) {
			if (error.data?.code === "UNAUTHORIZED") return false;
			return true;
		},
	});
	const { data, isLoading, isError } = trpc.user.getNotifications.useQuery(undefined, {
		retry(failureCount, error) {
			if (error.data?.code === "UNAUTHORIZED") return false;
			return true;
		},
	});

	console.log(data);

	return (
		<Link href={"/me/notifications"} hidden={!isLoading && !userQuery.isLoading && !userQuery.data?.id}>
			<Button className="rounded-full relative p-2 w-10 h-10" variant={"ghost"} disabled={isLoading}>
				{(isLoading || userQuery.isLoading) && <Icons.spinner className="animate-spin h-5 w-5 stroke-current" />}
				{data && <BellIcon className="h-5 w-5 stroke-current"></BellIcon>}

				{data && data.newNotificationsCount > 0 && (
					<div className="absolute bg-red-500 [font-size:_0.65rem] [line-height:_0.65rem] top-0 -end-0 p-1 rounded-full">
						{data.newNotificationsCount}
					</div>
				)}
			</Button>
		</Link>
	);
}

export default NotificatiosButton;
