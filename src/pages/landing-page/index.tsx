import Commitment from "../../components/commitment";
import HeroSection from "../../components/hero-section";
import Collections from "../collections";
import Container from "../../components/container";
import { Helmet } from "react-helmet-async";
import Marquee from "../../components/marquee";
import {
  marqueeAdidas,
  marqueeGucci,
  marqueeNewBalance,
  marqueeEmporio,
  marqueeNike,
  marqueeFaberge,
  marqueeReebok,
  marqueeMoschino,
} from "../../assets/marqueelogos";
import LatestArrivals from "../../components/latest-arrivals";

const marqueeImages = [
  marqueeAdidas,
  marqueeGucci,
  marqueeNewBalance,
  marqueeEmporio,
  marqueeNike,
  marqueeFaberge,
  marqueeReebok,
  marqueeMoschino,
];

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Home | Stylenest</title>
      </Helmet>
      <Container>
        <HeroSection />

        {/* Latest Arrivals Section */}
        <LatestArrivals />
        <Collections />
        <Commitment />

        {/* Marquee */}
        <Marquee images={marqueeImages} />
      </Container>
    </>
  );
}

export default LandingPage;
