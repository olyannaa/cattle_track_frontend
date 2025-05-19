import { Form, Input } from 'antd';
import { Label } from '../label/Label';
import { IFormItemInput } from '../../../data/interface/IFormItem';

export const InputForm = ({
    name,
    label,
    placeholder,
    required = false,
}: IFormItemInput) => {
    return (
        <div style={{ maxWidth: '475px', width: '100%' }}>
            <Label label={label} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Заполните поле' }]}
            >
                <Input placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};
