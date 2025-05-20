import { Button, Flex, Form, FormInstance } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
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
import dayjs from 'dayjs';
import { FormTypeDisposal } from '../../../data/types/FormTypes';

type Props = {
    isGroup: boolean;
    form: FormInstance<any>;
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

export const FormAddDisposal = ({ isGroup, form }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();
    const addAction = async (dataForm: FormTypeDisposal) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Выбытие',
            date: dayjs(dataForm.dateCulling).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            subtype: dataForm.reason,
        }));
        await createDailyActions(data);
        await getDailyActionsQuery({
            page: 1,
            type: 'Выбытие',
            sortColumn: 'tagNumber',
            descending: true,
        });
        await getPaginationInfoDailyActionsQuery('Выбытие');
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
