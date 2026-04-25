import logo from '../../../assets/images/monos-track-logo-circle.png'

function Footer() {
  return (
    <footer className='w-full px-8 py-6 flex flex-col justify-center items-center gap-2 bg-white'>
      <div className='flex justify-center items-center gap-1.5'>
        <img
          src={logo}
          alt="Logotipo de Monos Track"
          className='w-9'
        />
        <strong className='font-Plus-Jakarta-Sans text-xl text-gray-text'>Monos Track</strong>
      </div>
      <p className='text-center' style={{color:'#404754', opacity:0.7}}>&copy; 2026 Monos Track. Finanzas Técnicamente Empáticas.</p>
    </footer>
  )
}

export default Footer