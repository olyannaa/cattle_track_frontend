import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';

type Props = {
    isGroup: boolean;
};

export const FormAddInspection = ({ isGroup }: Props) => {
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
