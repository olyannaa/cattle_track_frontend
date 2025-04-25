import { Flex } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import { FormAddWrapper } from '../form-add-wrapper/FormAddWrapper';

type Props = {
    isGroup: boolean;
};

export const FormAddCulling = ({ isGroup }: Props) => {
    return (
        <FormAddWrapper isGroup={isGroup}>
            <Flex
                gap='16px'
                style={{
                    padding: '15px 16px',
                    background: '#F5F5F5',
                    marginBottom: '24px',
                }}
                wrap
            >
                <div style={{ width: '100%' }}>
                    <DatePickerForm name='dateCulling' label='Дата выбраковки' />
                </div>
                <InputForm
                    label='Кто проводил выбраковку'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <InputForm
                    label='Новая группа'
                    name='reasonCulling'
                    placeholder='Введите причину'
                />
            </Flex>
        </FormAddWrapper>
    );
};
