import { IUser } from '../utils/userType';

type IRequestGetAnimalsSCV = {
    page: number;
    type: string;
};

export const downloadScvAnimals = async (data: IRequestGetAnimalsSCV) => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}files/csv/animals?page=${data.page}&Type=${
                data.type
            }`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    organizationId: user.organizationId,
                },
                credentials: 'include',
            }
        );
        if (response.status === 401) {
            window.location.href = '/';
            localStorage.removeItem('user');
        }
        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = getName(response);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

const getName = (response: Response) => {
    const result = response.headers
        .get('content-disposition')
        ?.split('; ')[1]
        .substring(10);
    return result || `file.csv`;
};
