import FAQ from './FAQ';

const View = ({ data }) => {
  return (
    <div className="block faq">
      <FAQ data={data} />
    </div>
  );
};

export default View;
