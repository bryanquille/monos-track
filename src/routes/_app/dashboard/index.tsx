import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../../../components/pages/dashboardPage/DashboardPage';

export const Route = createFileRoute('/_app/dashboard/')({
  component: DashboardPage,
})