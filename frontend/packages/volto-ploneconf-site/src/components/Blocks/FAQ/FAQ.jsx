import { useState } from 'react';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import AnimateHeight from 'react-animate-height';

import { Accordion, Grid, Divider, Header } from 'semantic-ui-react';

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(new Set());

  return data.faqs ? (
    <>
      <Divider section />
      {data.faqs.map(({ '@id': id, question, answer }) => (
        <Accordion key={id} fluid exclusive={false}>
          <Accordion.Title
            index={id}
            className="stretched row"
            active={activeIndex.has(id)}
            onClick={() => {
              const newSet = new Set(activeIndex);
              activeIndex.has(id) ? newSet.delete(id) : newSet.add(id);
              setActiveIndex(newSet);
            }}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column width="1">
                  {activeIndex.has(id) ? (
                    <Icon name={downSVG} size="20px" />
                  ) : (
                    <Icon name={rightSVG} size="20px" />
                  )}
                </Grid.Column>
                <Grid.Column width="11">
                  <Header as="h3">{question}</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Title>
          <div>
            <Accordion.Content
              className="stretched row"
              active={activeIndex.has(id)}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width="1"></Grid.Column>
                  <Grid.Column width="11">
                    <div>
                      <AnimateHeight
                        key={id}
                        duration={300}
                        height={activeIndex.has(id) ? 'auto' : 0}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: answer.data,
                          }}
                        />
                      </AnimateHeight>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Content>
          </div>
          <Divider section />
        </Accordion>
      ))}
    </>
  ) : (
    ''
  );
};

export default FAQ;
