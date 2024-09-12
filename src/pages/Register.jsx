import { UserForm } from "../components/userForm"

export function Register() {
    return <UserForm route='api/user/register/' method="register" />
}
