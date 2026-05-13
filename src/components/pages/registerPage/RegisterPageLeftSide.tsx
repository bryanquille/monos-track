import { ChartNoAxesCombined, ShieldCheck } from "lucide-react";
import logo from "../../../assets/images/monos-track-logo-circle.png"
import { cn } from "../../../utils/cn"

function RegisterPageLeftSide() {
  return (
    <section className={cn('hidden h-full min-h-screen lg:w-1/2 lg:p-12 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4 lg:bg-linear-180 lg:from-primary/70 lg:to-primary/20 dark:bg-linear-120 dark:from-tertiary-dark dark:to-primary-dark')}>
      <div className={cn('flex flex-col justify-center items-center gap-2')}>
        <img
          src={logo}
          alt="Monos Track Logo"
          className='w-14'
        />
        <strong className='font-bold text-2xl text-primary-dark dark:text-neutral-dark md:text-4xl'>Monos Track</strong>
      </div>
      <strong className={cn('dark:text-neutral-dark/80')}>Gestión finaciera de alto nivel.</strong>
      <p className={cn('text-center text-pretty dark:text-neutral-dark/65')}>Únete a la plataforma preferida por analístas para el seguimiento preciso de flujos de capital y activos digitales.</p>
      <div className={cn('flex justify-center items-center gap-3')}>
        <article className={cn('p-6 bg-neutral-light/40 rounded-xl dark:bg-primary-dark/60 dark:shadow-2xs dark:shadow-neutral-dark/50')}>
          <div className={cn('flex flex-col-reverse justify-center items-start gap-2')}>
            <h3 className={cn('text-lg font-semibold dark:text-neutral-dark/90')}>Seguridad bancaria</h3>
            <ShieldCheck size={30} className={cn('dark:text-neutral-light')} />
          </div>
          <p className={cn('dark:text-neutral-dark/75')}>Tus datos están encriptados con los más altos estándares.</p>
        </article>
        <article className={cn('p-6 bg-neutral-light/40 rounded-xl dark:bg-primary-dark/60 dark:shadow-2xs dark:shadow-neutral-dark/50')}>
          <div className={cn('flex flex-col-reverse justify-center items-start gap-2')}>
            <h3 className={cn('text-lg font-semibold dark:text-neutral-dark/90')}>Análisis inteligente</h3>
            <ChartNoAxesCombined size={30} className={cn('dark:text-neutral-light')} />
          </div>
          <p className={cn('dark:text-neutral-dark/75')}>Información en tiempo real sobre tus hábitos de gasto.</p>
        </article>
      </div>
    </section>
  )
}

export default RegisterPageLeftSide