import PropTypes from 'prop-types';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import Component from '@plone/volto/components/theme/Component/Component';
import { When } from '@plone/volto/components/theme/View/EventDatesInfo';

import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';

const colorMapping = {
  beginner: 'green',
  advanced: 'yellow',
  professional: 'purple',
};

const SummaryTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <Component componentName="PreviewImage" item={item} alt="" />
              <div className="listing-body">
                <When
                  start={item.start}
                  end={item.end}
                  whole_day={item.whole_day}
                  open_end={item.open_end}
                />
                <h3>{item.title || item.id}</h3>
                {item.speakers?.length > 0 && (
                  <p>
                    {item.speakers.map((speaker) => speaker.title).join(', ')}
                  </p>
                )}
                <p>
                  {item.room && (
                    <>
                      <b>Room: </b>
                      {item.room}
                      <br />
                    </>
                  )}
                  {item.audience?.length > 0 && (
                    <>
                      <b>Audience:</b>
                      {item.audience?.map((audience) => {
                        let color = colorMapping[audience] || 'green';
                        return (
                          <div className={`ui label ${color}`} key={audience}>
                            {audience}
                          </div>
                        );
                      })}
                    </>
                  )}
                </p>
                <p>{item.description}</p>
              </div>
            </ConditionalLink>
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

SummaryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default SummaryTemplate;
