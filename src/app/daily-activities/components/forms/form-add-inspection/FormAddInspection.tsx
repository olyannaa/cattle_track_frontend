import { Flex } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import { FormAddWrapper } from '../form-add-wrapper/FormAddWrapper';

type Props = {
    isGroup: boolean;
};

export const FormAddInspection = ({ isGroup }: Props) => {
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
                <DatePickerForm name='dateInspection' label='Дата осмотра' />
                <InputForm label='Кто проводил' name='name' placeholder='Введите ФИО' />
                <RadioGroupForm
                    label='Тип осмотра'
                    options={[
                        'Плановый',
                        'Внеплановый',
                        'Диагностический',
                        'Предубойный',
                    ]}
                    name='typeInspection'
                    styles={{ gap: '16px' }}
                />

                <TextAreaForm
                    name='note'
                    label='Примечание'
                    placeholder='Дополнительная информация'
                />
                <TextAreaForm
                    name='resultInspection'
                    label='Результаты осмотра'
                    placeholder='Дополнительная информация'
                />
                <DatePickerForm
                    name='dateNextInspection'
                    label='Дата следующего осмотра'
                />
            </Flex>
        </FormAddWrapper>
    );
};
