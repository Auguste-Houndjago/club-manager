import style from './cadre.module.css';

const Cadre = () => {
  return (
    <div>
      <div className={style.outer}>
        <div className={style.dot}></div>
        <div className={style.card}>
          <div className={style.ray}></div>
          <div className={style.text}>750k</div>
          <div>Views</div>
          <div className={`${style.line} ${style.topl}`}></div>
          <div className={`${style.line} ${style.leftl}`}></div>
          <div className={`${style.line} ${style.bottoml}`}></div>
          <div className={`${style.line} ${style.rightl}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Cadre;
