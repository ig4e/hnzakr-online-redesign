"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/utils/api";
import { LoginSchema, loginSchema } from "@/validations/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
	const userQuery = trpc.user.getUser.useQuery();
	const router = useRouter();
	const { toast } = useToast();
	const { isLoading, error, mutate } = trpc.user.login.useMutation({
		onSuccess(data) {
			localStorage.setItem("token", data);
			toast({
				title: "تم تسجيل الدخول بنجاح",
			});
		},
		onError(error) {
			toast({
				title: "تغذر تسجيل الدخول",
				description: error.message,
			});
		},
	});
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "all",
	});

	const onSubmit: SubmitHandler<LoginSchema> = (data) => mutate(data);

	useEffect(() => {
		if (userQuery.data) {
			router.push("/");
		}
	}, [router, userQuery.data]);

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-md">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">تسجيل الدخول</h1>
				<p className="text-sm text-muted-foreground">ادخل بريدك الإلكتروني أدناه لتسجيل الدخول.</p>
			</div>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">أسم المستخدم</FormLabel>
											<FormControl>
												<Input
													placeholder="أسم المستخدم"
													{...field}
													autoCapitalize="none"
													autoComplete="username"
													autoCorrect="off"
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">كلمة المرور</FormLabel>
											<FormControl>
												<Input
													placeholder="كلمة المرور"
													{...field}
													autoCapitalize="none"
													autoComplete="password"
													autoCorrect="off"
													disabled={isLoading}
													type="password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button disabled={isLoading}>
								{isLoading && <Icons.spinner className="me-2 h-4 w-4 animate-spin" />}
								تسجيل الدخول
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<p className="px-8 text-center text-sm text-muted-foreground">
				بالنقر على تسجيل الدخول، توافق على <span className="underline underline-offset-4 hover:text-primary">شروط الخدمة</span> و{" "}
				<span className="underline underline-offset-4 hover:text-primary">سياسة الخصوصية</span>.
			</p>
		</div>
	);
}

export default Login;
