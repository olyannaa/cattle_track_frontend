import { Form, Input } from 'antd';
import { IFormItemInput } from '../../../data/interface/IFormItem';
import { Label } from '../label/Label';

export const InputSearch = ({ label, name, placeholder }: IFormItemInput) => {
    const { Search } = Input;
    return (
        <div style={{ maxWidth: '432px', width: '100%' }}>
            <Label label={label} />
            <Form.Item name={name}>
                <Search
                    placeholder={placeholder}
                    enterButton='Найти'
                    size='large'
                    //onSearch={onSearch}
                />
            </Form.Item>
        </div>
    );
};
