import { Form, Input } from 'antd';
import { IFormItemInput } from '../../../data/interface/IFormItem';
import { Label } from '../label/Label';

export const InputSearch = ({ label, placeholder, onSearch }: IFormItemInput) => {
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
