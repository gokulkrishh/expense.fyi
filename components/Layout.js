import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className="Layout">
        <div className="Layout__header">
          <Navbar />
        </div>
        <div className="Layout__content">
          <main>{children}</main>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
