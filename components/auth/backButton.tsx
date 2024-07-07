"use client"

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    label: string;
    href: string;
}


export const BackButton = ({
    href,
    label
}: BackButtonProps) => {
    return (
        <Button
           variant={"link"}
           asChild
           size={"sm"}
           className="font-normal w-full">
            <Link href={href}>
            {label}
            </Link>
        </Button>
    )
}