import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';

import FAQSidebar from './FAQSidebar';
import FAQ from './FAQ';

const Edit = ({ data, onChangeBlock, block, selected }) => {
  return (
    <div className={'block faq'}>
      <SidebarPortal selected={selected}>
        <FAQSidebar data={data} block={block} onChangeBlock={onChangeBlock} />
      </SidebarPortal>

      <FAQ data={data} />
    </div>
  );
};

export default Edit;
