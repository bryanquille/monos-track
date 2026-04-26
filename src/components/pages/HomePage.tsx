import { BadgeCheck, ChartNoAxesCombined, ShieldCheck, Sparkles, Earth, Smartphone, Tablet, Laptop } from 'lucide-react'
import RegisterButton from '../../features/auth/components/RegisterButton'

function HomePage() {
  return (
    <>
      <section className='mt-8 px-4 flex flex-col justify-center items-center gap-8'>
        <h1 className='sr-only'>Monos Track</h1>
        <p className='px-4 py-1.5 flex justify-center items-center gap-2 rounded-2xl bg-primary/15 md:text-lg'>
          <BadgeCheck />
          <span>Finanzas Técnicamente Empáticas</span>
        </p>
        <div>
          <h2 className='text-center font-semibold text-4xl md:text-6xl'>
            <span>Seguimiento de datos de alta frecuencia </span>
            <br />
            <span className='text-primary'>diseñado para la precisión.</span>
          </h2>
          <p className='mt-4 text-center text-pretty md:px-16'>Experimenta la convergencia de la precisión y la accesibilidad. Gestiona tus ingresos y gastos con una interfaz humana que nunca comprete el rigor de los datos.</p>
        </div>
        <RegisterButton
          text='Comienza Gratis'
          style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 14, paddingBottom: 14, fontSize: 20 }}
        />
      </section>
      <section className='mt-14 px-4 flex flex-col justify-center items-center gap-6'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <h2 className='font-semibold text-center text-4xl'>Diseño para la claridad</h2>
          <p className='text-center md:max-w-125'>La ingeniería de precisión se une al diseño minimalista para proporcionar una experiencia fluida de seguimiento financiero.</p>
        </div>
        <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-3'>
          <article className='p-8 rounded-3xl flex flex-col justify-center items-center gap-4 shadow-sm shadow-neutral-light/20 bg-white md:col-span-2'>
            <div className='flex flex-col justify-center items-start gap-3'>
              <div className='flex flex-col-reverse justify-center items-start gap-3'>
                <h3 className='font-semibold text-2xl'>Análisis en Tiempo Real</h3>
                <span className='p-2.5 rounded-lg bg-primary/30'>
                  <ChartNoAxesCombined size={28} color='#0088ff' />
                </span>
              </div>
              <p>La app registra tus ingresos y gastos al instante, brindando información actualizada sobre su salud financiera.</p>
            </div>
            <div className="w-full bg-surface-container-low rounded-xl p-4 h-48 border border-slate-100 bg-primary/10 hidden md:flex md:items-end md:gap-2">
              <div className="flex-1 bg-primary/30 rounded-t-lg h-[40%]"></div>
              <div className="flex-1 bg-primary/50 rounded-t-lg h-[60%]"></div>
              <div className="flex-1 bg-primary/40 rounded-t-lg h-[50%]"></div>
              <div className="flex-1 bg-primary rounded-t-lg h-[90%]"></div>
              <div className="flex-1 bg-primary/70 rounded-t-lg h-[75%]"></div>
              <div className="flex-1 bg-primary/30 rounded-t-lg h-[30%]"></div>
            </div>
          </article>
          <article className='p-8 flex flex-col justify-center items-start gap-3 rounded-3xl shadow-sm shadow-neutral-light/20 bg-white'>
            <div className='flex flex-col-reverse justify-center items-start gap-3'>
              <h3 className='font-semibold text-2xl'>Seguridad de Precisión</h3>
              <span className='p-2.5 rounded-lg bg-tertiary-light/30'>
                <ShieldCheck size={28} color='#df6402' />
              </span>
            </div>
            <p>Cifrado de grado militar para cada dato. Su ADN financiero, desde ingresos hasta gastos mínimos, se mantiene estrictamente privado.</p>
          </article>
          <article className='p-8 flex flex-col justify-center items-start gap-3 rounded-3xl shadow-sm shadow-neutral-light/20 bg-white'>
            <div className='flex flex-col-reverse justify-center items-start gap-3'>
              <h3 className='font-semibold text-2xl'>Flujo Inteligente</h3>
              <span className='p-2.5 rounded-lg bg-gray-text/25'>
                <Sparkles size={28} color='#404754' />
              </span>
            </div>
            <p>Categoriza tus movimientos para entender el camino que toman tus finanzas. Facilitando la toma de decisiones.</p>
          </article>
          <article className='p-8 flex flex-col justify-center items-start gap-3 rounded-3xl shadow-sm shadow-neutral-light/20 bg-secondary-light md:col-span-2'>
            <div>
              <div className='flex flex-col-reverse justify-center items-start gap-3'>
                <h3 className='font-semibold text-2xl text-white'>Ingeniería Sin Fronteras</h3>
                <span className='p-2.5 rounded-lg bg-primary'>
                  <Earth size={28} color='white' />
                </span>
              </div>
              <p style={{ color: 'white', opacity: 0.7 }}>Controla tus activos y cuentas desde cualquier parte y en cualquier dispositivo, con precisión y en tiempo real.</p>
            </div>
            <div className='hidden md:w-full md:flex md:justify-center md:items-center gap-1'>
              <Smartphone
                size={100}
                color='gray'
              />
              <Tablet
                size={130}
                color='gray'
              />
              <Laptop
                size={150}
                color='gray'
              />
            </div>
          </article>
        </div>
      </section>
      <section className='mt-14 mb-10 mx-4 p-8 flex flex-col justify-center items-center gap-4 rounded-3xl bg-primary md:p-20 md:gap-6'>
        <h2 className='font-bold text-center text-4xl text-white md:text-5xl'>¿Listo para la Precisión Técnica?</h2>
        <p className='text-center' style={{ color: 'white', opacity: 0.8 }}>Unete a nuestra comunidad, que estan transformando sus finanzas personales de una tarea rutinaria en una obra maestra arquitectonica.</p>
        <RegisterButton
          text='Comienza Gratis'
          style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 14, paddingBottom: 14, fontSize: 20, backgroundColor: 'white', color: '#005BAF' }}
        />
      </section>
    </>
  )
}

export default HomePage