import { TabsProps } from 'antd';

export const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Осмотры',
    },
    {
        key: '2',
        label: 'Вакцинации и обработки',
    },
    {
        key: '3',
        label: 'Лечение',
    },
    {
        key: '4',
        label: 'Перевод',
    },
    {
        key: '5',
        label: 'Выбытие',
    },
    {
        key: '6',
        label: 'Исследования',
    },
    {
        key: '7',
        label: 'Присвоение номеров',
    },
    {
        key: '8',
        label: 'Изменение половозрастной группы',
    },
];

export const getNameTabs = (keyTab: string) => {
    return items?.find((item) => item.key === keyTab)?.label?.toString() || '';
};
