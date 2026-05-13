import { cn } from '../../../utils/cn';
import RegisterPageLeftSide from './RegisterPageLeftSide';
import RegisterPageRightSide from './RegisterPageRightSide';

function RegisterPage() {
  return (
    <div className={cn('w-full flex flex-row-reverse')}>
      <RegisterPageRightSide />
      <RegisterPageLeftSide />
    </div>
  )
}

export default RegisterPage