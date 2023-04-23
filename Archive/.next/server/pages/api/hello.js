"use strict";
(() => {
var exports = {};
exports.id = 453;
exports.ids = [453];
exports.modules = {

/***/ 9:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ hello)
});

;// CONCATENATED MODULE: external "openai"
const external_openai_namespaceObject = require("openai");
;// CONCATENATED MODULE: ./src/pages/api/hello.ts

const configuration = new external_openai_namespaceObject.Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new external_openai_namespaceObject.OpenAIApi(configuration);
/* harmony default export */ async function hello(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md"
            }
        });
        return;
    }
    const text = req.body.text || "";
    const type = req.body.type || "";
    const recipient = req.body.recipient || "";
    const sender = req.body.sender || "";
    if (text.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid text"
            }
        });
        return;
    }
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(text, type, recipient, sender),
            temperature: 0.6,
            max_tokens: 2000
        });
        res.status(200).json({
            result: completion.data.choices[0].text
        });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request."
                }
            });
        }
    }
}
function generatePrompt(text, type, recipient, sender) {
    console.log("TYPE", type);
    if (type == "summarize") {
        return `Summarize the following text: ${text}`;
    }
    if (type == "enhance") {
        // return `Formuliere den folgenden Text besser: ${text}`;
        console.log("text:", text.replace(/[\n\r]/g, " "));
        return `Formulate the following text better: ${text.replace(/[\n\r]/g, " ")}`;
    }
    if (type == "email") {
        return `Write an email to ${recipient} from ${sender} about the following context: ${text}`;
    }
    return "hallo";
// if (type === "summarize") {
//   return `Fomulate the following text better: ${text}`;
// }
// return `Formulate the following text better or correct the incorrect sentences: ${text}`;
// return `Write me an email to {person} about the folowing key points: ${text} make the email this formal{much}`;
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9));
module.exports = __webpack_exports__;

})();