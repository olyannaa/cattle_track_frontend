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
            <Label label={label} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Сделайте выбор' }]}
            >
                <Select
                    options={options}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
            </Form.Item>
        </div>
    );
};
