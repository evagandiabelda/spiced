import Logo from '@/components/icons/Logo';
import LoginForm from '@/components/inputs/forms/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="mx-auto h-full flex items-center justify-center w-full max-w-[600px] flex-col p-4">
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    );
}