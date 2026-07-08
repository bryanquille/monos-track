import { useAuthStore } from "../stores/authStore";
import { cn } from "../utils/cn";

function UserName() {
  const user = useAuthStore((state) => state.user)
  
  return (
    <p
      className={cn('text-3xl font-semibold text-center text-pretty dark:text-neutral-dark')}
    >
      <span className={cn('opacity-70')}>Bienvenido,</span> {user ? `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}` : 'usuario no logeado'}
    </p>
  )
}

export default UserName