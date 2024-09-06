export const getMenuBarTitle = (selectedTab: number) => {
  switch (selectedTab) {
    case 1:
      return "CSV";
    case 2:
      return "Map";
    case 3:
      return "Add custom tags";
    case 4:
      return "Review";
    default:
      return "";
  }
};

export const reduceColumns = (columns: any, bool: number) =>
  columns
    .filter((ele: string) => ele !== "phone_number")
    .reduce((acc: any, column: string) => {
      acc[column] = Boolean(bool);
      return acc;
    }, {});

export const DESELECT_TEXT =
  "1. Deselect the columns you would like to not import.";
export const REMAP_COLUMN_TEXT =
  "2. You can remap a column name by selecting an attribute from the drop-down or creating a new attribute.";
export const HELP_IMPORT_TEXT = "Help importing contacts";
export const UPDATE_EXISTING_TEXT = "Update existing contacts";
export const EXISTING_CONTACTS_TEXT = "Existing contacts data";
export const UPDATE_NEW_DATA_TEXT =
  "Updates existing contact with new data from your import.";
export const IMPORT_JOB_TEXT = "Import Job Name";
