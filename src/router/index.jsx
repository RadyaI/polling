import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { Auth } from "../pages/auth";
import { Protected } from "../components/protectedRoute";
import { CreatePoll } from "../pages/polling/create";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    },
    {
        path: '/auth',
        Component: Auth
    },
    {
        path: '/create',
        Component: () => <Protected View={CreatePoll} />
    }
])

export default router