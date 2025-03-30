import { Form, Radio } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { InputLabel } from '../input-label/InputLabel';

export interface IRadioGroup {
    title: string;
    options: CheckboxGroupProps<string>['options'];
}

export const RadioGroupButton = ({ data }: { data: IRadioGroup }) => {
    return (
        <Form.Item>
            <InputLabel label={data.title} />
            <Radio.Group
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: '432px',
                }}
                block
                options={data.options}
                defaultValue='Pear'
                optionType='button'
            />
        </Form.Item>
    );
};
