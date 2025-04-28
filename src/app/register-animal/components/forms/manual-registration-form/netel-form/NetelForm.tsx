/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Radio } from 'antd';
import { InputLabel } from '../../../../../../global-components/custom-inputs/input-label/InputLabel';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import styles from '../ManualRegistration.module.css';
import netelStyles from './NetelForm.module.css';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

export const NetelFormRegister = () => {
    const requiredRule = [{ required: true, message: 'Обязательное поле' }];
    const form = useFormInstance();

    const handleInseminationDateChange = (e: any) => {
        const value = e.target.value;
        if (value) {
            const expectedDate = dayjs(value).add(285, 'day').format('YYYY-MM-DD');
            form.setFieldValue('ExpectedCalvingDate', expectedDate);
        }
    };

    return (
        <Form.Item className={styles['manual-register__additional-form']}>
            <InputLabel label='Для регистрации нетеля необходимо заполнить данные об осеменении' />
            <div className={styles['manual-register__changed-form']}>
                <div className={styles['manual-register__changed-input']}>
                    <InputLabel label='Дата осеменения' />
                    <Form.Item
                        name='InseminationDate'
                        rules={requiredRule}
                        className={styles['manual-register__changed-input']}
                    >
                        <Input
                            type='date'
                            placeholder='xx.xx.xxxx'
                            onChange={handleInseminationDateChange}
                        ></Input>
                    </Form.Item>
                </div>
                <div className={styles['manual-register__changed-input']}>
                    <InputLabel label='Ожидаемая дата отела' />
                    <Form.Item rules={requiredRule} name='ExpectedCalvingDate'>
                        <Input type='date' placeholder='xx.xx.xxxx'></Input>
                    </Form.Item>
                </div>
            </div>
            <InputLabel label='Тип осеменения' />
            <Form.Item name='InseminationType' style={{ maxWidth: 412 }}>
                <Radio.Group>
                    <div
                        className={styles['manual-register__origin']}
                        style={{ maxWidth: 412 }}
                    >
                        <div
                            className={`${netelStyles['netel-form__radio1']} radio-border`}
                        >
                            <Radio value='Искусственное'>Искусственное</Radio>
                        </div>
                        <div
                            className={`${netelStyles['netel-form__radio2']} radio-border`}
                        >
                            <Radio value='Естественное'>Естественное</Radio>
                        </div>
                        <div
                            className={`${netelStyles['netel-form__radio3']} radio-border`}
                        >
                            <Radio value='Эмбрион'>Эмбрион</Radio>
                        </div>
                    </div>
                </Radio.Group>
            </Form.Item>
            <InputLabel label='Номер партии спермы' />
            <Form.Item
                name='SpermBatch'
                className={styles['manual-register__changed-input']}
                rules={requiredRule}
            >
                <Input placeholder='xxxxxxxx'></Input>
            </Form.Item>
            <InputLabel label='Техник осеменения' />
            <Form.Item
                name='Technician'
                className={styles['manual-register__changed-input']}
                rules={requiredRule}
            >
                <Input placeholder='xxxxxxxx'></Input>
            </Form.Item>
            <InputLabel label='Примечание к осеменению' />
            <Form.Item name='Notes' className={styles['manual-register__changed-input']}>
                <TextArea rows={4} placeholder='Дополнительная информация'></TextArea>
            </Form.Item>
        </Form.Item>
    );
};
