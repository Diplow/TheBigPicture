

export const CATEGORIES_PAGE = "CATEGORIES_PAGE"
export const CATEGORY_PAGE = "CATEGORY_PAGE"
export const HEADER_TUTO_ID = "HEADER_TUTO_ID"
export const LIST_TUTO_ID = "LIST_TUTO_ID"
export const WELCOME_TUTO_ID = "WELCOME_TUTO_ID"

export const BP_PAGE = "BP_PAGE"
export const BP_SECTION_ID = "BP_SECTION_ID"
export const REASONS_SECTION_ID = "REASONS_SECTION_ID"
export const RESULTS_SECTION_ID = "RESULTS_SECTION_ID"

export const TUTORIAL = {
  [CATEGORIES_PAGE]: {
    [WELCOME_TUTO_ID]: ""
  },
  [BP_PAGE]: {
    [BP_SECTION_ID]: "",
    [REASONS_SECTION_ID]: "",
    [RESULTS_SECTION_ID]: ""
  },
  [CATEGORY_PAGE]: {
    [HEADER_TUTO_ID]: (category) => "",
    [LIST_TUTO_ID]: ""
  },
  "user": {},
}
