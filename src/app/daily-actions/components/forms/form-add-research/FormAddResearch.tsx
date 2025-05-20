import { Button, Flex, Form, FormInstance } from 'antd';
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
import dayjs from 'dayjs';
import { FormTypeResearch } from '../../../data/types/FormTypes';

type Props = {
    isGroup: boolean;
    form: FormInstance<any>;
};

export const optionsResearch = [
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

export const FormAddResearch = ({ isGroup, form }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const addAction = async (dataForm: FormTypeResearch) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Исследования',
            date: dayjs(dataForm.dateResearch).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            notes: dataForm.note,
            materialType: dataForm.typeMaterial,
            result: dataForm.result?.target.checked ? 'true' : 'false',
            researchName: dataForm.nameResearch,
        }));
        await createDailyActions(data);
    };
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
                    options={optionsResearch}
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
