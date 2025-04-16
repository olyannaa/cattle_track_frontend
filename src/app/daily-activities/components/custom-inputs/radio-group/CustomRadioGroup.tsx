import { Form, Radio } from 'antd';
import { Label } from '../label/Label';
import { CheckboxGroupProps } from 'antd/es/checkbox';

export const CustomRadioGroup = ({
    label,
    options,
    name,
}: {
    label: string;
    options: CheckboxGroupProps<string>['options'];
    name: string;
}) => {
    return (
        <>
            <Label label={label} />
            <Form.Item name={name}>
                <Radio.Group
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: '848px',
                        gap: '4px',
                    }}
                    block
                    options={options}
                    optionType='button'
                />
            </Form.Item>
        </>
    );
};
