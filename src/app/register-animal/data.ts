import { TableColumnsType, TableProps, TabsProps } from "antd"
import { IAnimal } from "../../app-service/services/animals";

export const items: TabsProps['items']= [
    {
        key:'Корова',
        label: 'Коровы'
    },
    {
        key: 'Нетель',
        label: 'Нетели'
    },
    {
        key: 'Бык',
        label: 'Быки'
    },
    {
        key: 'Телочка',
        label: 'Телочки'
    },
    {
        key: 'Бычок',
        label: 'Бычки'
    }
]

interface IAnimalTable extends IAnimal{
    key:string;
}

type ColumnTypes = Exclude<TableProps<IAnimalTable>['columns'], undefined>;

export const columns:(ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: 'Номер бирки',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
    },
    {
        title: 'Дата рождения',
        dataIndex: 'birthDate',
        key: 'birthDate',
    },
    {
        title: 'Порода',
        dataIndex: 'breed',
        key: 'breed'
    },
    {
        title: 'Группа',
        dataIndex: 'groupName',
        key: 'groupName'
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Происхождение',
        dataIndex: 'origin',
        key: 'origin'
    },
    {
        title: 'Место происхождения',
        dataIndex: 'originLocation',
        key: 'originLocation'
    },
    {
        title: 'Номер матери',
        dataIndex: 'motherTagNumber',
        key: 'motherTagNumber'
    },
    {
        title: 'Номер отца',
        dataIndex: 'fatherTagNumber',
        key: 'fatherTagNumber'
    },
]