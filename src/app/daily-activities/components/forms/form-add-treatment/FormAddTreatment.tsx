import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';

type Props = {
    isGroup: boolean;
};

export const FormAddTreatment = ({ isGroup }: Props) => {
    return (
        <Form>
            <Flex
                gap='16px'
                style={{
                    padding: '15px 16px',
                    background: '#F5F5F5',
                    marginBottom: '24px',
                }}
                wrap
            >
                <InputForm
                    label='Диагноз'
                    name='diagnosis'
                    placeholder='Укажите диагноз'
                />
                <InputForm
                    label='Кто проводил лечение'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <DatePickerForm name='dateStartTreatment' label='Дата начала лечения' />
                <DatePickerForm
                    name='dateNextInspection'
                    label='Дата следующего осмотра'
                />
                <InputForm
                    label='Препарат'
                    name='preparation'
                    placeholder='Укажите препарат'
                />
                <InputForm label='Доза' name='dose' placeholder='Укажите дозу' />
                <TextAreaForm
                    name='note'
                    label='Примечание'
                    placeholder='Дополнительная информация'
                />
            </Flex>
            <Button
                type='primary'
                size='large'
                color='default'
                variant='solid'
                htmlType='submit'
            >
                {isGroup ? 'Сохранить для выбранных животных' : 'Сохранить'}
            </Button>
        </Form>
    );
};
