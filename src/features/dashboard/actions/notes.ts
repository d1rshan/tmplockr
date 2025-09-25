import { ActionResponse } from "@/types";

export async function createNote(data: z.infer<typeof ): ActionResponse {
  try {
    return { success: true, message: "NOTE CREATED!" };
  } catch (error) {
    console.log("[CREATE_NOTE]", error);
    return { success: false, message: "INTERNAL ERROR" };
  }
}

export async function deleteNote(noteId: string): ActionResponse {
  try {
    return { success: true, message: "NOTE DELETED!" };
  } catch (error) {
    console.log("[DELETE_NOTE]", error);
    return { success: false, message: "INTERNAL ERROR" };
  }
}
