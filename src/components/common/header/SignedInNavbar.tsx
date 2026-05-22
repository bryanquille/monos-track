import { Link } from "@tanstack/react-router";
import { cn } from "../../../utils/cn";
import { useHambMenu } from "../../../store/hambMenuStore";

interface SignedInNavbarProps {
  headerHeight: number
  headerWidth: number
}

function SignedInNavbar({ headerHeight, headerWidth }: SignedInNavbarProps) {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)
  
  return (
    <nav
      style={{ 
        '--header-offset-top': `${headerHeight + 20}px`,
        '--header-offset-left': `${headerWidth}px`
      } as React.CSSProperties}
      className={cn(
        'fixed top-(--header-offset-top) left-(--header-offset-left) transform -translate-x-full',
        // {
        //   "-translate-x-full": isHambMenuOpen,
        //   "translate-x-[300%]": isHambMenuOpen === false,
        // }
      )}
    >
      <ul>
        <li><Link to="/dashboard">Panel de Control</Link></li>
        <li><Link to="/dashboard/settings">Configuración</Link></li>
      </ul>
    </nav>
  )
}

export default SignedInNavbar