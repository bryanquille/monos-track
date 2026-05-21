import DarkThemeButton from '../../ui/DarkThemeButton';
import LoginPageLeftSide from './LoginPageLeftSide'
import LoginPageRightSide from './LoginPageRightSide'

function LoginPage() {
  return (
    <>
      <div className='relative w-full flex flex-row-reverse justify-center items-center'>
        <DarkThemeButton className='absolute top-4 right-6' />
        <LoginPageRightSide />
        <LoginPageLeftSide />
      </div>
    </>
  )
}

export default LoginPage