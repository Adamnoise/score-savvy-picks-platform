
import React from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'

export default function Dashboard() {
  const navLinks = [
    { title: 'Overview', href: '/', isActive: true },
    { title: 'Customers', href: '/users', isActive: false },
    { title: 'Products', href: '/apps', isActive: false },
    { title: 'Settings', href: '/settings', isActive: false },
  ]

  return (
    <>
      <Header fixed>
        <div className="flex flex-1 items-center justify-between gap-4">
          <TopNav links={navLinks} />
        </div>
      </Header>
      <Main fixed className="flex-1 space-y-4">
        <div className="flex h-full flex-col space-y-6 px-1 py-3">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <p className="text-muted-foreground">
            This is a sample dashboard built with Shadcn UI and React.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">12,345</p>
            </div>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-3xl font-bold">$12,345</p>
            </div>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
              <h3 className="text-lg font-semibold">Active Sessions</h3>
              <p className="text-3xl font-bold">123</p>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
