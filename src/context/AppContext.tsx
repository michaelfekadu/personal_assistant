import { createContext, useContext, useState } from "react";

interface AppContextType {
  enhanceTextInput: string;
  setEnhanceTextInput: any;
  enhanceResult: string;
  setEnhanceResult: any;
  enhanceLoading: string;
  setEnhanceLoading: any;
  emailTextInput: string;
  setEmailTextInput: any;
  emailResult: string;
  setEmailResult: any;
  emailLoading: string;
  setEmailLoading: any;
  summarizeTextInput: string;
  setSummarizeTextInput: any;
  summarizeResult: string;
  setSummarizeResult: any;
  summarizeLoading: string;
  setSummarizeLoading: any;
  emailRecipient: string;
  setEmailRecipient: any;
  emailSender: string;
  setEmailSender: any;
  onSubmit: any;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppWrapper({ children }: any) {
  const [enhanceTextInput, setEnhanceTextInput] = useState("");
  const [emailTextInput, setEmailTextInput] = useState("");
  const [emailRecipient, setEmailRecipient] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [summarizeTextInput, setSummarizeTextInput] = useState("");
  const [enhanceResult, setEnhanceResult] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [summarizeResult, setSummarizeResult] = useState("");
  const [enhanceLoading, setEnhanceLoading] = useState("notStarted");
  const [emailLoading, setEmailLoading] = useState("notStarted");
  const [summarizeLoading, setSummarizeLoading] = useState("notStarted");

  async function onSubmit(job: string) {
    try {
      const textInput = getTextInput(job);
      const recipient = getRecipient(job);
      const sender = getSender(job);
      const setLoading = getSetLoading(job);
      if (enhanceTextInput !== "") {
        setLoading("IsLoading");
      }
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textInput,
          type: job,
          recipient,
          sender,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(job, data.result);
      setLoading("FinishedLoading");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }
  function getTextInput(job: string) {
    switch (job) {
      case "enhance":
        return enhanceTextInput;
      case "email":
        return emailTextInput;
      case "summarize":
        return summarizeTextInput;
      default:
        return "";
    }
  }

  function getRecipient(job: string) {
    return job === "email" ? emailRecipient : "";
  }

  function getSender(job: string) {
    return job === "email" ? emailSender : "";
  }

  function getSetLoading(job: string) {
    switch (job) {
      case "enhance":
        return setEnhanceLoading;
      case "email":
        return setEmailLoading;
      case "summarize":
        return setSummarizeLoading;
      default:
        return () => {};
    }
  }

  function setResult(job: string, result: any) {
    switch (job) {
      case "enhance":
        setEnhanceResult(result);
        break;
      case "email":
        setEmailResult(result);
        break;
      case "summarize":
        setSummarizeResult(result);
        break;
      default:
        break;
    }
  }

  return (
    <AppContext.Provider
      value={{
        enhanceTextInput,
        setEnhanceTextInput,
        enhanceResult,
        setEnhanceResult,
        enhanceLoading,
        setEnhanceLoading,
        emailTextInput,
        setEmailTextInput,
        emailResult,
        setEmailResult,
        emailLoading,
        setEmailLoading,
        summarizeTextInput,
        setSummarizeTextInput,
        summarizeResult,
        setSummarizeResult,
        summarizeLoading,
        setSummarizeLoading,
        emailRecipient,
        setEmailRecipient,
        emailSender,
        setEmailSender,
        onSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
