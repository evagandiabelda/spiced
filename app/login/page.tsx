"use client";

import LoginForm from '@/components/inputs/forms/login-form';
import { Suspense } from 'react';
import { useSession } from "next-auth/react";

export default function LoginPage() {

    const { data: session, status } = useSession();

    console.log("Session data:", session);
    console.log("Session status:", status);

    return (
        <div className="mx-auto h-full flex items-center justify-center w-full max-w-[600px] flex-col p-4">
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    );
}