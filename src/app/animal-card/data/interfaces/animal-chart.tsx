export type EventType = 'Осмотры' | 'Вакцинации и обработки' | 'Выбытие' | 'Поступление' | 'Лечение'; // и другие возможные типы

interface HistoryEventPoint {
    x: string;
    y: EventType;
}

// Остальная часть интерфейса остается без изменений
export interface AnimalHistoryData {
    points: HistoryEventPoint[];
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
}
