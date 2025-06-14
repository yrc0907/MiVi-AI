"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Orbit } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      console.error(result?.error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      <div className="w-[840px] flex rounded-xl shadow-lg bg-white">
        <div className="w-1/2 p-12">
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
              <CardDescription className="pt-2">
                Login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            {...field}
                            type="email"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Sign in
                  </Button>
                </form>
              </Form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                >
                  Github
                </Button>
              </div>
            </CardContent>
            <CardFooter className="justify-center p-0 pt-6">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="w-1/2 bg-green-600 rounded-r-xl flex flex-col items-center justify-center text-white p-12">
          <Orbit className="h-24 w-24 mb-4" />
          <h2 className="text-4xl font-bold">MIVI.AI</h2>
        </div>
      </div>
      <p className="text-center mt-4 text-xs text-muted-foreground">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  );
} 