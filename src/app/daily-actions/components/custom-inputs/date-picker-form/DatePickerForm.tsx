import { DatePicker, Form } from 'antd';
import { Label } from '../label/Label';
import { IFormItem } from '../../../data/interface/IFormItem';
import dayjs from 'dayjs';

export const DatePickerForm = ({ name, label, required = false }: IFormItem) => {
    return (
        <div style={{ maxWidth: '475px', width: '100%' }}>
            <Label label={label} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Заполните дату' }]}
                initialValue={dayjs()}
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
