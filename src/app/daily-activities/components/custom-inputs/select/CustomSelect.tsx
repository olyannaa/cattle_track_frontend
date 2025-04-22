import { Form, Select } from 'antd';
import { Label } from '../label/Label';
import { IFormItemSelect } from '../../../data/interface/IFormItem';

export const CustomSelect = ({ label, name }: IFormItemSelect) => {
    return (
        <div style={{ maxWidth: '432px', width: '100%' }}>
            <Label label={label} />
            <Form.Item name={name}>
                <Select />
            </Form.Item>
        </div>
    );
};
