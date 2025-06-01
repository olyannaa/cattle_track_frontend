import { Button, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { InputLabel } from '../../../../global-components/custom-inputs/input-label/InputLabel';
import TextArea from 'antd/es/input/TextArea';
import styles from '../../ReproductiveAccountingPage.module.css';
import { InseminationTypeForm } from './insemination-type-form/InseminationTypeForm';
import {
    RequestInsemination,
    useGetInseminationAnimalsQuery,
    useRegistrationInseminationMutation,
} from '../../services/reproductive';
import { SelectDataType } from '../../../../utils/selectDataType';
import { isErrorType } from '../../../../utils/errorType';
import dayjs from 'dayjs';

export const InseminationForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const requiredRule = [{ required: true, message: 'Обязательное поле' }];
    const { data, refetch } = useGetInseminationAnimalsQuery();
    const [cows, setCows] = useState<SelectDataType[]>([]);
    const [registerInsemination, { isLoading }] = useRegistrationInseminationMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (data) {
            const selectOptions: SelectDataType[] = data.map((animal) => ({
                value: animal.animalId,
                label: animal.name,
            }));
            setCows(selectOptions);
        }
    }, [data]);

    const registerNewInsemination = async (values: RequestInsemination) => {
        values.date = dayjs(values.date).format('YYYY-MM-DD');
        try {
            await registerInsemination(values).unwrap();
            messageApi.open({
                type: 'success',
                content: 'Осеменение зарегистрировано',
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
            <Form form={form} className='content-container' onFinish={registerNewInsemination}>
                <h2 className='form-title'>Регистрация осеменения</h2>
                <div>
                    <InputLabel label='Выберите животное из списка' required={true} />
                    <Form.Item name='cowId' rules={requiredRule}>
                        <Select className='form-input_default' options={cows}></Select>
                    </Form.Item>
                </div>
                <div>
                    <InputLabel label='Дата осеменения' required={true} />
                    <Form.Item className='form-input_default' name='date' initialValue={dayjs()} rules={requiredRule}>
                        <DatePicker
                            format='DD.MM.YYYY'
                            type='date'
                            className='form-input_default date'
                            placeholder='xx.xx.xxxx'
                        ></DatePicker>
                    </Form.Item>
                </div>
                <div>
                    <InputLabel label='Тип осеменения' required={true} />
                    <Form.Item name='inseminationType'>
                        <Radio.Group className={styles['reproductive__radio-group']}>
                            <div className={styles['reproductive__radio-container']}>
                                <div className='radio-border'>
                                    <Radio value='Искусственное'>Искусственное</Radio>
                                </div>
                                <div className='radio-border'>
                                    <Radio value='Естественное'>Естественное</Radio>
                                </div>
                                <div className='radio-border'>
                                    <Radio value='Эмбрион'>Эмбрион</Radio>
                                </div>
                            </div>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <InseminationTypeForm />
                <div>
                    <InputLabel label='Техник' />
                    <Form.Item name='technician'>
                        <Input placeholder='Введите ФИО'></Input>
                    </Form.Item>
                </div>
                <div>
                    <InputLabel label='Примечания' />
                    <Form.Item name='notes'>
                        <TextArea className='form-input_default' placeholder='Дополнительная информация'></TextArea>
                    </Form.Item>
                </div>
                <Button type='primary' htmlType='submit' loading={isLoading} disabled={isLoading}>
                    Зарегистрировать осеменение
                </Button>
            </Form>
        </React.Fragment>
    );
};
