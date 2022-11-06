import React from 'react';
import {Content} from './components/content/Content'
import {Header} from './components/header/Header'
import {Footer} from './components/footer/Footer'

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};