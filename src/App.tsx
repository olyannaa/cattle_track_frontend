import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutPage } from './global-components/Layout/Layout';
import { DailyActions } from './app/daily-actions/DailyActions';
import { AnimalAccountingPage } from './app/animal-accounting/AnimalAccountingPage';
import { Authorization } from './app/authorization/AuthorizationPage';
import ConfigProvider, { ThemeConfig } from 'antd/es/config-provider';
import { MainPage } from './app/main/MainPage';
import { InfrastructurePage } from './app/infrastructure/InfrastructurePage';
import { RegisterAnimalPage } from './app/register-animal/RegisterAnimalsPage';
import ruRU from 'antd/lib/locale/ru_RU';
import { ReproductiveAccountingPage } from './app/reproductive-accounting/ReproductiveAccountingPage';

function App() {
    const theme: ThemeConfig = {
        components: {
            Menu: {
                activeBarBorderWidth: 0,
                itemBorderRadius: 0,
                dangerItemColor: 'rgba(0, 0, 0, 0.85)',
                colorPrimaryBorder: '#FF4218',
                itemMarginInline: 0,
                activeBarWidth: '4',
                dropdownWidth: 200,
            },
            Button: {
                borderRadius: 2,
                defaultActiveBorderColor: '#FF4218',
                defaultActiveColor: '#FF4218',
                defaultHoverBorderColor: '#FF4218',
                defaultHoverColor: '#FF4218',
                colorBgSolid: '#FF4218',
                colorBgSolidHover: 'rgba(255, 66, 24, 0.7)',
                colorBgSolidActive: 'rgba(255, 66, 24, 1)',
                borderRadiusLG: 2,
                textTextColor: 'rgba(255, 66, 24, 1)',
                colorPrimary: '#FF4218',
                colorPrimaryActive: 'rgba(255, 66, 24, 0.7)',
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
                colorLink: '#FF4218',
                colorLinkHover: 'rgba(255, 66, 24, 0.7)',
            },
            Input: {
                borderRadius: 2,
                borderRadiusLG: 2,
                borderRadiusSM: 2,
                borderRadiusXS: 2,
                fontSize: 16,
                colorText: 'rgba(0, 0, 0, 0.85)',
                activeBorderColor: 'rgba(255, 75, 64, 1)',
                hoverBorderColor: 'rgba(255, 75, 64, 1)',
                controlHeight: 40,
            },
            Tabs: {
                itemSelectedColor: 'rgba(255, 66, 24, 1)',
                inkBarColor: 'rgba(255, 66, 24, 1)',
                itemHoverColor: 'rgba(255, 66, 24, 0.7)',
                itemActiveColor: 'rgba(255, 66, 24, 0.7)',
                fontSize: 16,
            },
            Radio: {
                colorPrimary: '#FF4218',
                borderRadius: 2,
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
                colorPrimaryBorder: 'rgba(255, 66, 24, 0.7)',
                colorPrimaryActive: 'rgba(255, 66, 24, 0.7)',
                fontSize: 14,
                controlHeight: 40,
            },
            Select: {
                borderRadius: 2,
                fontSize: 16,
                controlHeight: 40,
                activeBorderColor: 'rgba(255, 75, 64, 1)',
                hoverBorderColor: 'rgba(255, 75, 64, 1)',
                optionSelectedBg: 'rgba(255, 66, 24, 0.1)',
            },
            Upload: {
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
            },
            List: {
                borderRadiusLG: 2,
                colorBorder: 'rgba(0, 0, 0, 0.06)',
                fontSize: 16,
            },
            Table: {
                headerBorderRadius: 0,
                colorPrimary: 'rgba(255, 66, 24, 1)',
            },
            Pagination: {
                colorPrimary: 'rgba(255, 66, 24, 1)',
                colorPrimaryBorder: 'rgba(255, 66, 24, 1)',
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
                borderRadius: 2,
            },
            Message: {
                borderRadiusLG: 2,
            },
            Modal: {
                titleFontSize: 24,
            },
            Checkbox: {
                colorPrimary: '#ff4218',
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
            },
            Switch: {
                colorPrimary: 'rgb(255, 66, 24)',
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
            },
            DatePicker: {
                borderRadius: 2,
                colorPrimary: 'rgb(255, 66, 24)',
                colorPrimaryHover: 'rgba(255, 66, 24, 1)',
                colorPrimaryBorder: 'rgba(255, 66, 24, 1)',
                activeShadow: '0 0 0 2px rgba(255, 66, 24,0.1)',
                colorLink: 'rgba(255, 66, 24, 1)',
                colorLinkHover: 'rgba(255, 66, 24, 0.7)',
            },
        },
        token: {},
        cssVar: true,
    };
    return (
        <ConfigProvider theme={theme} locale={ruRU}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Authorization />} />
                    <Route element={<LayoutPage />}>
                        <Route path='/main' element={<MainPage />} />

                        <Route path='/daily-activities' element={<DailyActions />} />
                        <Route
                            path='/animalregister'
                            element={<RegisterAnimalPage />}
                        />
                        <Route
                            path='/infrastructure'
                            element={<InfrastructurePage />}
                        />
                        <Route
                            path='/accounting'
                            element={<AnimalAccountingPage />}
                        />
                        <Route
                            path='/reproductive-accounting'
                            element={<ReproductiveAccountingPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
