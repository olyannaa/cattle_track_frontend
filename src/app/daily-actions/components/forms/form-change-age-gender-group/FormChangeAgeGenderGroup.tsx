import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectFiltersAnimals,
    selectIsGroup,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import dayjs from 'dayjs';
import { FormTypeChangeAgeGenderGroup } from '../../../data/types/FormTypes';
import { InputLabel } from '../../../../../global-components/custom-inputs/input-label/InputLabel';
import { TextAreaForm } from '../../../../../global-components/custom-inputs/form-inputs/text-area-form/TextAreaForm';
import { FieldCustom } from '../../../../../global-components/custom-inputs/field/Field';
import { stylesFormDailyActions } from '../../../../../styles/form-action-daily-styles';

type Props = {
    resetHistory: () => void;
};

export const FormChangeAgeGenderGroup = ({ resetHistory }: Props) => {
    const isGroup = useAppSelector(selectIsGroup);
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const filters = useAppSelector(selectFiltersAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeChangeAgeGenderGroup) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Изменение половозрастной группы',
            date: dayjs(dataForm.date).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            notes: dataForm.notes,
            oldType: filters.type,
            newType: filters.type === 'Телка' ? 'Корова' : 'Бык',
        }));
        await createDailyActions(data);
        form.resetFields();
        resetHistory();
    };

    return (
        <Form onFinish={addAction} form={form}>
            <Flex style={{ ...stylesFormDailyActions }} wrap>
                <DatePickerForm
                    name='dateCulling'
                    label='Дата перевода'
                    required
                    defaultValue={dayjs()}
                />
                <FieldCustom
                    label='Старая половозрастная группа'
                    value={filters.type || ''}
                />
                <FieldCustom
                    label='Новая половозрастная группа'
                    value={filters.type === 'Телка' ? 'Корова' : 'Бык'}
                />
                <InputForm
                    label='Кто проводил перевод'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <TextAreaForm
                    name='notes'
                    label='Примечания'
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
