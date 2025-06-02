import { Form, Select } from 'antd';
import { IFormItemSelect } from '../../../data/interface/FormInputs';
import { InputLabel } from '../../input-label/InputLabel';

export const SelectForm = ({
    label,
    name,
    options,
    placeholder,
    styles,
    defaultValue,
    onChange,
    required = false,
}: IFormItemSelect) => {
    return (
        <div style={{ maxWidth: '491px', width: '100%', ...styles }}>
            <InputLabel label={label} required={required} />
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
