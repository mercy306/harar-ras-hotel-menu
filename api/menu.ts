import type { IncomingMessage, ServerResponse } from 'node:http'
import db from '../data/db.json'

interface RawItem {
  id: string
  categoryId: string
  nameEn: string
  nameAm: string
  descriptionEn: string
  descriptionAm: string
  price: number
  image: string | null
  available: boolean
  spicy: boolean
  sortOrder: number
}

interface RawCategory {
  id: string
  nameEn: string
  nameAm: string
  emoji: string
  sortOrder: number
}

const data = db as unknown as {
  hotel: Record<string, unknown>
  categories: RawCategory[]
  items: RawItem[]
}

function sortedCategories() {
  return [...data.categories].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.nameEn.localeCompare(b.nameEn),
  )
}

function sortedItems(categoryId: string) {
  return data.items
    .filter((item) => item.categoryId === categoryId && item.available)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.nameEn.localeCompare(b.nameEn))
}

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  const h = data.hotel
  const hotel = {
    nameEn: h.nameEn,
    nameAm: h.nameAm,
    taglineEn: h.taglineEn,
    taglineAm: h.taglineAm,
    addressEn: h.addressEn,
    addressAm: h.addressAm,
    phone: h.phone,
    currency: h.currency,
  }

  const categories = sortedCategories().map((category) => ({
    id: category.id,
    nameEn: category.nameEn,
    nameAm: category.nameAm,
    emoji: category.emoji,
    items: sortedItems(category.id),
  }))

  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=86400')
  res.statusCode = 200
  res.end(JSON.stringify({ hotel, categories, generatedAt: new Date().toISOString() }))
}
