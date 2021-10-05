const SquareTile = props => {
  return (
    <>
      <br></br>
      <div>{props.meat.map(meat => console.log(meat))} </div>
      <div>
        {props.meat.map(meat => {
          return <div key={props.id}>{meat}</div>;
        })}
      </div>
      <div></div>
      <br></br>
    </>
  );
};

export default SquareTile;
