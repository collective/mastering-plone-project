export const QuestionAnswerPairSchema = {
  title: 'Question and Answer Pair',
  fieldsets: [
    {
      id: 'default',
      title: 'QA pair',
      fields: ['question', 'answer'],
    },
  ],
  properties: {
    question: {
      title: 'Question',
      type: 'string',
      widget: 'textarea',
    },
    answer: {
      title: 'Answer',
      type: 'string',
      widget: 'richtext',
    },
  },
  required: ['question', 'answer'],
};

export const FAQBlockSchema = {
  title: 'FAQ',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['faqs'],
    },
  ],
  properties: {
    faqs: {
      title: 'Question and Answers',
      type: 'array',
      widget: 'object_list',
      schema: QuestionAnswerPairSchema,
    },
  },
  required: [],
};
