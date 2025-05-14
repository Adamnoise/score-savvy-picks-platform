
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function Apps() {
  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">Apps</h1>
      </Header>
      <Main fixed className="flex-1 space-y-4">
        <div className="flex h-full flex-col space-y-6 px-1 py-3">
          <h1 className="text-2xl font-bold">Apps Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and configure your applications.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
              <h3 className="text-lg font-semibold">App 1</h3>
              <p className="text-muted-foreground">Application description</p>
            </div>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
              <h3 className="text-lg font-semibold">App 2</h3>
              <p className="text-muted-foreground">Application description</p>
            </div>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
              <h3 className="text-lg font-semibold">App 3</h3>
              <p className="text-muted-foreground">Application description</p>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
