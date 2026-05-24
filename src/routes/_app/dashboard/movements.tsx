import { createFileRoute } from '@tanstack/react-router'
import MovementsRegisterPage from '../../../components/pages/movementsRegisterPage/MovementsRegisterPage';

export const Route = createFileRoute('/_app/dashboard/movements')({
  component: () => <MovementsRegisterPage />,
})