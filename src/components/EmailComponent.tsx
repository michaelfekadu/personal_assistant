import { useAppContext } from "@/context/AppContext";
import Collapsible from "react-collapsible";
import LoadingIndicator from "./LoadingIndicator";

export default function EmailComponent() {
  const {
    emailLoading,
    emailResult,
    setEmailResult,
    emailTextInput,
    setEmailTextInput,
    emailRecipient,
    setEmailRecipient,
    emailSender,
    setEmailSender,
    onSubmit,
  } = useAppContext();

  return (
    <div>
      <Collapsible
        className="my-20 rounded-xl bg-gray-200 shadow-xl sm:p-10 p-5"
        openedClassName="my-20 rounded-xl bg-gray-200 shadow-xl sm:p-10 p-5"
        trigger={
          <div className="sm:text-4xl text-2xl font-bold text-center text-gray-800">
            Email Writer
          </div>
        }
      >
        <div className="flex flex-col items-center h-auto pt-10">
          <form className="w-full max-w-3xl">
            <div className="text-gray-500 italic pb-2">
              Please enter the recipient&apos;s name for the email you wish to
              compose.{" "}
            </div>
            <textarea
              className="w-full border-2 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:shadow-outline"
              placeholder="Recipient's name"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              style={{ height: "50px" }}
            />

            <div className="text-gray-500 italic pb-2">
              Please provide a description of the email&apos;s context and
              include all relevant topics that you wish to be addressed in the
              message. Bullet points are also acceptable.
            </div>
            <textarea
              className="w-full border-2 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:shadow-outline"
              placeholder="Enter your text/bullet points here"
              value={emailTextInput}
              onChange={(e) => setEmailTextInput(e.target.value)}
              style={{ height: "400px" }}
            />
            <div className="text-gray-500 italic pb-2">
              Please enter your name.
            </div>
            <textarea
              className="w-full border-2 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:shadow-outline"
              placeholder="Your name"
              value={emailSender}
              onChange={(e) => setEmailSender(e.target.value)}
              style={{ height: "50px" }}
            />
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => onSubmit("email")}
            >
              Write Email
            </button>
          </form>
          <LoadingIndicator status={emailLoading} />
          {emailLoading == "FinishedLoading" ? (
            <textarea
              className="w-full border-2 rounded-lg px-4 py-2 mt-4"
              value={emailResult}
              onChange={(e) => setEmailResult(e.target.value)}
              style={{ height: "400px" }}
            />
          ) : null}
        </div>
      </Collapsible>
    </div>
  );
}
