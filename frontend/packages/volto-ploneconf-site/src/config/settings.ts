import type { ConfigType } from '@plone/registry';
import type { BlockExtension, ViewsConfig } from '@plone/types';
import TalkView from '../components/Views/TalkView';
import TalkListingBlockVariation from '../components/variations/TalkListingBlockVariation';

export default function install(config: ConfigType) {
  // Language settings
  config.settings.defaultLanguage = 'en';
  // Additional language settings for Volto 19 and above, add as many supported languages as needed
  // Languages not added to supportedLanguages will not be included in the build
  // config.settings.supportedLanguages = ['en'];

  config.views = {
    ...(config.views as ViewsConfig),
    contentTypesViews: {
      ...config.views.contentTypesViews,
      talk: TalkView,
    },
  };

  config.blocks.blocksConfig.listing.variations = [
    ...(config.blocks.blocksConfig.listing.variations as BlockExtension[]),
    {
      id: 'talks',
      title: 'Talks',
      template: TalkListingBlockVariation,
    },
  ];

  return config;
}
