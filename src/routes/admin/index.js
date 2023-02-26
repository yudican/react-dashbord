import { Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Pages from './pages';
import MenuPage from '../../container/setting/menu';
import withAdminLayout from '../../layout/withAdminLayout';
import ErrorPage from '../../container/pages/404';
import RolePage from '../../container/setting/role';
import ProductList from '../../container/product/ProductList';

const Admin = React.memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Pages />} />
        <Route path="/setting/menu" element={<MenuPage />} />
        <Route path="/setting/role" element={<RolePage />} />

        {/* product */}
        <Route path="/product/prabayar" element={<ProductList type="prepaid" />} />
        <Route path="/product/pascabayar" element={<ProductList type="pasca" />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
