import { Flex, Form } from 'antd';
import { DatePickerForm } from '../../custom-inputs/date-picker-form/DatePickerForm';
import { InputForm } from '../../custom-inputs/input-form/InputForm';
import { FormAddWrapper } from '../form-add-wrapper/FormAddWrapper';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { TextAreaForm } from '../../custom-inputs/text-area-form/TextAreaForm';
import { CheckboxCustom } from '../../../../../global-components/custom-inputs/checkbox/Checkbox';

type Props = {
    isGroup: boolean;
};

export const FormAddResearch = ({ isGroup }: Props) => {
    return (
        <FormAddWrapper isGroup={isGroup}>
            <Flex
                gap='16px'
                style={{
                    padding: '15px 16px',
                    background: '#F5F5F5',
                    marginBottom: '24px',
                }}
                wrap
            >
                <InputForm
                    label='Название исследования'
                    name='nameResearch'
                    placeholder='Введите название'
                />
                <DatePickerForm name='dateResearch' label='Дата забора материала' />
                <SelectForm
                    label='Вид материала'
                    name='typeMaterial'
                    options={[]}
                    style={{ maxWidth: '475px' }}
                />
                <InputForm
                    label='Кто проводил взятие'
                    name='name'
                    placeholder='Введите ФИО'
                />
                <Form.Item name='result' style={{ maxWidth: '475px', width: '100%' }}>
                    <CheckboxCustom
                        title='Положительный результат'
                        style={{ maxWidth: '475px' }}
                    />
                </Form.Item>
                <TextAreaForm
                    name='note'
                    label='Примечания'
                    placeholder='Дополнительная информация'
                />
            </Flex>
        </FormAddWrapper>
    );
};
