"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import React, { useState } from 'react';
import { Menu, X, FileText, ArrowRight, Play, Brain, FileSearch, FolderOpen, Zap, Shield, Clock, Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import Link from "next/link";


export default function Home() {
  const {user} = useUser();
  const createUser = useMutation(api.user.createUser)

  useEffect(() => {
    user&&CheckUser();
  },[user])

  const CheckUser=async() => {
    const result = await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName:user?.fullName
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/dashboard/upgrade' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Summarization',
      description: 'Advanced AI algorithms extract key insights and create concise summaries from your PDF documents.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileSearch,
      title: 'Smart PDF Parsing',
      description: 'Intelligent document analysis that understands structure, context, and important information.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FolderOpen,
      title: 'Note Organization',
      description: 'Automatically categorize and organize your notes with tags, folders, and smart collections.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process documents in seconds, not minutes. Get instant results with our optimized AI engine.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are encrypted and processed securely. We never store your sensitive information.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reduce reading time by up to 80%. Focus on what matters most with intelligent content extraction.',
      color: 'from-indigo-500 to-cyan-600'
    }
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Tutorials'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PDF Note AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200 mt-2">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Effortlessly Extract and 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}Summarize Notes
                  </span>
                  {" "}from PDFs
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your PDF documents into intelligent, organized notes with our AI-powered platform. 
                  Save time, boost productivity, and never miss important information again.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={'/dashboard'}>
                <button 
                  className="group bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button></Link>
                <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Free 14-day trial</span>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&crop=center"
                  alt="AI PDF Note Taker Interface"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-blue-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg animate-bounce">
                <FileText className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white p-3 rounded-full shadow-lg animate-pulse">
                <span className="text-sm font-bold">AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Smart Note-Taking
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform transforms how you interact with PDF documents, 
              making information extraction effortless and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 hover:scale-105">
              Explore All Features
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">PDF Note AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transform your PDF documents into intelligent, organized notes with our AI-powered platform. 
                Boost your productivity and never miss important information.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PDF Note AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
