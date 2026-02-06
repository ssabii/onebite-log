import { Button } from "@/components/ui/button";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";

export default function EditProfileButton() {
  const open = useOpenProfileEditorModal();

  return (
    <Button variant="secondary" onClick={open} className="cursor-pointer">
      프로필 수정
    </Button>
  );
}
