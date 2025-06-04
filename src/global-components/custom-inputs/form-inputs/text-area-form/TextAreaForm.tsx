import { Form, Input } from 'antd';
import { IFormItemInput } from '../../../data/interface/FormInputs';
import { Label } from '../../filter-inputs/Label';

export const TextAreaForm = ({
    name,
    label,
    placeholder,
    required = false,
}: IFormItemInput) => {
    const { TextArea } = Input;
    return (
        <div style={{ width: '100%' }}>
            <Label label={label} required={required} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Заполните поле' }]}
            >
                <TextArea style={{ height: '96px' }} placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};
