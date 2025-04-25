import { Flex } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import { FormAddWrapper } from '../form-add-wrapper/FormAddWrapper';

type Props = {
    isGroup: boolean;
};

export const FormAddTransfer = ({ isGroup }: Props) => {
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
                    <DatePickerForm name='dateTransfer' label='Дата перевода' />
                </div>
                <InputForm
                    label='Новая группа'
                    name='group'
                    placeholder='Введите название'
                />
                <InputForm
                    label='Кто проводил перевод'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <TextAreaForm
                    name='note'
                    label='Примечание'
                    placeholder='Дополнительная информация'
                />
            </Flex>
        </FormAddWrapper>
    );
};
