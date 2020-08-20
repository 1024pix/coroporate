import LinkResolver from '~/plugins/link-resolver.js'

export const documents = {
  hotNews: 'hot_news',
  legalNotices: 'legal-notices',
  termsOfService: 'cgu_page',
  stats: 'statistiques',
  index: 'index',
  navigation: 'navigation',
  mediation: 'mediation',
  higherEducation: 'higher-education',
  keyNumbers: 'key_numbers',
  employers: 'employers',
  schoolEducation: 'school-education',
  about: 'about',
  skills: 'competences',
}

export function documentFetcher(
  prismic,
  i18n = { defaultLocale: 'fr-fr' },
  req
) {
  const lang = i18n.locale || i18n.defaultLocale
  return {
    get: getSingle,
    getEmployers: async () => {
      const document = await prismic.api.getSingle('employers', {
        lang,
        fetchLinks: [
          'distributor_item.description',
          'distributor_item.footer',
          'distributor_item.link',
          'distributor_item.logo',
          'distributor_item.name',
        ],
      })
      return document
    },
    findNewsItems: async ({ page, pageSize } = { page: 1, pageSize: 20 }) => {
      const documents = await prismic.api.query(
        prismic.predicates.at('document.type', 'news_item'),
        {
          page,
          pageSize,
          orderings: '[my.news_item.date desc]',
          lang,
        }
      )
      return documents.results
    },
    getNewsItemByUid: async (slug) => {
      const document = await prismic.api.query(
        prismic.predicates.at('my.news_item.uid', slug),
        { lang }
      )
      return document.results[0]
    },
    getPreviewUrl: (previewToken) => {
      return prismic.api.previewSession(previewToken, LinkResolver, '/')
    },
    getSimplePageByUid: async (uid) => {
      const document = await prismic.api.query(
        prismic.predicates.at('my.simple_page.uid', uid),
        { lang }
      )
      return document.results[0]
    },
  }

  function getSingle(type) {
    return prismic.api.getSingle(type, { lang })
  }
}
