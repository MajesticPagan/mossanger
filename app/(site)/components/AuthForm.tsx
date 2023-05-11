"use client";

import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { BsGoogle, BsGithub } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import Loader from "@/app/components/Loader";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();
	const [variant, setVariant] = useState<Variant>("LOGIN");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (session?.status === "authenticated") {
			router.push("/users");
		}
	}, [session?.status, router]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("REGISTER");
		} else {
			setVariant("LOGIN");
		}
	}, [variant]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (variant === "REGISTER") {
			axios
				.post("/api/register", data)
				.then(() => {
					toast.success("Registo feito com sucesso.");
					signIn("credentials", data);
				})
				.catch((error) => toast.error(`Ocorreu algo de errado: ${error.response.data}`))
				.finally(() => setIsLoading(false));
		}

		if (variant === "LOGIN") {
			signIn("credentials", { ...data, redirect: false })
				.then((callback) => {
					if (callback?.error) {
						toast.error(`Ocorreu algo de errado: ${callback.error}`);
					}

					if (callback?.ok && !callback?.error) {
						toast.success("Sessão iniciada com sucesso.");
						router.push("/users");
					}
				})
				.finally(() => setIsLoading(false));
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error(`Ocorreu algo de errado.`);
				}

				if (callback?.ok && !callback?.error) {
					toast.success("Sessão iniciada com sucesso.");
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			{isLoading && <Loader />}

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
						{variant === "REGISTER" && (
							<Input
								label="Nome"
								id="name"
								type="text"
								register={register}
								errors={errors}
								disabled={isLoading}
								required
							/>
						)}
						<Input
							label="Endereço de email"
							id="email"
							type="email"
							register={register}
							errors={errors}
							disabled={isLoading}
							required
						/>
						<Input
							label="Palavra-passe"
							id="password"
							type="password"
							register={register}
							errors={errors}
							disabled={isLoading}
							required
						/>
						<div>
							<Button type="submit" fullWidth disabled={isLoading}>
								{variant === "LOGIN" ? "Iniciar sessão" : "Registrar"}
							</Button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-2 text-gray-500">Ou continue com</span>
							</div>
						</div>

						<div className="mt-6 flex gap-2">
							<AuthSocialButton
								icon={BsGoogle}
								onClick={() => socialAction("google")}
							/>
							<AuthSocialButton
								icon={BsGithub}
								onClick={() => socialAction("github")}
							/>
						</div>
					</div>

					<div className="flex justify-center gap-1 mt-6 px-2 text-sm text-gray-500">
						<div>
							{variant === "LOGIN" ? "É novo ao Mossanger?" : "Já possui uma conta?"}
						</div>
						<div className="underline cursor-pointer" onClick={toggleVariant}>
							{variant === "LOGIN" ? "Crie uma conta" : "Inicie a sessão"}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthForm;
