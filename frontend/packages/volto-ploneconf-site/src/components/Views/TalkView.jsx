import { Container as SemanticContainer } from 'semantic-ui-react';
import config from '@plone/volto/registry';

const colorMapping = {
  beginner: 'green',
  advanced: 'yellow',
  professional: 'purple',
};

const TalkView = (props) => {
  const { content } = props;
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;
  const Image = config.getComponent({ name: 'Image' }).component;
  return (
    <Container id="view-wrapper talk-view">
      <h1 className="documentFirstHeading">
        <span className="type_of_talk">{content.type_of_talk.token}: </span>
        {content.title}
      </h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.audience?.map((item) => {
        let color = colorMapping[item.token] || 'green';
        return (
          <div className={`ui label ${color}`} key={item.token}>
            {item.token}
          </div>
        );
      })}
      <div dangerouslySetInnerHTML={{ __html: content.details.data }} />
      <div className="ui clearing segment">
        {content.speaker && (
          <div className="ui dividing header">{content.speaker}</div>
        )}
        {content.website ? (
          <p>
            <a href={content.website}>{content.company || content.website}</a>
          </p>
        ) : (
          <p>{content.company}</p>
        )}
        {content.email && (
          <p>
            Email: <a href={`mailto:${content.email}`}>{content.email}</a>
          </p>
        )}
        {content.github && (
          <p>
            Github:{' '}
            <a href={`https://github.com/${content.github}`}>
              {content.github}
            </a>
          </p>
        )}
        <Image
          item={content}
          alt={content.speaker}
          className="ui small right floated image"
        />
        {content.speaker_biography && (
          <div
            dangerouslySetInnerHTML={{
              __html: content.speaker_biography.data,
            }}
          />
        )}
      </div>
    </Container>
  );
};
export default TalkView;
