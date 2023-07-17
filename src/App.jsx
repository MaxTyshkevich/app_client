/* import Register from './Register'; */
import { Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Editor from './pages/Editor';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Lounge from './pages/Lounge';
import LinkPage from './pages/LinkPage';
import Missing from './pages/Missing';
import Register from './pages/Register';
import RequireAuth from './pages/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import RefreshAuth from './pages/RefreshAuth';
import Home from './pages/Home';
import './index.css';

const ROLE_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="linkpage" element={<LinkPage />} />
        {/* path="linkpage" */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* private routes */}

        <Route element={<RefreshAuth />}>
          <Route element={<RequireAuth allowedRoles={[ROLE_LIST.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLE_LIST.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[ROLE_LIST.Editor, ROLE_LIST.Admin]} />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLE_LIST.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
