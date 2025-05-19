import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { changeDate } from '../form-add-inspection/FormAddInspection';
import { selectReset } from '../../../service/dailyActionsSlice';
import { useEffect } from 'react';

type Props = {
    isGroup: boolean;
};

type FormType = {
    dateNextInspection: string | undefined;
    dateStartTreatment: string | undefined;
    diagnosis: string | undefined;
    dose: string | undefined;
    name: string | undefined;
    note: string | undefined;
    preparation: string | undefined;
};

export const FormAddTreatment = ({ isGroup }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const addAction = async (dataForm: FormType) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Лечение',
            date: changeDate(String(dataForm.dateStartTreatment)),
            performedBy: dataForm.name,
            notes: dataForm.note,
            nextDate: changeDate(String(dataForm.dateNextInspection)),
            medicine: dataForm.preparation,
            dose: dataForm.dose,
            result: dataForm.diagnosis,
        }));
        await createDailyActions(data);
    };

    const reset = useAppSelector(selectReset);
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
    }, [reset]);

    return (
        <Form onFinish={addAction} form={form}>
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
                    required
                />
                <InputForm
                    label='Кто проводил лечение'
                    name='name'
                    placeholder='Введите ФИО'
                    required
                />
                <DatePickerForm
                    name='dateStartTreatment'
                    label='Дата начала лечения'
                    required
                />
                <DatePickerForm
                    name='dateNextInspection'
                    label='Дата следующего осмотра'
                    required
                />
                <InputForm
                    label='Препарат'
                    name='preparation'
                    placeholder='Укажите препарат'
                    required
                />
                <InputForm label='Доза' name='dose' placeholder='Укажите дозу' required />
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
