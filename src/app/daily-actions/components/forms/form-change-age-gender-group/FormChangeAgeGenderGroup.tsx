import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectFiltersAnimals,
    selectIsGroup,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import dayjs from 'dayjs';
import { FormTypeChangeAgeGenderGroup } from '../../../data/types/FormTypes';
import { InputLabel } from '../../../../../global-components/custom-inputs/input-label/InputLabel';
import { TextAreaForm } from '../../../../../global-components/custom-inputs/form-inputs/text-area-form/TextAreaForm';

type Props = {
    resetHistory: () => void;
};

export const FormChangeAgeGenderGroup = ({ resetHistory }: Props) => {
    const isGroup = useAppSelector(selectIsGroup);
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const filters = useAppSelector(selectFiltersAnimals);
    const [form] = Form.useForm();
    const addAction = async (dataForm: FormTypeChangeAgeGenderGroup) => {
        const data: newDailyAction[] = selectedAnimals.map((animal) => ({
            animalId: animal,
            type: 'Изменение половозрастной группы',
            date: dayjs(dataForm.date).format('YYYY-MM-DD'),
            performedBy: dataForm.name,
            notes: dataForm.notes,
            oldType: filters.type,
            newType: filters.type === 'Телка' ? 'Корова' : 'Бык',
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
                    name='dateCulling'
                    label='Дата перевода'
                    required
                    defaultValue={dayjs()}
                />
                <div style={{ maxWidth: '475px', width: '100%', marginBottom: '24px' }}>
                    <InputLabel label={'Старая половозрастная группа'} required={false} />
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
                        {filters.type}
                    </Flex>
                </div>
                <div style={{ maxWidth: '475px', width: '100%', marginBottom: '24px' }}>
                    <InputLabel label={'Новая половозрастная группа'} required={false} />
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
                        {filters.type === 'Телка' ? 'Корова' : 'Бык'}
                    </Flex>
                </div>
                <InputForm
                    label='Кто проводил перевод'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <TextAreaForm
                    name='notes'
                    label='Примечания'
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
