import { Routes, Route } from "react-router-dom";

import {
    Admin,
    Index,
    NotFound,
    Quiz,
    Ranking,
    Results,
    Login,
    QuizConfigPage
} from "@/pages";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/login" element={<Login />} />
            
            <Route path="/quiz-config" element={<QuizConfigPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            
            <Route path="/ranking" element={<Ranking />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};