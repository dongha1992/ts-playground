import ConfirmationPage from 'pages/ConfirmationPage';
import PropertyTypePage from 'pages/PropertyType';
import RegionBasedAddressPage from 'pages/RegionBasedAddressPage';
import StartPage from 'pages/StartPage';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/start" element={<StartPage />} />
      <Route path="/property-type" element={<PropertyTypePage />} />
      <Route path="/region-based-address" element={<RegionBasedAddressPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      {/* <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/inquiry-complete" element={<InquiryCompletePage />} />  */}
      <Route path="*" element={<Navigate replace to="/start" />} />
    </ReactRouterRoutes>
  );
};
