import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Courses")
        .child(S.documentTypeList("course").title("Courses")),
      S.listItem()
        .title("Chapters")
        .child(S.documentTypeList("chapter").title("Chapters")),
      S.divider(),
      S.listItem()
        .title("Allowed Users")
        .child(S.documentTypeList("allowedUser").title("Allowed Users")),
      S.listItem()
        .title("User Progress")
        .child(S.documentTypeList("userProgress").title("User Progress")),
      S.divider(),
      S.listItem()
        .title("OTP Codes")
        .child(S.documentTypeList("otpCode").title("OTP Codes")),
    ]);
