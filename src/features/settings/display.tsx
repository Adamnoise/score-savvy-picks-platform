
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function SettingsDisplay() {
  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">Display Settings</h1>
      </Header>
      <Main fixed className="flex-1 space-y-4">
        <div className="flex h-full flex-col space-y-6 px-1 py-3">
          <h1 className="text-2xl font-bold">Display Settings</h1>
          <p className="text-muted-foreground">
            Customize the display of the application.
          </p>
        </div>
      </Main>
    </>
  )
}
