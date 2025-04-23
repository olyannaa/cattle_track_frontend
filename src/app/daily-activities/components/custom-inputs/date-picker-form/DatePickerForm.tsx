import { DatePicker, Form } from 'antd';
import { Label } from '../label/Label';
import { IFormItem } from '../../../data/interface/IFormItem';

export const DatePickerForm = ({ name, label }: IFormItem) => {
    return (
        <div style={{ maxWidth: '475px', width: '100%' }}>
            <Label label={label} />
            <Form.Item name={name}>
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
