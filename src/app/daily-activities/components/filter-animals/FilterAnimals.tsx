import { Flex, Table } from 'antd';
import { CheckboxCustom } from '../../../../global-components/custom-inputs/checkbox/Checkbox';
import { FormFilter } from '../forms/form-filter/FormFilter';
import { useState } from 'react';
import { columnsChoiceAnimalsTable } from '../../data/const/columnsChoiceAnimalsTable';

type Props = {
    selectedAnimals: string;
    setSelectedAnimals: React.Dispatch<React.SetStateAction<string>>;
    isGroup: boolean;
    setIsGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterAnimals = ({
    selectedAnimals,
    setSelectedAnimals,
    isGroup,
    setIsGroup,
}: Props) => {
    const [isActiveAnimals, setIsActiveAnimals] = useState<boolean>(false);
    return (
        <>
            <Flex style={{ gap: '4px', rowGap: '12px' }} wrap>
                <CheckboxCustom
                    title='Групповое действие'
                    onChange={(e) => setIsGroup(e.target.checked)}
                    value={isGroup}
                />
                <CheckboxCustom
                    title='Только активные животные'
                    onChange={(e) => setIsActiveAnimals(e.target.checked)}
                    value={isActiveAnimals}
                />
            </Flex>
            <FormFilter
                isGroup={isGroup}
                selectedAnimals={selectedAnimals}
                setSelectedAnimals={setSelectedAnimals}
            />
            {isGroup && (
                <Table style={{ width: '100%' }} columns={columnsChoiceAnimalsTable} />
            )}
        </>
    );
};
