export type ActionResponse = Promise<
  | {
      success: false;
      message?:
        | "UNAUTHORIZED"
        | "USAGE_LIMIT_EXCEEDED"
        | "VALIDATION_FAILED"
        | "INTERNAL_ERROR";
    }
  | {
      success: true;
    }
>;
