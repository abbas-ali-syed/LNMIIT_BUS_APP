import { Route, Routes } from "react-router-dom";
import QrPage from "./pages/QrPage";
import CountPage from "./pages/countPage";
import Navbar from "./pages/Navbar";
import UserProvider from "./UserContext";
import QrScanPage from "./pages/QrScanPage";
import Bus from "./pages/Bus";

function App() {
  return (
    <>
      <UserProvider>
        <div>
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/qrpage/:rollNo" element={<QrPage />} />
            <Route path="/countPage" element={<CountPage />} />
            <Route path="/scannedPage" element={<QrScanPage />} />
            <Route path="/bus/:id" element={<Bus />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
