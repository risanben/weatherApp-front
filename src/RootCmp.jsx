import React from 'react'
import { Routes, Route } from 'react-router'

import { Index } from './pages/index.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <main>
                <Routes>
                    <Route path="" element={<Index />} />
                </Routes>
            </main>
        </div>
    )
}


