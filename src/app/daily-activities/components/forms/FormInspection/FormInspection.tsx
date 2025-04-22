import { Form } from 'antd';
import { CustomDatePicker } from '../../custom-inputs/date-picker/CustomDatePicker';
import { CustomRadioGroup } from '../../custom-inputs/radio-group/CustomRadioGroup';
import { CustomTextArea } from '../../custom-inputs/text-area/CustomTextArea';
import { PersonInput } from '../../custom-inputs/person-input/PersonInput';

export const FormInspection = () => {
    return (
        <Form style={{ padding: '15px 16px', background: '#F5F5F5' }} layout='vertical'>
            <CustomDatePicker name='dateInspection' label='Дата осмотра' />
            <CustomRadioGroup
                label='Тип осмотра'
                options={['Плановый', 'Внеплановый', 'Диагностический', 'Предубойный']}
                name='typeInspection'
            />
            <PersonInput label='Кто проводил' name='name' placeholder='Введите ФИО' />
            <CustomTextArea
                name='note'
                label='Примечание'
                placeholder='Дополнительная информация'
            />
            <CustomTextArea
                name='resultInspection'
                label='Результаты осмотра'
                placeholder='Дополнительная информация'
            />
            <CustomDatePicker name='dateNextInspection' label='Дата следующего осмотра' />
        </Form>
    );
};
