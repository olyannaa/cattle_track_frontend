import { Form, Input } from 'antd';
import { InputLabel } from '../../../../../../global-components/custom-input/input-label/InputLabel';
import styles from '../ManualRegistration.module.css';
import aiStyles from './AdditionalInfoForm.module.css';
import {
    SelectResponseType,
    useGetAnimalIdentificationsQuery,
} from '../../../../services/registration-animal';
import { useEffect, useState } from 'react';

export const AdditionalInfoForm = () => {
    const { data } = useGetAnimalIdentificationsQuery();
    const [fields, setFields] = useState<SelectResponseType[]>([]);

    useEffect(() => {
        if (data?.length) {
            setFields(data);
        }
    }, [data]);

    if (!data || data?.length === 0) {
        return;
    }

    return (
        <Form.Item>
            <div className={styles['manual-register__additional-form']}>
                <InputLabel
                    marginSize='16px'
                    label='Дополнительные способы идентификации'
                />
                <div className={aiStyles['additional-info__wrapper']}>
                    {fields.map((field) => (
                        <div key={field.id}>
                            <InputLabel label={field.name} />
                            <Form.Item
                                name={field.id}
                                className={
                                    styles['manual-register__changed-input']
                                }
                            >
                                <Input placeholder='Введите значение' />
                            </Form.Item>
                        </div>
                    ))}
                </div>
            </div>
        </Form.Item>
    );
};
