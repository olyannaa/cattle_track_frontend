import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectAnimals,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import { changeDate } from '../form-add-inspection/FormAddInspection';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { useGetGroupsQuery } from '../../../../../app-service/services/general';
import { Label } from '../../custom-inputs/label/Label';
import { useEffect } from 'react';
import { selectReset } from '../../../service/dailyActionsSlice';
// import {
//     useGetGroupsQuery,
//     useGetGroupsQuery,
// } from '../../../../../app-service/services/general';

type Props = {
    isGroup: boolean;
};

type FormType = {
    dateTransfer: string | undefined;
    group: string | undefined;
    name: string | undefined;
    note: string | undefined;
};

export const FormAddTransfer = ({ isGroup }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const animals = useAppSelector(selectAnimals);
    const options = useGetGroupsQuery().data?.map((group) => ({
        label: group.name,
        value: group.id,
    }));
    const addAction = async (dataForm: FormType) => {
        const data: newDailyAction[] = selectedAnimals.map((selectAnimal) => ({
            animalId: selectAnimal,
            type: 'Перевод',
            date: changeDate(String(dataForm.dateTransfer)),
            performedBy: dataForm.name,
            notes: dataForm.note,
            newGroupId: dataForm.group,
            oldGroupId: animals.find((animal) => animal.id === selectAnimal)?.groupId,
        }));
        await createDailyActions(data);
    };

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
                <DatePickerForm name='dateTransfer' label='Дата перевода' required />
                {!isGroup && (
                    <div style={{ maxWidth: '475px', width: '100%' }}>
                        <Label label={'Старая группа'} />
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
                    options={options || []}
                    style={{ maxWidth: '475px' }}
                    required
                />
                <InputForm
                    label='Кто проводил перевод'
                    name='name'
                    placeholder='Введите ФИО'
                    required
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
