import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './customer/routers/CustomerRouters';
import AdminRouters from './customer/routers/AdminRouters';

function App() {
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

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
