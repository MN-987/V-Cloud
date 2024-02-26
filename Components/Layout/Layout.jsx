import Footer from '../Footer/Footer'
import Navbar from '../Navigation//Navigation'


export default function Layout ({ children }) {
  return (
    <>
      <div>
        <header>
          <Navbar /> 
        </header>

        <main >
          {children}
        </main>
       
       <Footer/>
      </div>
    </>
  )
}
