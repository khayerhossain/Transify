import AboutUsSection from "../../UI/HomePage/AboutUs";
import BeARider from "../../UI/HomePage/BeARider";
import CustomerReviews from "../../UI/HomePage/CustomerReviews";
import HeroSection from "../../UI/HomePage/HeroSection";
import NewsletterSection from "../../UI/HomePage/NewsletterSection";
import OurServices from "../../UI/HomePage/OurServices";
import Process from "../../UI/HomePage/Process";
import React from "react";

const HomePage = () => {
  return (
    <div className="pt-20">
      <HeroSection />
      <Process />
      <AboutUsSection />
      <OurServices />
      <CustomerReviews />
      <BeARider />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
