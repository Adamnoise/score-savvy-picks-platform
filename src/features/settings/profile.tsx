
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function SettingsProfile() {
  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">Profile Settings</h1>
      </Header>
      <Main fixed className="flex-1 space-y-4">
        <div className="flex h-full flex-col space-y-6 px-1 py-3">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile information.
          </p>
        </div>
      </Main>
    </>
  )
}
