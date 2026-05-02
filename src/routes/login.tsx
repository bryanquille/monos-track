import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../components/pages/loginPage/LoginPage'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})