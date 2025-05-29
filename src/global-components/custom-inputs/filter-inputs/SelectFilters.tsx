import { Select } from 'antd';
import { Label } from './Label';
import { ISelectFilter } from '../../data/interface/InputsFilter';

export const SelectFilters = ({
    label,
    options,
    placeholder,
    value,
    onChange,
    styles,
}: ISelectFilter) => {
    return (
        <div style={{ maxWidth: '491px', width: '100%', ...styles }}>
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
