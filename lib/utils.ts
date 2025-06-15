export const formatError = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "string"
  ) {
    return (error as { data: string }).data;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
};
