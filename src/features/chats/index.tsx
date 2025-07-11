
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function Chats() {
  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">Chats</h1>
      </Header>
      <Main fixed className="flex-1 space-y-4">
        <div className="flex h-full flex-col space-y-6 px-1 py-3">
          <h1 className="text-2xl font-bold">Chats Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your conversations and messages.
          </p>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
            <h3 className="text-lg font-semibold">Recent Chats</h3>
            <p className="text-muted-foreground">No recent conversations</p>
          </div>
        </div>
      </Main>
    </>
  )
}
