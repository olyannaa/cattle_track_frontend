import { Button, Form, Input, message, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { InputLabel } from '../../../../global-components/custom-inputs/input-label/InputLabel';
import TextArea from 'antd/es/input/TextArea';
import styles from '../../ReproductiveAccountingPage.module.css';
import { ConfirmCalvingModal } from './modal/ConfirmCalvingModal';
import { RequestCalving, useGetPregnanciesQuery, useRegisterCalvingMutation } from '../../services/reproductive';
import { SelectDataType } from '../../../../utils/selectDataType';
import { isErrorType } from '../../../../utils/errorType';

export const CalvingForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const rules = [{ required: true, message: 'Обязательное поле' }];
    const [form] = Form.useForm();
    const calfType = Form.useWatch('type', form);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = () => {
        setIsModalOpen(true);
    };

    const { data } = useGetPregnanciesQuery();
    const [cows, setCows] = useState<SelectDataType[]>([]);
    const [registerCalving] = useRegisterCalvingMutation();

    useEffect(() => {
        if (data) {
            const selectOptions: SelectDataType[] = data.map((animal) => ({
                value: animal.cowId,
                label: animal.name,
            }));
            setCows(selectOptions);
        }
    }, [data]);

    const registerNewCalving = async (values: RequestCalving) => {
        try {
            await registerCalving(values).unwrap();
            messageApi.open({
                type: 'success',
                content: 'Поле идентификации успешно создано',
            });
            form.resetFields();
        } catch (err) {
            if (isErrorType(err) && err?.data?.errorText) {
                messageApi.open({
                    type: 'error',
                    content: err.data.errorText,
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Сервис временно не доступен. Попробуйте позже',
                });
            }
        }
    };

    return (
        <React.Fragment>
            {contextHolder}
            <Form form={form} onFinish={registerNewCalving}>
                <div className='content-container'>
                    <h2 className='form-title'>Регистрация отёлов</h2>
                    <div>
                        <InputLabel label='Выберите корову' />
                        <Form.Item name='cowId' rules={rules}>
                            <Select className='form-input_default' options={cows}></Select>
                        </Form.Item>
                    </div>
                    <div>
                        <InputLabel label='Дата отёла' />
                        <Form.Item name='date' rules={rules}>
                            <Input type='date' className='form-input_default' placeholder='хх.хх.хххх' />
                        </Form.Item>
                    </div>
                    <div>
                        <InputLabel label='Тип отёла' />
                        <Form.Item name='complication' rules={rules}>
                            <Radio.Group className={styles['reproductive__radio-group']}>
                                <div className={styles['reproductive__radio-container']}>
                                    <div className='radio-border'>
                                        <Radio value='Нормальный'>Нормальный</Radio>
                                    </div>
                                    <div className='radio-border'>
                                        <Radio value='Сложный'>Сложный</Radio>
                                    </div>
                                    <div className='radio-border'>
                                        <Radio value='Кесарево'>Кесарево</Radio>
                                    </div>
                                    <div className='radio-border'>
                                        <Radio value='Другое'>Другое</Radio>
                                    </div>
                                </div>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div>
                        <InputLabel label='Тип' />
                        <Form.Item name='type' rules={rules}>
                            <Radio.Group className={styles['reproductive__radio-group']}>
                                <div className={styles['reproductive__radio-container']}>
                                    <div className='radio-border'>
                                        <Radio value='Живой'>Живой</Radio>
                                    </div>
                                    <div className='radio-border'>
                                        <Radio value='Мертворожденный'>Мертворожденный</Radio>
                                    </div>
                                    <div className='radio-border'>
                                        <Radio value='Аборт'>Аборт</Radio>
                                    </div>
                                </div>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div>
                        <InputLabel label='Ветеринар' />
                        <Form.Item name='veterinar'>
                            <Input className='form-input_default' placeholder='Введите ФИО' />
                        </Form.Item>
                    </div>
                    <div>
                        <InputLabel label='Назначенное лечение' />
                        <Form.Item name='treatments'>
                            <TextArea rows={3} className='form-input_default' placeholder='Дополнительная информация' />
                        </Form.Item>
                    </div>
                    <div>
                        <InputLabel label='Патологии' />
                        <Form.Item name='pathology'>
                            <TextArea rows={3} className='form-input_default' placeholder='Введите патологии' />
                        </Form.Item>
                    </div>
                    {calfType !== 'Живой' && (
                        <Button type='primary' htmlType='submit' className='form-button form-button__margin-top-xl' onClick={handleSubmit}>
                            Зарегистрировать отел
                        </Button>
                    )}
                </div>
                {calfType === 'Живой' && (
                    <div className='content-container'>
                        <h2 className='form-title'>Регистрация теленка</h2>
                        <div className='form-input_default'>
                            <InputLabel label='Номер бирки' />
                            <Form.Item name='calfId' rules={rules}>
                                <Input placeholder='Введите номер бирки' />
                            </Form.Item>
                        </div>
                        <div style={{ maxWidth: '432px' }}>
                            <InputLabel label='Теленок' />
                            <Form.Item name='inseminationType' rules={rules}>
                                <Radio.Group className={styles['reproductive__radio-group']}>
                                    <div className={styles['reproductive__radio-container']}>
                                        <div className='radio-border'>
                                            <Radio value='Телочка'>Телочка</Radio>
                                        </div>
                                        <div className='radio-border'>
                                            <Radio value='Бычок'>Бычок</Radio>
                                        </div>
                                    </div>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div>
                            <InputLabel label='Вес при рождении' />
                            <Form.Item name='name' rules={rules}>
                                <Input className='form-input_default' placeholder='Введите вес, кг' />
                            </Form.Item>
                        </div>
                        <Button type='primary' htmlType='submit' className='form-button form-button__margin-top-xl'>
                            Зарегистрировать отел
                        </Button>
                    </div>
                )}
            </Form>
            <ConfirmCalvingModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </React.Fragment>
    );
};
