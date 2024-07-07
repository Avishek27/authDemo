"use client";

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
   FormLabel
} from "../ui/form";
import { RegisterSchema} from "@/schemas";
import { CardWrapper } from "./card-wrapper"
import * as z from 'zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../formError";
import { FormSuccess } from "../formSuccess";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const  RegisterForm  = () => {
   const [error,setError] = useState<string | undefined>("");
   const [success,setSuccess] = useState<string | undefined>("");
    const [isPending,startTransition] = useTransition();
    const form = useForm<z.infer <typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
        register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
      });
    }

    return <CardWrapper 
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonhref="/auth/login"
            showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <div className="space-y-4">
            <FormField
               control={form.control}
               name="name"
               render = {({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
               )}
               >

              </FormField>
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
              Sign Up
            </Button>
          </form>
        </Form>
        </CardWrapper>
}