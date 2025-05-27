import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectIsGroup,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import dayjs from 'dayjs';
import { FormTypeInspection } from '../../../data/types/FormTypes';

type Props = {
    resetHistory: () => void;
};

export const FormAddInspection = ({ resetHistory }: Props) => {
    const isGroup = useAppSelector(selectIsGroup);
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeInspection) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Осмотры',
            date: dayjs(dataForm.dateInspection).format('YYYY-MM-DD'),
            subtype: dataForm.typeInspection,
            performedBy: dataForm.name,
            result: dataForm.resultInspection,
            notes: dataForm.note,
            nextDate: dataForm.dateNextInspection
                ? dayjs(dataForm.dateNextInspection).format('YYYY-MM-DD')
                : null,
        }));
        await createDailyActions(data);
        form.resetFields();
        resetHistory();
    };

    return (
        <Form onFinish={addAction} form={form}>
            <Flex
                style={{
                    padding: '15px 16px',
                    background: '#F5F5F5',
                    marginBottom: '24px',
                    columnGap: '16px',
                }}
                wrap
            >
                <DatePickerForm
                    name='dateInspection'
                    label='Дата осмотра'
                    required
                    defaultValue={dayjs()}
                />
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
                    required
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
