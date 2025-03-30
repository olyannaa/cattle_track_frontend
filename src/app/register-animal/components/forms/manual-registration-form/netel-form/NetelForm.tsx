import { Form, Input, Radio } from 'antd';
import styles from '../ManualRegistration.module.css';
import { InputLabel } from '../../../../../../global-components/custom-input/input-label/InputLabel';
import TextArea from 'antd/es/input/TextArea';

export const NetelFormRegister = () => {
    const requiredRule = [{ required: true, message: 'Обязательное поле' }];

    return (
        <Form>
            <div className={styles['manual-register__additional-form']}>
                <Form.Item
                    rules={requiredRule}
                    className={styles['manual-register__input']}
                >
                    <InputLabel label='Дата осеменения' />
                    <Input placeholder='xx.xx.xxxx'></Input>
                </Form.Item>
                <Form.Item
                    className={styles['manual-register__input']}
                    rules={requiredRule}
                >
                    <InputLabel label='Ожидаемая дата отела' />
                    <Input placeholder='xx.xx.xxxx'></Input>
                </Form.Item>
            </div>
            <Form.Item>
                <InputLabel label='Тип осеменения' />
                <Radio.Group>
                    <div className={styles['manual-register__origin']}>
                        <div className='radio-border'>
                            <Radio value='own'>Искусственное</Radio>
                        </div>
                        <div className='radio-border'>
                            <Radio value='buy'>Естественное</Radio>
                        </div>
                        <div className='radio-border'>
                            <Radio value='obmen'>Эмбрион</Radio>
                        </div>
                    </div>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                className={styles['manual-register__input']}
                rules={requiredRule}
            >
                <InputLabel label='Номер партии спермы' />
                <Input placeholder='xxxxxxxx'></Input>
            </Form.Item>
            <Form.Item className={styles['manual-register__input']}>
                <InputLabel label='Примечание к осеменению' />
                <TextArea
                    rows={4}
                    placeholder='Дополнительная информация'
                ></TextArea>
            </Form.Item>
        </Form>
    );
};
