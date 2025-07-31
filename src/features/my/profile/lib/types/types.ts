export interface ProfilePatch {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface ProfileImageUrlResponse {
  profileImageUrl: string;
}
