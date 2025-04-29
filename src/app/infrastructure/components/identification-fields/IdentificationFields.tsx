import { Alert, Button, Form, Input, message } from 'antd';
import React from 'react';
import { InputLabel } from '../../../../global-components/custom-inputs/input-label/InputLabel';
import {
    NewInfrastructure,
    useAddIdentificationFieldMutation,
    useDeleteIdentificationFieldMutation,
    useGetIdentificationFieldsQuery,
} from '../../services/infrastructure-service';
import { InfrastructureList } from '../infrastructure-list/InfrastructureList';
import { InfrastructureTypes } from '../../data/enums/infrastructureTypes';
import { isErrorType } from '../../../../utils/errorType';

export const IdentificationFields = () => {
    const [form] = Form.useForm();
    const {
        data: identificationFields,
        isLoading,
        isFetching,
    } = useGetIdentificationFieldsQuery();
    const [deleteIdentificationField] = useDeleteIdentificationFieldMutation();
    const [addIdentificationField] = useAddIdentificationFieldMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const showAlert: boolean =
        !isFetching &&
        !isLoading &&
        (!identificationFields || identificationFields.length === 0);

    const addNewField = async (value: NewInfrastructure) => {
        try {
            await addIdentificationField(value).unwrap();
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
            <Form form={form} className='content-container' onFinish={addNewField}>
                <h2 className='form-title'>Добавить новое поле идентификации</h2>
                <div>
                    <InputLabel label='Название поля' />
                    <Form.Item
                        name='name'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Input
                            className='form-input_default'
                            placeholder='Введите название'
                        ></Input>
                    </Form.Item>
                </div>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='form-button_default'
                    size='large'
                >
                    Добавить поле
                </Button>
                {showAlert && (
                    <Alert
                        className='alert top-margin-xl'
                        message='У вас пока нет созданных полей'
                        type='info'
                        showIcon
                    />
                )}
            </Form>
            {identificationFields && identificationFields.length !== 0 && (
                <InfrastructureList
                    list={identificationFields}
                    partInfrastructure={InfrastructureTypes.identificationField}
                    onDelete={deleteIdentificationField}
                    title='Существующие поля'
                />
            )}
        </React.Fragment>
    );
};
