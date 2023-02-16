import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './src/layouts/DefaultLayout'
import { History } from './src/page/history'
import { Home } from './src/page/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
