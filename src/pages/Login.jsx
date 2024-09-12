import { UserForm } from "../components/userForm"

export function Login() {
    return <UserForm route='/api/token/' method="login" />
}
