'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { BotonLogin } from '@/components/buttons/BotonLogin';
import Input from '@/components/inputs/Input';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="w-full flex flex-col items-center gap-4 justify-centerspace-y-3">
      <h1>Accede a tu cuenta</h1>
      <div className="flex flex-col flex-1 align-center gap-8 rounded-lg px-6 pb-4 pt-8 w-full max-w-[400px]">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block"
              htmlFor="email"
            >
              Email
            </label>
            <Input tipo='email' id='email' required={true} />
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Input tipo='password' id='password' required={true} />
            </div>
          </div>
        </div>
        <BotonLogin className="mt-4 w-full" aria-disabled={isPending}>Log in</BotonLogin>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
