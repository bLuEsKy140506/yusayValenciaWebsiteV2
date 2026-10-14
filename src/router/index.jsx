import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";

import HomePage from "@/features/home";
import ApplyPage from "@/features/apply/ApplyPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/apply"
                        element={<ApplyPage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
