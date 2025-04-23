import { FormInstance } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

export interface IFormItem {
    label: string;
    name: string;
    styles?: React.CSSProperties;
}

export interface IFormItemRadioGroup extends IFormItem {
    options: CheckboxGroupProps<string>['options'];
}

export interface IFormItemRadioGroupWithSwitch extends IFormItemRadioGroup {
    form: FormInstance<any>;
    isGroup: boolean;
}

export interface IFormItemInput extends IFormItem {
    placeholder?: string;
}

export interface IFormItemSelect extends IFormItem {
    options: { value: string; label: string }[];
    placeholder?: string;
}
