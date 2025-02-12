import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { Auth } from "../pages/auth";
import { Protected } from "../components/protectedRoute";
import { CreatePoll } from "../pages/polling/create";
import { PollingList } from "../pages/polling/Dashboard";

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
        path: '/polling',
        Component: () => <Protected View={PollingList} />
    },
    {
        path: '/polling/create',
        Component: () => <Protected View={CreatePoll} />
    },
])

export default router