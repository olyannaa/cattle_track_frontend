import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
import { TextAreaForm } from '../../../../../global-components/custom-inputs/form-inputs/text-area-form/TextAreaForm';
import { CheckboxCustom } from '../../../../../global-components/custom-inputs/checkbox/Checkbox';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
    useCreateDailyActionsWithoutResetFiltersMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import dayjs from 'dayjs';
import { FormTypeResearch } from '../../../data/types/FormTypes';
import { optionsResearch } from '../../../data/const/optionsSelect';
import { SelectForm } from '../../../../../global-components/custom-inputs/form-inputs/select-form/SelectForm';
import styles from '../../../styles/form-styles.module.css';

type Props = {
    isGroup: boolean;
    resetHistory: () => void;
    num: number;
    formsIdLength: number;
    setFormsId: React.Dispatch<React.SetStateAction<string[]>>;
    idForm: string;
};

export const FormAddResearch = ({
    isGroup,
    resetHistory,
    num,
    setFormsId,
    formsIdLength,
    idForm,
}: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const [createDailyActionsWithoutResetFilters] =
        useCreateDailyActionsWithoutResetFiltersMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeResearch) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Исследования',
            date: dayjs(dataForm.date).format('YYYY-MM-DD'),
            performedBy: dataForm.performedBy,
            notes: dataForm.notes,
            materialType: dataForm.materialType,
            result: dataForm.result?.target.checked ? 'true' : 'false',
            researchName: dataForm.researchName,
        }));
        if (formsIdLength > 1) {
            await createDailyActionsWithoutResetFilters(data);
        } else {
            await createDailyActions(data);
        }
        form.resetFields();
        resetHistory();
        setFormsId((last) => last.filter((id) => id !== idForm));
    };

    const addForm = () => {
        setFormsId((last) => [
            ...last,
            Date.now().toString(36) + Math.random().toString(36).substring(2),
        ]);
    };

    const deleteForms = () => {
        setFormsId((last) => [last[0]]);
    };

    return (
        <Form onFinish={addAction} form={form}>
            <Flex className={styles['form-body']} wrap>
                <InputForm
                    label='Название исследования'
                    name='researchName'
                    placeholder='Введите название'
                    required
                />
                <DatePickerForm
                    name='date'
                    label='Дата забора материала'
                    required
                    defaultValue={dayjs()}
                />
                <SelectForm
                    label='Вид материала'
                    name='materialType'
                    options={optionsResearch}
                    styles={{ maxWidth: '475px' }}
                    required
                />
                <InputForm
                    label='Кто проводил взятие'
                    name='performedBy'
                    placeholder='Введите ФИО'
                />
                <Form.Item name='result' style={{ maxWidth: '475px', width: '100%' }}>
                    <CheckboxCustom
                        title='Положительный результат'
                        style={{ maxWidth: '475px' }}
                    />
                </Form.Item>
                <TextAreaForm
                    name='notes'
                    label='Примечания'
                    placeholder='Дополнительная информация'
                />
            </Flex>
            <Flex gap={16}>
                <Button
                    type='primary'
                    size='large'
                    color='default'
                    variant='solid'
                    htmlType='submit'
                >
                    {isGroup ? 'Сохранить для выбранных животных' : 'Сохранить'}
                </Button>
                {formsIdLength > 1 && formsIdLength === num && (
                    <Button size='large' onClick={deleteForms}>
                        Сбросить все групповые формы
                    </Button>
                )}
                {num === 1 && isGroup && (
                    <Button size='large' onClick={addForm}>
                        Добавить еще одно групповое исследование
                    </Button>
                )}
            </Flex>
        </Form>
    );
};
