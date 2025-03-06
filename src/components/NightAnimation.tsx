import "./nightAnimation.scss";

const Flower = ({ number }: { number: number }) => {
  return (
    <div className={`flower flower--${number}`}>
      <div className={`flower__leafs flower__leafs--${number}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`flower__leaf flower__leaf--${i + 1}`}></div>
        ))}
        <div className="flower__white-circle"></div>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`flower__light flower__light--${i + 1}`}></div>
        ))}
      </div>
      <div className="flower__line">
        {[...Array(number === 1 ? 6 : 4)].map((_, i) => (
          <div
            key={i}
            className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

const Grass = ({ number }: { number: number }) => {
  return (
    <div className="growing-grass">
      <div className={`flower__grass flower__grass--${number}`}>
        <div className="flower__grass--top"></div>
        <div className="flower__grass--bottom"></div>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`flower__grass__leaf flower__grass__leaf--${
              i + 1
            }`}></div>
        ))}
        <div className="flower__grass__overlay"></div>
      </div>
    </div>
  );
};

const BlossomingFlowers = () => {
  return (
    <div className="not-loaded">
      <div className="night"></div>
      <div className="flowers">
        {[1, 2, 3].map((num) => (
          <Flower key={num} number={num} />
        ))}
      </div>
      {[1, 2].map((num) => (
        <Grass key={num} number={num} />
      ))}
    </div>
  );
};

export default BlossomingFlowers;
