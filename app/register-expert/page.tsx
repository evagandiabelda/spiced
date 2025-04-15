import RegisterForm from '@/components/inputs/forms/register-form';

export default function RegisterPage() {
    return (
        <div className="mx-auto h-full flex items-center justify-center w-full flex-col p-8">
            <RegisterForm usuario='expert' />
        </div>
    );
}