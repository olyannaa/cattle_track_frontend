import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    IAnimal,
    newDailyAction,
    useCreateDailyActionsMutation,
    useLazyGetAnimalByIdQuery,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { changeDate } from '../form-add-inspection/FormAddInspection';
import { useEffect, useState } from 'react';
import { useGetIdentificationsFieldsQuery } from '../../../../../app-service/services/general';
import { selectReset } from '../../../service/dailyActionsSlice';

type Props = {
    isGroup: boolean;
};

type FormType = {
    date: string | undefined;
    name: string | undefined;
    type: string | undefined;
    value: string | undefined;
};

export const FormAddAssigmentNumber = ({ isGroup }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const identificationFields =
        useGetIdentificationsFieldsQuery().data?.map((field) => ({
            label: field.name,
            value: field.id,
        })) || [];
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalByIdQuery] = useLazyGetAnimalByIdQuery();
    const [animal, setAnimal] = useState<IAnimal>();
    const [selectedField, setSelectedField] = useState<string>(
        identificationFields[0]?.value
    );
    const addAction = async (dataForm: FormType) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Присвоение номеров',
            date: changeDate(String(dataForm.date)),
            performedBy: dataForm.name,
            subtype: dataForm.type,
            identificationValue: dataForm.value,
        }));
        await createDailyActions(data);
    };

    const getAnimalById = async () => {
        const response = (await getAnimalByIdQuery(selectedAnimals[0])).data;
        setAnimal(response);
    };

    useEffect(() => {
        getAnimalById();
    }, [selectedAnimals[0]]);

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
                <SelectForm
                    label='Тип идентификации'
                    name='type'
                    options={identificationFields}
                    defaultValue={identificationFields[0]?.value || ''}
                    style={{ maxWidth: '475px' }}
                    placeholder='Выберите причину'
                    required
                    onChange={(value) =>
                        setSelectedField(
                            identificationFields.find((field) => field.value === value)
                                ?.label || ''
                        )
                    }
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
