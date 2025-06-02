import { CheckboxGroupProps } from 'antd/es/checkbox';
import { Dayjs } from 'dayjs';

export interface IFormItem {
    label: string;
    name: string;
    styles?: React.CSSProperties;
    required?: boolean;
    defaultValue?: string | Dayjs | number;
}

export interface IFormItemRadioGroup extends IFormItem {
    options: CheckboxGroupProps<string>['options'];
    onChange?: (value: string) => void;
}

export interface IFormItemInput extends IFormItem {
    placeholder?: string;
    onSearch?: (value: string) => void;
    defaultValue?: string;
    value?: string;
}

export interface IFormItemSelect extends IFormItem {
    options: { value: string; label: string }[];
    placeholder?: string;
    defaultValue?: string;
    onChange?: (
        value: string,
        option?:
            | {
                  value: string;
                  label: string;
              }
            | {
                  value: string;
                  label: string;
              }[]
            | undefined
    ) => void;
}

export interface IFormItemInputNumber extends IFormItem {
    onChange?: (value: number | null) => void;
}
