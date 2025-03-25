import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutPage } from './global-components/Layout/Layout';
import { RegisterAnimalPage } from './app/register-animal/RegisterAnimalsPage';
import ConfigProvider, { ThemeConfig } from 'antd/es/config-provider';
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
        },
        token: {},
        cssVar: true,
    };

    return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route element={<LayoutPage />}>
                        <Route path='/' element={<RegisterAnimalPage />} />
                    </Route>
                    <Route element={<LayoutPage />}>
                        <Route
                            path='/animals'
                            element={<RegisterAnimalPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
