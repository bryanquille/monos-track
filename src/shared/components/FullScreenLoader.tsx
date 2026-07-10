import { cn } from "../utils/cn";
import Loader from "./Loader";

interface FullScreenLoaderProps {
  text?: string
}

function FullScreenLoader({ text }: FullScreenLoaderProps) {
  return (
    <div className={cn('w-full h-full min-h-screen grid place-items-center')}>
      <Loader text={text} />
    </div>
  )
}

export default FullScreenLoader