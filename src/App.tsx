import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutPage } from './global-components/Layout/Layout';
import { RegisterAnimalPage } from './app/register-animal/RegisterAnimalsPage';
import { Authorization } from './pages/Authorization/Authorization';
import ConfigProvider, { ThemeConfig } from 'antd/es/config-provider';
import { Main } from './pages/Main/Main';
import { PrivateRoute } from './components/PrivateRoute';
        
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
                //itemColor: 'rgba(255, 66, 24, 1)',
                inkBarColor: 'rgba(255, 66, 24, 1)',
                itemHoverColor: 'rgba(255, 66, 24, 0,7)',
                itemActiveColor: 'rgba(255, 66, 24, 0,7)',
            }
        },
        token: {},
        cssVar: true,
    };
    return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Authorization />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/main' element={<Main />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
