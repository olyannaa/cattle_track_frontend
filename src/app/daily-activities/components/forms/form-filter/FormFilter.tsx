import { Flex, Form } from 'antd';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { InputSearchForm } from '../../custom-inputs/input-search-form/InputSearchForm';
import { identificationMethods } from '../../../data/const/selectOptions';
import { CustomSelect } from '../../custom-inputs/custom-select/CustomSelect';
import { useState } from 'react';
import { RadioGroupFormWithSwitch } from '../../custom-inputs/radio-group-with-switch/RadioGroupWithSwitch';

type Props = {
    isGroup: boolean;
    selectedAnimals: string;
    setSelectedAnimals: React.Dispatch<React.SetStateAction<string>>;
};

export const FormFilter = ({ isGroup, selectedAnimals, setSelectedAnimals }: Props) => {
    const [identificationMethod, setIdentificationMethod] = useState<string>('');
    const [form] = Form.useForm();
    return (
        <Form
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', rowGap: '24px' }}
            form={form}
        >
            <SelectForm label='Группа содержания' name='group' options={[]} />
            <RadioGroupFormWithSwitch
                options={['Телка', 'Нетель', 'Корова', 'Бычок', 'Бык']}
                label='Категория животного'
                name='type'
                form={form}
                isGroup={isGroup}
            />
            {!isGroup && (
                <>
                    <Flex style={{ width: '100%', gap: '16px', rowGap: '24px' }} wrap>
                        <CustomSelect
                            label='Способ идентификации'
                            options={identificationMethods}
                            placeholder='Выберите способ'
                            onChange={setIdentificationMethod}
                            value={identificationMethod}
                        />
                        {identificationMethod && (
                            <SelectForm
                                label={
                                    identificationMethod === 'UNSM'
                                        ? 'Значение УНСМ'
                                        : identificationMethod
                                }
                                name='identification_method'
                                options={[]}
                            />
                        )}
                    </Flex>
                    <InputSearchForm
                        name='search-animal'
                        label='Поиск по номеру'
                        placeholder='Введите номер животного для фильтрации списка'
                    />
                    <CustomSelect
                        label='Выберите животное из списка'
                        options={[]}
                        value={selectedAnimals}
                        onChange={setSelectedAnimals}
                    />
                </>
            )}
        </Form>
    );
};
