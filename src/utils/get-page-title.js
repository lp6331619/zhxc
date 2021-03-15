import defaultSettings from '@/settings'

const title = defaultSettings.title || 'wy_admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
