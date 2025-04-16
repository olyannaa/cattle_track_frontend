import { Form, Input } from 'antd';
import { Label } from '../label/Label';

export const CustomTextArea = ({
    name,
    label,
    placeholder,
}: {
    name: string;
    label: string;
    placeholder: string;
}) => {
    const { TextArea } = Input;
    return (
        <>
            <Label label={label} />
            <Form.Item name={name}>
                <TextArea style={{ height: '96px' }} placeholder={placeholder} />
            </Form.Item>
        </>
    );
};
