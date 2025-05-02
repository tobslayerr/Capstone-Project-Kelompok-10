import React from 'react';
import Hero from '../../components/Customer/Hero';
import Footer from '../../components/Customer/Footer';
import BestCreator from '../../components/Customer/BestCreator';
import ToLogin from '../../components/Customer/ToLogin';
import EventTerdekat from '../../components/Customer/EventTerdekat';
import { useUser } from '@clerk/clerk-react';
import EventGratis from '../../components/Customer/EventGratis';


const Home = () => {
  const { user } = useUser(); 

  return (
    <div className="flex flex-col items-center space-y-5 text-center gap-5">
      <Hero />
      <EventTerdekat /> 
      <EventGratis />  
      <BestCreator />
      {!user && <ToLogin />}
      <Footer />
    </div>
  );
};

export default Home;
