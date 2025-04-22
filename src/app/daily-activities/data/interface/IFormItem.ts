import { CheckboxGroupProps } from 'antd/es/checkbox';

export interface IFormItem {
    label: string;
    name: string;
}

export interface IFormItemRadioGroup extends IFormItem {
    options: CheckboxGroupProps<string>['options'];
}

export interface IFormItemInput extends IFormItem {
    placeholder?: string;
}

export interface IFormItemSelect extends IFormItem {}
