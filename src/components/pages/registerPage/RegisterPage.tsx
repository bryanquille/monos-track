import { cn } from '../../../utils/cn';
import DarkThemeButton from '../../ui/DarkThemeButton';
import RegisterPageLeftSide from './RegisterPageLeftSide';
import RegisterPageRightSide from './RegisterPageRightSide';

function RegisterPage() {
  return (
    <div className={cn('relative w-full flex flex-row-reverse')}>
      <DarkThemeButton className='absolute top-4 right-6' />
      <RegisterPageRightSide />
      <RegisterPageLeftSide />
    </div>
  )
}

export default RegisterPage