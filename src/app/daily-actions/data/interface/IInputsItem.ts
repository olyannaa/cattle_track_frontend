import { CheckboxGroupProps } from 'antd/es/checkbox';

export interface ISelect {
    placeholder?: string;
    options: { value: string; label: string }[];
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export interface IItemRadioGroupWithSwitch {
    isGroup: boolean;
    onChangeAll: () => void;
    value: string;
    options: CheckboxGroupProps<string>['options'];
    onChange?: (value: string) => void;
    label: string;
    styles?: React.CSSProperties;
}

export interface IItemSearch {
    label: string;
    styles?: React.CSSProperties;
    placeholder?: string;
    onSearch?: (value: string) => void;
}
