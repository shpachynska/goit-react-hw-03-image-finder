import errorImage from "../../error.png";

export default function ErrorView() {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="sadcat" />
      <p>Nothing found!</p>
    </div>
  );
}
