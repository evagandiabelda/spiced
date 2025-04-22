import RegisterForm from '@/components/inputs/forms/register-form';

export default function RegisterPage() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <RegisterForm usuario='standard' />
        </div>
    );
}