import { Flex, Table } from 'antd';
import { CheckboxCustom } from '../../../../global-components/custom-inputs/checkbox/Checkbox';
import { FormFilter } from '../forms/form-filter/FormFilter';
import { useEffect, useState } from 'react';
import { columnsChoiceAnimalsTable } from '../../data/const/columnsChoiceAnimalsTable';
import {
    FiltersAnimalsType,
    IRequestGetFilterAnimals,
    IResponsePaginationInfoDailyActions,
    SortersAnimalsType,
    useLazyGetFilterAnimalsQuery,
    useLazyGetPaginationInfoFilterAnimalsQuery,
} from '../../service/dailyActions';
import { IDailyActionAnimalsTable } from '../../data/interface/IDailyActionAnimalsTable';
import { useAppSelector } from '../../../../app-service/hooks';
import { selectAnimals } from '../../service/animalsDailyActionsSlice';

type Props = {
    isGroup: boolean;
    setIsGroup: React.Dispatch<React.SetStateAction<boolean>>;
    keyTab: string;
};

export type FiltersType = {
    group: string;
    type: string;
    identificationId: string;
    identificationValue: string;
    isActive: boolean;
};

export const FilterAnimals = ({ isGroup, setIsGroup, keyTab }: Props) => {
    const [filters, setFilters] = useState<FiltersAnimalsType>({
        groupId: '',
        type: '',
        identificationId: '',
        identificationValue: '',
        isActive: true,
    });
    const [sorters] = useState<SortersAnimalsType>({
        column: '',
        descending: false,
        page: 0,
    });
    const [paginationInfo, setPaginationInfo] =
        useState<IResponsePaginationInfoDailyActions>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [getFilterAnimalsQuery] = useLazyGetFilterAnimalsQuery();
    const [getPaginationInfoFilterAnimalsQuery] =
        useLazyGetPaginationInfoFilterAnimalsQuery();
    const animals = useAppSelector(selectAnimals);
    const getFilterAnimals = async (
        data: IRequestGetFilterAnimals = { filters: filters, sorters: sorters }
    ) => {
        await getFilterAnimalsQuery(data);
    };

    const getPaginationInfoFilterAnimals = async (data: FiltersAnimalsType = filters) => {
        const response = (await getPaginationInfoFilterAnimalsQuery(data)).data;
        setPaginationInfo(response);
    };

    useEffect(() => {
        getFilterAnimals();
        if (isGroup) {
            getPaginationInfoFilterAnimals();
        }
    }, [filters, sorters]);

    useEffect(() => {
        const newFilters = {
            ...filters,
            identificationFieldId: '',
            identificationFieldValue: '',
            tagNumber: '',
        };

        if (isGroup) {
            getPaginationInfoFilterAnimals(newFilters);
            getFilterAnimals({ filters: newFilters });
        }
        setFilters(newFilters);
    }, [isGroup]);

    const handlerChangeCurrentPagination = (page: number) => {
        setCurrentPage(page);
        getPaginationInfoFilterAnimals();
        getFilterAnimals();
    };

    return (
        <>
            <Flex style={{ gap: '4px', rowGap: '12px' }} wrap>
                {keyTab !== '7' && (
                    <>
                        <CheckboxCustom
                            title='Групповое действие'
                            onChange={(e) => setIsGroup(e.target.checked)}
                        />
                        <CheckboxCustom
                            title='Только активные животные'
                            onChange={(e) =>
                                setFilters((last) => ({
                                    ...last,
                                    isActive: e.target.checked,
                                }))
                            }
                            defaultChecked={true}
                        />
                    </>
                )}
            </Flex>
            <FormFilter isGroup={isGroup} filters={filters} setFilters={setFilters} />
            {isGroup && (
                <Table<IDailyActionAnimalsTable>
                    style={{ width: '100%' }}
                    columns={columnsChoiceAnimalsTable}
                    dataSource={animals.map((animal) => ({
                        ...animal,
                        key: animal.id,
                    }))}
                    pagination={{
                        showSizeChanger: false,
                        current: currentPage,
                        total: paginationInfo?.count,
                        pageSize: 5,
                        onChange: (page) => handlerChangeCurrentPagination(page),
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} элементов`,
                    }}
                />
            )}
        </>
    );
};
