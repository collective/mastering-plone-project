import icon from '@plone/volto/icons/list-bullet.svg';

import FAQBlockEdit from '../components/Blocks/FAQ/BlockEdit';
import FAQBlockView from '../components/Blocks/FAQ/BlockView';
import { FAQBlockSchema } from '../components/Blocks/FAQ/schema';

import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.blocks.blocksConfig.faq = {
    id: 'faq',
    title: 'FAQ',
    blockSchema: FAQBlockSchema,
    edit: FAQBlockEdit,
    view: FAQBlockView,
    icon: icon,
    group: 'text',
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };
  return config;
}
