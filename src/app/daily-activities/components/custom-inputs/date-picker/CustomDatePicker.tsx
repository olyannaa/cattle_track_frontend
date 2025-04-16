import { DatePicker, Form } from 'antd';
import { Label } from '../label/Label';

export const CustomDatePicker = ({ name, label }: { name: string; label: string }) => {
    return (
        <>
            <Label label={label} />
            <Form.Item name={name}>
                <DatePicker placeholder='xx.xx.xxxx' format='DD.MM.YYYY' />
            </Form.Item>
        </>
    );
};
