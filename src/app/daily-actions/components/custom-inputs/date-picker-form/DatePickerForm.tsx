import { DatePicker, Form } from 'antd';
import { Label } from '../label/Label';
import { IFormItem } from '../../../data/interface/IFormItem';

export const DatePickerForm = ({
    name,
    label,
    required = false,
    defaultValue,
}: IFormItem) => {
    return (
        <div style={{ maxWidth: '475px', width: '100%' }}>
            <Label label={label} required={required} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Заполните дату' }]}
                initialValue={defaultValue}
            >
                <DatePicker
                    placeholder='xx.xx.xxxx'
                    format='DD.MM.YYYY'
                    style={{ width: '100%' }}
                    size='large'
                />
            </Form.Item>
        </div>
    );
};
