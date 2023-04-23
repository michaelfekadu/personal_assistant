import { useAppContext } from "@/context/AppContext";
import Collapsible from "react-collapsible";
import LoadingIndicator from "./LoadingIndicator";

export default function CollapsibleComponent(props: any) {
  const { onSubmit } = useAppContext();
  return (
    <Collapsible
      className="my-20 rounded-xl bg-gray-200 shadow-xl sm:p-10 p-5"
      openedClassName="my-20 rounded-xl bg-gray-200 shadow-xl sm:p-10 p-5"
      trigger={
        <div className="sm:text-4xl text-2xl font-bold text-center text-gray-800">
          {props.name}
        </div>
      }
    >
      <div className="flex flex-col items-center h-auto pt-10">
        <form className="w-full max-w-3xl">
          <div className="text-gray-500 italic pb-2 sm:text-base text-sm">
            {props.description}
          </div>
          <textarea
            className="w-full border-2 rounded-lg px-4 py-2 mb-4"
            placeholder="Enter your text here"
            value={props.textInput}
            onChange={(e) => props.setTextInput(e.target.value)}
            style={{ height: "400px" }}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => onSubmit(props.type)}
          >
            {props.buttonText}
          </button>
        </form>
        <LoadingIndicator status={props.loading} />
        {props.loading == "FinishedLoading" ? (
          <textarea
            className="w-full border-2 rounded-lg px-4 py-2 mt-4 "
            value={props.result}
            onChange={(e) => props.setResult(e.target.value)}
            style={{ height: "400px" }}
          />
        ) : null}
      </div>
    </Collapsible>
  );
}
