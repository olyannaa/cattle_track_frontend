import { Button, Flex, Form } from 'antd';
import { DatePickerForm } from '../../../../../global-components/custom-inputs/form-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../../../../global-components/custom-inputs/form-inputs/input-form/InputForm';
import {
    newDailyAction,
    useCreateDailyActionsMutation,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import {
    selectIsGroup,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import dayjs from 'dayjs';
import { FormTypeDisposal } from '../../../data/types/FormTypes';
import { optionsDisposal } from '../../../data/const/optionsSelect';
import { SelectForm } from '../../../../../global-components/custom-inputs/form-inputs/select-form/SelectForm';
import styles from '../../../styles/form-styles.module.css';

type Props = {
    resetHistory: () => void;
};

export const FormAddDisposal = ({ resetHistory }: Props) => {
    const isGroup = useAppSelector(selectIsGroup);
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
            <Flex className={styles['form-body']} wrap>
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
                    styles={{ maxWidth: '475px' }}
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
