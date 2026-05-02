import LoginPageLeftSide from './LoginPageLeftSide'
import LoginPageRightSide from './LoginPageRightSide'

function LoginPage() {
  return (
    <>
      <div className='w-full flex flex-row-reverse justify-center items-center'>
        <LoginPageRightSide />
        <LoginPageLeftSide />
      </div>
    </>
  )
}

export default LoginPage