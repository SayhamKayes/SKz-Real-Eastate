import React from 'react';
import { RealEstateProvider } from './Context/RealEstateContext.jsx';
import MainLayout from './Layouts/MainLayout.jsx';
import AppRouter from './routers/AppRouter.jsx';
import './App.css';

export default function App() {
  return (
    <RealEstateProvider>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </RealEstateProvider>
  );
}
