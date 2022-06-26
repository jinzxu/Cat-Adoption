import "../../styles/card.css";

// Pass props to the card so it is reusable
export default function Card(props) {
  return <div className="card">{props.children}</div>;
}
