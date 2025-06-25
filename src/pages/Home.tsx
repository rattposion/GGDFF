import React from 'react';
import Hero from '../components/Home/Hero';
import Categories from '../components/Home/Categories';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Features from '../components/Home/Features';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Features />
    </>
  );
}