import { FormInstance } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

export interface IFormItem {
    label: string;
    name: string;
    styles?: React.CSSProperties;
    required?: boolean;
}

export interface IFormItemRadioGroup extends IFormItem {
    options: CheckboxGroupProps<string>['options'];
    onChange?: (value: string) => void;
}

export interface IFormItemRadioGroupWithSwitch extends IFormItemRadioGroup {
    form: FormInstance<any>;
    isGroup: boolean;
    onChangeAll: () => void;
}

export interface IFormItemInput extends IFormItem {
    placeholder?: string;
    onSearch?: (value: string) => void;
}

export interface IFormItemSelect extends IFormItem {
    style?: React.CSSProperties;
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
