import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Label } from '../label/Label';
import { IFormItemInput } from '../../../data/interface/IFormItem';

export const PersonInput = ({ name, label, placeholder }: IFormItemInput) => {
    return (
        <div>
            <Label label={label} />
            <Form.Item name={name}>
                <Input prefix={<UserOutlined />} placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};
