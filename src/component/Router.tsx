import { Routes, Route } from 'react-router-dom'
import { History } from '../page/history'
import { Home } from '../page/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
