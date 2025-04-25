import { Form, Select } from 'antd';
import { Label } from '../label/Label';
import { IFormItemSelect } from '../../../data/interface/IFormItem';

export const SelectForm = ({
    label,
    name,
    options,
    placeholder,
    style,
}: IFormItemSelect) => {
    return (
        <div style={{ maxWidth: '491px', width: '100%', ...style }}>
            <Label label={label} />
            <Form.Item name={name}>
                <Select options={options} placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};
