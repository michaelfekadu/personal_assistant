import Header from "@/components/Header";
import Description from "@/components/Description";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import CollapsableComponent from "@/components/CollapsibleComponent";
import EmailComponent from "@/components/EmailComponent";

export default function Home() {
  const {
    enhanceLoading,
    enhanceResult,
    setEnhanceResult,
    enhanceTextInput,
    setEnhanceTextInput,
    summarizeLoading,
    summarizeResult,
    setSummarizeResult,
    summarizeTextInput,
    setSummarizeTextInput,
  } = useAppContext();

  const enhanceDescription =
    "Please enter the text or sentences you wish to refine (maximum of 1500 words) and let your assistant provide you with an improved version.";

  const summarizeDescritpion =
    "Please enter the text (maximum of 1500 words) and let your assistant provide you with a summary.";
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <Description />
        {/* max 1500 words!! */}
        <CollapsableComponent
          name="Text Enhancer"
          description={enhanceDescription}
          textInput={enhanceTextInput}
          setTextInput={setEnhanceTextInput}
          type="enhance"
          loading={enhanceLoading}
          buttonText="Enhance Text"
          result={enhanceResult}
          setResult={setEnhanceResult}
        />
        <EmailComponent />
        <CollapsableComponent
          name="Text Summarizer"
          description={summarizeDescritpion}
          textInput={summarizeTextInput}
          setTextInput={setSummarizeTextInput}
          type="summarize"
          loading={summarizeLoading}
          buttonText="Summarize Text"
          result={summarizeResult}
          setResult={setSummarizeResult}
        />
        <Footer />
      </div>
    </div>
  );
}
