import { createFileRoute } from '@tanstack/react-router'
import { cn } from '../../../utils/cn';

export const Route = createFileRoute('/_app/dashboard/')({
  component: () => <div className={cn('dark:text-neutral-dark')}>Dashboard</div>,
})