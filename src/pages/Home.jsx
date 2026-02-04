import React from 'react'
import HeroSection from '../components/common/HeroSection'
import Navbar from '@/components/common/Navbar'
import KeyFeatures from '@/components/common/KeyFeatures'
import ProductScreenshot from '@/components/common/ProductScreenshot'
import PricingPlans from '@/components/common/PricingPlans'
import Footer from '@/components/common/Footer'
import AboutSection from '@/components/common/Aboutsection'
import ContactSection from '@/components/common/ContactSection'

const Home = () => {
    return <>
        <Navbar />
        <HeroSection id="home" />
        <AboutSection id="about" />
        <KeyFeatures id="features" />
        <ProductScreenshot id="screenshots" />
        <PricingPlans id="pricing" />
        <ContactSection id="contact" />
        <Footer />
    </>
}

export default Home