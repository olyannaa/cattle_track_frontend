import { Form, Input } from 'antd';
import { InputLabel } from '../../input-label/InputLabel';
import { IFormItemInput } from '../../../data/interface/FormInputs';

export const InputForm = ({
    name,
    label,
    placeholder,
    required = false,
}: IFormItemInput) => {
    return (
        <div style={{ maxWidth: '475px', width: '100%' }}>
            <InputLabel label={label} required={required} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Заполните поле' }]}
            >
                <Input placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};
