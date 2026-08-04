import { FAQBlockSchema } from './schema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

const FAQSidebar = ({ data, block, onChangeBlock }) => {
  return (
    <InlineForm
      schema={FAQBlockSchema}
      title={FAQBlockSchema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
    />
  );
};

export default FAQSidebar;
