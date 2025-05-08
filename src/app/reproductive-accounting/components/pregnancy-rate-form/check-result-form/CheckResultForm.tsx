import { Form, Input } from 'antd';
import { InputLabel } from '../../../../../global-components/custom-inputs/input-label/InputLabel';
import TextArea from 'antd/es/input/TextArea';

export const CheckResultForm = () => {
    const checkResultType = Form.useWatch('status');

    if (!checkResultType) {
        return null;
    }

    return (
        <div className='form-additional'>
            {checkResultType === 'Стельная' && (
                <div className='form-input_default'>
                    <InputLabel label='Ожидаемая дата отёла' />
                    <Form.Item name='expectedCalvingDate'>
                        <Input type='date' placeholder='xx.xx.xxxx' />
                    </Form.Item>
                </div>
            )}
            <div>
                <InputLabel label='Состояние коровы' />
                <Form.Item name='bullId'>
                    <TextArea rows={3} className='form-input_default' placeholder='Опишите состояние' />
                </Form.Item>
            </div>
        </div>
    );
};
