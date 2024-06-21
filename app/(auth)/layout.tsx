import React from 'react'

interface Props {}

function Layout( {children}: { children: React.ReactNode }) {

    return (
        <main className="auth">{children}</main>
    )
}

export default Layout
