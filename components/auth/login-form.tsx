"use client";

import { useForm } from "react-hook-form"
// import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
   FormLabel
} from "../ui/form";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper"
import * as z from 'zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../formError";
import { FormSuccess } from "../formSuccess";
import { login } from "@/actions/login";
import { Suspense, useState, useTransition } from "react";

export const LoginForm  = () => {
  // const searchParams = useSearchParams();
  // const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Email is already in use with another provider"
  //     : "";

   const [error,setError] = useState<string | undefined>("");
   const [success,setSuccess] = useState<string | undefined>("");
    const [isPending,startTransition] = useTransition();
    const form = useForm<z.infer <typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
        login(values)
        .then((data) => {
          setError(data?.error);
          console.log("code is in login of onSubmit in loginForm");
          setSuccess(data?.success);
        });
      });
    }

    return <CardWrapper 
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonhref="/auth/register"
            showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <div className="space-y-4">
              <FormField
               control={form.control}
               name="email"
               render = {({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="johndoe@example.com"
                        type="email"
                        disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
               )}
               >

              </FormField>
              <FormField
               control={form.control}
               name="password"
               render = {({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="12345678"
                        type="password"
                        disabled = {isPending}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
               )}
               >

              </FormField>
            </div>
            
            <FormError message= {error}/>
            
            <FormSuccess message = {success}/>
            <Button className="w-full" type="submit" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
        </CardWrapper>
        
}