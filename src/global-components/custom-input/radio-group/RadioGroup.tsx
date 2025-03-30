import { Form, Radio } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

export interface IRadioGroup {
    title: string;
    options: CheckboxGroupProps<string>['options'];
}

export const RadioGroup = ({ data }: { data: IRadioGroup }) => {
    return (
        <Form.Item>
            <div>{data.title}</div>
            <Radio.Group
                block
                options={data.options}
                defaultValue='Pear'
                optionType='button'
            />
        </Form.Item>
    );
};
