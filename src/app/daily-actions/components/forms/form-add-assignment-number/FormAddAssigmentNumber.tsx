import { Button, Flex, Form, FormInstance } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    IAnimal,
    newDailyAction,
    useCreateDailyActionsMutation,
    useLazyGetAnimalByIdQuery,
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { useEffect, useState } from 'react';
import { useGetIdentificationsFieldsQuery } from '../../../../../app-service/services/general';
import dayjs from 'dayjs';
import { FormTypeAssigmentNumber } from '../../../data/types/FormTypes';

type Props = {
    isGroup: boolean;
    form: FormInstance<any>;
};

export const FormAddAssigmentNumber = ({ isGroup, form }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const identificationFields =
        useGetIdentificationsFieldsQuery().data?.map((field) => ({
            label: field.name,
            value: field.id,
        })) || [];
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalByIdQuery] = useLazyGetAnimalByIdQuery();
    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();

    const [animal, setAnimal] = useState<IAnimal>();
    const [selectedField, setSelectedField] = useState<string>(
        identificationFields[0]?.value
    );
    const addAction = async (dataForm: FormTypeAssigmentNumber) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Присвоение номеров',
            date: dayjs(dataForm.date).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            subtype: identificationFields.find((field) => field.value === selectedField)
                ?.label,
            identificationValue: dataForm.value,
        }));
        await createDailyActions(data);
        await getDailyActionsQuery({ page: 1, type: 'Присвоение номеров' });
        await getPaginationInfoDailyActionsQuery('Присвоение номеров');
    };

    const getAnimalById = async () => {
        const response = (await getAnimalByIdQuery(selectedAnimals[0])).data;
        setAnimal(response);
    };

    useEffect(() => {
        getAnimalById();
    }, [selectedAnimals[0]]);

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
                <SelectForm
                    label='Тип идентификации'
                    name='type'
                    options={identificationFields}
                    defaultValue={identificationFields[0]?.value || ''}
                    style={{ maxWidth: '475px' }}
                    placeholder='Выберите причину'
                    required
                    onChange={(value) => setSelectedField(value)}
                />
                <InputForm
                    label='Значение'
                    name='value'
                    placeholder='Укажите новое значение'
                    required
                />
                <Flex
                    style={{
                        padding: '0 11px',
                        background: '#FFFFFF',
                        border: '1px solid #D9D9D9',
                        height: '40px',
                        fontSize: '16px',
                        color: '#00000040',
                        maxWidth: '475px',
                        width: '100%',
                    }}
                    align='center'
                >
                    {`${
                        identificationFields.find(
                            (field) => field.value === selectedField
                        )?.label
                    }: ${
                        animal?.identificationFields.find(
                            (field) =>
                                field.name ===
                                identificationFields.find(
                                    (field) => field.value === selectedField
                                )?.label
                        )?.value || ''
                    }`}
                </Flex>
                <DatePickerForm name='date' label='Дата присвоения' required />
                <InputForm
                    label='Кто присвоил'
                    name='name'
                    placeholder='Введите ФИО'
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
