import { Form, Input } from 'antd';
import { Label } from '../label/Label';
import { IFormItemInput } from '../../../data/interface/IFormItem';

export const TextAreaForm = ({ name, label, placeholder }: IFormItemInput) => {
    const { TextArea } = Input;
    return (
        <div style={{ width: '100%' }}>
            <Label label={label} />
            <Form.Item name={name}>
                <TextArea style={{ height: '96px' }} placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};
