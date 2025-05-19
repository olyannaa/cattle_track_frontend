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
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { useEffect } from 'react';
import { selectReset } from '../../../service/dailyActionsSlice';

type Props = {
    isGroup: boolean;
    type: string;
};

type FormType = {
    dateInspection: string | undefined;
    dateNextInspection: string | undefined;
    name: string | undefined;
    note: string | undefined;
    resultInspection: string | undefined;
    typeInspection: string | undefined;
};

const months: Record<string, string> = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
};

export const changeDate = (date: string) => {
    const arr = date.split(' ');
    return `${arr[3]}-${months[arr[2]]}-${
        String(Number(arr[1]) + 1).length < 2
            ? '0' + String(Number(arr[1]) + 1)
            : String(Number(arr[1]) + 1)
    }`;
};

const options = [
    {
        label: 'Вакцинация',
        value: 'Вакцинация',
    },
    {
        label: 'Дегельминтизация',
        value: 'Дегельминтизация',
    },
    {
        label: 'Обработка от эктопаразитов',
        value: 'Обработка от эктопаразитов',
    },
    {
        label: 'Другое',
        value: 'Другое',
    },
];

export const FormAddInspection = ({ isGroup, type }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const reset = useAppSelector(selectReset);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormType) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: type === '1' ? 'Осмотры' : 'Вакцинации и обработки',
            date: changeDate(String(dataForm.dateInspection)),
            subtype: dataForm.typeInspection,
            performedBy: dataForm.name,
            result: dataForm.resultInspection,
            notes: dataForm.note,
            nextDate: changeDate(String(dataForm.dateNextInspection)),
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
                <DatePickerForm
                    name='dateInspection'
                    label={`Дата ${type === '1' ? 'осмотра' : 'обработки'}`}
                    required
                />
                <InputForm
                    label='Кто проводил'
                    name='name'
                    placeholder='Введите ФИО'
                    required
                />
                {type === '1' ? (
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
                ) : (
                    <SelectForm
                        label='Тип обработки'
                        name='typeInspection'
                        options={options}
                        style={{ maxWidth: '475px' }}
                        required
                    />
                )}

                <TextAreaForm
                    name='note'
                    label='Примечание'
                    placeholder='Дополнительная информация'
                />
                <TextAreaForm
                    name='resultInspection'
                    label={`Результаты ${type === '1' ? 'осмотра' : 'обработки'}`}
                    placeholder='Дополнительная информация'
                    required
                />
                <DatePickerForm
                    name='dateNextInspection'
                    label={`Дата ${
                        type === '1' ? 'следующего осмотра' : 'следующей обработки'
                    }`}
                    required
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
