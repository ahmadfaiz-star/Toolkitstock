import BlogPreview from "../components/blogSection";
import CategoriesSection from "../components/categories section";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/herosection";
import WhyChooseUs from "../components/whyChooseUseSection";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CategoriesSection />
      <WhyChooseUs />
      <BlogPreview />
      <Footer />
    </>
  );
}
export default Home;
