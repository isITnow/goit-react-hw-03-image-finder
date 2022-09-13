import s from './Button.module.css';

export const Button = ({ onClick, children }) => {
  return (
    <button type="submit" className={s.Button} onClick={onClick}>
      {children}
    </button>
  );
};
