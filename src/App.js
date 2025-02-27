import './App.css';
import React from "react";
import "./index.css"

import {
  Routes,
  Route,
  Navigate
  // Link,
  // useParams,
  // useRouteMatch
} from "react-router-dom";

import ScrollToTop from './components/layouts/ScrollToTop';
import { Provider } from 'react-redux';
import ErrorPage from "./pages/ErrorPage";
import store from './store/store';
import ErrorNotifier from './components/elements/ErrorNotifier';
import SuccessNotifier from './components/elements/SuccessNotifier';
import Login from './pages/auth/Login';
import PasswordReset from './pages/auth/PasswordReset';
import AcceptInvitation from './pages/onboarding/AcceptInvitation';
import MerchantErrorPage from './pages/merchant/MerchantErrorPage';
import Merchant from './pages/Merchant';
import Home from './pages/merchant/Home';
import NewMerchant from './pages/merchant/NewMerchant';
import Signup from './pages/onboarding/Signup';
import ConfirmEmail from './pages/onboarding/ConfirmEmail';
import Transactions from './pages/merchant/transactions/Transactions';
import Customers from './pages/merchant/customers/Customers';
import Invoices from './pages/merchant/invoices/Invoices';
import InvoiceDetails from './pages/merchant/invoices/InvoiceDetails';
import PaymentPages from './pages/merchant/payment-pages/PaymentPages';
import PaymentPageDetails from './pages/merchant/payment-pages/PaymentPageDetails';
import PaymentItems from './pages/merchant/payment-items/PaymentItems';
import PaymentItemDetails from './pages/merchant/payment-items/PaymenItemDetails';
import SubAccounts from './pages/merchant/sub-accounts/SubAccounts';
import Settings from './pages/merchant/settings/Settings';
import UserProfile from './pages/merchant/settings/UserProfile';
import BusinessProfile from './pages/merchant/settings/BusinessProfile';
import MerchantKeys from './pages/merchant/settings/MerchantKeys';
import Team from './pages/merchant/settings/Team';
import SupportTickets from './pages/merchant/support/SupportTickets';
import SupportTicket from './pages/merchant/support/SupportTicket';

export default function App() {
  return (
    <main>
    <Provider store={store}>
      <ErrorNotifier />
      <SuccessNotifier />
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/password-reset/:resetCode" exact element={<PasswordReset />} />
          <Route path="/confirm-email/:confirmationCode" exact element={<ConfirmEmail />} />
          <Route path="/accept-invitation/:invitationCode" exact element={<AcceptInvitation />} />
          <Route path="/onboarding/new-merchant" element={<NewMerchant />} />

          <Route path="/merchant" element={<Merchant />}>
            <Route path="/merchant" element={<Navigate replace to="/merchant/home" />} />
            <Route path="/merchant/home" element={<Home />} />
            <Route path="/merchant/transactions" element={<Transactions />} />
            <Route path="/merchant/customers" element={<Customers />} />
            <Route path="/merchant/sub-accounts" element={<SubAccounts />} />

            <Route path="/merchant/invoices" element={<Invoices />} />
            <Route path="/merchant/invoices/:invoiceId" element={<InvoiceDetails />} />

            <Route path="/merchant/payment-pages" element={<PaymentPages />} />
            <Route path="/merchant/payment-pages/:paymentPageId" element={<PaymentPageDetails />} />
            
            <Route path="/merchant/payment-items" element={<PaymentItems />} />
            <Route path="/merchant/payment-items/:paymentItemId" element={<PaymentItemDetails />} />
            
            <Route path="/merchant/support" element={<SupportTickets />} />
            <Route path="/merchant/support/:ticketId" element={<SupportTicket />} />

            <Route path="/merchant/settings" element={<Settings />}>
              <Route path="/merchant/settings" element={<Navigate replace to="/merchant/settings/user-profile" />} />
              <Route path="/merchant/settings/user-profile" element={<UserProfile />} />
              <Route path="/merchant/settings/business-profile" element={<BusinessProfile />} />
              <Route path="/merchant/settings/merchant-keys" element={<MerchantKeys />} />
              <Route path="/merchant/settings/team" element={<Team />} />

            </Route>
            

            <Route path="/merchant/*" element={<MerchantErrorPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </Provider>
    </main>
  );
}
