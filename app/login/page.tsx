"use client";

import LoginForm from '@/components/inputs/forms/login-form';
import { Suspense } from 'react';
import { useSession } from "next-auth/react";

export default function LoginPage() {

    const { data: session, status } = useSession();

    if (session) {
        if (session?.user.userType === "admin") {
            window.location.href = "/panel-admin";
        } else if (session?.user.userType === "expert") {
            window.location.href = "/panel-experto";
        } else if (session?.user.userType === "standard") {
            window.location.href = "/panel-estandar";
        }
    }

    return (
        <div className="mx-auto h-full flex items-center justify-center w-full max-w-[600px] flex-col p-4">
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    );
}