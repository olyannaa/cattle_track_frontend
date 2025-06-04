import { Form, InputNumber } from 'antd';
import { Label } from '../../filter-inputs/Label';
import { IFormItemInputNumber } from '../../../data/interface/FormInputs';

export const NumberInputForm = ({
    label,
    name,
    styles,
    defaultValue,
    onChange,
    required = false,
}: IFormItemInputNumber) => {
    return (
        <div style={{ maxWidth: '416px', width: '100%', ...styles }}>
            <Label label={label} required={required} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Введите значение' }]}
                initialValue={defaultValue}
            >
                <InputNumber min={1} onChange={onChange} style={{ width: '100%' }} />
            </Form.Item>
        </div>
    );
};
