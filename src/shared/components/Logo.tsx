import { useState } from 'react'
import logoWebp from '../../assets/images/monos-track-logo-circle.webp'
import logoPng from '../../assets/images/monos-track-logo-circle.png'

interface LogoProps {
  className?: string
  alt?: string
}

function Logo({ className, alt = 'Logotipo de Monos Track' }: LogoProps) {
  const [src, setSrc] = useState(logoWebp)

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        if (src !== logoPng) setSrc(logoPng)
      }}
    />
  )
}

export default Logo
