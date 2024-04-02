import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './customer/routers/CustomerRouters';
import AdminRouters from './customer/routers/AdminRouters';
import IsAdmin from './config/isAdmin';

function App() {
  const isAdmin = IsAdmin();

  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomerRouters />}></Route>
        {isAdmin && <Route path='/admin/*' element={<AdminRouters />} />}
      </Routes>
    </div>
  );
}

export default App;
