import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { Auth } from "../pages/auth";
import { Protected } from "../components/protectedRoute";
import { CreatePoll } from "../pages/polling/create";
import { PollingList } from "../pages/polling/Dashboard";
import { UpdatePoll } from "../pages/polling/update";
import { notFound } from "../components/404/notFound";
import { pollingPage } from "../pages/pollingPage";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    },
    {
        path: "/:id",
        Component: pollingPage
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
    {
        path: '/polling/update/:pollId',
        Component: () => <Protected View={UpdatePoll} />
    },
    {
        path: "*",
        Component: notFound
    }
])

export default router