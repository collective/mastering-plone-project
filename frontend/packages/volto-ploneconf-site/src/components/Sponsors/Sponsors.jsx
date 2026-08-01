import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Component from '@plone/volto/components/theme/Component/Component';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { searchContent } from '@plone/volto/actions/search/search';

const groupedSponsorsByLevel = (array = []) =>
  array.reduce((obj, item) => {
    let token = item.level || 'bronze';
    obj[token] ? obj[token].push(item) : (obj[token] = [item]);
    return obj;
  }, {});

const Sponsors = () => {
  const dispatch = useDispatch();
  const sponsors = useSelector((state) =>
    groupedSponsorsByLevel(state.search.subrequests.sponsors?.items),
  );

  useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: ['sponsor'],
          review_state: 'published',
          sort_on: 'effective',
          metadata_fields: ['level', 'url'],
        },
        'sponsors',
      ),
    );
  }, [dispatch]);

  return sponsors && Object.keys(sponsors).length > 0 ? (
    <div className="ui container">
      <div className="ui basic center aligned segment sponsors">
        <div className="sponsorheader">
          <h2 className="subheadline">SPONSORS</h2>
        </div>
        {Object.keys(sponsors).map((level) => {
          return (
            <div key={level} className={'sponsorlevel ' + level}>
              <h3>{level.toUpperCase()}</h3>
              <div className="ui centered grid">
                <div className="centered row">
                  {sponsors[level].map((item) => (
                    <div key={item['@id']} className="sponsor column">
                      <ConditionalLink
                        to={item.url}
                        openLinkInNewTab={true}
                        condition={item.url}
                      >
                        <Component
                          componentName="PreviewImage"
                          item={item}
                          image_field="logo"
                          imageField="logo"
                          alt={item.title}
                          width="100"
                          height="auto"
                          className="ui image"
                        />
                      </ConditionalLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Sponsors;
