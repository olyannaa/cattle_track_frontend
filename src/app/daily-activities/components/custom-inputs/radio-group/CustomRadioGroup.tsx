import { Form, Radio } from 'antd';
import { Label } from '../label/Label';
import { IFormItemRadioGroup } from '../../../data/interface/IFormItem';

export const CustomRadioGroup = ({ label, options, name }: IFormItemRadioGroup) => {
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
