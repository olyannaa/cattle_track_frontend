import { TableProps } from 'antd';
import { IDailyActionAnimalsTable } from '../interface/IDailyActionAnimalsTable';
import { TableCheckbox } from '../../components/custom-inputs/TableCheckbox';

export const columnsChoiceAnimalsTable: TableProps<IDailyActionAnimalsTable>['columns'] =
    [
        {
            title: '№ животного',
            dataIndex: 'tagNumber',
            key: 'tagNumber',
            width: 96,
        },
        {
            title: 'Категория',
            dataIndex: 'type',
            key: 'type',
            minWidth: 137,
        },
        {
            title: 'Группа',
            dataIndex: 'groupName',
            key: 'groupName',
            minWidth: 110,
        },
        {
            title: 'Выбрать',
            dataIndex: 'checked',
            key: 'checked',
            render: (_, animal) => <TableCheckbox id={animal.id} isAnimal />,
            width: 104,
        },
    ];
