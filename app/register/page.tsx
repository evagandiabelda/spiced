import SigninForm from '@/components/inputs/forms/signin-form';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="mx-auto h-full flex items-center justify-center w-full flex-col p-8">
            <Suspense>
                <SigninForm />
            </Suspense>
        </div>
    );
}