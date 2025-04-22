import { Button, Flex, Form, message, Typography } from 'antd';
import { LoginInput } from '../LoginInput/LoginInput';
import styles from './LoginForm.module.css';
import { LoginData, useLoginMutation } from '../../../../app-service/services/auth';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const onFinish = async (data: LoginData) => {
        const formData = new FormData();
        formData.append('login', data.login);
        formData.append('password', data.password);
        try {
            const response = await login({
                login: data.login,
                password: data.password,
            }).unwrap();
            localStorage.setItem('user', JSON.stringify(response));
            navigate('/main');
        } catch (err) {
            if ((err as { originalStatus: number }).originalStatus === 400) {
                messageApi.open({
                    type: 'error',
                    content: 'Неверное имя пользователя или пароль',
                    style: {
                        marginTop: '20vh',
                    },
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Сервис временно не доступен. Попробуйте позже',
                    style: {
                        marginTop: '20vh',
                    },
                });
            }
        }
    };
    return (
        <>
            {contextHolder}
            <Form className={styles['form-login']} onFinish={onFinish}>
                <LoginInput
                    name='login'
                    label='Имя пользователя'
                    placeholder='Введите имя'
                />
                <LoginInput
                    name='password'
                    label='Пароль'
                    placeholder='Введите пароль'
                    type='password'
                />
                <Flex vertical className={styles['form-login__footer']}>
                    <Button
                        type='primary'
                        size='large'
                        color='default'
                        variant='solid'
                        htmlType='submit'
                        className={styles['button_login']}
                    >
                        Войти
                    </Button>
                    <Typography.Text className={styles['login__help']}>
                        Если Вы забыли имя пользователя или пароль - обратитесь к
                        администратору
                    </Typography.Text>
                </Flex>
            </Form>
        </>
    );
};
