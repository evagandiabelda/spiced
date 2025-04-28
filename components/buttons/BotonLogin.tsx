import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BotonLogin({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex flex-row justify-center items-center gap-4 text-center font-semibold rounded-full border-2 transition ease duration-300 a-boton-gr px-[1.8rem] py-[0.4rem] text-[var(--blanco)] dark:text-[var(--gris5)] hover:scale-[1.02] border-[var(--gris5)] dark:border-[var(--gris2)] bg-[var(--gris5)] dark:bg-[var(--gris2)] cursor-pointer ',
        className,
      )}
    >
      {children}
    </button>
  );
}
