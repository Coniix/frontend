import { Outlet, Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Layout = () => {
  return (
    <>
      <nav>
        <Stack direction="row" spacing={2}>
            <Button><Link to="/Create">Create</Link></Button>
            <Button><Link to="/Read">Read</Link></Button>
            <Button><Link to="/Update">Update</Link></Button>
            <Button><Link to="/Delete">Delete</Link></Button>
            <Button><Link to="/Play">Play</Link></Button>
        </Stack>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;