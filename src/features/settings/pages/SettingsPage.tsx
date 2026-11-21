import { cn } from "../../../shared/utils/cn";
import ProfileSection from "../components/ProfileSection";

function SettingsPage() {
  return (
    <section>
      <header className={cn(
        'w-[95%] max-w-7xl mx-auto mb-6 p-4 flex flex-col justify-center gap-4 rounded-xl',
        'bg-neutral-light/50 dark:bg-secondary-light dark:text-neutral-dark',
        'shadow-sm shadow-secondary-light/50 dark:shadow-neutral-dark/50',
        'md:p-8'
      )}>
        <h1 className={cn('text-center text-3xl font-bold')}>
          Configuración de Perfil
        </h1>
        <p className={cn('text-center')}>
          Gestiona tu identidad digital, seguridad y preferencias financieras.
        </p>
      </header>
      <main>
        {/* Here show the info from the user and be able to modify */}
        <ProfileSection />
      </main>
    </section>
  )
}

export default SettingsPage