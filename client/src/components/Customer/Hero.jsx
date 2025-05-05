import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from './SearchBar';
import Caraousel from './Caraousel';

const slides = [
  'https://picsum.photos/id/1018/800/400',
  'https://picsum.photos/id/1015/800/400',
  'https://picsum.photos/id/1019/800/400'
]

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-5 px-5 space-y-5 md:px-0 text-center bg-gradient-to-b from-cyan-300/70">
      <Caraousel slides={slides}/>
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto pt-12">
        Temukan Tiket <span className="text-blue-600">Event Termudah!</span>
        <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-0" />
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">Yuk, temukan keseruan yang kamu tunggu!</p>

      <p className="md:hidden text-gray-500 max-w-sm mx-auto">Yuk, temukan keseruan yang kamu tunggu!</p>
      <SearchBar />
    </div>
  );
};

export default Hero;
