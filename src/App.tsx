import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutPage } from './global-components/Layout/Layout';
import { RegisterAnimalPage } from './app/register-animal/RegisterAnimalsPage';
import { Authorization } from './app/authorization/AuthorizationPage';
import ConfigProvider, { ThemeConfig } from 'antd/es/config-provider';
import { MainPage } from './app/main/MainPage';

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
            },
            Upload: {
                colorPrimaryHover: 'rgba(255, 66, 24, 0.7)',
            },
            List: {
                borderRadiusLG: 2,
                colorBorder: 'rgba(0, 0, 0, 0.06)',
                fontSize: 16,
            },
        },
        token: {},
        cssVar: true,
    };
    return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Authorization />} />
                    <Route element={<LayoutPage />}>
                        <Route path='/main' element={<MainPage />} />
                        <Route
                            path='/animalregister'
                            element={<RegisterAnimalPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
