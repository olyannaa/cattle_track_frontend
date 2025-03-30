import { Button, Form, Input, Radio, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
    IRadioGroup,
    RadioGroupButton,
} from '../../../../../global-components/custom-input/radio-group/RadioGroup';
import Dragger from 'antd/es/upload/Dragger';
import { InputLabel } from '../../../../../global-components/custom-input/input-label/InputLabel';
import styles from './ManualRegistration.module.css';

export const ManualRegistrationForm = () => {
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
    const requiredRule = [{ required: true, message: 'Обязательное поле' }];

    return (
        <Form>
            <div>
                <Form.Item rules={requiredRule}>
                    <InputLabel label='Номер бирки/RFID' />
                    <Input
                        className={styles['manual-register__input']}
                        placeholder='Введите номер бирки'
                    ></Input>
                </Form.Item>
                <Form.Item>
                    <InputLabel label='Порода' />
                    <Input
                        className={styles['manual-register__input']}
                        placeholder='Укажите породу'
                    ></Input>
                </Form.Item>
                <Form.Item rules={requiredRule}>
                    <RadioGroupButton data={animalsOptions} />
                </Form.Item>
            </div>
            <div className={styles['manual-register__changed-form']}>
                <Form.Item
                    className={styles['manual-register__input']}
                    rules={requiredRule}
                >
                    <InputLabel label='Дата рождения' />
                    <Input placeholder='xx.xx.xxxx'></Input>
                </Form.Item>
                <Form.Item>
                    <InputLabel label='Происхождение' />
                    <Radio.Group>
                        <div className={styles['manual-register__origin']}>
                            <div className='radio-border'>
                                <Radio value='own'>Собственное</Radio>
                            </div>
                            <div className='radio-border'>
                                <Radio value='buy'>Покупка</Radio>
                            </div>
                            <div className='radio-border'>
                                <Radio value='obmen'>Обмен</Radio>
                            </div>
                        </div>
                    </Radio.Group>
                </Form.Item>
            </div>
            <div className={styles['manual-register__changed-form']}>
                <Form.Item className={styles['manual-register__input']}>
                    <InputLabel label='ID матери' />
                    <Input placeholder='xxxxxx'></Input>
                </Form.Item>
                <Form.Item className={styles['manual-register__input']}>
                    <InputLabel label='ID отца' />
                    <Input placeholder='xxxxxx'></Input>
                </Form.Item>
            </div>
            <Form.Item rules={requiredRule}>
                <InputLabel label='Группа содержания' />
                <Select className={styles['manual-register__input']}></Select>
            </Form.Item>
            <div className={styles['manual-register__additional-form']}>
                <InputLabel
                    marginSize='16px'
                    label='Дополнительные способы идентификации'
                />
                <div className={styles['manual-register__changed-form']}>
                    <Form.Item
                        className={styles['manual-register__changed-input']}
                    >
                        <InputLabel label='УНСМ' />
                        <Input placeholder='Введите УНСМ'></Input>
                    </Form.Item>
                    <Form.Item
                        className={styles['manual-register__changed-input']}
                    >
                        <InputLabel label='Электронная метка' />
                        <Input placeholder='Введите электронную метку'></Input>
                    </Form.Item>
                </div>
            </div>
            <Form.Item className={styles['manual-register__input']}>
                <InputLabel label='Фотография животного' />
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
