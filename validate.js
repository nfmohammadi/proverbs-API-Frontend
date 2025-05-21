
export default function validateProverb(req, res, next) {
    const { textDari, textPashto, translation, meaning, category } = req.body;
  
    if (!textDari || textDari.trim() === "") {
      req.validationError = "Please provide the proverb text in Dari.";
      req.validated = false;
    } else if (!textPashto || textPashto.trim() === "") {
      req.validationError = "Please provide the proverb text in Pashto.";
      req.validated = false;
    } else if (!translation || translation.trim() === "") {
      req.validationError = "Please provide the translation.";
      req.validated = false;
    } else if (!meaning || meaning.trim() === "") {
      req.validationError = "Please provide the meaning.";
      req.validated = false;
    } else if (!category || category.trim() === "") {
      req.validationError = "Please specify a category for the proverb.";
      req.validated = false;
    } else {
      req.validated = true;
    }
  
    next();
  }
  