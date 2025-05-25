import { Flex, Form, Input, Typography } from 'antd';
import styles from './LoginInput.module.css';

type Props = {
    name: string;
    placeholder: string;
    type?: string;
    regExp?: RegExp;
    label: string;
};

export const LoginInput = ({ name, placeholder, type = 'text', label }: Props) => {
    return (
        <Flex vertical>
            <Typography.Title level={5}>{label}</Typography.Title>
            <Form.Item
                name={name}
                className={styles.formItem}
                rules={[
                    {
                        required: true,
                        message: 'Обязательное поле',
                    },
                    {
                        max: name === 'login' ? 50 : 15,
                        message: `Максимальная длина ${name === 'login' ? 50 : 15}`,
                    },
                    {
                        min: name === 'login' ? 6 : 8,
                        message: `Минимальная длина ${name === 'login' ? 6 : 8}`,
                    },
                    {
                        pattern: name === 'login' ? /^[a-z0-9]+$/u : undefined,
                        message: 'Допустимы только строчные латинские буквы и цифры',
                    },
                ]}
            >
                {type === 'password' ? (
                    <Input.Password
                        placeholder={placeholder}
                        type={type}
                        className={styles.loginInput}
                        size='large'
                    />
                ) : (
                    <Input
                        placeholder={placeholder}
                        type={type}
                        className={styles.loginInput}
                        size='large'
                    />
                )}
            </Form.Item>
        </Flex>
    );
};
