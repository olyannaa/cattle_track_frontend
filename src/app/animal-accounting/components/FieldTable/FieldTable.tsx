import { useState } from 'react';
import { IAnimalTable } from '../../data';
import { Badge, Input, Select } from 'antd';
import styles from './FieldTable.module.css';
import {
    selectAnimalGroups,
    updateChangedAnimals,
} from '../../../../features/animalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app-service/hooks';

type Props = {
    animal: IAnimalTable;
    dataIndex: 'tagNumber' | 'groupName' | 'birthDate' | 'status';
    isEditTable: boolean;
};

const optionsStatus = [
    { value: 'Активное', label: 'Активное' },
    { value: 'Выбывшее', label: 'Выбывшее' },
    { value: 'Продано', label: 'Продано' },
];

export const FieldTable = ({ animal, dataIndex, isEditTable }: Props) => {
    const [isOpenChange, setIsOpenChange] = useState<boolean>(false);
    const [name, setName] = useState<string>(animal[dataIndex]);
    const dispatch = useAppDispatch();
    const groups = useAppSelector(selectAnimalGroups);
    const animalGroups = groups.map((group) => ({
        value: group.name,
        label: group.name,
    }));

    const handlerOpenChange = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation;
        setIsOpenChange(true);
    };

    const validationInput = (
        dataIndex: 'tagNumber' | 'groupName' | 'birthDate' | 'status'
    ) => {
        if (dataIndex === 'birthDate' || dataIndex === 'tagNumber') {
            return name ? name.trim() : '';
        } else if (dataIndex === 'groupName') {
            return groups.find((group) => group.name === name)?.id || '';
        } else {
            return name;
        }
    };

    const changeAnimal = async () => {
        setIsOpenChange(false);
        const value = validationInput(dataIndex);
        if (value === '') {
            setName(animal[dataIndex]);
            return;
        }
        dispatch(
            updateChangedAnimals({
                id: animal.id,
                dataIndex: dataIndex === 'groupName' ? 'groupID' : dataIndex,
                value: value === animal[dataIndex] ? null : value,
            })
        );
    };

    return dataIndex === 'tagNumber' || dataIndex === 'birthDate' ? (
        isOpenChange && isEditTable ? (
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => changeAnimal()}
                autoFocus
                className={styles[`input__${dataIndex}`]}
            />
        ) : (
            <div
                className={styles[`text-cell__${dataIndex}`]}
                onDoubleClick={(e) => handlerOpenChange(e)}
            >
                {name}
            </div>
        )
    ) : isOpenChange && isEditTable ? (
        <Select
            onBlur={() => changeAnimal()}
            autoFocus
            onChange={(e) => setName(e)}
            defaultValue={name}
            options={dataIndex === 'status' ? optionsStatus : animalGroups}
            className={styles[`select__${dataIndex}`]}
        />
    ) : dataIndex === 'status' ? (
        <Badge
            onDoubleClick={(e) => handlerOpenChange(e)}
            status={name === 'Активное' ? 'success' : 'error'}
            text={name}
            className={styles[`text-cell__${dataIndex}`]}
        />
    ) : dataIndex === 'groupName' ? (
        <div
            className={styles[`text-cell__${dataIndex}`]}
            onDoubleClick={(e) => handlerOpenChange(e)}
        >
            {name}
        </div>
    ) : (
        ''
    );
};
