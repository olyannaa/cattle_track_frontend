import { TableProps, TabsProps } from 'antd';
import { IAnimal } from '../../app-service/services/animals';
import { FieldTable } from './components/FieldTable/FieldTable';

export const items: TabsProps['items'] = [
    {
        key: 'Корова',
        label: 'Коровы',
    },
    {
        key: 'Нетель',
        label: 'Нетели',
    },
    {
        key: 'Бык',
        label: 'Быки',
    },
    {
        key: 'Телочка',
        label: 'Телочки',
    },
    {
        key: 'Бычок',
        label: 'Бычки',
    },
];

export interface IAnimalTable extends IAnimal {
    key: string;
}

export const getColumns = (isEditTable: boolean): TableProps<IAnimalTable>['columns'] => [
    {
        title: '№ бирки',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
        render: (_, animal) => (
            <FieldTable
                animal={animal}
                dataIndex={'tagNumber'}
                isEditTable={isEditTable}
            />
        ),
        minWidth: 80,
    },
    {
        title: 'Дата рождения',
        dataIndex: 'birthDate',
        key: 'birthDate',
        render: (_, animal) => (
            <FieldTable
                animal={animal}
                dataIndex={'birthDate'}
                isEditTable={isEditTable}
            />
        ),
        minWidth: 103,
        sorter: (a, b) => a.birthDate.localeCompare(b.birthDate),
    },
    {
        title: 'Порода',
        dataIndex: 'breed',
        key: 'breed',
        minWidth: 130,
    },
    {
        title: 'Группа',
        dataIndex: 'groupName',
        key: 'groupName',
        sorter: (a, b) => a.groupName.localeCompare(b.groupName),
        render: (_, animal) => (
            <FieldTable
                animal={animal}
                dataIndex={'groupName'}
                isEditTable={isEditTable}
            />
        ),
        minWidth: 225,
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (_, animal) => (
            <FieldTable animal={animal} dataIndex={'status'} isEditTable={isEditTable} />
        ),
        minWidth: 128,
    },
    {
        title: 'Происхождение',
        dataIndex: 'origin',
        key: 'origin',
        minWidth: 118,
    },
    {
        title: 'Место происхождения',
        dataIndex: 'originLocation',
        key: 'originLocation',
        minWidth: 159,
    },
    {
        title: '№ матери',
        dataIndex: 'motherTagNumber',
        key: 'motherTagNumber',
        minWidth: 78,
    },
    {
        title: '№ отца',
        dataIndex: 'fatherTagNumber',
        key: 'fatherTagNumber',
        minWidth: 78,
    },
];
