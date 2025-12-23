import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import styles from './AppLayout.module.css'

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <AppHeader />
      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
