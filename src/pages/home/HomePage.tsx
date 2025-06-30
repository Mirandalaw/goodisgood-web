import Header from '../../components/layout/Header.tsx';
import HeroSection from '../../components/layout/HeroSection.tsx';
import Footer from '../../components/layout/Footer.tsx';
import '../../styles/pages/home/HomePage.css';

export default function HomePage() {
    return (
        <div className="home-wrapper">
            <Header />
            <HeroSection />
            <Footer />
        </div>
    );
}
