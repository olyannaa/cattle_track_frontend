import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { changeDate } from '../form-add-inspection/FormAddInspection';
import { useEffect } from 'react';
import { selectReset } from '../../../service/dailyActionsSlice';

type Props = {
    isGroup: boolean;
};

type FormType = {
    dateCulling: string | undefined;
    name: string | undefined;
    reason: string | undefined;
};

const options = [
    {
        label: 'Вынужденная прирезка',
        value: 'Вынужденная прирезка',
    },
    {
        label: 'Забой на мясо в хозяйстве',
        value: 'Забой на мясо в хозяйстве',
    },
    {
        label: 'Падеж',
        value: 'Падеж',
    },
    {
        label: 'Продажа',
        value: 'Продажа',
    },
    {
        label: 'Прочее',
        value: 'Прочее',
    },
    {
        label: 'Забой на мясокомбинат',
        value: 'Забой на мясокомбинат',
    },
];

export const FormAddDisposal = ({ isGroup }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const reset = useAppSelector(selectReset);
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
    }, [reset]);
    const addAction = async (dataForm: FormType) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Выбытие',
            date: changeDate(String(dataForm.dateCulling)),
            performedBy: dataForm.name,
            subtype: dataForm.reason,
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
                <div style={{ width: '100%' }}>
                    <DatePickerForm name='dateCulling' label='Дата выбытия' required />
                </div>
                <InputForm
                    label='Кто проводил выбытие'
                    name='name'
                    placeholder='Введите ФИО'
                    required
                />
                <SelectForm
                    label='Причина выбытия'
                    name='reason'
                    options={options}
                    style={{ maxWidth: '475px' }}
                    placeholder='Выберите причину'
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
