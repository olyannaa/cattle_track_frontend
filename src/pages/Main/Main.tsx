import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../app/services/auth';

export const Main = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const handlerLogout = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem('user');
            navigate('/');
        } catch {}
    };
    return (
        <>
            <div className=''>Главная страница</div>
            <button onClick={handlerLogout}>Выйти</button>
        </>
    );
};
