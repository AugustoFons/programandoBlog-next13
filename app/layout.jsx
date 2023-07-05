import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import FooterPage from '@components/Footer';

export const metadata = {
    title: 'Programando Blog',
    description: 'Busca y opina sobre temas de programacion'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='es'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Nav />
                        {children}
                        <FooterPage />
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout