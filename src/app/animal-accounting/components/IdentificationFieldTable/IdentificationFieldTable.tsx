import { Input } from 'antd';
import { useState } from 'react';
import styles from './IdentificationFieldTable.module.css';

type Props = {
    value: string;
    nameField: string;
    isEditTable: boolean;
};

export const IdentificationFieldTable = ({ value, isEditTable, nameField }: Props) => {
    const [isOpenChange, setIsOpenChange] = useState<boolean>(false);
    const [name, setName] = useState<string>(value);

    const changeAnimal = async () => {
        setIsOpenChange(false);
        const value = name ? name.trim() : '';
        // dispatch(
        //     updateChangedAnimals({
        //         id: animal.id,
        //         dataIndex: dataIndex === 'groupName' ? 'groupID' : dataIndex,
        //         value: value === animal[dataIndex] ? null : value,
        //     })
        // );
    };

    const handlerOpenChange = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpenChange(true);
    };

    return isOpenChange && isEditTable ? (
        <Input value={value} onChange={(e) => setName(e.target.value)} onBlur={() => changeAnimal()} autoFocus className={styles[`input`]} />
    ) : (
        <div className={styles[`text-cell`]} onDoubleClick={(e) => handlerOpenChange(e)}>
            {name}
        </div>
    );
};
