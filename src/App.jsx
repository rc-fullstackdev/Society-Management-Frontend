import React, { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"

const Home = lazy(() => import("./pages/Home"))

/* ------------------------ Admin Routes ----------------------------*/
const AdminLoginForm = lazy(() => import('./components/admin/AdminLoginForm'))
const AdminProtected = lazy(() => import('./components/admin/AdminProtected'))
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'))
const SocietyDetails = lazy(() => import('./components/admin/SocietyDetails'))
const SecretaryDetails = lazy(() => import('./components/admin/SecretaryDetails'))
const ContactDetails = lazy(() => import('./components/admin/ContactDetails'))

/* ------------------------ Secretary Routes ----------------------------*/
const SecretaryRegisterForm = lazy(() => import("./components/secretary/SecretaryRegisterForm"))
const SecretaryLoginForm = lazy(() => import("./components/secretary/SecretaryLoginForm"))
const SecretaryProtected = lazy(() => import('./components/secretary/SecretaryProtected'))
const SecretaryDashboard = lazy(() => import("./components/secretary/SecretaryDashboard"))
const GetResidents = lazy(() => import('./components/secretary/GetResidents'))
const GetSecurityGuard = lazy(() => import('./components/secretary/GetSecurityGuard'))
const CreateMaintenance = lazy(() => import('./components/secretary/CreateMaintenance'))
const CashMaintenaceForm = lazy(() => import('./components/secretary/CashMaintenaceForm'))
const GetMaintenance = lazy(() => import('./components/secretary/GetMaintenance'))
const GetPayment = lazy(() => import('./components/secretary/GetPayment'))
const AddEvent = lazy(() => import('./components/secretary/AddEvent'))
const GetEvent = lazy(() => import('./components/secretary/GetEvent'))
const ComplaintInfoTable = lazy(() => import('./components/secretary/ComplaintInfoTable'))
const ComplaintInfoCard = lazy(() => import('./components/secretary/ComplaintInfoCard'))
const SecretaryVisitorList = lazy(() => import('./components/secretary/SecretaryVisitorList'))
const SecretaryVisitorDetails = lazy(() => import('./components/secretary/SecretaryVisitorDetails'))
const GetResidentBookingList = lazy(() => import('./components/secretary/GetResidentBookingList'))
const GetResidentBookingDetails = lazy(() => import('./components/secretary/GetResidentBookingDetails'))

/* ------------------------ Residential Routes ----------------------------*/
const ResidentialRegisterForm = lazy(() => import('./components/secretary/ResidentRegisterForm'))
const ResidentialLoginForm = lazy(() => import('./components/residential/ResidentialLoginForm'))
const ResidentialProtected = lazy(() => import('./components/residential/ResidentialProtected'))
const ResidentialDashboard = lazy(() => import('./components/residential/ResidentialDashboard'))
const PayMaintenance = lazy(() => import('./components/residential/PayMaintenance'))
const ResidentCardModal = lazy(() => import('./components/secretary/ResidentCardModal'))
const PaymentHistory = lazy(() => import('./components/residential/PaymentHistory'))
const FlatDetails = lazy(() => import('./components/residential/FlatDetails'))
const GetAllSocietyEvent = lazy(() => import('./components/residential/GetAllSocietyEvent'))
const ComplaintForm = lazy(() => import('./components/residential/ComplaintForm'))
const ComplaintDetails = lazy(() => import('./components/residential/ComplaintDetails'))
const ComplaintCard = lazy(() => import('./components/residential/ComplaintCard'))
const ResidentGuestList = lazy(() => import('./components/residential/ResidentGuestList'))
const FacilityBookingForm = lazy(() => import('./components/residential/FacilityBookingForm'))
const ResidentFacilityBookingList = lazy(() => import('./components/residential/ResidentFacilityBookingList'))
const ResidentBookingDetails = lazy(() => import('./components/residential/ResidentBookingDetails'))

/* ------------------------ Security Guard Routes ----------------------------*/
const GuardRegisterForm = lazy(() => import('./components/secretary/GuardRegisterForm'))
const SecurityGuardLoginForm = lazy(() => import('./components/security-guard/SecurityGuardLoginForm'))
const GuardProtected = lazy(() => import('./components/security-guard/GuardProtected'))
const SecurityGuardDashboard = lazy(() => import('./components/security-guard/SecurityGuardDashboard'))
const AddGuestInformation = lazy(() => import('./components/security-guard/AddGuestInformation'))
const GetAllResidential = lazy(() => import('./components/security-guard/GetAllResidential'))
const GuestInformation = lazy(() => import('./components/security-guard/GuestInformation'))
const GuestInfoCard = lazy(() => import('./components/security-guard/GuestInfoCard'))


const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <>
    <h1>{error.message}</h1>
    <button onClick={resetErrorBoundary}>Retry</button>
  </>
}

const App = () => {

  const location = useLocation()
  const Fallback = () => <h1>Loading...</h1>

  const PUBLIC_ROUTES = [
    { path: "/admin-login", element: <AdminLoginForm /> },
    { path: "/secretary-register", element: <SecretaryRegisterForm /> },
    { path: "/secretary-login", element: <SecretaryLoginForm /> },
    { path: "/residential-login", element: <ResidentialLoginForm /> },
    { path: "/guard-login", element: <SecurityGuardLoginForm /> },
  ]

  const ADMIN_ROUTES = [
    { path: "society/details", element: <SocietyDetails /> },
    { path: "secretary/details/:id", element: <SecretaryDetails /> },
    { path: "contact/details", element: <ContactDetails /> }
  ]

  const SECRETARY_ROUTES = [
    { path: "residents/register", element: <ResidentialRegisterForm /> },
    { path: "guards/register", element: <GuardRegisterForm /> },
    { path: "residents", element: <GetResidents /> },
    { path: "guard", element: <GetSecurityGuard /> },
    { path: "maintenance/create", element: <CreateMaintenance /> },
    { path: "maintenance", element: <GetMaintenance /> },
    { path: "payment", element: <GetPayment /> },
    { path: "view/residential", element: <ResidentCardModal /> },
    { path: "cash/payment", element: <CashMaintenaceForm /> },
    { path: "events/create", element: <AddEvent /> },
    { path: "events", element: <GetEvent /> },
    { path: "all/complaint", element: <ComplaintInfoTable /> },
    { path: "complaint/:id", element: <ComplaintInfoCard /> },
    { path: "society/guest", element: <SecretaryVisitorList /> },
    { path: "society/guest/details", element: <SecretaryVisitorDetails /> },
    { path: "facility/booking", element: <GetResidentBookingList /> },
    { path: "facility/booking/details/:id", element: <GetResidentBookingDetails /> },
  ]

  const RESIDENTIAL_ROUTES = [
    { path: "payment", element: < PayMaintenance /> },
    { path: "payment/history", element: < PaymentHistory /> },
    { path: "flat/details", element: < FlatDetails /> },
    { path: "society/event", element: < GetAllSocietyEvent /> },
    { path: "complaint/form", element: < ComplaintForm /> },
    { path: "society/details", element: < ComplaintDetails /> },
    { path: "complaint/card", element: < ComplaintCard /> },
    { path: "resident/guest", element: < ResidentGuestList /> },
    { path: "add/facility/booking", element: < FacilityBookingForm /> },
    { path: "get/facility/booking", element: < ResidentFacilityBookingList /> },
    { path: "facility/booking/details", element: < ResidentBookingDetails /> },
  ]

  const GUARD_ROUTES = [
    { path: "add/guest", element: <AddGuestInformation /> },
    { path: "all/residential", element: <GetAllResidential /> },
    { path: "all/guest", element: <GuestInformation /> },
    { path: "guest/card", element: <GuestInfoCard /> },
  ]


  return <>
    <ToastContainer />

    <Routes>

      <Route path='/' element={<Home />} />

      {PUBLIC_ROUTES.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={
            <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Fallback />}>
                {item.element}
              </Suspense>
            </ErrorBoundary>
          }
        />
      ))}

      <Route path='/admin' element={<AdminProtected><AdminDashboard /></AdminProtected>}>
        {
          ADMIN_ROUTES.map((item, index) => <Route
            key={index}
            index={item.path === ""}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>



      <Route path='/secretary' element={<SecretaryProtected><SecretaryDashboard /></SecretaryProtected>}>
        {
          SECRETARY_ROUTES.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>



      <Route path='/residential' element={<ResidentialProtected><ResidentialDashboard /></ResidentialProtected>}>
        {
          RESIDENTIAL_ROUTES.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>



      <Route path='/securityguard' element={<GuardProtected><SecurityGuardDashboard /></GuardProtected>}>
        {
          GUARD_ROUTES.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>

    </Routes >
  </>
};


export default App