import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
import {
    IAnimal,
    newDailyAction,
    useCreateDailyActionsMutation,
    useLazyGetAnimalByIdQuery,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectIsGroup,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import { useEffect, useState } from 'react';
import { useGetIdentificationsFieldsQuery } from '../../../../../app-service/services/general';
import dayjs from 'dayjs';
import { FormTypeAssigmentNumber } from '../../../data/types/FormTypes';
import { SelectForm } from '../../../../../global-components/custom-inputs/form-inputs/select-form/SelectForm';
import { stylesFormDailyActions } from '../../../../../styles/form-action-daily-styles';

type Props = {
    resetHistory: () => void;
};

export const FormAddAssigmentNumber = ({ resetHistory }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const isGroup = useAppSelector(selectIsGroup);
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [animal, setAnimal] = useState<IAnimal>();
    const [form] = Form.useForm();
    const [getAnimalByIdQuery] = useLazyGetAnimalByIdQuery();

    const identificationFields =
        useGetIdentificationsFieldsQuery().data?.map((field) => ({
            label: field.name,
            value: field.id,
        })) || [];
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
        form.resetFields();
        resetHistory();
    };

    const getAnimalById = async () => {
        const response = (await getAnimalByIdQuery(selectedAnimals[0])).data;
        setAnimal(response);
    };

    useEffect(() => {
        getAnimalById();
    }, [selectedAnimals[0]]);

    return (
        <Flex vertical gap={24}>
            <Flex
                vertical
                style={{
                    padding: '16px',
                    border: '1px solid #D9D9D9',
                    borderRadius: '2px',
                }}
                gap={16}
            >
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    Информация о выбранном животном
                </div>
                <Flex vertical gap={12} style={{ marginLeft: '20px' }}>
                    <div>
                        {' '}
                        {`Животное: ${animal?.tagNumber}, ${animal?.type}, группа: ${
                            animal?.groupName || 'Не назначена'
                        }`}
                    </div>
                    {animal?.identificationFields.map(
                        (field) =>
                            field.value && (
                                <div key={field.name}>{`${field.name}: ${
                                    field.value || 'Не назначено'
                                }`}</div>
                            )
                    )}
                </Flex>
            </Flex>
            <Form onFinish={addAction} form={form}>
                <Flex style={{ ...stylesFormDailyActions }} wrap>
                    <SelectForm
                        label='Тип идентификации'
                        name='type'
                        options={identificationFields}
                        defaultValue={identificationFields[0]?.value || ''}
                        styles={{ maxWidth: '475px' }}
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
                    <div style={{ width: '100%', marginBottom: '16px' }}>
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
                    </div>

                    <DatePickerForm name='date' label='Дата присвоения' required />
                    <InputForm
                        label='Кто присвоил'
                        name='name'
                        placeholder='Введите ФИО'
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
        </Flex>
    );
};
