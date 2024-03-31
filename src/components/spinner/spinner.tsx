import { SpinnerRoundFilled } from 'spinners-react';

function Spinner(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Высота может быть любой, в данном случае центрируется по вертикали
    }}
    >
      <SpinnerRoundFilled size={50} thickness={100} speed={100} color="rgba(105, 57, 172, 1)" />
    </div>
  );
}

export default Spinner;
