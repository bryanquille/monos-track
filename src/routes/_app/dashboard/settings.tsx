import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/settings/')({
  component: () => <div>Settings</div>,
})