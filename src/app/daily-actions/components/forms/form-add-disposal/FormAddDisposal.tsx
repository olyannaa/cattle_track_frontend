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
import dayjs from 'dayjs';
import { FormTypeDisposal } from '../../../data/types/FormTypes';
import { optionsDisposal } from '../../../data/const/optionsSelect';

type Props = {
    isGroup: boolean;
    resetHistory: () => void;
};

export const FormAddDisposal = ({ isGroup, resetHistory }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeDisposal) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Выбытие',
            date: dayjs(dataForm.dateCulling).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            subtype: dataForm.reason,
        }));
        await createDailyActions(data);
        form.resetFields();
        resetHistory();
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
                    <DatePickerForm
                        name='dateCulling'
                        label='Дата выбытия'
                        required
                        defaultValue={dayjs()}
                    />
                </div>
                <InputForm
                    label='Кто проводил выбытие'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <SelectForm
                    label='Причина выбытия'
                    name='reason'
                    options={optionsDisposal}
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
