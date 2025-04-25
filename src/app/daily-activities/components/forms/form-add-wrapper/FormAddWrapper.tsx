import { Button, Form } from 'antd';
import { JSX } from 'react';

type Props = {
    isGroup: boolean;
    children: JSX.Element;
};

export const FormAddWrapper = ({ isGroup, children }: Props) => {
    return (
        <Form>
            {children}
            <Button
                type='primary'
                size='large'
                color='default'
                variant='solid'
                htmlType='submit'
            >
                {isGroup ? 'Сохранить для выбранных животных' : 'Сохранить'}
            </Button>
        </Form>
    );
};
