import { Form, Radio } from 'antd';
import { Label } from '../label/Label';
import { IFormItemRadioGroup } from '../../../data/interface/IFormItem';

export const RadioGroupForm = ({
    label,
    options,
    name,
    styles,
    required = false,
}: IFormItemRadioGroup) => {
    return (
        <div style={{ width: '100%' }}>
            <Label label={label} />
            <Form.Item
                name={name}
                rules={[{ required: required, message: 'Сделайте выбор' }]}
            >
                <Radio.Group
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        ...styles,
                    }}
                    block
                    options={options}
                    optionType='button'
                />
            </Form.Item>
        </div>
    );
};
