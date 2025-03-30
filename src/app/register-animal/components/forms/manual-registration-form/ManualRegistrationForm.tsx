import { Button, Form, Input, Radio, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
    IRadioGroup,
    RadioGroup,
} from '../../../../../global-components/custom-input/radio-group/RadioGroup';
import { useState } from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { InputLabel } from '../../../../../global-components/custom-input/input-label/InputLabel';

export const ManualRegistrationForm = () => {
    const [dateBorn, setDateBorn] = useState('');
    const animalsOptions: IRadioGroup = {
        title: 'Категория животного',
        options: [
            { label: 'Телка', value: 'Телка' },
            { label: 'Нетель', value: 'Нетель' },
            { label: 'Корова', value: 'Корова' },
            { label: 'Бычок', value: 'Бычок' },
            { label: 'Бык', value: 'Бык' },
        ],
    };
    const formatDateBorn = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 2 && val.length <= 4) {
            val = `${val.slice(0, 2)}.${val.slice(2)}`;
        } else if (val.length > 4) {
            val = `${val.slice(0, 2)}.${val.slice(2, 4)}.${val.slice(4, 8)}`;
        }
        setDateBorn(val);
    };
    return (
        <Form>
            <Form.Item>
                <InputLabel label='Номер бирки/RFID' />
                <Input placeholder='Введите номер бирки'></Input>
            </Form.Item>
            <Form.Item label='Порода'>
                <Input placeholder='Укажите породу'></Input>
            </Form.Item>
            <RadioGroup data={animalsOptions} />
            <div>
                <Form.Item label='Дата рождения'>
                    <Input
                        placeholder='xx.xx.xxxx'
                        onChange={formatDateBorn}
                    ></Input>
                </Form.Item>
                <Form.Item label='Происхождение'>
                    <div>
                        <Radio>Собственное</Radio>
                    </div>
                    <div>
                        <Radio>Покупка</Radio>
                    </div>
                    <div>
                        <Radio>Обмен</Radio>
                    </div>
                </Form.Item>
            </div>
            <div>
                <Form.Item label='ID матери'>
                    <Input placeholder='xxxxxx'></Input>
                </Form.Item>
                <Form.Item label='ID отца'>
                    <Input placeholder='xxxxxx'></Input>
                </Form.Item>
            </div>
            <Form.Item label='Группа содержания'>
                <Select></Select>
            </Form.Item>
            <div>
                <h3>Дополнительные способо идентификации</h3>
                <div>
                    <Form.Item label='УНСМ'>
                        <Input placeholder='Введите УНСМ'></Input>
                    </Form.Item>
                    <Form.Item label='Электронная метка'>
                        <Input placeholder='Введите электронную метку'></Input>
                    </Form.Item>
                </div>
            </div>
            <Form.Item>
                <Dragger>
                    <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>
                        Выберите или перетащите файл
                    </p>
                    <p className='ant-upload-hint'>
                        Максимальный размер изображения 200Mb. Формат
                        JPG/JPEG/PNG
                    </p>
                </Dragger>
            </Form.Item>
            <Button type='primary' danger>
                Зарегистрировать животное
            </Button>
        </Form>
    );
};
