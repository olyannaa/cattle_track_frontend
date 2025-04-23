import { Checkbox, TableProps } from 'antd';
import { IAnimalTable } from '../interface/IAnimalTable';

export const columnsChoiceAnimalsTable: TableProps<IAnimalTable>['columns'] = [
    {
        title: '№ животного',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
        width: 96,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Категория',
        dataIndex: 'category',
        key: 'category',
        minWidth: 137,
        sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
        title: 'Группа',
        dataIndex: 'group',
        key: 'group',
        minWidth: 110,
    },
    {
        title: 'Выбрать',
        dataIndex: 'checked',
        key: 'checked',
        render: (_, animal) => <Checkbox value={animal.checked} onChange={() => {}} />,
        width: 104,
    },
];
