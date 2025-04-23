import { Checkbox, CheckboxChangeEvent } from 'antd';

type Props = {
    onChange: (e: CheckboxChangeEvent) => void;
    value: boolean;
    title: string;
};

export const CheckboxCustom = ({ title, onChange }: Props) => {
    return (
        <Checkbox
            onChange={onChange}
            style={{
                maxWidth: '243.5px',
                padding: '8px 12px 10px',
                border: '1px solid var(--grey-border)',
                borderRadius: '2px',
                width: '100%',
            }}
        >
            {title}
        </Checkbox>
    );
};
