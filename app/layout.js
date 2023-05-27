import Provider from './components/provider'
import './globals.css'




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main> {children} </main>
        </Provider>
        </body>
    </html>
  )
}
