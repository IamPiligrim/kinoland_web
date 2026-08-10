import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout/Layout.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { BanquetsPage } from './pages/BanquetsPage.tsx'
import { CookiesPage } from './pages/CookiesPage.tsx'
import { FoodPage } from './pages/FoodPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { MoviePage } from './pages/MoviePage.tsx'
import { NewsPage } from './pages/NewsPage.tsx'
import { NewsPostPage } from './pages/NewsPostPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import { SchedulePage } from './pages/SchedulePage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="movies/:slug" element={<MoviePage />} />
          <Route path="food" element={<FoodPage />} />
          <Route path="banquets" element={<BanquetsPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsPostPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
