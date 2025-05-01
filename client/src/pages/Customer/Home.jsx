import React from 'react';
import Hero from '../../components/Customer/Hero';
import CoursesSection from '../../components/Customer/EventTerdekat';
import Footer from '../../components/Customer/Footer';

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <CoursesSection />
      <Footer />
    </div>
  );
};

export default Home;
