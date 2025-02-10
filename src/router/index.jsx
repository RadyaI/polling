import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { Auth } from "../pages/auth";
import { Protected } from "../components/protectedRoute";
import { CreatePoll } from "../pages/polling/create";
import { PollingList } from "../pages/polling/list";

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
    },
    {
        path: '/polling',
        Component: () => <Protected View={PollingList} />
    }
])

export default router