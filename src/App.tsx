import { ConfigProvider, ThemeConfig } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './pages/Authorization/Authorization';
import { Main } from './pages/Main/Main';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
    const theme: ThemeConfig = {
        components: {
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
            // Select: {
            //     borderRadius: 2,
            //     activeBorderColor: '#40A9FF',
            //     hoverBorderColor: '#40A9FF',
            //     controlHeight: 40,
            // },
            Button: {
                borderRadius: 2,
                colorBgSolid: 'rgba(255, 66, 24, 1)',
                colorBgSolidHover: 'rgba(255, 66, 24, 0.7)',
                colorBgSolidActive: 'rgba(255, 66, 24, 1)',
                borderRadiusLG: 2,
            },
            // InputNumber: {
            //     borderRadius: 2,
            // },
            // Radio: {
            //     buttonBg: 'rgba(0, 0, 0, 0)',
            //     buttonSolidCheckedActiveBg: '#FFFF',
            //     buttonSolidCheckedBg: '#FFFF',
            //     buttonSolidCheckedHoverBg: '#FFFF',
            //     buttonSolidCheckedColor: '#262626',
            //     colorText: '#262626',
            //     buttonColor: '#262626',
            // },
            Tabs: {
                itemSelectedColor: 'rgba(255, 66, 24, 1)',
                //itemColor: 'rgba(255, 66, 24, 1)',
                inkBarColor: 'rgba(255, 66, 24, 1)',
                itemHoverColor: 'rgba(255, 66, 24, 0,7)',
                itemActiveColor: 'rgba(255, 66, 24, 0,7)',
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
                    <Route element={<PrivateRoute />}>
                        <Route path='/main' element={<Main />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
