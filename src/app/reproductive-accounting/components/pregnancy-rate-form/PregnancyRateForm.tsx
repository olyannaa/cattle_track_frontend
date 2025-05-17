import { Button, Form, Input, message, Radio, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { InputLabel } from '../../../../global-components/custom-inputs/input-label/InputLabel';
import styles from '../../ReproductiveAccountingPage.module.css';
import { CheckResultForm } from './check-result-form/CheckResultForm';
import { RequestPregnancy, useGetPregnanciesQuery, useRegisterPregnancyMutation } from '../../services/reproductive';
import { SelectDataType } from '../../../../utils/selectDataType';
import { isErrorType } from '../../../../utils/errorType';
import { LoadingOutlined } from '@ant-design/icons';

export const PregnancyRateForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const rules = [{ required: true, message: 'Обязательное поле' }];
    const { data, isLoading, refetch } = useGetPregnanciesQuery();
    const [cows, setCows] = useState<SelectDataType[]>([]);
    const [registerPregnancy] = useRegisterPregnancyMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (data) {
            const selectOptions: SelectDataType[] = data.map((animal) => ({
                value: animal.id,
                label: animal.name,
            }));
            setCows(selectOptions);
        }
    }, [data]);

    const registerNewPregnancy = async (values: RequestPregnancy) => {
        if (data) {
            values.cowId = data.find((animal) => animal.id === values.cowId)?.cowId ?? '';
        }
        try {
            await registerPregnancy(values).unwrap();
            messageApi.open({
                type: 'success',
                content: 'Результат проверки сохранён!',
            });
            form.resetFields();
            setTimeout(() => {
                refetch();
            });
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

    if (isLoading) {
        return (
            <div className='content-container'>
                <Spin style={{ margin: 'auto' }} indicator={<LoadingOutlined spin style={{ color: '#ff4218' }} />} />
            </div>
        );
    } else if (data?.length === 0) {
        return (
            <div className='content-container'>
                <h3 style={{ margin: 'auto' }}>Нет коров для проверки стельности</h3>
            </div>
        );
    }

    return (
        <React.Fragment>
            {contextHolder}
            <Form form={form} className='content-container' onFinish={registerNewPregnancy}>
                <h2 className='form-title'>Проверка стельности</h2>
                <div>
                    <InputLabel label='Выберите корову' />
                    <Form.Item name='cowId' rules={rules}>
                        <Select className='form-input_default' options={cows}></Select>
                    </Form.Item>
                </div>
                <div>
                    <InputLabel label='Дата проверки' />
                    <Form.Item name='date'>
                        <Input type='date' className='form-input_default' placeholder='хх.хх.хххх' />
                    </Form.Item>
                </div>
                <div>
                    <InputLabel label='Результат проверки' />
                    <Form.Item name='status'>
                        <Radio.Group className={styles['reproductive__radio-group']}>
                            <div className={styles['reproductive__radio-container']}>
                                <div className='radio-border'>
                                    <Radio value='Подлежит проверке'>Подлежит проверке</Radio>
                                </div>
                                <div className='radio-border'>
                                    <Radio value='Яловая'>Яловая</Radio>
                                </div>
                                <div className='radio-border'>
                                    <Radio value='Стельная'>Стельная</Radio>
                                </div>
                            </div>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <CheckResultForm />
                <Button type='primary' htmlType='submit'>
                    Сохранить результат проверки
                </Button>
            </Form>
        </React.Fragment>
    );
};
