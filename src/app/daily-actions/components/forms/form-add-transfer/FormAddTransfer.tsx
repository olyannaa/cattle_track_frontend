import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { TextAreaForm } from '../../../../../global-components/custom-inputs/form-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectAnimals,
    selectIsGroup,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import { useGetGroupQuery } from '../../../../../app-service/services/general';
import dayjs from 'dayjs';
import { FormTypeTransfer } from '../../../data/types/FormTypes';
import { useEffect, useState } from 'react';
import { SelectForm } from '../../../../../global-components/custom-inputs/form-inputs/select-form/SelectForm';
import { InputLabel } from '../../../../../global-components/custom-inputs/input-label/InputLabel';

type Props = {
    resetHistory: () => void;
};

export const FormAddTransfer = ({ resetHistory }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const isGroup = useAppSelector(selectIsGroup);
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [oldGroup, setOldGroup] = useState<string>('');
    const [form] = Form.useForm();
    const animals = useAppSelector(selectAnimals);
    const options =
        useGetGroupQuery().data?.map((group) => ({
            label: group.name,
            value: group.id,
        })) || [];

    useEffect(() => {
        if (!isGroup) {
            setOldGroup(
                animals.find((animal) => animal.id === selectedAnimals[0])?.groupId || ''
            );
        }
    }, [selectAnimals]);

    const addAction = async (dataForm: FormTypeTransfer) => {
        const data: newDailyAction[] = selectedAnimals.map((selectAnimal) => ({
            animalId: selectAnimal,
            type: 'Перевод',
            date: dayjs(dataForm.dateTransfer).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            notes: dataForm.note,
            newGroupId: dataForm.group,
            oldGroupId: animals.find((animal) => animal.id === selectAnimal)?.groupId,
        }));
        await createDailyActions(data);
        form.resetFields();
        resetHistory();
    };

    return (
        <Form onFinish={addAction} form={form}>
            <Flex
                style={{
                    padding: '15px 16px',
                    background: '#F5F5F5',
                    marginBottom: '24px',
                    columnGap: '16px',
                }}
                wrap
            >
                <DatePickerForm
                    name='dateTransfer'
                    label='Дата перевода'
                    required
                    defaultValue={dayjs()}
                />
                {!isGroup && (
                    <div style={{ maxWidth: '475px', width: '100%' }}>
                        <InputLabel label={'Старая группа'} required={false} />
                        <Flex
                            style={{
                                padding: '0 11px',
                                background: '#FFFFFF',
                                border: '1px solid #D9D9D9',
                                height: '40px',
                                fontSize: '16px',
                                color: '#00000040',
                            }}
                            align='center'
                        >
                            {animals.find((animal) => animal.id === selectedAnimals[0])
                                ?.groupName || ' '}
                        </Flex>
                    </div>
                )}
                <SelectForm
                    label='Новая группа'
                    name='group'
                    placeholder='Выберите группу '
                    options={
                        !isGroup
                            ? options?.filter((option) => option.value !== oldGroup)
                            : options
                    }
                    styles={{ maxWidth: '475px' }}
                    required
                />
                <InputForm
                    label='Кто проводил перевод'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <TextAreaForm
                    name='note'
                    label='Примечание'
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
