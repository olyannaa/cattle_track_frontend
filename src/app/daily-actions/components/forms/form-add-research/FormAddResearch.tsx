import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { CheckboxCustom } from '../../../../../global-components/custom-inputs/checkbox/Checkbox';
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
    dateResearch: string | undefined;
    name: string | undefined;
    nameResearch: string | undefined;
    note: string | undefined;
    result: { target: { checked: boolean } } | undefined;
    typeMaterial: string | undefined;
};

const options = [
    {
        label: 'Молоко',
        value: 'Молоко',
    },
    {
        label: 'Моча',
        value: 'Моча',
    },
    {
        label: 'Кал',
        value: 'Кал',
    },
    {
        label: 'Соскоб',
        value: 'Соскоб',
    },
    {
        label: 'Смыв',
        value: 'Смыв',
    },
    {
        label: 'Другое',
        value: 'Другое',
    },
];

export const FormAddResearch = ({ isGroup }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const reset = useAppSelector(selectReset);
    const [form] = Form.useForm();

    const addAction = async (dataForm: FormType) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Исследования',
            date: changeDate(String(dataForm.dateResearch)),
            performedBy: dataForm.name,
            notes: dataForm.note,
            materialType: dataForm.typeMaterial,
            result: dataForm.result?.target.checked ? 'true' : 'false',
            researchName: dataForm.nameResearch,
        }));
        await createDailyActions(data);
    };

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
                    label='Название исследования'
                    name='nameResearch'
                    placeholder='Введите название'
                    required
                />
                <DatePickerForm
                    name='dateResearch'
                    label='Дата забора материала'
                    required
                />
                <SelectForm
                    label='Вид материала'
                    name='typeMaterial'
                    options={options}
                    style={{ maxWidth: '475px' }}
                    required
                />
                <InputForm
                    label='Кто проводил взятие'
                    name='name'
                    placeholder='Введите ФИО'
                    required
                />
                <Form.Item name='result' style={{ maxWidth: '475px', width: '100%' }}>
                    <CheckboxCustom
                        title='Положительный результат'
                        style={{ maxWidth: '475px' }}
                    />
                </Form.Item>
                <TextAreaForm
                    name='note'
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
