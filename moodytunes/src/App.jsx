import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { HowItWorks } from './pages/howitworks';
import { ContactUs } from './pages/contact';
import { LearnMore } from './pages/learn';
import { Signup } from './pages/signup';
import { Login } from './pages/login';
import { ResetPassword } from './pages/resetPassword';
import { CreatorSignup } from './pages/creatorSignup';
import { CreatorLogin } from './pages/creatorLogin';
import { CreatorResetPassword } from './pages/creatorResetpassword';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/howitworks' element={<HowItWorks />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/learn' element={<LearnMore />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/creator-signup' element={<CreatorSignup/>} />
      <Route path='/creator/login' element={<CreatorLogin />} />
      <Route path='/creator/reset-password' element={<CreatorResetPassword />} />
      <Route path="/dashboard/:username" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  );
}

export default App;
