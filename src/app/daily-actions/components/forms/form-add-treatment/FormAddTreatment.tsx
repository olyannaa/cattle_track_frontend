import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { TextAreaForm } from '../../../../../global-components/custom-inputs/form-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
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
import { FormTypeTreatment } from '../../../data/types/FormTypes';
import styles from '../../../styles/form-styles.module.css';

type Props = {
    resetHistory: () => void;
};

export const FormAddTreatment = ({ resetHistory }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const isGroup = useAppSelector(selectIsGroup);
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeTreatment) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Лечение',
            date: dayjs(dataForm.dateStartTreatment).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            notes: dataForm.note,
            nextDate: dataForm.dateNextInspection
                ? dayjs(dataForm.dateNextInspection).format('YYYY-MM-DD')
                : null,
            medicine: dataForm.preparation,
            dose: dataForm.dose,
            result: dataForm.diagnosis,
        }));
        await createDailyActions(data);
        form.resetFields();
        resetHistory();
    };

    return (
        <Form onFinish={addAction} form={form}>
            <Flex className={styles['form-body']} wrap>
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
                />
                <DatePickerForm
                    name='dateStartTreatment'
                    label='Дата начала лечения'
                    required
                    defaultValue={dayjs()}
                />
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
