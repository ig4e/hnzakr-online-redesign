"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonProps } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/api";
import { LogOutIcon, PresentationIcon, ScrollTextIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Icons } from "./icons";

export function UserMenu() {
	const { isLoading, data } = trpc.user.getUser.useQuery(undefined, {
		retry(failureCount, error) {
			if (error.data?.code === "UNAUTHORIZED") return false;
			return true;
		},
	});
	const router = useRouter();

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		window.location.reload();
	}, []);

	const UserAvatar = () => (
		<Avatar>
			<AvatarImage src={data?.imageURL} />
			<AvatarFallback>{data?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
		</Avatar>
	);

	const [isSheetOpen, setSheetOpen] = useState(false);

	return (
		<>
			{isLoading && (
				<Button variant={"outline"} size="icon" className="rounded-full" disabled={isLoading}>
					<Icons.spinner className="animate-spin h-5 w-5 stroke-current" />
				</Button>
			)}

			{!isLoading && !data && (
				<Link href={"/auth/login"}>
					<Button variant={"outline"}>تسجيل الدخول</Button>
				</Link>
			)}

			<Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
				{data && (
					<SheetTrigger asChild>
						<Button variant={"outline"} size="icon" className="rounded-full md:hidden" disabled={isLoading}>
							<UserAvatar></UserAvatar>
						</Button>
					</SheetTrigger>
				)}
				{data && (
					<SheetContent dir="rtl">
						<SheetHeader className="text-start">
							<SheetTitle>{data.username}</SheetTitle>
							<SheetDescription>
								<p>رصيد الطالب: {data.balance} ج.م</p>
							</SheetDescription>
						</SheetHeader>

						<DropdownMenuSeparator className="mt-4" />

						<div className="mt-4 space-y-2">
							<MobileLink
								onClick={() => router.push("/me/packages")}
								variant={"ghost"}
								className="w-full justify-start"
								onOpenChange={setSheetOpen}
							>
								<PresentationIcon className="me-2 h-4 w-4" />
								دروسى
							</MobileLink>

							<MobileLink
								onClick={() => router.push("/me/packages")}
								variant={"ghost"}
								className="w-full justify-start"
								onOpenChange={setSheetOpen}
							>
								<ScrollTextIcon className="me-2 h-4 w-4" />
								امتحاناتى
							</MobileLink>
						</div>

						<DropdownMenuSeparator className="mt-4" />

						<MobileLink
							onClick={logout}
							variant={"destructive"}
							className="w-full justify-start mt-4"
							onOpenChange={setSheetOpen}
						>
							<LogOutIcon className="me-2 h-4 w-4" />
							تسجيل خروج
						</MobileLink>
					</SheetContent>
				)}
			</Sheet>

			<DropdownMenu dir="rtl">
				{data && (
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"} size="icon" className="rounded-full hidden md:flex" disabled={isLoading}>
							<UserAvatar></UserAvatar>
						</Button>
					</DropdownMenuTrigger>
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

						<DropdownMenuItem onClick={() => router.push("/me/packages")}>
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
		</>
	);
}

interface MobileLinkProps extends ButtonProps {
	onOpenChange?: (open: boolean) => void;
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({ onOpenChange, onClick, className, children, ...props }: MobileLinkProps) {
	return (
		<Button
			onClick={() => {
				onClick?.();
				onOpenChange?.(false);
			}}
			className={cn(className)}
			{...props}
		>
			{children}
		</Button>
	);
}
