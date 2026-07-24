import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";

import HomePage from "@/features/home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}