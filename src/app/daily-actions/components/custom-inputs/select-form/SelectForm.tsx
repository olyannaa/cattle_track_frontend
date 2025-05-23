import { Form, Select } from 'antd';
import { Label } from '../label/Label';
import { IFormItemSelect } from '../../../data/interface/IFormItem';

export const SelectForm = ({
    label,
    name,
    options,
    placeholder,
    style,
    defaultValue,
    onChange,
    required = false,
}: IFormItemSelect) => {
    return (
        <div style={{ maxWidth: '491px', width: '100%', ...style }}>
            <Label label={label} required={required} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Сделайте выбор' }]}
                initialValue={defaultValue}
            >
                <Select options={options} placeholder={placeholder} onChange={onChange} />
            </Form.Item>
        </div>
    );
};
