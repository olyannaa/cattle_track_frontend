import { Button, Flex, Form, FormInstance } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { useEffect } from 'react';
import { selectReset } from '../../../service/dailyActionsSlice';
import dayjs from 'dayjs';
import { FormTypeInspection } from '../../../data/types/FormTypes';

type Props = {
    isGroup: boolean;
    type: string;
    form: FormInstance<any>;
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

export const FormAddInspection = ({ isGroup, type, form }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();
    const addAction = async (dataForm: FormTypeInspection) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: type === '1' ? 'Осмотры' : 'Вакцинации и обработки',
            date: dayjs(dataForm.dateInspection).format('YYYY-MM-DD'),
            subtype: dataForm.typeInspection,
            performedBy: dataForm.name,
            result: dataForm.resultInspection,
            notes: dataForm.note,
            nextDate: dayjs(dataForm.dateNextInspection).format('YYYY-MM-DD'),
        }));
        await createDailyActions(data);
        // await getDailyActionsQuery({
        //     page: 1,
        //     type: type === '1' ? 'Осмотры' : 'Вакцинации и обработки',
        // });
        // await getPaginationInfoDailyActionsQuery(
        //     type === '1' ? 'Осмотры' : 'Вакцинации и обработки'
        // );
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
