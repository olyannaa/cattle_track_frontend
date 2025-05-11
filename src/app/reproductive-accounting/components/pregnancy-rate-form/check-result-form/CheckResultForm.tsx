import { Form, Input } from 'antd';
import { InputLabel } from '../../../../../global-components/custom-inputs/input-label/InputLabel';

export const CheckResultForm = () => {
    const checkResultType = Form.useWatch('status');

    if (!checkResultType) {
        return null;
    }

    return (
        <>
            {checkResultType === 'Стельная' && (
                <div className='form-additional'>
                    <div className='form-input_default'>
                        <InputLabel label='Ожидаемая дата отёла' />
                        <Form.Item name='expectedCalvingDate'>
                            <Input type='date' placeholder='xx.xx.xxxx' />
                        </Form.Item>
                    </div>
                </div>
            )}
        </>
    );
};
