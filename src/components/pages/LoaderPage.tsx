import { cn } from "../../utils/cn";
import Loader from "../ui/Loader";

interface LoaderPageProps {
  text?: string
}

function LoaderPage({ text }: LoaderPageProps) {
  return (
    <div className={cn('w-full h-full min-h-screen grid place-items-center')}>
      <Loader text={text} />
    </div>
  )
}

export default LoaderPage