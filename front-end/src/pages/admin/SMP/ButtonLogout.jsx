import { useNavigate } from "react-router-dom"
import ActionButton from "../../user/SMP/buttons/ActionButton";

const ButtonLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")

        return (
            <ActionButton onClick={handleLogout} textButton="Logout" type="button"/>
        )
    }

}

export default ButtonLogout;