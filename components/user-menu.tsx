"use client";
import React, { useCallback } from "react";
import { LogOutIcon, Moon, PresentationIcon, ScrollTextIcon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/utils/api";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserMenu() {
	const { isLoading, data } = trpc.user.getUser.useQuery(undefined, { retry: false });
	const router = useRouter();

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		window.location.reload();
	}, []);

	return (
		<DropdownMenu dir="rtl">
			{(isLoading || data) && (
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"} size="icon" className="rounded-full" disabled={isLoading}>
						{isLoading && <Icons.spinner className="animate-spin h-5 w-5 stroke-current" />}
						{data && (
							<Avatar>
								<AvatarImage src={data.imageURL} />
								<AvatarFallback>{data.username.substring(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						)}
					</Button>
				</DropdownMenuTrigger>
			)}

			{!isLoading && !data && (
				<Link href={"/auth/login"}>
					<Button variant={"outline"}>تسجيل الدخول</Button>
				</Link>
			)}

			{data && (
				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuLabel className="flex flex-col gap-1">
						<p>{data.username}</p>
						<p>
							<p>رصيد الطالب: {data.balance} ج.م</p>
						</p>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuItem>
						<PresentationIcon className="me-2 h-4 w-4" />
						دروسى
					</DropdownMenuItem>

					<DropdownMenuItem>
						<ScrollTextIcon className="me-2 h-4 w-4" />
						امتحاناتى
					</DropdownMenuItem>

					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={logout}>
						<LogOutIcon className="me-2 h-4 w-4" />
						تسجيل خروج
					</DropdownMenuItem>
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}
