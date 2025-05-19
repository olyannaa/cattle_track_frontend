import { Select } from 'antd';
import { Label } from '../label/Label';
import { ISelect } from '../../../data/interface/ISelect';

export const CustomSelect = ({
    label,
    options,
    placeholder,
    value,
    onChange,
}: ISelect) => {
    return (
        <div style={{ maxWidth: '491px', width: '100%' }}>
            <Label label={label} />
            <Select
                options={options}
                placeholder={placeholder}
                style={{ width: '100%' }}
                value={value}
                onChange={(el) => onChange(el)}
            />
        </div>
    );
};
