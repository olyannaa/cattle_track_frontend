import { Input } from 'antd';
import { Label } from '../label/Label';
import { IItemSearch } from '../../../data/interface/IInputsItem';

export const InputSearch = ({ label, placeholder, onSearch }: IItemSearch) => {
    const { Search } = Input;
    return (
        <div style={{ maxWidth: '491px', width: '100%' }}>
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
