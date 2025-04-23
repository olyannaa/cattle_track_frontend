import { Flex, Form, Radio, RadioChangeEvent, Switch } from 'antd';
import { Label } from '../label/Label';
import { IFormItemRadioGroupWithSwitch } from '../../../data/interface/IFormItem';

export const RadioGroupFormWithSwitch = ({
    label,
    options,
    name,
    styles,
    form,
    isGroup,
}: IFormItemRadioGroupWithSwitch) => {
    const handleSwitchChange = (checked: boolean) => {
        if (checked) {
            form.setFieldsValue({ [name]: null });
        }
    };

    const handlerRadioChange = (e: RadioChangeEvent) => {
        form.setFieldsValue({ [`${name}_all`]: false });
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '491px' }}>
            <Label label={label} />
            <Form.Item style={{ maxWidth: '391px' }} name={name}>
                <Radio.Group
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        ...styles,
                    }}
                    options={options}
                    optionType='button'
                    onChange={handlerRadioChange}
                />
            </Form.Item>
            {isGroup && (
                <Flex
                    style={{ position: 'absolute', top: '-5px', right: '0' }}
                    align='center'
                    gap={8}
                >
                    <div style={{ fontWeight: '500' }}>Выбрать всех</div>
                    <Form.Item style={{ marginBottom: '0' }} name={`${name}_all`}>
                        <Switch onChange={handleSwitchChange} />
                    </Form.Item>
                </Flex>
            )}
        </div>
    );
};
