import { Outlet } from "react-router-dom"
import { Layout} from 'antd'

export const PageLayout = ({children}) => {
    const { Header, Footer, Content} = Layout

    return (
        <Layout>
            <Header>
            </Header>
            <Content>
                <Layout>
                    <Content style={{height: '100vh', margin: '0 auto', overflowY: 'auto'}}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer></Footer>
        </Layout>
    )
}
