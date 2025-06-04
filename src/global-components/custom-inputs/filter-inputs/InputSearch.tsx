import { Input } from 'antd';
import { Label } from './Label';
import { IInputFilterSearch } from '../../data/interface/InputsFilter';

export const InputSearch = ({
    label,
    placeholder,
    onSearch,
    styles,
}: IInputFilterSearch) => {
    const { Search } = Input;
    return (
        <div style={{ maxWidth: '491px', width: '100%', ...styles }}>
            <Label label={label} />
            <Search
                placeholder={placeholder}
                enterButton='Найти'
                size='large'
                onSearch={onSearch}
            />
        </div>
    );
};
