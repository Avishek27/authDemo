"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
 } from "../ui/card";
import { BackButton } from "./backButton";
import { Header } from './header';
import { Social } from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonhref: string;
    showSocial?: boolean;
}


export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonhref,
    showSocial,
}: CardWrapperProps ) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
          {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
          )}
          <CardFooter>
            <BackButton 
            href = {backButtonhref}
            label = {backButtonLabel}/>
          </CardFooter>
        </Card>
    )
}