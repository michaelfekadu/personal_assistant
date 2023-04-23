import { ThreeDots } from "react-loader-spinner";

export default function LoadingIndicator(props: any) {
  return (
    <div>
      {props.status === "IsLoading" ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#2563eb"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      ) : null}
    </div>
  );
}
