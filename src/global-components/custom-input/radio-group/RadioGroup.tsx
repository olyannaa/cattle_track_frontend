import { Form, Radio } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { InputLabel } from '../input-label/InputLabel';

export interface IRadioGroup {
    title: string;
    options: CheckboxGroupProps<string>['options'];
}

export const RadioGroupButton = ({
    data,
    value,
    onChange,
}: {
    data: IRadioGroup;
    value?: string;
    onChange?: (e: any) => void;
}) => {
    return (
        <Radio.Group
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '432px',
            }}
            block
            options={data.options}
            optionType='button'
            value={value}
            onChange={onChange}
        />
    );
};
