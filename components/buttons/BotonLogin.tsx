import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function BotonLogin({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'inline-block text-center font-semibold rounded-full border-2 transition ease duration-300 a-boton-gr px-[1.8rem] py-[0.4rem] border-[var(--gris5)] dark:border-[var(--brand2)] bg-[var(--gris5)] dark:bg-[var(--brand2)] text-[var(--blanco)] dark:text-[var(--gris5)] hover:scale-[1.02] ',
        className,
      )}
    >
      {children}
    </button>
  );
}
