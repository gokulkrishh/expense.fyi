import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, initialSession = true }) {
  console.log('initialSession --->', initialSession);
  return (
    <div className="Layout">
      {initialSession ? (
        <div className="Layout__sidebar">
          <Navbar />
        </div>
      ) : null}
      <div className="Layout__content">{children}</div>
    </div>
  );
}
