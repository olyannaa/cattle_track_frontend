import { Button, Flex, Form } from 'antd';
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
import { FormTypeVaccination } from '../../../data/types/FormTypes';
import { optionsVaccination } from '../../../data/const/optionsSelect';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { SelectForm } from '../../../../../global-components/custom-inputs/form-inputs/select-form/SelectForm';
import { TextAreaForm } from '../../../../../global-components/custom-inputs/form-inputs/text-area-form/TextAreaForm';
import styles from '../../../styles/form-styles.module.css';

type Props = {
    resetHistory: () => void;
};

export const FormAddVaccination = ({ resetHistory }: Props) => {
    const isGroup = useAppSelector(selectIsGroup);
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeVaccination) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Вакцинации и обработки',
            date: dayjs(dataForm.date).format('YYYY-MM-DD'),
            subtype: dataForm.type,
            performedBy: dataForm.name,
            dose: dataForm.dose,
            medicine: dataForm.preparation,
            notes: dataForm.note,
            nextDate: dataForm.dateNext
                ? dayjs(dataForm.dateNext).format('YYYY-MM-DD')
                : null,
        }));
        await createDailyActions(data);
        form.resetFields();
        resetHistory();
    };

    return (
        <Form onFinish={addAction} form={form}>
            <Flex className={styles['form-body']} wrap>
                <DatePickerForm
                    name='date'
                    label='Дата обработки'
                    required
                    defaultValue={dayjs()}
                />
                <InputForm label='Кто проводил' name='name' placeholder='Введите ФИО' />
                <SelectForm
                    label='Тип обработки'
                    name='type'
                    options={optionsVaccination}
                    styles={{ maxWidth: '475px' }}
                    required
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
                <DatePickerForm name='dateNext' label='Дата следующей обработки' />
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
