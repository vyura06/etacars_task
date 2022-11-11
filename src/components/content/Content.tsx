import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Table } from '../../pages/main/table/currencyTable';
import { Info } from '../../pages/info/currencyInfo';

import { useEffect } from "react";
import { getCurrencies , CreatePage} from "../../redux/slices/currencySlice";
import { useAppDispatch } from "../../hooks/hooks";

export const Content = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrencies(CreatePage(1, 100)));
  }, [dispatch]);

  return (
    <section className='content'>
      <Routes>
          <Route path="/" element={<Table />} />
          <Route path="currency/:id" element={<Info />} />
      </Routes>
    </section>
  );
};

export default Content;