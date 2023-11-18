import React, { useEffect, useState } from 'react';
import TopUserPurchase from '../../../components/main/TopUserPurchase';
import { Outlet } from 'react-router-dom';

const OrderReview = () => {
  return (
    <div>
      <section className="our-team position-relative">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
              data-sidebar-position="fixed" data-header-position="fixed">
              <TopUserPurchase />
            </div>
          </div>
          <div className="body-wrapper" style={{ height: "100vh" }}>
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderReview;
