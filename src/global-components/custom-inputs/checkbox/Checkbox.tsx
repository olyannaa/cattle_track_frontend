import { Checkbox, CheckboxChangeEvent } from 'antd';

type Props = {
    onChange: (e: CheckboxChangeEvent) => void;
    title: string;
};

export const CheckboxCustom = ({ title, onChange }: Props) => {
    return (
        <Checkbox
            onChange={onChange}
            style={{
                maxWidth: '432px',
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
