import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { RadioGroupForm } from '../../custom-inputs/radio-group-form/RadioGroupForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../service/animalsDailyActionsSlice';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import dayjs from 'dayjs';
import { FormTypeInspection } from '../../../data/types/FormTypes';
import { optionsInspections } from '../../../data/const/optionsSelect';

type Props = {
    isGroup: boolean;
    type: string;
    resetHistory: () => void;
};

export const FormAddInspection = ({ isGroup, type, resetHistory }: Props) => {
    const [createDailyActions] = useCreateDailyActionsMutation();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
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
                <DatePickerForm
                    name='dateInspection'
                    label={`Дата ${type === '1' ? 'осмотра' : 'обработки'}`}
                    required
                    defaultValue={dayjs()}
                />
                <InputForm label='Кто проводил' name='name' placeholder='Введите ФИО' />
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
                        options={optionsInspections}
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
