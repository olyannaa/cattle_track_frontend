import { Flex, Form } from 'antd';
import { SelectForm } from '../../custom-inputs/select-form/SelectForm';
import { InputSearchForm } from '../../custom-inputs/input-search-form/InputSearchForm';
import { CustomSelect } from '../../custom-inputs/custom-select/CustomSelect';
import { useEffect, useState } from 'react';
import { RadioGroupFormWithSwitch } from '../../custom-inputs/radio-group-with-switch/RadioGroupWithSwitch';
import {
    useGetGroupsQuery,
    useGetIdentificationFieldsQuery,
} from '../../../../../app-service/services/general';
import { useAppDispatch, useAppSelector } from '../../../../../app-service/hooks';
import {
    addSelectedAnimal,
    selectAnimals,
    selectSelectedAnimals,
} from '../../../service/animalsDailyActionsSlice';
import {
    FiltersAnimalsType,
    useLazyGetFilterAnimalsQuery,
    useLazyGetIdentificationValuesQuery,
} from '../../../service/dailyActions';

type Props = {
    isGroup: boolean;
    filters: FiltersAnimalsType;
    setFilters: React.Dispatch<React.SetStateAction<FiltersAnimalsType>>;
};

export const FormFilter = ({ isGroup, filters, setFilters }: Props) => {
    const [getFilterAnimalsQuery] = useLazyGetFilterAnimalsQuery();
    const [getIdentificationValuesQuery] = useLazyGetIdentificationValuesQuery();
    const [identificationValues, setIdentificationValues] =
        useState<{ label: string; value: string }[]>();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const indentificationFields = useGetIdentificationFieldsQuery().data?.map(
        (field) => ({
            label: field.name,
            value: field.id,
        })
    );
    const groups = useGetGroupsQuery().data?.map((field) => ({
        label: field.name,
        value: field.id,
    }));
    const animals = useAppSelector(selectAnimals).map((animal) => ({
        label: animal.tagNumber,
        value: animal.id,
    }));

    const handlerSearch = async (value: string) => {
        await getFilterAnimalsQuery({ filters: { ...filters, tagNumber: value } });
    };

    const handlerChangeSelectedAnimals = (value: string) => {
        dispatch(addSelectedAnimal(value));
    };

    const getIdentificationValues = async () => {
        const response = (
            await getIdentificationValuesQuery({
                identificationId: filters.identificationFieldId!,
                groupId: filters.groupId,
                isActive: filters.isActive,
                type: filters.type,
            })
        ).data;
        setIdentificationValues(response?.map((el) => ({ label: el, value: el })));
        setFilters((last) => ({
            ...last,
            identificationFieldValue: '',
        }));
    };

    useEffect(() => {
        if (filters.identificationFieldId) {
            getIdentificationValues();
        }
    }, [filters.groupId, filters.identificationFieldId, filters.isActive, filters.type]);

    useEffect(() => {
        form.setFieldValue('identification_method', '');
        if (filters.identificationFieldId) {
            getIdentificationValues();
        }
    }, [filters.identificationFieldId]);

    return (
        <Form
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', rowGap: '24px' }}
            form={form}
        >
            <SelectForm
                label='Группа содержания'
                name='group'
                options={
                    groups?.length ? [{ label: 'Все группы', value: '' }, ...groups] : []
                }
                defaultValue=''
                onChange={(value) => setFilters((last) => ({ ...last, groupId: value }))}
            />
            <RadioGroupFormWithSwitch
                options={['Телка', 'Нетель', 'Корова', 'Бычок', 'Бык']}
                label='Категория животного'
                name='type'
                form={form}
                isGroup={isGroup}
                onChange={(value) => setFilters((last) => ({ ...last, type: value }))}
                onChangeAll={() => setFilters((last) => ({ ...last, type: '' }))}
            />
            {!isGroup && (
                <>
                    <Flex style={{ width: '100%', gap: '16px', rowGap: '24px' }} wrap>
                        <CustomSelect
                            label='Способ идентификации'
                            options={
                                indentificationFields?.length
                                    ? [
                                          { label: 'Все способы', value: '' },
                                          ...indentificationFields,
                                      ]
                                    : []
                            }
                            placeholder='Выберите способ'
                            onChange={(value) =>
                                setFilters((last) => ({
                                    ...last,
                                    identificationFieldId: value,
                                }))
                            }
                            value={filters.identificationFieldId || ''}
                        />
                        {filters.identificationFieldId && (
                            <SelectForm
                                label={
                                    indentificationFields?.find(
                                        (field) =>
                                            filters.identificationFieldId === field.value
                                    )?.label || ''
                                }
                                name='identification_method'
                                options={identificationValues || []}
                                onChange={(value) =>
                                    setFilters((last) => ({
                                        ...last,
                                        identificationFieldValue: value,
                                    }))
                                }
                                defaultValue=''
                            />
                        )}
                    </Flex>
                    <InputSearchForm
                        name='search-animal'
                        label='Поиск по номеру'
                        placeholder='Введите номер животного для фильтрации списка'
                        onSearch={handlerSearch}
                    />
                    <CustomSelect
                        label='Выберите животное из списка'
                        options={animals}
                        value={selectedAnimals[0]}
                        onChange={(value) => handlerChangeSelectedAnimals(value)}
                    />
                </>
            )}
        </Form>
    );
};
