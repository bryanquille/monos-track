import { useHambMenu } from "../../../store/hambMenuStore"
import { cn } from "../../../utils/cn"

function HamburguerMenuButton() {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)
  const toggleHambMenu = useHambMenu((state) => state.toggleHambMenu)

  return (
    <button
      type="button"
      className='cursor-pointer flex flex-col justify-center ite gap-0.75'
      onClick={toggleHambMenu}
    >
      <span
        className={cn(
          'w-6 h-1 block rounded-xl bg-secondary-light transform transition-transform duration-300',
          {
            'translate-y-0.75 rotate-45': isHambMenuOpen
          }
        )}
      ></span>
      <span
        className={cn(
          'w-6 h-1 block rounded-xl bg-secondary-light transition-all duration-300',
          {
            'hidden': isHambMenuOpen,
          }
        )}
      ></span>
      <span
        className={cn(
          'w-6 h-1 block rounded-xl bg-secondary-light transform transition-transform duration-300',
          {
            '-translate-y-0.75 -rotate-45': isHambMenuOpen
          }
        )}
      ></span>
    </button>
  )
}

export default HamburguerMenuButton